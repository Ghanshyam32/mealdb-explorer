package com.example.meal_db_explorer.service;

import com.example.meal_db_explorer.model.Category;
import com.example.meal_db_explorer.model.Meal;
import com.example.meal_db_explorer.model.MealSummary;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MealService {

    private final RestTemplate restTemplate;

    @Value("${mealdb.base-url}")
    private String baseUrl;

    @Cacheable(value = "searchMeals", key = "#name")
    public List<MealSummary> searchMealsByName(String name) {
        log.info("Fetching meals for search: {}", name);
        String url = baseUrl + "/search.php?s=" + name;
        Map<String, List<MealSummary>> response = restTemplate.exchange(
                url, HttpMethod.GET, null,
                new ParameterizedTypeReference<Map<String, List<MealSummary>>>() {}
        ).getBody();
        if (response == null || response.get("meals") == null) return Collections.emptyList();
        return response.get("meals");
    }

    @Cacheable(value = "categories")
    public List<Category> getAllCategories() {
        log.info("Fetching all categories");
        String url = baseUrl + "/categories.php";
        Map<String, List<Category>> response = restTemplate.exchange(
                url, HttpMethod.GET, null,
                new ParameterizedTypeReference<Map<String, List<Category>>>() {}
        ).getBody();
        if (response == null || response.get("categories") == null) return Collections.emptyList();
        return response.get("categories");
    }

    @Cacheable(value = "mealsByCategory", key = "#category")
    public List<MealSummary> getMealsByCategory(String category) {
        log.info("Fetching meals for category: {}", category);
        String url = baseUrl + "/filter.php?c=" + category;
        Map<String, List<MealSummary>> response = restTemplate.exchange(
                url, HttpMethod.GET, null,
                new ParameterizedTypeReference<Map<String, List<MealSummary>>>() {}
        ).getBody();
        if (response == null || response.get("meals") == null) return Collections.emptyList();
        return response.get("meals");
    }

    // Random meal — NOT cached, fresh every time
    public Meal getRandomMeal() {
        log.info("Fetching random meal");
        String url = baseUrl + "/random.php";
        Map<String, List<Meal>> response = restTemplate.exchange(
                url, HttpMethod.GET, null,
                new ParameterizedTypeReference<Map<String, List<Meal>>>() {}
        ).getBody();
        if (response == null || response.get("meals") == null) return null;
        return response.get("meals").get(0);
    }

    @Cacheable(value = "mealDetails", key = "#id")
    public Meal getMealById(String id) {
        log.info("Fetching meal details for id: {}", id);
        String url = baseUrl + "/lookup.php?i=" + id;
        try {
            Map<String, Object> raw = restTemplate.exchange(
                    url, HttpMethod.GET, null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            ).getBody();
            if (raw == null || raw.get("meals") == null || !(raw.get("meals") instanceof List)) return null;
            ObjectMapper mapper = new ObjectMapper();
            List<Meal> meals = mapper.convertValue(raw.get("meals"),
                    mapper.getTypeFactory().constructCollectionType(List.class, Meal.class));
            return meals.isEmpty() ? null : meals.get(0);
        } catch (Exception e) {
            log.error("Error fetching meal by id: {}", id, e);
            return null;
        }
    }
}
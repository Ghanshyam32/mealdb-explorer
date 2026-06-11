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
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MealService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${mealdb.base-url}")
    private String baseUrl;

    @Cacheable(value = "searchMeals", key = "#name")
    public List<MealSummary> searchMealsByName(String name) {
        log.info("Fetching meals for search: {}", name);
        Map<String, List<MealSummary>> response = restClient.get()
                .uri(baseUrl + "/search.php?s=" + name)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
        if (response == null || response.get("meals") == null) return Collections.emptyList();
        return response.get("meals");
    }

    @Cacheable(value = "categories")
    public List<Category> getAllCategories() {
        log.info("Fetching all categories");
        Map<String, List<Category>> response = restClient.get()
                .uri(baseUrl + "/categories.php")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
        if (response == null || response.get("categories") == null) return Collections.emptyList();
        return response.get("categories");
    }

    @Cacheable(value = "mealsByCategory", key = "#category")
    public List<MealSummary> getMealsByCategory(String category) {
        log.info("Fetching meals for category: {}", category);
        Map<String, List<MealSummary>> response = restClient.get()
                .uri(baseUrl + "/filter.php?c=" + category)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
        if (response == null || response.get("meals") == null) return Collections.emptyList();
        return response.get("meals");
    }

    public Meal getRandomMeal() {
        log.info("Fetching random meal");
        Map<String, List<Meal>> response = restClient.get()
                .uri(baseUrl + "/random.php")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
        if (response == null || response.get("meals") == null) return null;
        return response.get("meals").get(0);
    }

    @Cacheable(value = "mealDetails", key = "#id")
    public Meal getMealById(String id) {
        log.info("Fetching meal details for id: {}", id);
        try {
            Map<String, Object> raw = restClient.get()
                    .uri(baseUrl + "/lookup.php?i=" + id)
                    .retrieve()
                    .body(new ParameterizedTypeReference<>() {});
            if (raw == null || !(raw.get("meals") instanceof List)) return null;
            List<Meal> meals = objectMapper.convertValue(raw.get("meals"),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, Meal.class));
            return meals.isEmpty() ? null : meals.get(0);
        } catch (Exception e) {
            log.error("Error fetching meal by id: {}", id, e);
            return null;
        }
    }
}

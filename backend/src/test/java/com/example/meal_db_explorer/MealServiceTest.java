package com.example.meal_db_explorer;

import com.example.meal_db_explorer.model.Category;
import com.example.meal_db_explorer.model.Meal;
import com.example.meal_db_explorer.model.MealSummary;
import com.example.meal_db_explorer.service.MealService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MealServiceTest {

    @Mock
    private RestClient restClient;

    @SuppressWarnings("rawtypes")
    @Mock
    private RestClient.RequestHeadersUriSpec requestSpec;

    @Mock
    private RestClient.ResponseSpec responseSpec;

    @Spy
    private ObjectMapper objectMapper;

    @InjectMocks
    private MealService mealService;

    @BeforeEach
    @SuppressWarnings("unchecked")
    void setUp() {
        ReflectionTestUtils.setField(mealService, "baseUrl",
                "https://www.themealdb.com/api/json/v1/1");
        when(restClient.get()).thenReturn(requestSpec);
        when(requestSpec.uri(anyString())).thenReturn(requestSpec);
        when(requestSpec.retrieve()).thenReturn(responseSpec);
    }

    @Test
    @SuppressWarnings("unchecked")
    void searchMealsByName_returnsList() {
        MealSummary meal = new MealSummary();
        meal.setId("52772");
        meal.setName("Chicken Marengo");

        when(responseSpec.body(any(ParameterizedTypeReference.class)))
                .thenReturn(Map.of("meals", List.of(meal)));

        List<MealSummary> result = mealService.searchMealsByName("chicken");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Chicken Marengo", result.get(0).getName());
    }

    @Test
    @SuppressWarnings("unchecked")
    void searchMealsByName_returnsEmptyList_whenNoResults() {
        when(responseSpec.body(any(ParameterizedTypeReference.class)))
                .thenReturn(Map.of("meals", List.of()));

        List<MealSummary> result = mealService.searchMealsByName("xyz123notexist");

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    @SuppressWarnings("unchecked")
    void getAllCategories_returnsList() {
        Category cat = new Category();
        cat.setId("1");
        cat.setName("Beef");

        when(responseSpec.body(any(ParameterizedTypeReference.class)))
                .thenReturn(Map.of("categories", List.of(cat)));

        List<Category> result = mealService.getAllCategories();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Beef", result.get(0).getName());
    }

    @Test
    @SuppressWarnings("unchecked")
    void getMealById_returnsMeal() {
        Meal meal = new Meal();
        meal.setId("52772");
        meal.setName("Chicken Marengo");
        meal.setCategory("Chicken");

        when(responseSpec.body(any(ParameterizedTypeReference.class)))
                .thenReturn(Map.of("meals", List.of(meal)));

        Meal result = mealService.getMealById("52772");

        assertNotNull(result);
        assertEquals("52772", result.getId());
        assertEquals("Chicken Marengo", result.getName());
    }

    @Test
    @SuppressWarnings("unchecked")
    void getRandomMeal_returnsMeal() {
        Meal meal = new Meal();
        meal.setId("52771");
        meal.setName("Spicy Arrabiata Penne");

        when(responseSpec.body(any(ParameterizedTypeReference.class)))
                .thenReturn(Map.of("meals", List.of(meal)));

        Meal result = mealService.getRandomMeal();

        assertNotNull(result);
        assertEquals("Spicy Arrabiata Penne", result.getName());
    }
}

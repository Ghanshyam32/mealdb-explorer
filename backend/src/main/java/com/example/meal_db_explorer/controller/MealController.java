package com.example.meal_db_explorer.controller;

import com.example.meal_db_explorer.model.Category;
import com.example.meal_db_explorer.model.Meal;
import com.example.meal_db_explorer.model.MealSummary;
import com.example.meal_db_explorer.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
@RequiredArgsConstructor
public class MealController {

    private final MealService mealService;

    // Search meals by name
    @GetMapping("/search")
    public ResponseEntity<List<MealSummary>> searchMeals(@RequestParam String name) {
        return ResponseEntity.ok(mealService.searchMealsByName(name));
    }

    // Get all categories
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(mealService.getAllCategories());
    }

    // Get meals by category
    @GetMapping("/category/{name}")
    public ResponseEntity<List<MealSummary>> getMealsByCategory(@PathVariable String name) {
        return ResponseEntity.ok(mealService.getMealsByCategory(name));
    }

    // Random meal
    @GetMapping("/random")
    public ResponseEntity<Meal> getRandomMeal() {
        Meal meal = mealService.getRandomMeal();
        if (meal == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(meal);
    }

    // Get meal details by ID
    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable String id) {
        Meal meal = mealService.getMealById(id);
        if (meal == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(meal);
    }
}
package com.example.meal_db_explorer.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MealSummary {

    @JsonProperty("idMeal")
    private String id;

    @JsonProperty("strMeal")
    private String name;

    @JsonProperty("strMealThumb")
    private String thumbnail;
}
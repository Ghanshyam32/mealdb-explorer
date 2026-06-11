package com.example.meal_db_explorer.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Category {

    @JsonProperty("idCategory")
    private String id;

    @JsonProperty("strCategory")
    private String name;

    @JsonProperty("strCategoryThumb")
    private String thumbnail;

    @JsonProperty("strCategoryDescription")
    private String description;
}
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/meals";

export const searchMeals = (name) =>
  axios.get(`${BASE_URL}/search?name=${name}`);
export const getCategories = () => axios.get(`${BASE_URL}/categories`);
export const getMealsByCategory = (category) =>
  axios.get(`${BASE_URL}/category/${category}`);
export const getRandomMeal = () => axios.get(`${BASE_URL}/random`);
export const getMealById = (id) => axios.get(`${BASE_URL}/${id}`);

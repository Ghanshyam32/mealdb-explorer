import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMealsByCategory } from "../api/mealApi";
import MealCard from "../components/MealCard";
import "./CategoryPage.css";

function CategoryPage() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByCategory(name)
      .then((res) => setMeals(res.data))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <div className="category-page">
      <h2>🍽️ {name} Meals</h2>
      {loading && <div className="loader">Loading...</div>}
      <div className="meals-grid">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealsByCategory } from "../api/mealApi";
import MealCard from "../components/MealCard";
import "./CategoryPage.css";

function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByCategory(name)
      .then((res) => setMeals(res.data))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <div className="page-wrap">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="cat-page-header">
        <span className="cat-badge">{name}</span>
        <h1>{name} Recipes</h1>
        {!loading && (
          <p className="cat-count">{meals.length} {meals.length === 1 ? "recipe" : "recipes"} found</p>
        )}
      </div>

      {loading ? (
        <div className="page-loader">
          <div className="spinner" />
          <p>Loading recipes...</p>
        </div>
      ) : (
        <div className="meals-grid">
          {meals.map((meal) => (
            <MealCard key={meal.id || meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

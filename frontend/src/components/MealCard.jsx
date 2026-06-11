import { useNavigate } from "react-router-dom";
import "./MealCard.css";

function MealCard({ meal }) {
  const navigate = useNavigate();

  return (
    <div
      className="meal-card"
      onClick={() => navigate(`/meal/${meal.id || meal.idMeal}`)}
    >
      <div className="meal-img-wrap">
        <img
          src={meal.strMealThumb || meal.thumbnail}
          alt={meal.strMeal || meal.name}
          loading="lazy"
        />
        <div className="meal-overlay">
          <span className="meal-view-label">View Recipe →</span>
        </div>
      </div>
      <div className="meal-card-body">
        <h3>{meal.strMeal || meal.name}</h3>
      </div>
    </div>
  );
}

export default MealCard;

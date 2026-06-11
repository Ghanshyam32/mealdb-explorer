import { useNavigate } from "react-router-dom";
import "./MealCard.css";

function MealCard({ meal }) {
  const navigate = useNavigate();

  return (
    <div
      className="meal-card"
      onClick={() => navigate(`/meal/${meal.id || meal.idMeal}`)}
    >
      <img
        src={meal.strMealThumb || meal.thumbnail}
        alt={meal.strMeal || meal.name}
      />

      <div className="meal-card-body">
        <h3>{meal.strMeal || meal.name}</h3>
      </div>
    </div>
  );
}

export default MealCard;

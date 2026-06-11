import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealById } from "../api/mealApi";
import "./RecipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealById(id)
      .then((res) => setMeal(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!meal) return <div className="loader">Meal not found.</div>;

  // Build ingredients list from meal object
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(
        `${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim(),
      );
    }
  }

  //   const embedUrl = getYoutubeEmbed(meal.strYoutube);

  // Convert YouTube watch URL to embed URL
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const videoId = url.split("v=")[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getYoutubeEmbed(meal.strYoutube);

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="recipe-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="recipe-info">
          <h1>{meal.strMeal}</h1>
          <p>
            <span>Category:</span> {meal.strCategory}
          </p>
          <p>
            <span>Cuisine:</span> {meal.strArea}
          </p>
        </div>
      </div>

      <div className="recipe-body">
        {/* Ingredients */}
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="instructions-section">
          <h2>Instructions</h2>
          <p>{meal.strInstructions}</p>
        </div>
      </div>

      {/* YouTube Embed */}
      {embedUrl && (
        <div className="video-section">
          <h2>Video Tutorial</h2>
          <iframe src={embedUrl} title={meal.name} allowFullScreen />
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;

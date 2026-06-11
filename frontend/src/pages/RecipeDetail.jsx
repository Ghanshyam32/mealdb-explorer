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

  if (loading) {
    return (
      <div className="detail-loader">
        <div className="detail-spinner" />
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="detail-loader">
        <p>Recipe not found.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>← Go back</button>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(
        `${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim()
      );
    }
  }

  const instructionSteps = meal.strInstructions
    ? meal.strInstructions.split(/\r?\n/).filter((s) => s.trim().length > 0)
    : [];

  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const videoId = url.split("v=")[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getYoutubeEmbed(meal.strYoutube);

  return (
    <div className="recipe-detail">
      {/* Full-width hero */}
      <div
        className="recipe-hero"
        style={{ backgroundImage: `url(${meal.strMealThumb})` }}
      >
        <div className="recipe-hero-overlay">
          <div className="recipe-hero-content">
            <button className="hero-back-btn" onClick={() => navigate(-1)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="recipe-chips">
              {meal.strCategory && (
                <span className="recipe-chip">{meal.strCategory}</span>
              )}
              {meal.strArea && (
                <span className="recipe-chip">{meal.strArea} Cuisine</span>
              )}
            </div>
            <h1>{meal.strMeal}</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="recipe-content page-wrap">
        <div className="recipe-grid">
          {/* Ingredients */}
          <div className="recipe-card ingredients-card">
            <h2 className="card-label">Ingredients</h2>
            <div className="ingredient-chips">
              {ingredients.map((item, idx) => (
                <span key={idx} className="ingredient-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="recipe-card instructions-card">
            <h2 className="card-label">Instructions</h2>
            <div className="instructions-body">
              {instructionSteps.map((step, idx) => (
                <p key={idx}>{step}</p>
              ))}
            </div>
          </div>
        </div>

        {/* YouTube */}
        {embedUrl && (
          <div className="recipe-card video-card">
            <h2 className="card-label">Video Tutorial</h2>
            <iframe
              src={embedUrl}
              title={meal.strMeal}
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;

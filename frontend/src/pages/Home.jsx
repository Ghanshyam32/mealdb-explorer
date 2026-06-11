import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMeals, getCategories, getRandomMeal } from "../api/mealApi";
import MealCard from "../components/MealCard";
import "./Home.css";

function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchMeals(query);
      setSearchResults(res.data);
    } catch {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    setLoading(true);
    try {
      const res = await getRandomMeal();
      navigate(`/meal/${res.data.id || res.data.idMeal}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Search Section */}
      <div className="hero">
        <div className="hero-tag">● Recipe Explorer</div>
        <h1>
          Discover <em>any</em>
          <br />
          meal, anytime.
        </h1>
        <p className="hero-subtitle">
          300+ recipes from cuisines around the world
        </p>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Try 'Chicken', 'Pasta', 'Sushi'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">SEARCH →</button>
        </form>
        <button className="random-btn" onClick={handleRandom}>
          🎲 Surprise me
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section>
          <p className="section-title">Search Results</p>
          <div className="meals-grid">
            {searchResults.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </section>
      )}

      {searchResults.length === 0 && (
        <section>
          <p className="section-title">Browse by Category</p>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.idCategory}
                className="category-card"
                onClick={() => navigate(`/category/${cat.strCategory}`)}
              >
                <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                <p>{cat.strCategory}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {loading && <div className="loader">Loading...</div>}
    </div>
  );
}

export default Home;

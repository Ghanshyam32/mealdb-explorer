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
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
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
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-inner">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            Recipe Explorer
          </div>
          <h1>
            Find Your Next<br />
            <em>Favourite</em> Meal.
          </h1>
          <p className="hero-sub">300+ recipes from cuisines around the world</p>

          <form onSubmit={handleSearch} className="search-bar">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder='Try "Chicken", "Pasta", "Sushi"...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "..." : "Search"}
            </button>
          </form>

          <button className="random-btn" onClick={handleRandom} disabled={loading}>
            🎲 Surprise me
          </button>
        </div>
      </section>

      <div className="page-wrap">
        {hasSearched && !loading && searchResults.length === 0 && (
          <div className="no-results">
            No recipes found for <strong>"{query}"</strong>. Try a different search.
          </div>
        )}

        {searchResults.length > 0 && (
          <section className="content-section">
            <div className="section-head">
              <span className="eyebrow">Results</span>
              <h2 className="section-title">{searchResults.length} recipes found</h2>
            </div>
            <div className="meals-grid">
              {searchResults.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </section>
        )}

        {searchResults.length === 0 && (
          <section className="content-section">
            <div className="section-head">
              <span className="eyebrow">Browse</span>
              <h2 className="section-title">All Categories</h2>
            </div>
            <div className="categories-grid">
              {categories.map((cat) => (
                <div
                  key={cat.idCategory}
                  className="cat-card"
                  onClick={() => navigate(`/category/${cat.strCategory}`)}
                >
                  <img src={cat.strCategoryThumb} alt={cat.strCategory} loading="lazy" />
                  <div className="cat-overlay">
                    <span className="cat-name">{cat.strCategory}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Home;

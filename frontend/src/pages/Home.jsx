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
        <h1>Find Your Next Meal 🍴</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search meals... e.g. Chicken, Pasta"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <button className="random-btn" onClick={handleRandom}>
          🎲 I'm Feeling Hungry
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section>
          <h2>Search Results</h2>
          <div className="meals-grid">
            {searchResults.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {searchResults.length === 0 && (
        <section>
          <h2>Browse by Category</h2>
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

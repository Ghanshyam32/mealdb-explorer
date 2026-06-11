import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/meal/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

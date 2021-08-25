import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "248981c3";
  const APP_KEY = "eddf5860e7fde782dde32a708d972192";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("Coffee");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  console.log(recipes);
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button">Search</button>
      </form>
      <div className="recipes">
        {recipes.map((recipee) => (
          
          <Recipe
            title={recipee.recipe.label}
            calories={recipee.recipe.calories}
            image={recipee.recipe.image}
            ingredients={recipee.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

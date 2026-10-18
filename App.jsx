import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard.jsx";

const initialRecipes = [
  { id: 1, name: "Spaghetti", description: "Twisty noodles with a bright tomato sauce." },
  { id: 2, name: "Pancakes", description: "Fluffy stacks topped with syrup and berries." },
  { id: 3, name: "Sushi", description: "Delicate rolls of rice, seaweed, and fresh fish." },
  { id: 4, name: "Salad", description: "Crisp greens, colorful veggies, and a zesty dressing." },
];

export default function App() {
  const [recipes, setRecipes] = useState(
    initialRecipes.map(r => ({ ...r, imageUrl: "", loading: true }))
  );

  const fetchImage = async (id) => {
    try {
      const res = await fetch("https://foodish-api.herokuapp.com/api/");
      const data = await res.json();
      setRecipes(prev =>
        prev.map(r =>
          r.id === id ? { ...r, imageUrl: data.image, loading: false } : r
        )
      );
    } catch (e) {
      // silently ignore errors; keep loading state true
    }
  };

  useEffect(() => {
    // Load an image for each recipe on mount
    recipes.forEach(r => fetchImage(r.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = (id) => {
    setRecipes(prev =>
      prev.map(r => (r.id === id ? { ...r, loading: true } : r))
    );
    fetchImage(id);
  };

  const containerStyle = {
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "#fff8f0",
    minHeight: "100vh",
    padding: "1rem",
    color: "#333",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#d35400",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>🍽️ Cute Recipes</header>
      <main style={gridStyle}>
        {recipes.map(r => (
          <RecipeCard
            key={r.id}
            name={r.name}
            description={r.description}
            imageUrl={r.imageUrl}
            loading={r.loading}
            onRefresh={() => handleRefresh(r.id)}
          />
        ))}
      </main>
    </div>
  );
}

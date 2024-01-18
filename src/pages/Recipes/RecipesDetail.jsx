// RecipeDetail.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipesDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://mama-recipe-backend.vercel.app/recipes/${id}`);
        setRecipe(response.data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {/* Tampilkan properti lainnya sesuai kebutuhan */}
    </div>
  );
};

export default RecipesDetail;

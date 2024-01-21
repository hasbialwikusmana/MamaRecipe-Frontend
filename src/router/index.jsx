import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecipesDetail from "../pages/Recipes/RecipesDetail";
import NotFound from "../pages/NotFound";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Navigate to="/home" replace="true"></Navigate>} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/recipes/:id" element={<RecipesDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

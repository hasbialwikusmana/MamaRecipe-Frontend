import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Protect";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Main
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Recipe
import Add from "../pages/Recipes/AddRecipes";
import Update from "../pages/Recipes/UpdateRecipes";
import Detail from "../pages/Recipes/RecipesDetail";
import List from "../pages/Recipes/ListRecipes";
import Video from "../pages/Recipes/VideoRecipes";

// User
import Profile from "../pages/Users/Profile";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
              <Footer />
            </PrivateRoute>
          }
        ></Route>

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route
          path="/recipes/add"
          element={
            <PrivateRoute>
              <Navbar />
              <Add />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="recipes/update/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <Update />
              <Footer />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipes/detail/:id"
          element={
            <PrivateRoute>
              <Detail />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipes/list"
          element={
            <PrivateRoute>
              <Navbar />
              <List />
              <Footer />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="recipes/video/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <Video />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Navbar />
              <Profile />
              <Footer />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

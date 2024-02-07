import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./Protect";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Add from "../pages/Recipes/AddRecipes";
import Update from "../pages/Recipes/UpdateRecipes";
import Detail from "../pages/Recipes/RecipesDetail";
import List from "../pages/Recipes/ListRecipes";
import Video from "../pages/Recipes/VideoRecipes";
import Profile from "../pages/Users/Profile";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route path="/" element={<PrivateRouteLayout component={<Home />} />} />
        <Route path="/recipes/add" element={<PrivateRouteLayout component={<Add />} />} />
        <Route path="/recipes/update/:id" element={<PrivateRouteLayout component={<Update />} />} />
        <Route path="/recipes/detail/:id" element={<PrivateRouteLayout component={<Detail />} />} />
        <Route path="/recipes/list" element={<PrivateRouteLayout component={<List />} />} />
        <Route path="/recipes/video/:id" element={<VideoLayout component={<Video />} />} />
        <Route path="/profile" element={<PrivateRouteLayout component={<Profile />} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRouteLayout = ({ component }) => (
  <ProtectRoute>
    <Navbar />
    {component}
    <Footer />
  </ProtectRoute>
);

const VideoLayout = ({ component }) => (
  <ProtectRoute>
    <Navbar />
    {component}
  </ProtectRoute>
);

export default Router;

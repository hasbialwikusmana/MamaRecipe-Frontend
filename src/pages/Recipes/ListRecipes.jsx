import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBookmark, FaComment, FaPlus, FaThumbsUp } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [orderOption, setOrderOption] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseURL}/recipes`, {
          params: {
            ...Object.fromEntries(searchParams),
            sortBy: sortOption,
            order: orderOption,
            page,
            limit,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setRecipes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchData();
  }, [token, searchParams, sortOption, orderOption, page, limit]);

  const SkeletonCard = () => (
    <div className="rounded-md overflow-hidden bg-white shadow-md animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-4">
        <div className="w-2/3 h-4 mb-2 bg-gray-300"></div>
        <div className="w-1/2 h-4 bg-gray-300"></div>
      </div>
    </div>
  );

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderOption(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
  };

  const handleLike = async (id) => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.post(
        `${baseURL}/recipes/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Liked!",
        text: "You can see your liked recipes in the Liked Recipes page",
      });

      const response = await axios.get(`${baseURL}/recipes`, {
        params: {
          ...Object.fromEntries(searchParams),
          sortBy: sortOption,
          order: orderOption,
          page,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const handleSave = async (id) => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.post(
        `${baseURL}/recipes/${id}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "You can see your saved recipes in the Saved Recipes page",
      });

      const response = await axios.get(`${baseURL}/recipes`, {
        params: {
          ...Object.fromEntries(searchParams),
          sortBy: sortOption,
          order: orderOption,
          page,
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  if (!recipes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        <img src="/img/login/logo-yellow.svg" className="rounded-full h-24 w-24" alt="loading" />
      </div>
    );
  }

  return (
    <>
      <section className="px-10 md:px-16 xl:px-28">
        <div className="flex items-center justify-between mt-28">
          <Link to="/recipes/add" className="flex items-center px-4 py-2 bg-primary hover:bg-secondary text-white text-sm font-medium rounded-md">
            <FaPlus className="mr-2" /> Add Recipe
          </Link>
        </div>
        <div className="mx-auto w-full mb-10 mt-2">
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full">
              <img src="/img/icon/icon-search.svg" alt="Search Icon" className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by title recipes..."
              className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:outline-primary focus:ring-0 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Sort</p>
            <button className="px-4 py-2 bg-primary hover:bg-secondary text-white text-sm font-medium rounded-md" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:outline-primary focus:ring-0 text-sm" value={sortOption} onChange={handleSortChange}>
                <option value="">All Sort</option>
                <option value="title">Title</option>
                <option value="createdAt">Created At</option>
              </select>

              <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:outline-primary focus:ring-0 text-sm" value={orderOption} onChange={handleOrderChange}>
                <option value="">All Order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {loading
              ? Array.from({ length: limit }).map((_, index) => <SkeletonCard key={index} />)
              : recipes.map((recipe) => (
                  <div key={recipe.id} className="relative rounded-md overflow-hidden bg-white shadow-md">
                    <Link to={`/recipes/detail/${recipe.id}`} className="block relative">
                      <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-56 rounded-t-md" />
                    </Link>

                    <div className="absolute top-2 right-2 flex space-x-2 z-10">
                      <button className="flex items-center space-x-1 bg-black p-1 rounded-md text-white hover:text-primary bg-opacity-60" onClick={() => handleLike(recipe.id)}>
                        {recipe.isLiked ? <FaThumbsUp className="w-4 h-4 text-primary" /> : <FaThumbsUp className="w-4 h-4" />}
                        <span>{recipe.likeCount}</span>
                      </button>

                      <button className="flex items-center space-x-1 bg-black p-1 rounded-md text-white hover:text-primary bg-opacity-60" onClick={() => handleSave(recipe.id)}>
                        {recipe.isSaved ? <FaBookmark className="w-4 h-4 text-primary" /> : <FaBookmark className="w-4 h-4" />}
                        <span>{recipe.saveCount}</span>
                      </button>
                    </div>

                    <div className="p-4 bg-white bg-opacity-80">
                      <p className="text-xl font-bold mb-2">{recipe.title}</p>
                      <div className="flex items-center mb-4">
                        {recipe.user && recipe.user.image ? (
                          <img src={recipe.user.image} alt={recipe.user.name} className="w-10 h-10 rounded-full mr-2" />
                        ) : (
                          <img src="/img/icon/User icon.svg" alt="Default User" className="w-10 h-10 rounded-full mr-2" />
                        )}
                        {recipe.user && recipe.user.name && <p className="text-sm">{recipe.user.name}</p>}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">Created {moment(recipe.createdAt).fromNow(true)}</p>
                        <Link to={`/recipes/detail/${recipe.id}`} className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary">
                          {recipe.isCommented ? <FaComment className="w-4 h-4 text-primary" /> : <FaComment className="w-4 h-4" />}
                          <span>{recipe.commentCount}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 mb-10">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <label htmlFor="perPage" className="mr-2 text-sm font-medium text-gray-600">
              Show
            </label>
            <select value={limit} onChange={handleLimitChange} className="px-3 py-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:outline-primary focus:ring-0 text-sm">
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="18">18</option>
            </select>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-8 mt-4 sm:mt-0">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-secondary"}`}>
              <FaArrowLeft className="w-4 h-4" />
            </button>

            <button onClick={() => handlePageChange(page + 1)} disabled={recipes.length < limit} className={`px-4 py-2 rounded-md ${recipes.length < limit ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-secondary"}`}>
              <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListRecipes;

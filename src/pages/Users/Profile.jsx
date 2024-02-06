import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

function Profile() {
  const [users, setUsers] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [mySavedRecipes, setMySavedRecipes] = useState([]);
  const [myLikedRecipes, setMyLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("My Recipe");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState("");
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    image: null,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    getUsersProfile();
    fetchDataBasedOnTab(activeTab);
  }, [activeTab]);

  const changeTab = (tabType) => {
    setActiveTab(tabType);
  };

  const getUsersProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${baseURL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
      setEditFormData({
        name: response.data.data.name,
        phone: response.data.data.phone,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (type) => {
    setEditType(type);
    setShowDropdown(false);
    setShowEditModal(true);
  };

  const handleEditModalClose = async (discardChanges) => {
    if (discardChanges) {
      // Gunakan SweetAlert2 untuk konfirmasi penutupan modal
      const result = await Swal.fire({
        title: "Discard Changes?",
        text: "Are you sure you want to discard changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EFC81A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, discard it!",
      });

      if (result.isConfirmed) {
        //  reset data
        await getUsersProfile();
        setEditFormData({
          name: users.name,
          phone: users.phone,
          image: null,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setShowEditModal(false);
        setEditType("");
      }
    } else {
      setShowEditModal(false);
      setEditType("");
    }
  };

  const fetchDataBasedOnTab = async (tabType) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      let response;
      let endpoint;

      switch (tabType) {
        case "My Recipe":
          endpoint = "/recipes/myRecipes";
          setMySavedRecipes([]); // Reset data tab lainnya
          setMyLikedRecipes([]); // Reset data tab lainnya
          break;
        case "Saved Recipe":
          endpoint = "/recipes/savedRecipes";
          setMyRecipes([]); // Reset data tab lainnya
          setMyLikedRecipes([]); // Reset data tab lainnya
          break;
        case "Liked Recipe":
          endpoint = "/recipes/likedRecipes";
          setMyRecipes([]); // Reset data tab lainnya
          setMySavedRecipes([]); // Reset data tab lainnya
          break;
        default:
          break;
      }

      response = await axios.get(`${baseURL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      switch (tabType) {
        case "My Recipe":
          setMyRecipes(response.data.data);
          break;
        case "Saved Recipe":
          setMySavedRecipes(response.data.data);
          break;
        case "Liked Recipe":
          setMyLikedRecipes(response.data.data);
          break;
        default:
          break;
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await axios.put(
        `${baseURL}/users/profile/${users.id}`,
        {
          name: editFormData.name,
          phone: editFormData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) => ({ ...prevUsers, name: response.data.data.name, phone: response.data.data.phone }));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update profile. Please check your inputs and try again.",
      });
    }
  };

  const handleEditImage = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      const formData = new FormData();
      formData.append("image", editFormData.image);

      const response = await axios.put(`${baseURL}/users/profile/${users.id}/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUsers((prevUsers) => ({ ...prevUsers, image: response.data.data.image }));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile image updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update profile image. Please check your inputs and try again.",
      });
    }
  };

  const handleEditPassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.put(
        `${baseURL}/users/profile/${users.id}/password`,
        {
          oldPassword: editFormData.oldPassword,
          newPassword: editFormData.newPassword,
          confirmNewPassword: editFormData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditFormData((prevData) => ({
        ...prevData,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update password. Please check your inputs and try again.",
      });
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    switch (editType) {
      case "profile":
        handleEditProfile();
        break;
      case "image":
        handleEditImage();
        break;
      case "password":
        handleEditPassword();
        break;
      default:
        break;
    }
    handleEditModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const SkeletonCard = () => (
    <div className="rounded-md overflow-hidden bg-white shadow-md animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-4">
        <div className="w-2/3 h-4 mb-2 bg-gray-300"></div>
        <div className="w-1/2 h-4 bg-gray-300"></div>
      </div>
    </div>
  );

  const NoDataMessage = () => (
    <div className="text-left">
      <p className="text-lg font-bold">Data belum ditemukan</p>
    </div>
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EFC81A",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const baseURL = import.meta.env.VITE_API_URL;
        await axios.delete(`${baseURL}/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Recipe deleted successfully!",
        });

        fetchDataBasedOnTab(activeTab);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete recipe. Please try again.",
        });
      }
    }
  };

  const handleUnlike = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will unlike the recipe. Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EFC81A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, unlike it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${baseURL}/recipes/${id}/unlike`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Unliked!",
          text: "Recipe removed from liked recipes.",
        });

        fetchDataBasedOnTab(activeTab);
      }
    } catch (error) {
      console.error("Unlike Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to unlike recipe. Please try again.",
      });
    }
  };

  const handleUnsave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will unsave the recipe. Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EFC81A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, unsave it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${baseURL}/recipes/${id}/unsave`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Unsaved!",
          text: "Recipe removed from saved recipes.",
        });

        fetchDataBasedOnTab(activeTab);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to unsave recipe. Please try again.",
      });
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center mt-40 relative">
        <div className="w-36 relative flex justify-center">
          <img src={users.image || "/img/icon/User icon.svg"} alt="image profile" className="w-32 rounded-full" />
          <button className="absolute bottom-0 right-0" onClick={() => setShowDropdown(!showDropdown)}>
            <img src="img/profile/icon-pencil.svg" alt="icon-pencil" className="w-5" />
          </button>
          {showDropdown && (
            <div className="absolute mt-2 w-36 bg-primary rounded-md shadow-lg border border-gray-200 divide-y divide-gray-100 right-0 transform translate-y-full">
              <button className="p-2 text-white hover:bg-secondary w-full text-center" onClick={() => handleEditClick("profile")}>
                Update Profile
              </button>
              <button className="p-2 text-white hover:bg-secondary w-full text-center" onClick={() => handleEditClick("image")}>
                Update Image
              </button>
              <button className="p-2 text-white hover:bg-secondary w-full text-center" onClick={() => handleEditClick("password")}>
                Update Password
              </button>
            </div>
          )}
        </div>
        <p className="mt-8 font-bold text-xl px-10 border-b-2">{users.name}</p>
      </section>

      <section>
        <div className="w-full flex max-[370px]:justify-center border-b max-[370px]:ps-0 max-lg:ps-12 ps-28 pb-6 max-[530px]:gap-5 gap-20 max-[530px]:text-sm max-lg:text-base text-lg tracking-wide font-bold mt-10">
          <button className={activeTab === "My Recipe" ? "font-bold" : ""} style={{ color: activeTab === "My Recipe" ? "#EFC81A" : "#666666" }} onClick={() => changeTab("My Recipe")}>
            My Recipe
          </button>
          <button className={activeTab === "Saved Recipe" ? "text-[#666666] font-bold" : "text-[#666666]"} style={{ color: activeTab === "Saved Recipe" ? "#EFC81A" : "#666666" }} onClick={() => changeTab("Saved Recipe")}>
            Saved Recipe
          </button>
          <button className={activeTab === "Liked Recipe" ? "text-[#666666] font-bold" : "text-[#666666]"} style={{ color: activeTab === "Liked Recipe" ? "#EFC81A" : "#666666" }} onClick={() => changeTab("Liked Recipe")}>
            Liked Recipe
          </button>
        </div>
      </section>

      <section className="px-10 md:px-16 xl:px-28  mt-10">
        {myRecipes.length === 0 && !loading && activeTab === "My Recipe" && <NoDataMessage />}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {myRecipes.map((recipe) => (
              <div key={recipe.id} className="relative rounded-md overflow-hidden bg-white shadow-md">
                <Link to={`/recipes/detail/${recipe.id}`} className="block">
                  <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-56 rounded-t-md" />
                  <div className="w-52 h-8 absolute left-0 bottom-3 bg-black bg-opacity-60 text-white font-bold text-xl xl:text-xl px-5">{recipe.title}</div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-row space-x-2">
                  <Link to={`/recipes/update/${recipe.id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center">
                    <FaEdit />
                  </Link>

                  <button onClick={() => handleDelete(recipe.id)} className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-10 md:px-16 xl:px-28 ">
        {mySavedRecipes.length === 0 && !loading && activeTab === "Saved Recipe" && <NoDataMessage />}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {mySavedRecipes.map((recipe) => (
              <div key={recipe.id} className="relative rounded-md overflow-hidden bg-white shadow-md">
                <Link to={`/recipes/detail/${recipe.id}`} className="block">
                  <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-56 rounded-t-md" />
                  <div className="w-52 h-8 absolute left-0 bottom-3 bg-black bg-opacity-60 text-white font-bold text-xl xl:text-xl px-5">{recipe.title}</div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-row space-x-2">
                  {/* Add the Unlike button */}
                  <button onClick={() => handleUnsave(recipe.id)} className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-10 md:px-16 xl:px-28 mb-20">
        {myLikedRecipes.length === 0 && !loading && activeTab === "Liked Recipe" && <NoDataMessage />}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-14">
            {myLikedRecipes.map((recipe) => (
              <div key={recipe.id} className="relative rounded-md overflow-hidden bg-white shadow-md">
                <Link to={`/recipes/detail/${recipe.id}`} className="block">
                  <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-56 rounded-t-md" />
                  <div className="w-52 h-8 absolute left-0 bottom-3 bg-black bg-opacity-60 text-white font-bold text-xl xl:text-xl px-5">{recipe.title}</div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-row space-x-2">
                  {/* Add the Unlike button */}
                  <button onClick={() => handleUnlike(recipe.id)} className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full sm:w-96">
            {editType === "profile" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleEditFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                      Name:
                    </label>
                    <input type="text" id="name" name="name" value={editFormData.name} onChange={handleInputChange} required className="mt-1 p-2 w-full border rounded-md bg-white focus:outline-none focus:ring focus:border-primary" />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                      Phone:
                    </label>
                    <input type="text" id="phone" name="phone" value={editFormData.phone} onChange={handleInputChange} required className="mt-1 p-2 w-full border rounded-md bg-white focus:outline-none focus:ring focus:border-primary" />
                  </div>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                    Save Changes
                  </button>
                </form>
                <button onClick={handleEditModalClose} className="mt-4 text-secondary underline">
                  Close
                </button>
              </div>
            )}

            {editType === "image" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Edit Profile Image</h2>
                <div className="mb-6 flex items-center justify-center">
                  {/* Tambahkan elemen img untuk menampilkan preview gambar */}
                  {editFormData.image && <img src={URL.createObjectURL(editFormData.image)} alt="Preview" className="mt-2 w-full h-36 object-cover rounded-md border" />}
                </div>
                <form onSubmit={handleEditFormSubmit}>
                  <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                      Profile Image:
                    </label>
                    <div className="mt-1 flex items-center">
                      <input type="file" id="image" name="image" accept="image/*" onChange={handleInputChange} required className="p-2 w-full border rounded-md bg-white focus:outline-none focus:ring focus:border-primary" />
                    </div>
                  </div>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                    Save Changes
                  </button>
                </form>
                <button onClick={handleEditModalClose} className="mt-4 text-secondary underline">
                  Close
                </button>
              </div>
            )}

            {editType === "password" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Edit Password</h2>
                <form onSubmit={handleEditFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-600">
                      Old Password:
                    </label>
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      value={editFormData.oldPassword}
                      onChange={handleInputChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md bg-white focus:outline-none focus:ring focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                      New Password:
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={editFormData.newPassword}
                      onChange={handleInputChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md bg-white focus:outline-none focus:ring focus:border-primary"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-600">
                      Confirm New Password:
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={editFormData.confirmNewPassword}
                      onChange={handleInputChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md bg-white focus:outline-none focus:ring focus:border-secondary"
                    />
                  </div>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                    Save Changes
                  </button>
                </form>
                <button onClick={handleEditModalClose} className="mt-4 text-secondary underline">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateRecipes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    video: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseURL}/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const existingData = response.data.data;
        setFormData({
          title: existingData.title,
          ingredients: existingData.ingredients,
          video: existingData.video,
        });

        setPreviewImage(existingData.image);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (image) {
      formDataToSend.append("image", image);
    }

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.put(`${baseURL}/recipes/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Recipe Updated",
        text: "You will be redirected to the profile page",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/profile");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <form className="flex flex-col items-center max-[767px]:mx-[5%] mx-[16%] gap-10 mt-40 mb-20" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="add-photo" className="bg-[#F6F5F4] w-full h-96 rounded-lg flex flex-col justify-center items-center gap-4 text-lg font-bold text-[#666666] cursor-pointer">
          {previewImage ? (
            <img src={previewImage} alt="preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <>
              <img src="/img/addRecipe/icon-addimage.svg" alt="icon-image" className="w-12" />
              <p>Add Photo</p>
            </>
          )}
        </label>
        <input type="file" id="add-photo" name="image" hidden onChange={handleImageChange} />

        <input
          className="bg-[#F6F5F4] w-full h-20 rounded-lg indent-10 text-lg placeholder:text-[#666666] placeholder:font-bold placeholder:tracking-wider outline-primary"
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          cols="30"
          rows="10"
          className="bg-[#F6F5F4] w-full rounded-lg px-8 py-6 text-lg placeholder:text-[#666666] placeholder:font-bold placeholder:tracking-wider outline-primary"
          placeholder="Ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
        ></textarea>
        <input
          className="bg-[#F6F5F4] w-full h-20 rounded-lg indent-10 text-lg placeholder:text-[#666666] placeholder:font-bold placeholder:tracking-wider outline-primary"
          placeholder="Youtube Video Link"
          type="text"
          name="video"
          value={formData.video}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit} className="bg-primary hover:bg-secondary w-80 h-12 rounded text-xl text-white mt-10" type="submit">
          Update Recipe
        </button>
      </form>
    </>
  );
}

export default UpdateRecipes;

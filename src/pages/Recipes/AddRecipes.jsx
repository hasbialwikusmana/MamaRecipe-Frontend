import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddRecipes() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    video: "",
  });
  const navigate = useNavigate();

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
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isYouTubeLink = (url) => {
    // eslint-disable-next-line no-useless-escape
    return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", image);

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    // Validate YouTube link
    if (formData.video && !isYouTubeLink(formData.video)) {
      Swal.fire({
        icon: "error",
        title: "Invalid YouTube Link",
        text: "Please provide a valid YouTube video link.",
      });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.post(`${baseURL}/recipes`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Recipe Added",
        text: "Your recipe has been added",
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
        <input type="text" name="user_id" value="1" hidden readOnly />
        <label htmlFor="add-photo" className="bg-[#F6F5F4] w-full h-96 rounded-lg flex flex-col justify-center items-center gap-4 text-lg font-medium text-[#666666] cursor-pointer">
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
          className="bg-[#F6F5F4] w-full h-20 rounded-lg indent-10 text-lg placeholder:text-[#666666] placeholder:font-medium placeholder:tracking-wider outline-primary"
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          cols="30"
          rows="10"
          className="bg-[#F6F5F4] w-full rounded-lg px-8 py-6 text-lg placeholder:text-[#666666] placeholder:font-medium placeholder:tracking-wider outline-primary"
          placeholder="Ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
        ></textarea>
        <input
          className="bg-[#F6F5F4] w-full h-20 rounded-lg indent-10 text-lg placeholder:text-[#666666] placeholder:font-medium placeholder:tracking-wider outline-primary"
          placeholder="Youtube Video Link"
          type="text"
          name="video"
          value={formData.video}
          onChange={handleInputChange}
        />
        <button className="bg-primary hover:bg-secondary w-80 h-12 rounded text-xl text-white mt-10" type="submit">
          Post
        </button>
      </form>
    </>
  );
}

export default AddRecipes;

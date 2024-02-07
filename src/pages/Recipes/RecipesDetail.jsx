import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecipeDetails = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${baseURL}/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRecipe(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error.message);
      setError("Error fetching recipe.");
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const commentsResponse = await axios.get(`${baseURL}/recipes/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments(commentsResponse.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${baseURL}/recipes/${id}/comments`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newComment = response.data.data;

      setComments([newComment, ...comments]);

      setComment("");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your comment has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting comment:", error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  const handleEditClick = (id) => {
    setEditingCommentId(id);

    const commentToEdit = comments.find((comment) => comment.id === id);

    setComment(commentToEdit.comment);
  };

  const editComment = async (id) => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      await axios.put(
        `${baseURL}/recipes/${id}/comments/${id}`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedComments = comments.map((commentData) => {
        if (commentData.id === id) {
          return {
            ...commentData,
            comment: comment,
          };
        }
        return commentData;
      });
      setComments(updatedComments);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your comment has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating comment:", error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  const handleUpdateComment = async () => {
    try {
      await editComment(editingCommentId);

      setEditingCommentId(null);
      setComment("");
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setComment("");
  };

  const deleteComment = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EFC81A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const baseURL = import.meta.env.VITE_API_URL;
        await axios.delete(`${baseURL}/recipes/${id}/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your comment has been deleted successfully.",
        });

        const deletedComment = comments.filter((commentData) => commentData.id !== id);
        setComments(deletedComment);
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        <img src="/img/login/logo-yellow.svg" className="rounded-full h-24 w-24" alt="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <section className="flex flex-col justify-start items-center mt-28 gap-14 mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-indigo-900 text-center mx-2 md:mx-5">{recipe.title}</h1>
        <img src={recipe.image} alt="food" className="w-96 h-96 rounded-2xl" />
      </section>

      <div className="max-sm:mx-[10%] mx-[15%]">
        <section className="mt-20">
          <h2 className="max-lg:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#3F3A3A] tracking-wide mb-5 sm:mb-7 lg:mb-10">Ingredients</h2>
          {recipe.ingredients ? (
            recipe.ingredients.split("\n").map((data, index) => (
              <p className="max-lg:text-2xl text-3xl leading-10" key={index}>
                {data} &nbsp;
              </p>
            ))
          ) : (
            <p>No ingredients available</p>
          )}
        </section>
        <section className="mt-20 mb-20">
          <h2 className="text-3xl font-bold tracking-wide text-[#3F3A3A] lg:text-4xl max-lg:text-3xl">Video</h2>
          <Link to={`/recipes/video/${id}`} className="mt-9 max-sm:w-56 w-80 max-sm:h-14 h-20 bg-primary rounded-xl flex justify-center items-center">
            <img src="/img/detailRecipe/play.svg" alt="icon-play" />
          </Link>
        </section>
        <section className="mt-28 flex flex-col max-sm:mx-0 mx-5 mb-44">
          <textarea
            rows="9"
            cols="50"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`border bg-[#F6F5F4] rounded-lg p-7 font-medium text-[#666666] outline-primary text-lg ${error ? "border-red-500" : ""}`}
            placeholder="Comment :"
          ></textarea>
          {editingCommentId ? (
            <div className="flex gap-2 mt-10">
              <button onClick={handleUpdateComment} className="w-40 h-12 rounded bg-primary text-lg text-white hover:bg-secondary">
                Update
              </button>
              <button onClick={handleCancelEdit} className="w-40 h-12 rounded bg-gray-400 text-lg text-white hover:bg-gray-500">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleCommentSubmit} className={`w-80 h-12 rounded bg-primary self-center mt-7 text-xl text-white ${!comment ? "cursor-not-allowed bg-gray-400" : ""}`} disabled={!comment}>
              Send
            </button>
          )}

          {comments.length > 0 ? (
            <>
              <h2 className="text-[#3F3A3A] max-lg:text-3xl text-4xl font-bold tracking-wide mt-12 mb-10">Comments</h2>
              <div className="mt-2 flex flex-col overflow-y-auto" style={{ maxHeight: "500px", scrollbarWidth: "thin", scrollbarColor: "transparent transparent" }}>
                {comments.map((commentData) => (
                  <div key={commentData.id} className="flex max-sm:gap-3 gap-7 items-center mb-3">
                    {commentData.user && commentData.user.image ? <img src={commentData.user.image} alt="dp" className="w-12 h-12 rounded-full" /> : <img src="/img/icon/User icon.svg" alt="default-dp" className="w-12 h-12 rounded-full" />}

                    <div className="flex flex-col flex-1">
                      {commentData.user && commentData.user.name && (
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg">{commentData.user.name}</p>
                          {commentData.user && commentData.user.id === localStorage.getItem("userId") && (
                            <div className="flex gap-2">
                              {editingCommentId !== commentData.id ? (
                                <button onClick={() => handleEditClick(commentData.id)} className="bg-blue-500 text-white p-2 rounded-md flex items-center">
                                  <FaEdit />
                                </button>
                              ) : null}
                              <button onClick={() => deleteComment(commentData.id)} className="bg-red-500 text-white p-2 rounded-md flex items-center">
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {commentData.comment && <p className="text-lg">{commentData.comment}</p>}
                      <p className="text-sm text-gray-500">{moment(commentData.createdAt).diff(moment(), "hours") > -1 ? moment(commentData.createdAt).fromNow() : moment(commentData.createdAt).calendar()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DetailRecipe;

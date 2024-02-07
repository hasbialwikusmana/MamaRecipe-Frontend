import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube-embed";
import moment from "moment";

const VideoRecipe = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseURL}/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setVideoData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
        setError("Error fetching video data.");
        setLoading(false);
      }
    };

    const fetchOtherVideos = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseURL}/recipes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const filteredOtherVideos = response.data.data.filter((video) => video.id !== id);
        setOtherVideos(filteredOtherVideos);
      } catch (error) {
        console.error("Error fetching other videos:", error.message);
      }
    };

    fetchData();
    fetchOtherVideos();
  }, [id]);

  const isYouTubeLink = (url) => {
    // eslint-disable-next-line no-useless-escape
    return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i.test(url);
  };

  const opts = {
    height: "390",
    width: "100%",

    playerVars: {
      controls: 2,
      modestbranding: 1,
      fs: 1,
      iv_load_policy: 3,
      showinfo: 0,
      disablekb: 1,
      autoplay: 0,
    },
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
      <div className="w-[4%] h-screen bg-primary fixed left-0 top-0 hidden sm:block"></div>

      <div className="flex max-lg:flex-col max-sm:mx-[5%] max-md:mx-20 mx-40 gap-14 mt-28">
        <section className="w-[74%] max-lg:w-full">
          {isYouTubeLink(videoData.video) ? (
            <YouTube id={extractVideoId(videoData.video)} opts={opts} />
          ) : (
            <div className="text-center">
              <p>This is not a valid YouTube video link.</p>
            </div>
          )}
          <h3 className="mt-8 text-2xl font-bold">{videoData.title}</h3>

          <p className="text-[#AAAAAA]">{moment(videoData.createdAt).fromNow(true)}</p>
        </section>

        <aside className="w-[26%] max-lg:w-full overflow-y-auto" style={{ maxHeight: "600px", scrollbarWidth: "thin", scrollbarColor: "transparent transparent" }}>
          <h5 className="font-bold text-xl  mb-5">Other Video</h5>
          {otherVideos.map((otherVideo) => (
            <Link to={`/recipes/video/${otherVideo.id}`} key={otherVideo.id}>
              <div className="mb-8">
                {otherVideo.image ? (
                  <img src={otherVideo.image} alt={otherVideo.title} className=" w-full h-32 object-cover rounded-md" />
                ) : isYouTubeLink(otherVideo.video) ? (
                  <YouTube id={extractVideoId(otherVideo.video)} className="w-full h-40" />
                ) : (
                  <div className="w-full h-40 bg-gray-300">
                    <p>Not a valid YouTube video link</p>
                  </div>
                )}
                <p className="text-sm mt-3 mb-1 font-bold">{otherVideo.title}</p>
                <p className="text-xs text-[#AAAAAA]">
                  {otherVideo.user.name} - {moment(otherVideo.createdAt).fromNow()}
                </p>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </>
  );
};

const extractVideoId = (url) => {
  // eslint-disable-next-line no-useless-escape
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

export default VideoRecipe;

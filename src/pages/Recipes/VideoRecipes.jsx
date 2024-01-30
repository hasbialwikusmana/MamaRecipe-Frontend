import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube-embed";
import moment from "moment";

const VideoRecipe = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
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

    fetchData();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="w-[4%] h-screen bg-primary fixed left-0 top-0"></div>

      <div className="flex max-lg:flex-col max-sm:mx-[5%] max-md:mx-20 mx-40 gap-14 mt-28">
        {/* Main Video Start */}
        <section className="w-[74%] max-lg:w-full">
          <YouTube id={extractVideoId(videoData.video)} />
          <h3 className="mt-8 text-2xl font-bold">{videoData.title}</h3>
          <p className="text-[#AAAAAA]">{moment(videoData.createdAt).fromNow()}</p>
        </section>
        {/* Main Video End */}

        {/* Next Video Start */}
        <aside className="w-full lg:w-[26%] max-lg:w-full">
          <h5 className="font-bold text-xl ms-3 mb-5">Next Videos</h5>

          {/* Video List Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <div className="mb-8">
              <img src="/img/videoRecipe/1.svg" alt="video-1" className="w-full" />
              <p className="text-sm mt-3 mb-1 font-bold">
                Beef Steak with Curry Sauce - [Step 5] <br />
                Roast beef until it’s medium rare
              </p>
              <p className="text-xs text-[#AAAAAA]">HanaLohana - 3 months ago</p>
            </div>

            <div className="mb-8">
              <img src="/img/videoRecipe/2.svg" alt="video-1" className="w-full" />
              <p className="text-sm mt-3 mb-1 font-bold">
                Beef Steak with Curry Sauce - [Step 6] <br />
                Roast beef until it’s medium rare
              </p>
              <p className="text-xs text-[#AAAAAA]">HanaLohana - 3 months ago</p>
            </div>

            <div className="mb-8">
              <img src="/img/videoRecipe/3.svg" alt="video-1" className="w-full" />
              <p className="text-sm mt-3 mb-1 font-bold">
                Beef Steak with Curry Sauce - [Step 7] <br />
                Roast beef until it’s medium rare
              </p>
              <p className="text-xs text-[#AAAAAA]">HanaLohana - 3 months ago</p>
            </div>
          </div>
        </aside>

        {/* Next Video End */}
      </div>
    </>
  );
};

// Helper function to extract YouTube video ID from URL
const extractVideoId = (url) => {
  // eslint-disable-next-line no-useless-escape
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

export default VideoRecipe;

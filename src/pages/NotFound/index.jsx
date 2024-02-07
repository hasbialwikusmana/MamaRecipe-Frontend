import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">Sorry, the page you are looking for could not be found.</p>
      <Link to="/" className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md transition duration-300 hover:bg-primary-dark">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

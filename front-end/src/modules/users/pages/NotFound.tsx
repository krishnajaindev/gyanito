import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-purple-900/40 border-purple-600/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h1 className="text-6xl font-bold text-fuchsia-400 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-indigo-300 mb-6">Page Not Found</h2>
        
        <p className="text-indigo-200 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
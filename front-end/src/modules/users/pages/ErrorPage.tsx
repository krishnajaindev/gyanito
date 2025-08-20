import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  errorMessage?: string;
  statusCode?: number;
}

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorDetails, setErrorDetails] = useState<{
    message: string;
    statusCode: number;
  }>({
    message: 'Something went wrong',
    statusCode: 500,
  });

  useEffect(() => {
    // Get error details from location state if available
    const state = location.state as LocationState;
    if (state?.errorMessage) {
      setErrorDetails({
        message: state.errorMessage,
        statusCode: state.statusCode || 500,
      });
    }

    // Auto-redirect after 10 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(redirectTimer);
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-purple-900/40 border-purple-600/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h1 className="text-5xl font-bold text-red-400 mb-4">
          Error {errorDetails.statusCode}
        </h1>
        
        <div className="w-24 h-24 mx-auto mb-6 text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
          Something went wrong
        </h2>
        
        <p className="text-indigo-200 mb-8">
          {errorDetails.message}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Go Back
          </button>
          
          <Link 
            to="/"
            className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Return Home
          </Link>
        </div>
        
        <p className="text-indigo-300/70 mt-6 text-sm">
          You will be redirected to the home page in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
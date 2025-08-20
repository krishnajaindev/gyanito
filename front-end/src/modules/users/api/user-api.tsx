// src/modules/api/user-api.ts
import axios, { AxiosError } from 'axios';

// Define response types for better type safety
export interface AuthResponse {
  status: boolean;
  message: string;
  token?: string;
  role?: string;
  userId?: string;
}

const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
});

// Add request interceptor for common headers
userApi.interceptors.request.use(
  (config) => {
    // You could add common headers here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for consistent error handling
userApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Create a standardized error response
    const errorResponse = {
      status: false,
      message: 'An unexpected error occurred. Please try again.'
    };
    
    if (error.response) {
      // The request was made and the server responded with an error status
      errorResponse.message = (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data)
                             ? String(error.response.data.message)
                             : `Server error: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'No response from server. Please check your connection.';
    }
    
    return Promise.reject({
      ...error,
      response: {
        ...error.response,
        data: errorResponse
      }
    });
  }
);

/**
 * Register a new user
 * @param userData Object containing user registration data
 * @returns Promise with registration response
 */
export const doRegister = async (userData: { name: string; email: string; password: string }) => {
  try {
    return await userApi.post('register', userData);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Login a user
 * @param userData Object containing user login data
 * @returns Promise with login response
 */
export const doLogin = async (userData: { email: string; password: string }) => {
  try {
    return await userApi.post('login', userData);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

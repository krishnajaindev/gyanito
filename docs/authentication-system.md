# Authentication System Documentation

## Overview

This document provides a comprehensive overview of the authentication system implemented in the Gyanito application. The system handles user registration, login, session management, and role-based access control.

## Architecture

The authentication system follows a client-server architecture with:

- **Frontend**: React-based UI components for user interaction
- **Backend**: Node.js API with Express for handling authentication requests
- **Database**: MongoDB for storing user credentials and profile information
- **Token System**: JWT (JSON Web Tokens) for maintaining authenticated sessions

## Key Components

### Backend Components

#### User Service (`user-service.js`)

Handles core authentication logic:

- **Registration**: Creates new user accounts with encrypted passwords
  - Validates email uniqueness
  - Enforces password strength requirements
  - Returns structured responses with status and messages

- **Login**: Authenticates users against stored credentials
  - Validates provided credentials
  - Generates JWT tokens upon successful authentication
  - Returns user role and ID for frontend state management

#### User Controller (`user-controller.js`)

Manages HTTP requests and responses for authentication:

- Validates incoming request data
- Calls appropriate service methods
- Formats responses with appropriate HTTP status codes
- Handles error conditions with descriptive messages

#### Authentication Middleware (`auth.js`)

Provides route protection and role-based access control:

- **auth**: Verifies JWT tokens for protected routes
- **authorize**: Checks user roles for permission-based access
- **adminOnly**: Restricts routes to admin users only
- **getUserFromToken**: Extracts user information from tokens

#### Password Utilities (`password-hash.js`)

Securely manages password operations:

- **encryptPassword**: Hashes passwords using bcrypt with environment-configured salt
- **compareHash**: Verifies provided passwords against stored hashes

### Frontend Components

#### Authentication Context (`AuthContext.tsx`)

Provides global authentication state management:

- Maintains `isAuthenticated` state
- Stores user information (role, ID)
- Handles login/logout operations
- Manages token storage in localStorage
- Sets authorization headers for API requests
- Provides role-based navigation functions

#### Login Component (`Login.tsx`)

Handles user login:

- Form with email and password fields
- Client-side validation using Zod schema
- Error handling and user feedback
- Automatic redirection based on user role

#### Registration Component (`SignUp.tsx`)

Handles new user registration:

- Form with name, email, and password fields
- Enhanced validation with Zod schema
- Comprehensive error handling
- Success feedback and redirection to login

#### Validation Schemas (`register-validation.tsx`)

Defines validation rules for authentication forms:

- **registerSchema**: Rules for registration form
  - Name validation (letters only, length constraints)
  - Email format validation
  - Password strength requirements (length, uppercase, numbers)

- **loginSchema**: Rules for login form
  - Email format validation
  - Password length validation

#### API Client (`user-api.tsx`)

Handles communication with backend authentication endpoints:

- Axios-based API client with interceptors
- Standardized error handling
- Type-safe response interfaces

#### Notification Component (`AuthNotification.tsx`)

Provides consistent user feedback for authentication actions:

- Success/error/info message types
- Appropriate styling and icons
- Auto-dismissal functionality
- Accessible design

## Authentication Flow

### Registration Flow

1. User navigates to the registration page
2. User enters registration details (name, email, password)
3. Client-side validation checks input format and requirements
4. Form data is submitted to the backend API
5. Backend validates data and checks for existing users
6. If validation passes, password is encrypted and user is created in database
7. Success/error response is returned to frontend
8. User receives appropriate feedback and is redirected to login on success

### Login Flow

1. User navigates to the login page
2. User enters credentials (email, password)
3. Client-side validation checks input format
4. Credentials are submitted to the backend API
5. Backend validates credentials against stored user data
6. If authentication succeeds, JWT token is generated with user role and ID
7. Token, role, and ID are returned to frontend
8. Frontend stores authentication data and updates global state
9. User is automatically redirected to appropriate dashboard based on role

### Authentication State Management

1. On successful login, token is stored in localStorage
2. Token is added to authorization header for all subsequent API requests
3. On application load, token is checked for validity
4. If token exists, user is automatically logged in
5. Protected routes check authentication state before rendering
6. On logout, token is removed and state is reset

## Security Features

- **Password Encryption**: Passwords are never stored in plain text, only as bcrypt hashes
- **JWT Authentication**: Stateless authentication with signed tokens
- **Role-Based Access Control**: Different access levels for regular and admin users
- **Form Validation**: Comprehensive client-side and server-side validation
- **Error Handling**: Secure error messages that don't leak sensitive information
- **HTTPS**: All communication should be over encrypted connections

## Best Practices Implemented

- **Separation of Concerns**: Authentication logic is separated from business logic
- **Consistent Error Handling**: Standardized error responses across the application
- **User Feedback**: Clear notifications for all authentication actions
- **Stateless Authentication**: No server-side sessions, improving scalability
- **Type Safety**: TypeScript interfaces for authentication data structures
- **Responsive Design**: Authentication UI works across device sizes

## Future Enhancements

- Implement multi-factor authentication
- Add social login options (Google, Facebook, etc.)
- Implement password reset functionality
- Add account lockout after failed login attempts
- Enhance session management with refresh tokens
- Add user profile management features
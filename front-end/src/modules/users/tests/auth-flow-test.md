# Authentication Flow Testing Guide

This document outlines the steps to test the complete authentication flow in the application.

## Prerequisites

- The application server is running
- The database is properly configured
- You have access to create test user accounts

## Test Cases

### 1. User Registration

#### Test Case 1.1: Successful Registration

1. Navigate to the registration page (`/signup`)
2. Fill in valid user information:
   - Name: Test User
   - Email: testuser@example.com
   - Password: TestPass123
3. Click the "Register" button
4. Expected Result:
   - Success notification appears
   - User is redirected to the login page

#### Test Case 1.2: Registration Validation

1. Navigate to the registration page (`/signup`)
2. Test the following invalid inputs:
   - Empty name field
   - Invalid email format (e.g., "testuser")
   - Password less than 6 characters
   - Password without uppercase letter
   - Password without number
3. Expected Result:
   - Form validation errors appear for each invalid input
   - Registration button remains disabled until all fields are valid

#### Test Case 1.3: Duplicate Email Registration

1. Navigate to the registration page (`/signup`)
2. Fill in user information with an email that already exists in the system
3. Click the "Register" button
4. Expected Result:
   - Error notification appears indicating the email is already registered
   - User remains on the registration page

### 2. User Login

#### Test Case 2.1: Successful Login

1. Navigate to the login page (`/login`)
2. Enter valid credentials for a registered user
3. Click the "Login" button
4. Expected Result:
   - Success notification appears
   - User is automatically redirected to the appropriate dashboard based on role
   - For regular users: `/dashboard`
   - For admin users: `/admindashboard`

#### Test Case 2.2: Login Validation

1. Navigate to the login page (`/login`)
2. Test the following invalid inputs:
   - Empty email field
   - Invalid email format
   - Empty password field
3. Expected Result:
   - Form validation errors appear for each invalid input
   - Login button remains disabled until all fields are valid

#### Test Case 2.3: Invalid Credentials

1. Navigate to the login page (`/login`)
2. Enter an email that exists but with an incorrect password
3. Click the "Login" button
4. Expected Result:
   - Error notification appears indicating invalid credentials
   - User remains on the login page

#### Test Case 2.4: Non-existent User

1. Navigate to the login page (`/login`)
2. Enter an email that does not exist in the system
3. Click the "Login" button
4. Expected Result:
   - Error notification appears indicating user not found
   - User remains on the login page

### 3. Authentication State

#### Test Case 3.1: Persistent Login

1. Login successfully
2. Refresh the page
3. Expected Result:
   - User remains logged in
   - User is still on the dashboard page

#### Test Case 3.2: Protected Routes

1. Without logging in, try to access protected routes:
   - `/dashboard`
   - `/admindashboard`
2. Expected Result:
   - User is redirected to the login page

#### Test Case 3.3: Role-Based Access

1. Login as a regular user
2. Try to access admin routes (e.g., `/admindashboard`)
3. Expected Result:
   - User is redirected to an unauthorized page or their regular dashboard

### 4. Logout

#### Test Case 4.1: Successful Logout

1. Login successfully
2. Click the logout button/link
3. Expected Result:
   - User is logged out
   - User is redirected to the home page
   - Protected routes are no longer accessible

## Reporting Issues

If any test case fails, document the following information:

1. Test case number and name
2. Steps to reproduce
3. Expected result
4. Actual result
5. Screenshots (if applicable)
6. Browser and device information
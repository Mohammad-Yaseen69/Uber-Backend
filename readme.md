# User API Documentation

This document outlines the API functionalities for user registration, login, and logout.

## 1. Register a User

**Endpoint:** `/users/register`  
**Method:** POST

**Description:** This endpoint allows users to create a new account by providing their full name, email address, and password it also generate JWT token and sent in a cookie.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**fullName:** Minimum length of 3 characters.  
**email:** Must be a valid email address.  
**password:** Minimum length of 8 characters.  

**Response (Success):**
```json
{
  "status": 201,
  "data": {
    "_id": "userId",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "profilePic": null,
    "socketId": null,
    "createdAt": "2024-12-11T12:34:56Z",
    "updatedAt": "2024-12-11T12:34:56Z"
  },
  "message": "User created successfully"
}
```
**Response (Error):**


```json
{
  "status": 400,
  "message": "User already exists"
}
```
## 2. Login User

**Endpoint:** `/users/register`  
**Method:** POST

**Description:** This endpoint allows existing users to log in. Upon successful login, a JWT token is generated and sent in a cookie.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
**Response (Success):**

```json
{
  "status": 200,
  "data": {
    "_id": "userId",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  },
  "message": "User logged in successfully"
}
```
**Response (Error):**

```json
{
  "status": 400,
  "message": "Invalid credentials"
}
```
## 3. Logout a User
**Endpoint:** `/users/logout`  
**Method:** GET

**Description:** This endpoint logs out a user by clearing the JWT token stored in the cookies.

**Response (Success):**

```json
{
  "status": 200,
  "data": {},
  "message": "User logged out successfully"
}
```
Error Handling
The API uses a custom error handler (ApiError) for consistency. Errors are returned in the following format:

**Example Error Response:**

```json
{
  "status": 400,
  "message": "All fields are required"
}
```

## **4. Fetch User Details**

**Endpoint:** `/users/get-user`  
**Method:** GET  

**Description:** Fetches the details of the logged-in user based on their unique ID. The response excludes sensitive information such as the password and system-generated timestamps.


**Response (Success):**
```json
{
  "status": 200,
  "data": {
    "_id": "userId",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "profilePic": null,
    "socketId": null
  },
  "message": "User fetched successfully"
}

```
The API provides two main types of errors:

- **400 Bad Request:** Invalid input or missing required fields.   
- **401 Unauthorized Request:** When trying to request a protected route only accessable with token.   
- **500 Internal Server Error:** Something went wrong on the server.  
- **Security JWT Authentication:** Tokens are used for secure authentication. They are stored in an httpOnly cookie and are required for secure routes.  
- **Password Hashing:** Passwords are hashed using bcrypt before being stored in the database to ensure security.
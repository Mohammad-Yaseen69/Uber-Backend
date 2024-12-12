# User API Documentation

This document outlines the API functionalities for user registration, login, and logout.

## 1. Register a User

**Endpoint:** `/users/register`  
**Method:** POST

**Description:** This endpoint allows users to create a new account by providing their full name, email address, and password. It also generates a JWT token and sends it in a cookie.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- `fullName`: Minimum length of 3 characters.
- `email`: Must be a valid email address.
- `password`: Minimum length of 8 characters.
- `profilePic` (Optional): Pfp URL from image bb servers.

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

---

## 2. Login User

**Endpoint:** `/users/login`  
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

---

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

**Example Error Response:**

```json
{
  "status": 400,
  "message": "All fields are required"
}
```

---

## 4. Fetch User Details

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

---

## 5. Update User

**Endpoint:** `/users/update-user`  
**Method:** POST

**Description:** This endpoint allows authenticated users to update their user information, such as their full name and profile picture.

**Request Body:**

```json
{
  "fullName": "John Doe Updated",
  "profilePic": "newProfilePicUrl"
}
```

**Response (Success):**

```json
{
  "status": 200,
  "data": {
    "_id": "userId",
    "fullName": "John Doe Updated",
    "profilePic": "newProfilePicUrl",
    "updatedAt": "2024-12-11T12:45:56Z"
  },
  "message": "User updated successfully"
}
```

---

## Error Handling

The API uses a custom error handler (ApiError) for consistency. Errors are returned in the following format:

```json
{
  "status": 400,
  "message": "All fields are required"
}
```




# Driver API Documentation

This document outlines the API functionalities for driver registration, login, and profile management.

## 1. Register Driver

**Endpoint:** `/register`  
**Method:** POST

**Description:** Registers a new driver with their details.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "color": "Red",
  "vehicalType": "car",
  "capacity": 4,
  "plate": "ABC1234",
  "profilePic": "url-to-profile-pic"
}
```

**Response (Success):**

```json
{
  "status": 201,
  "data": {
    "_id": "driverId",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "vehical": {
      "color": "Red",
      "vehicalType": "car",
      "capacity": 4,
      "plate": "ABC1234"
    },
    "profilePic": "url-to-profile-pic",
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  },
  "message": "Driver created successfully"
}
```

**Response (Error):**

```json
{
  "status": 400,
  "message": "Email already in use"
}
```

---

## 2. Login Driver

**Endpoint:** `/login`  
**Method:** POST

**Description:** Logs in an existing driver and returns a JWT token in a cookie.

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
    "_id": "driverId",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  },
  "message": "Driver logged in successfully"
}
```

**Response (Error):**

```json
{
  "status": 400,
  "message": "Invalid Email or Password"
}
```

---

## 3. Logout Driver

**Endpoint:** `/logout`  
**Method:** GET

**Description:** Logs out the driver by clearing the token cookie.

**Response (Success):**

```json
{
  "status": 200,
  "message": "Driver logged out successfully"
}
```

---

## 4. Get Driver Profile

**Endpoint:** `/profile`  
**Method:** GET  
**Authentication:** Required (JWT Token)

**Description:** Fetches the profile details of the authenticated driver.

**Response (Success):**

```json
{
  "status": 200,
  "data": {
    "_id": "driverId",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "vehical": {
      "color": "Red",
      "vehicalType": "car",
      "capacity": 4,
      "plate": "ABC1234"
    },
    "profilePic": "url-to-profile-pic",
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  },
  "message": "Driver profile fetched successfully"
}
```

**Response (Error):**

```json
{
  "status": 400,
  "message": "Driver does not exist"
}
```

---

## 5. Update Driver Profile

**Endpoint:** `/update-profile`  
**Method:** POST  
**Authentication:** Required (JWT Token)

**Description:** Updates the driver's profile information.

**Request Body:**  
***Every Field is Optional***
```json
{
  "fullName": "Johnathan Doe",
  "email": "johnathan.doe@example.com",
  "password": "newpassword123",
  "color": "Blue",
  "vehicalType": "bike",
  "capacity": 2,
  "plate": "XYZ9876",
  "profilePic": "new-url-to-profile-pic"
}

```



**Response (Success)**
```json
{
  "status": 200,
  "data": {
    "_id": "driverId",
    "fullName": "Johnathan Doe",
    "email": "johnathan.doe@example.com",
    "vehical": {
      "color": "Blue",
      "vehicalType": "bike",
      "capacity": 2,
      "plate": "XYZ9876"
    },
    "profilePic": "new-url-to-profile-pic",
    "status" :"inactive" "location": {
      "latitude": null,
      "longitude": null
    }
  },
  "message": "Driver profile fetched successfully"
}
```
### Types of Errors:
- **400 Bad Request**: Invalid input or missing required fields.
- **401 Unauthorized Request**: When trying to request a protected route only accessible with a token.
- **500 Internal Server Error**: Something went wrong on the server.

---

### Security

- **JWT Authentication**: Tokens are used for secure authentication. They are stored in an httpOnly cookie and are required for secure routes.
- **Password Hashing**: Passwords are hashed using bcrypt before being stored in the database to ensure security.

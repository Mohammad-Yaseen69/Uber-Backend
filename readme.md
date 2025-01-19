# User API Documentation

This document outlines the API functionalities for user registration, login, OTP verification, and logout.

## 1. Register a User

**Endpoint:** `/users/register`  
**Method:** POST

**Description:** This endpoint allows users to create a new account by providing their full name, email address, and password. It sends an OTP to the user's email for verification.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "032423290556"
}
```
- `fullName`: Minimum length of 3 characters.
- `email`: Must be a valid email address.
- `password`: Minimum length of 8 characters.
- `phoneNumber` Minimm length of 11 characters.

**Response (Success):**

```json
{
  "status": 201,
  "data": null,
  "message": "Otp Sent to your Email"
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

## 2. Verify OTP

**Endpoint:** `/users/verifyOtp`  
**Method:** POST

**Description:** This endpoint verifies the OTP sent to the user's email during registration and Login.

**Request Body:**

***If Verifying verification OTP***
```json
{
  "otp": "123456",
  "user": {
        "email": "yaseenyaseenali69@gmail.com",
        "fullName":  "Yaseen",
        "phoneNumber": "03243290556",
        "password": "123456789"
  }
}
```
***If Verifying Login OTP***
```json
{
  "otp": "123456",
  "user": {
      "email": "yaseenyaseenali69@gmail.com",
  }
}
```


**Response (Success):**

***if registeration***
```json
{
  "status": 201,
  "data" : {
    "_id": "678d179032f807be3cfd0a81",
        "fullName": "Yaseen",
        "email": "yaseenyaseenali69@gmail.com",
        "password": "$2b$10$4uX1bR9o1YXST6MqXMrSNuEHTzUd8btSy0xxQtqMm74ShdxOA/I4.",
        "status": "inactive",
        "createdAt": "2025-01-19T15:17:36.898Z",
        "updatedAt": "2025-01-19T15:17:36.898Z",
        "__v": 0
  }
  "message": "User Registered Successfully"
}
```
***if Login***
```json
{
  "status": 201,
  "data" : {
    "_id": "678d179032f807be3cfd0a81",
        "fullName": "Yaseen",
        "email": "yaseenyaseenali69@gmail.com",
        "password": "$2b$10$4uX1bR9o1YXST6MqXMrSNuEHTzUd8btSy0xxQtqMm74ShdxOA/I4.",
        "status": "inactive",
        "createdAt": "2025-01-19T15:17:36.898Z",
        "updatedAt": "2025-01-19T15:17:36.898Z",
        "__v": 0
  }
  "message": "User Logged in Successfully"
}
```

**Response (Error):**

```json
{
  "status": 400,
  "message": "Invalid OTP"
}
```

---

## 3. Login User

**Endpoint:** `/users/login`  
**Method:** POST

**Description:** This Endpoint check user Details and sent an otp to their email.

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
    // Other User Data....
  },
  "message": "Otp Sent Please Check your Email"
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

## 4. Logout a User

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

## 5. Fetch User Details

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

## 6. Update User

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

This document outlines the API functionalities for driver registration, login, OTP verification, and profile management.

## 1. Register Driver

**Endpoint:** `/driver/register`  
**Method:** POST

**Description:** Registers a new driver by sending an OTP to their email.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "03243290556",
}
```

**Response (Success):**

```json
{
  "status": 201,
  "data": null,
  "message": "Otp Sent to your Email"
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

## 2. Verify OTP

**Endpoint:** `/driver/verifyOtp`  
**Method:** POST

**Description:** This endpoint verifies the OTP sent to the user's email during registration and Login.

**Request Body:**

***If Verifying verification OTP***
```json
{
  "otp": "123456",
  "user": {
        "email": "yaseenyaseenali69@gmail.com",
        "fullName":  "Yaseen",
        "phoneNumber": "03243290556",
        "password": "123456789"
  }
}
```
***If Verifying Login OTP***
```json
{
  "otp": "123456",
  "user": {
      "email": "yaseenyaseenali69@gmail.com",
  }
}
```


**Response (Success):**

***if registeration***
```json
{
  "status": 201,
  "data" : {
    "_id": "678d179032f807be3cfd0a81",
        "fullName": "Yaseen",
        "email": "yaseenyaseenali69@gmail.com",
        "password": "$2b$10$4uX1bR9o1YXST6MqXMrSNuEHTzUd8btSy0xxQtqMm74ShdxOA/I4.",
        "status": "inactive",
        "createdAt": "2025-01-19T15:17:36.898Z",
        "updatedAt": "2025-01-19T15:17:36.898Z",
        "__v": 0
  }
  "message": "User Registered Successfully"
}
```
***if Login***
```json
{
  "status": 201,
  "data" : {
    "_id": "678d179032f807be3cfd0a81",
        "fullName": "Yaseen",
        "email": "yaseenyaseenali69@gmail.com",
        "password": "$2b$10$4uX1bR9o1YXST6MqXMrSNuEHTzUd8btSy0xxQtqMm74ShdxOA/I4.",
        "status": "inactive",
        "createdAt": "2025-01-19T15:17:36.898Z",
        "updatedAt": "2025-01-19T15:17:36.898Z",
        "__v": 0
  }
  "message": "User Logged in Successfully"
}
```

**Response (Error):**

```json
{
  "status": 400,
  "message": "Invalid OTP"
}
```

---

## 3. Login Driver

**Endpoint:** `/driver/login`  
**Method:** POST

**Description:** This Endpoint check driver Details and sent an otp to their email.

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
    // Other Driver Data....
  },
  "message": "Otp Sent Please Check your Email"
}
```

**Response (Error):**

```json
{
  "status": 400,
  "message": "Invalid credentials"
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

## 4. Logout Driver

**Endpoint:** `/driver/logout`  
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

## 5. Get Driver Profile

**Endpoint:** `/driver/profile`  
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

## 6. Add Details
**Endpoint:** `/driver/addDetails`  
**Method:** PUT  
**Authentication:** Required (JWT Token)

**Description** Add Vehical Details and Profile Picture of Driver.

**Request Body:**  
***Every Field is Required***
```json
{
    "capacity": 4,
    "color": "black", // You can also Provide color codes here
    "vehicalType": "car",
    "plate": "KPK 4662",
    "profilePic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8HD2L9NQ3JugxDOW9Uu9X5FVfnTgJRvn0Q&s"
}

```

**Response (Success):**
```json
{
  "status": 200,
  "data": {
    "_id": "driverId",
    "fullName": "Johnathan Doe",
    "email": "johnathan.doe@example.com",
    "vehical": {
      "color": "black",
      "vehicalType": "car",
      "capacity": 4,
      "plate": "KPK 4662"
    },
    "profilePic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8HD2L9NQ3JugxDOW9Uu9X5FVfnTgJRvn0Q&s",
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  },
  "message": "Driver Details Updated"
}
```

## 7. Update Driver Profile

**Endpoint:** `/driver/update-profile`  
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

**Response (Success):**
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
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  },
  "message": "Driver profile updated successfully"
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

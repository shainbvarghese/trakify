# Trackify API Documentation

This document provides comprehensive documentation for the Trackify API endpoints.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Description**: Register a new user account
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "profilePic": "string (optional)"
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Description**: Authenticate user and get JWT token
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Get Current User
- **GET** `/auth/me`
- **Description**: Get current user information
- **Headers**: `Authorization: Bearer <token>`

#### Update Profile
- **PUT** `/auth/profile`
- **Description**: Update user profile information
- **Headers**: `Authorization: Bearer <token>`

### Transactions

#### Add Transaction
- **POST** `/transactions`
- **Description**: Add a new transaction
- **Headers**: `Authorization: Bearer <token>`

#### Get Transactions
- **GET** `/transactions`
- **Description**: Get user transactions with filtering and pagination
- **Headers**: `Authorization: Bearer <token>`

### Contact

#### Send Contact Message
- **POST** `/contact`
- **Description**: Send a contact message

### Health Check

#### Health Status
- **GET** `/health`
- **Description**: Check API health status

## Error Responses

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Route not found
- **500 Internal Server Error**: Server error

## Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints. 
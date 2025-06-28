# Trackify Backend

A Node.js/Express backend API for the Trackify personal finance tracker application.

## Features

- User authentication with JWT
- Transaction management (CRUD operations)
- Category management
- Financial statistics and reporting
- MongoDB integration with Mongoose

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trackify
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Transactions
- `GET /api/transactions` - Get all transactions (protected)
- `GET /api/transactions/:id` - Get transaction by ID (protected)
- `POST /api/transactions` - Create new transaction (protected)
- `PUT /api/transactions/:id` - Update transaction (protected)
- `DELETE /api/transactions/:id` - Delete transaction (protected)
- `GET /api/transactions/stats/summary` - Get transaction statistics (protected)

### Categories
- `GET /api/categories` - Get all categories (protected)
- `GET /api/categories/:id` - Get category by ID (protected)
- `POST /api/categories` - Create new category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)
- `POST /api/categories/defaults` - Create default categories (protected)

## Database Models

### User
- username, email, password, firstName, lastName
- Password is automatically hashed using bcrypt

### Transaction
- user, type (income/expense), amount, description, category, date, tags, notes
- Linked to User and Category models

### Category
- user, name, type (income/expense), color, icon, isDefault
- Unique category names per user

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production) 
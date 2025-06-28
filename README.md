# Trackify - Personal Finance Tracker

A full-stack personal finance application built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication (register/login) with JWT
- 💰 Track income and expenses
- 📊 Visual charts and analytics using Recharts
- 📱 Responsive design with Tailwind CSS
- 👤 User profile management with image upload
- 📧 Contact form with backend storage
- 🎨 Modern UI with animations and hover effects
- 🔄 Real-time data updates

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Recharts for data visualization
- React Icons
- React Toastify for notifications
- Axios for API calls
- Vite for build tooling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trackify
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/trackify
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   ```

## Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on http://localhost:5000

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Transactions
- `POST /api/transactions` - Add new transaction
- `GET /api/transactions` - Get user transactions
- `GET /api/transactions/stats` - Get transaction statistics

### Contact
- `POST /api/contact` - Send contact message

## Project Structure

```
trackify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── layout/        # Layout components
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── public/            # Public files
├── server/                # Node.js backend
│   ├── routes/            # API routes
│   ├── models/            # MongoDB models
│   ├── middleware/        # Custom middleware
│   ├── controllers/       # Route controllers
│   └── uploads/           # File uploads
└── README.md
```

## Features in Detail

### User Authentication
- Secure registration and login
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes

### Transaction Management
- Add income and expenses
- Categorize transactions
- Add notes to transactions
- Filter and search transactions
- Pagination support

### Data Visualization
- Pie chart for expense categories
- Bar chart for income vs expenses
- Responsive charts with Recharts
- Interactive tooltips

### User Profile
- Update personal information
- Upload profile pictures
- View account details
- Secure profile updates

### Contact System
- Contact form with validation
- Backend message storage
- Toast notifications
- Form validation

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Smooth animations
- Interactive hover effects

## Development

### Building for Production
```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Code Structure
- Components are modular and reusable
- API calls are centralized in utils/api.js
- State management with React hooks
- Error boundaries for better UX

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository or contact the development team. 
# Login Signup UI - Full Stack Authentication App

A premium full stack login and signup web application built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JavaScript. Features a royal black, white, and gold theme with glassmorphism design.

## Features

### Frontend
- Beautiful glassmorphism UI with gold gradients
- Login and Signup forms with smooth toggle animation
- Show/Hide password toggle
- Form validation with real-time error messages
- Success toast notifications
- Fully responsive mobile-first design
- Protected dashboard page

### Backend
- User registration with password hashing (bcrypt)
- User login with JWT token generation
- Protected route to fetch current user data
- MongoDB database integration
- CORS enabled for frontend communication
- Comprehensive error handling

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens), bcryptjs |

## Project Structure

```
login-signup-ui/
├── index.html          # Frontend UI
├── style.css           # Styling & theme
├── script.js           # Frontend logic
├── server.js           # Express backend
├── package.json        # Dependencies
├── .env.example        # Environment variables template
└── README.md           # Documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) installed (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) installed locally OR a [MongoDB Atlas](https://www.mongodb.com/atlas) account

## Setup Instructions

### 1. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Then edit `.env` and update the values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/login_signup_ui
JWT_SECRET=your_super_secret_key_change_this
```

> **Note:** If using MongoDB Atlas, replace `MONGO_URI` with your connection string.

### 3. Start MongoDB (if using local database)

Make sure your local MongoDB server is running:

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or using mongod directly
mongod
```

### 4. Start the Backend Server

```bash
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

### 5. Open the Frontend

Simply open the `index.html` file in your browser:

- **Option 1:** Double-click `index.html`
- **Option 2:** Use VS Code Live Server extension
- **Option 3:** Serve via simple HTTP server:
  ```bash
  npx serve .
  ```

> **Note:** If opening `index.html` directly, make sure the backend server is running on the same origin or CORS is properly configured. The backend already has CORS enabled.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Login user and receive JWT token |
| GET | `/api/auth/me` | Get logged-in user data (requires token) |

### Example API Requests

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### Get Me
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "x-auth-token: YOUR_JWT_TOKEN_HERE"
```

## Usage Guide

1. **Signup:** Click "Create Account", fill in your name, email, and password, then click "Sign Up".
2. **Login:** Enter your email and password, then click "Log In".
3. **Dashboard:** After successful login, you'll be redirected to the dashboard showing your profile.
4. **Logout:** Click the logout button to clear your session and return to the login screen.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running or check your `MONGO_URI` |
| CORS errors | Make sure backend is running and CORS is enabled |
| JWT errors | Check that `JWT_SECRET` is set in `.env` |
| Port already in use | Change `PORT` in `.env` or kill the process using port 5000 |

## License

MIT License - feel free to use and modify for your own projects.

---

Built with by **Wajeed Shaikh** | Full Stack Developer


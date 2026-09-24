# Task Management Application

A full-stack task management application built with React and Node.js. Users can create an account, securely log in, and manage their personal tasks with full CRUD functionality.

## 🚀 Live Demo

[Live Demo](https://task-management-frontend-chi-lemon.vercel.app/)

## ✨ Features

* User registration and login
* JWT-based authentication
* Protected task routes
* User-specific task management
* Create, edit, complete, and delete tasks
* Separate active and completed task sections
* Loading and error states
* Responsive UI
* Production deployment

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* CORS

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

## 🏗️ Architecture

```text
React Frontend
      ↓
Express REST API
      ↓
Authentication Middleware
      ↓
Mongoose
      ↓
MongoDB Atlas
```

Authentication flow:

```text
User
 ↓
Login
 ↓
Express API
 ↓
Verify credentials
 ↓
Generate JWT
 ↓
Frontend stores token
 ↓
Token sent with protected requests
 ↓
Auth middleware verifies token
 ↓
User-specific task operations
```

## 🔐 Authentication & Security

* Passwords are hashed using bcrypt before being stored.
* JWTs are used to authenticate protected API requests.
* Protected routes require a valid authentication token.
* Tasks are associated with their authenticated user.
* Database queries verify the authenticated user's ID when accessing tasks.
* Environment variables are used for sensitive configuration.
* Secrets and environment files are excluded from Git.

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Authenticate a user |

### Tasks

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/tasks`     | Get authenticated user's tasks |
| GET    | `/api/tasks/:id` | Get a specific task            |
| POST   | `/api/tasks`     | Create a task                  |
| PUT    | `/api/tasks/:id` | Update a task                  |
| DELETE | `/api/tasks/:id` | Delete a task                  |

Task endpoints require authentication.

## 📸 Screenshots

### Login

*Add screenshot here*

### Dashboard

*Add screenshot here*

## 💻 Running Locally

### Prerequisites

* Node.js
* MongoDB
* Git

### Frontend

```bash
git clone https://github.com/merinmat/task-management-frontend.git
cd task-management-frontend
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

### Backend

```bash
git clone https://github.com/merinmat/task-management-api.git
cd task-management-api
npm install
node index.js
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 📚 What I Built & Learned

This project was built to strengthen my understanding of full-stack JavaScript development and production deployment.

Key concepts implemented:

* React component-based architecture
* React state and effects
* Client-side routing
* REST API development
* JWT authentication and authorization
* Password hashing
* MongoDB data modeling
* Mongoose
* Middleware and centralized error handling
* Environment configuration
* Git/GitHub workflow
* Production deployment
* Frontend-to-backend integration
* CORS configuration

## 🔮 Future Improvements

* HttpOnly cookie-based authentication
* Task filtering and search
* Task priorities and due dates
* Improved authentication/session management
* Automated tests
* CI/CD pipeline

## 👤 Author

**Merin Anna Mathew**

Built as a full-stack JavaScript portfolio project.

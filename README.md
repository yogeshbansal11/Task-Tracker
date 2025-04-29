# Task Tracker Application

A comprehensive task tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to manage projects and tasks, track progress, and organize their work effectively.

## Features

- User authentication (signup, login) with JWT
- Project management (up to 4 projects per user)
- Task creation, reading, updating, and deletion
- Status tracking for monitoring task progress
- Responsive design for all device sizes

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas account)

## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your-secret-key-change-in-production
```

Note: Replace `mongodb://localhost:27017/task-tracker` with your MongoDB connection string if using MongoDB Atlas.

## Running the Application

### Development Mode

To run the application in development mode with both frontend and backend concurrently:

```
npm run dev:full
```

This will start the React development server on port 3000 and the Express backend on port 5000.

### Frontend Only

To run only the frontend:

```
npm run dev
```

### Backend Only

To run only the backend:

```
npm run server
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (authenticated)

### Projects
- `GET /api/projects` - Get all projects for current user
- `GET /api/projects/:projectId` - Get a single project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:projectId` - Update a project
- `DELETE /api/projects/:projectId` - Delete a project

### Tasks
- `GET /api/projects/:projectId/tasks` - Get tasks for a project
- `POST /api/projects/:projectId/tasks` - Create a new task
- `PUT /api/projects/:projectId/tasks/:taskId` - Update a task
- `PATCH /api/projects/:projectId/tasks/:taskId/status` - Update task status
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete a task
- `GET /api/tasks/recent` - Get recent tasks across all projects

## Technology Stack

- **Frontend**: React, React Router, Axios, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Folder Structure

```
task-tracker/
├── public/           # Public assets
├── src/              # Frontend React code
│   ├── components/   # React components
│   ├── context/      # Context API (auth)
│   ├── pages/        # Page components
│   ├── services/     # API services
│   └── utils/        # Utility functions
├── server/           # Backend Express code
│   ├── controllers/  # Route controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   └── middleware/   # Custom middleware
└── package.json      # Project dependencies
```

## License

MIT
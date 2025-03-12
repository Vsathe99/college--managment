# College Management System

## Overview
This is the *College Management System*, a full-stack web application designed to manage student and teacher data efficiently. The system provides authentication, role-based access, and features for managing students, teachers, assignments, and attendance.

## Team
*Anon*

## Features
- User Authentication (Admin, Student, Teacher)
- Student & Teacher Management
- Attendance Tracking
- Assignment Upload & Tracking
- Secure Role-Based Access Control (RBAC)

## Tech Stack
### Frontend
- *React* (Frontend framework)
- *Tailwind CSS* (Styling)
- *Redux Toolkit* (State Management)
- *React Router* (Client-side Routing)
- *Framer Motion* (Animations)
- *Axios* (API Calls)

### Backend
- *Node.js* (Runtime environment)
- *Express.js* (Backend framework)
- *MongoDB* (Database)
- *JWT* (Authentication)
- *Mongoose* (ODM for MongoDB)

---

# Backend Setup

## Installation
### Prerequisites
Ensure you have *Node.js* and *MongoDB* installed on your system.

### Steps
1. Clone the repository:
   sh
   git clone https://github.com/Vsathe99/student-managment.git
   
2. Navigate to the backend directory:
   sh
   cd student-managment/backend
   
3. Install dependencies:
   sh
   npm install
   
4. Set up environment variables:
   Create a .env file in the root of the backend directory and add the following:
   env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
5. Start the backend server:
   sh
   npm start
   

## Folder Structure

backend/
├─ controllers/
│  ├─ student.controller.js
│  └─ teacher.controller.js
├─ db/
│  └─ db.js
├─ middleware/
│  └─ auth.js
├─ models/
│  ├─ admin.model.js
│  ├─ blackListToken.model.js
│  ├─ student.model.js
│  └─ teacher.model.js
├─ routes/
│  ├─ admin.routes.js
│  ├─ student.routes.js
│  └─ teacher.routes.js
├─ .env
├─ app.js
├─ package-lock.json
├─ package.json
└─ server.js


## Scripts
- npm start - Starts the backend server
- npm run dev - Starts the server in development mode with *nodemon*

## API Endpoints
| Endpoint              | Method | Description                   |
|----------------------|--------|-------------------------------|
| /api/student       | GET    | Get all students              |
| /api/student/:id   | GET    | Get a single student by ID    |
| /api/student       | POST   | Add a new student             |
| /api/student/:id   | PUT    | Update student details        |
| /api/student/:id   | DELETE | Delete a student              |
| /api/teacher       | GET    | Get all teachers              |
| /api/teacher/:id   | GET    | Get a single teacher by ID    |
| /api/teacher       | POST   | Add a new teacher             |
| /api/teacher/:id   | PUT    | Update teacher details        |
| /api/teacher/:id   | DELETE | Delete a teacher              |

## Contributing
Contributions are welcome! Fork the repository and submit a pull request.

## Contact
For any queries, reach out to *[Vsathe99](https://github.com/Vsathe99)*.
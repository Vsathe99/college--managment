# College Management Frontend

## Overview
This is the frontend of the *College Management* system, a web application designed to manage student data efficiently. The application allows users to add, update, delete, and view student details.

## Team
*Anon*

## Features
- Student Registration & Management
- User Authentication & Authorization
- View and Edit Student Profiles
- Attendance and Assignment Tracking
- Responsive UI for Different Devices

## Tech Stack
- *React* (Frontend framework)
- *Tailwind CSS* (Styling)
- *React Router* (Client-side Routing)
- *Framer Motion* (Animations)
- *Lucide React* (Icons)
- *React Icons* (Additional Icons)
- *Redux Toolkit* (State Management)
- *Axios* (API Calls)

## Installation
### Prerequisites
Ensure you have *Node.js* and *npm* installed on your system.

### Steps
1. Clone the repository:
   sh
   git clone https://github.com/Vsathe99/student-managment.git
   
2. Navigate to the frontend directory:
   sh
   cd student-managment/frontend
   
3. Install dependencies:
   sh
   npm install
   
4. Start the development server:
   sh
   npm run dev
   

## Environment Variables
Create a .env file in the root directory and add the following variables:
env
VITE_API_BASE_URL=your_backend_url_here


## Folder Structure

frontend/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  ├─ react.svg
│  │  ├─ studentprofile.png
│  │  └─ teacherProfile.png
│  ├─ components/
│  │  ├─ AnimatedBackground.jsx
│  │  ├─ AssignmentTracker.jsx
│  │  ├─ AttendanceTracker.jsx
│  │  ├─ BorderBeam.jsx
│  │  ├─ FacultyLogin.jsx
│  │  ├─ FormInput.jsx
│  │  ├─ GradientBackground.jsx
│  │  ├─ LoginCard.jsx
│  │  ├─ MobileNav.jsx
│  │  ├─ Navigation.jsx
│  │  ├─ NewAssignment.jsx
│  │  ├─ ProfileTitle.jsx
│  │  ├─ ShimmerButton.jsx
│  │  ├─ SplashCursor.jsx
│  │  ├─ StudentId.jsx
│  │  ├─ StudentIDCard.jsx
│  │  ├─ StudentRight.jsx
│  │  ├─ SubjectCard.jsx
│  │  ├─ TeacherProfileTitle.jsx
│  │  └─ TestComponent.jsx
│  ├─ config/
│  │  └─ axios.js
│  ├─ context/
│  │  ├─ StudentDetailContext.jsx
│  │  └─ TeacherContext.jsx
│  ├─ lib/
│  │  └─ utils.js
│  ├─ Pages/
│  │  ├─ AssignmentsUpload.jsx
│  │  ├─ Attendance.jsx
│  │  ├─ Classes.jsx
│  │  ├─ FeesStatus.jsx
│  │  ├─ Homepage.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ StudentDashboard.jsx
│  │  ├─ StudentLogin.jsx
│  │  ├─ TeacherDashboard.jsx
│  │  └─ TeacherSidebar.jsx
│  ├─ store/
│  │  ├─ store.js
│  │  ├─ studentSlice.js
│  │  └─ teacherSlice.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .env
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tailwind.config.js
└─ vite.config.js


## Scripts
- npm run dev - Starts the development server
- npm run build - Builds the production-ready app
- npm run preview - Previews the production build

## Contributing
Contributions are welcome! Feel free to fork this repository and create a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any queries, reach out to *[Vsathe99](https://github.com/Vsathe99)*.

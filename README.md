# LMS Pro: The Modern Learning Experience 🚀

Welcome to **LMS Pro**, a next-generation Learning Management System designed with a **"Humanized Bento"** aesthetic. We combine powerful functionality with a beautiful, glassmorphic UI to make teaching and learning a joy. ✨

![LMS Preview](https://via.placeholder.com/800x400?text=LMS+Pro+Preview)

## 🌟 Features

*   **For Students**: Track your progress, earn certificates 🏆, and enjoy an immersive "Cinema Mode" learning player.
*   **For Instructors**: Create courses, manage lessons, and track revenue with real-time analytics 📊.
*   **For Admins**: Full control over users and courses with a sleek dashboard.
*   **Modern UI**: Glassmorphism, ambient blobs, and a responsive Bento Grid layout.

## 🛠️ Tech Stack

Built with the **MERN** stack for speed and scalability:

*   **Frontend**: React + Vite + Tailwind CSS (Styled with vanilla CSS variables)
*   **Backend**: Node.js + Express
*   **Database**: MongoDB
*   **Authentication**: JWT & Cookies

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

*   Node.js (v14 or higher)
*   MongoDB (Local or Atlas URL)

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd DT-MERN-LMS-006

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Optional: Cloudinary credentials for uploads
```

### 3. Run the App 🏃‍♂️

You'll need two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
node server.js
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

---

## 📚 API Documentation

Here are the key endpoints for the LMS Pro API.

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user (`name`, `email`, `password`, `role`) |
| `POST` | `/login` | Login user and set JWT cookie |
| `POST` | `/logout` | Clear auth cookie |
| `GET` | `/me` | Get current user profile |

### 🎓 Courses (`/api/courses`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get all published courses |
| `GET` | `/:id` | Get details of a specific course |
| `POST` | `/` | **(Instructor)** Create a new course |
| `DELETE` | `/:id` | **(Admin/Owner)** Delete a course |

### 📚 Lessons (`/api/courses/:courseId/lessons`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Add a lesson to a course |
| `PUT` | `/:lessonId` | Update a lesson (Video/Notes) |
| `DELETE` | `/:lessonId` | Delete a lesson |

### 🚀 Enrollments (`/api/enroll`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/:courseId` | Enroll in a course |
| `GET` | `/my-courses` | Get list of enrolled courses |
| `PUT` | `/progress` | Update lesson completion status |
| `GET` | `/instructor-stats`| **(Instructor)** Get total students & revenue |

### 👑 Admin (`/api/admin`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/stats` | Get global platform stats |
| `GET` | `/users` | List all users |
| `PUT` | `/users/:id/role`| Change user role (Promote/Demote) |
| `DELETE` | `/users/:id` | Delete a user account |

---

## 🤝 Contributing

We love contributions! If you have ideas for new "Bento" cards or features:

1.  Fork the repo.
2.  Create a branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes.
4.  Open a Pull Request.

Happy Learning! 🍎

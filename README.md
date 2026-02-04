# 📋 Task Manager - Full Stack Todo Application

A modern, full-stack task management application built with **React**, **Node.js**, **Express**, and **MongoDB**. Features secure authentication, real-time task management, and a beautiful responsive UI.

![Task Manager](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🔐 **Authentication System**
- ✅ User registration with email & password
- ✅ Secure login with bcrypt password hashing
- ✅ JWT token-based authentication (24-hour expiration)
- ✅ Session persistence across page refreshes
- ✅ Auto-logout after 30 minutes of inactivity
- ✅ Protected routes and API endpoints
- ✅ No third-party auth services - fully custom implementation

### 📝 **Task Management**
- ✅ Create tasks with title and description
- ✅ Mark tasks as Pending or Completed
- ✅ Delete tasks
- ✅ Filter by status (All, Pending, Completed)
- ✅ Real-time task statistics dashboard
- ✅ Beautiful, modern UI with emoji indicators
- ✅ Responsive design for all devices

### 🎨 **User Interface**
- ✅ Modern gradient design
- ✅ Smooth transitions and animations
- ✅ Color-coded task status
- ✅ Professional dashboard with stats cards
- ✅ Clean and intuitive navigation
- ✅ Mobile-friendly layout

## 🚀 Tech Stack

### **Frontend**
- ⚛️ React 19
- 🎨 Tailwind CSS (via inline styles)
- 🛣️ React Router DOM
- 📡 Axios
- ⚡ Vite

### **Backend**
- 🟢 Node.js
- 🚂 Express.js
- 🗄️ MongoDB with Mongoose
- 🔐 JWT & bcryptjs
- 🌐 CORS

## 📦 Installation

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd Align-Together
```

### **2. Backend Setup**
```bash
cd todo-backend
npm install
```

Create a `.env` file in the `todo-backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### **3. Frontend Setup**
```bash
cd ../frontend
npm install
```

## 🎯 Running the Application

### **Start Backend Server**
```bash
cd todo-backend
npm start
```
Backend will run on: **http://localhost:5000**

### **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```
Frontend will run on: **http://localhost:5173**

### **Access the Application**
Open your browser and navigate to: **http://localhost:5173**

## 📁 Project Structure

```
Align-Together/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoList.jsx
│   │   ├── context/         # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Todos.jsx
│   │   ├── api.js           # Axios configuration
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── package.json
│
├── todo-backend/            # Node.js backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   ├── Todo.js         # Todo schema
│   │   └── User.js         # User schema
│   ├── routes/
│   │   ├── authRoutes.js   # Auth endpoints
│   │   └── todoRoutes.js   # Todo CRUD endpoints
│   ├── server.js           # Express server
│   └── package.json
│
├── AUTHENTICATION.md        # Auth system documentation
└── README.md               # This file
```

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/verify` - Verify token validity

### **Todos** (Protected - requires auth token)
- `GET /api/todos` - Get all user todos (with optional status filter)
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with expiration
- ✅ Protected API routes with middleware
- ✅ Input validation
- ✅ CORS configuration
- ✅ Auto-logout on inactivity
- ✅ Secure token storage

## 🎨 Screenshots

### Login Page
Clean and modern login interface with gradient background.

### Dashboard
Professional task management dashboard with real-time statistics.

### Task List
Beautiful task cards with status indicators and actions.

## 🛠️ Configuration

### **Session Timeout**
Default: 30 minutes of inactivity

To modify, edit `frontend/src/context/AuthContext.jsx`:
```javascript
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // Change value in milliseconds
```

### **JWT Token Expiration**
Default: 24 hours

To modify, edit `todo-backend/routes/authRoutes.js`:
```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};
```

## 📝 Usage

1. **Register** a new account with email and password
2. **Login** with your credentials
3. **Create tasks** using the form on the left
4. **View statistics** in the dashboard cards
5. **Filter tasks** by status (All, Pending, Completed)
6. **Mark tasks complete** or undo completion
7. **Delete tasks** when no longer needed
8. **Logout** when finished

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built for placement assessment demonstration
- Modern UI/UX principles applied
- Production-ready code standards

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for placement assessment**

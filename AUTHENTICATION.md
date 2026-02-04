# Authentication System Documentation

## Overview
This is a **custom-built authentication system** (no third-party services like Auth0, Clerk, Firebase, etc.) with secure password hashing, JWT tokens, and session management.

## Features Implemented

### ✅ User Registration
- Sign up with email and password
- Password validation (minimum 6 characters)
- Email uniqueness check
- Password hashing with bcrypt (10 salt rounds)
- Located in: `/api/auth/register`

### ✅ User Login
- Secure login with email and password
- Password verification using bcrypt
- JWT token generation with 24-hour expiration
- Returns token + user data
- Located in: `/api/auth/login`

### ✅ Session Management
- **JWT tokens** stored in localStorage
- **24-hour token expiration** (configurable)
- **Auto-logout after 30 minutes of inactivity** (configurable)
- **Session persistence** across page refreshes
- **Token verification** on app mount to restore sessions
- Activity tracking on user interactions (mouse, keyboard, scroll, touch)

### ✅ Logout
- Clears token and user data from localStorage
- Resets authentication state
- Redirects to login page

### ✅ Protected Routes
- All todo routes require authentication
- Middleware verifies JWT token on every request
- Auto-redirect to login if unauthorized (401)
- Located in: `middleware/authMiddleware.js`

### ✅ Password Security
- Passwords hashed with **bcryptjs** (10 salt rounds)
- Hash generated before saving to database
- Password comparison method for login verification
- Passwords never stored in plain text

### ✅ Additional Security Features
- Token expiration handling
- Auto-logout on token expiration
- Protected API endpoints
- CORS configuration for frontend
- Activity-based session renewal

## Configuration

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_change_this
```

**Important:** Change `JWT_SECRET` to a strong, random string for production!

### Session Timeout
Default: **30 minutes of inactivity**

To change, edit this line in `frontend/src/context/AuthContext.jsx`:
```javascript
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // milliseconds
```

### Token Expiration
Default: **24 hours**

To change, edit this line in `todo-backend/routes/authRoutes.js`:
```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};
```

## API Endpoints

### POST /api/auth/register
Register a new user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "User registered successfully"
}
```

### POST /api/auth/login
Login user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### POST /api/auth/refresh
Refresh token (requires authentication)
```json
Response (200):
{
  "token": "new_jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### GET /api/auth/verify
Verify token validity (requires authentication)
```json
Response (200):
{
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

## How It Works

### Registration Flow
1. User submits email + password
2. Backend checks if email already exists
3. Password is hashed using bcrypt (pre-save hook)
4. User document saved to MongoDB
5. Success response sent (user must login)

### Login Flow
1. User submits email + password
2. Backend finds user by email
3. Compares submitted password with hashed password
4. Generates JWT token with user ID
5. Returns token + user data
6. Frontend stores token in localStorage
7. Token included in all subsequent API requests

### Session Persistence
1. On app mount, frontend checks for stored token
2. If token exists, calls `/api/auth/verify` endpoint
3. If valid, user session is restored
4. If invalid, user is logged out

### Auto-Logout on Inactivity
1. Last activity timestamp stored on user actions
2. Timer checks every minute for inactivity
3. If 30 minutes passed without activity, auto-logout
4. User redirected to login page

### Protected Routes (Backend)
1. Client sends request with `Authorization: Bearer <token>` header
2. Middleware extracts and verifies token
3. If valid, request proceeds with `req.user` containing user ID
4. If invalid/expired, 401 response sent

### Protected Routes (Frontend)
1. React Router checks authentication state
2. If not authenticated, redirects to login
3. If authenticated, renders protected component
4. On 401 response from API, auto-logout triggered

## Testing Your Authentication

1. **Start Backend:**
   ```bash
   cd todo-backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Flow:**
   - Go to http://localhost:5173
   - Register a new account
   - Login with credentials
   - Access protected todos page
   - Try refreshing page (session should persist)
   - Wait 30 minutes of inactivity (should auto-logout)
   - Logout manually

## Security Best Practices Implemented

✅ Passwords hashed with bcrypt (never stored plain text)
✅ JWT tokens with expiration
✅ Secure token storage (localStorage)
✅ Protected API endpoints with middleware
✅ Token verification on sensitive operations
✅ Auto-logout on inactivity
✅ CORS configuration
✅ Input validation
✅ Error handling without exposing sensitive info

## Files Modified/Created

**Backend:**
- `models/User.js` - User model with password hashing
- `routes/authRoutes.js` - Register, login, refresh, verify endpoints
- `middleware/authMiddleware.js` - JWT verification middleware
- `server.js` - Auth routes integration

**Frontend:**
- `context/AuthContext.jsx` - Auth state management, session tracking
- `pages/Login.jsx` - Login form
- `pages/Register.jsx` - Registration form
- `App.jsx` - Protected route logic
- `api.js` - Axios interceptors for token and error handling

## Common Issues & Solutions

### Token expired
- User will be auto-logged out and redirected to login
- Solution: Login again to get a new token

### Session not persisting
- Check if localStorage is enabled in browser
- Verify token is being stored correctly
- Check browser console for errors

### 401 errors
- Token might be expired or invalid
- User will be auto-logged out
- Re-login to continue

### Inactivity timeout too short/long
- Adjust `INACTIVITY_TIMEOUT` in AuthContext.jsx
- Value is in milliseconds (30 * 60 * 1000 = 30 minutes)

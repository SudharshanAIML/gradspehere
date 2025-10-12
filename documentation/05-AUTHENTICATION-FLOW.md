# Authentication and Authorization Flow

## Overview
GradSphere uses a dual authentication system combining Firebase Authentication for user management and JWT tokens for API authorization. This document details the complete authentication flow, security measures, and best practices.

---

## Table of Contents
1. [Authentication Architecture](#authentication-architecture)
2. [Registration Flow](#registration-flow)
3. [Login Flow](#login-flow)
4. [Logout Flow](#logout-flow)
5. [Session Management](#session-management)
6. [Role-Based Access Control](#role-based-access-control)
7. [Security Measures](#security-measures)
8. [Token Management](#token-management)

---

## Authentication Architecture

### System Components

```
┌──────────────┐
│   Frontend   │
│   (React)    │
└──────┬───────┘
       │
       │ 1. User submits credentials
       │
       ▼
┌──────────────────┐
│  Firebase Auth   │
│  (Google Cloud)  │
└──────┬───────────┘
       │
       │ 2. Firebase creates/authenticates user
       │ 3. Returns Firebase UID
       │
       ▼
┌──────────────────┐
│  Backend API     │
│  (Express)       │
└──────┬───────────┘
       │
       │ 4. Stores user in MongoDB
       │ 5. Generates JWT token
       │
       ▼
┌──────────────────┐
│  MongoDB Atlas   │
│  (Database)      │
└──────────────────┘
```

### Authentication Layers

1. **Firebase Authentication**: Primary authentication provider
2. **Backend Validation**: Password verification and user data storage
3. **JWT Tokens**: API authorization
4. **LocalStorage**: Client-side session persistence

---

## Registration Flow

### Step-by-Step Process

#### 1. User Submits Registration Form

**Frontend Component**: `AuthForm.jsx`

```jsx
const handleRegister = async (formData) => {
  const { name, email, password, role } = formData;
  
  try {
    // Step 1: Register with Firebase
    const userData = await register(name, email, password, role);
    
    // Step 2: Store in backend
    await axios.post('http://localhost:5000/api/register', {
      uid: userData.uid,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: password
    });
    
    // Step 3: Navigate to dashboard
    if (role === 'student') {
      navigate(`/studentdashboard/${userData.uid}`);
    } else {
      navigate(`/teacherdashboard/${userData.uid}`);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
```

#### 2. Firebase Creates Account

**File**: `src/context/AuthContext.jsx`

```javascript
const register = async (name, email, password, role) => {
  try {
    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store additional data in Firestore
    await setDoc(doc(db, "users", user.uid), { 
      name, 
      email, 
      role 
    });

    // Prepare user data
    const userData = { 
      uid: user.uid, 
      email, 
      name, 
      role 
    };
    
    // Store in localStorage
    storeUser(userData);

    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

#### 3. Backend Stores User Data

**File**: `backend/index.js`

```javascript
app.post("/api/register", async (req, res) => {
  try {
    const { uid, email, name, role, password } = req.body;

    // Validate password
    if (!password || typeof password !== "string") {
      return res.status(400).json({ 
        message: "Password is required and must be a string" 
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const user = new User({ 
      uid, 
      email, 
      name, 
      role, 
      password: hashedPassword 
    });
    
    await user.save();
    
    res.status(201).json({ 
      message: "User registered successfully" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Registration Sequence Diagram

```
User          Frontend        Firebase        Backend         MongoDB
 │               │               │               │               │
 │──Register────>│               │               │               │
 │               │               │               │               │
 │               │──Create User─>│               │               │
 │               │               │               │               │
 │               │<──UID + Token─│               │               │
 │               │               │               │               │
 │               │──Store User──────────────────>│               │
 │               │               │               │               │
 │               │               │               │──Hash Pass───>│
 │               │               │               │               │
 │               │               │               │<──Save User───│
 │               │               │               │               │
 │               │<──Success─────────────────────│               │
 │               │               │               │               │
 │<──Navigate────│               │               │               │
 │  Dashboard    │               │               │               │
```

---

## Login Flow

### Step-by-Step Process

#### 1. User Submits Login Form

**Frontend Component**: `AuthForm.jsx`

```jsx
const handleLogin = async (formData) => {
  const { email, password } = formData;
  
  try {
    // Login with Firebase
    await loginWithFirebase(email, password);
    // Navigation handled in AuthContext
  } catch (error) {
    toast.error(error.message);
  }
};
```

#### 2. Firebase Authenticates User

**File**: `src/context/AuthContext.jsx`

```javascript
const loginWithFirebase = async (email, password) => {
  try {
    // Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : null;
    const name = userDoc.exists() ? userDoc.data().name : null;

    // Prepare user data
    const userData = { 
      uid: user.uid, 
      email, 
      name, 
      role 
    };
    
    // Store in localStorage
    storeUser(userData);

    // Navigate based on role
    if (role === "student") {
      navigate(`/studentdashboard/${user.uid}`);
    } else if (role === "teacher") {
      navigate(`/teacherdashboard/${user.uid}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
```

#### 3. Backend Validates Credentials (Alternative Flow)

**File**: `backend/index.js`

```javascript
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid credentials" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );
    
    res.json({ 
      token, 
      role: user.role, 
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Login Sequence Diagram

```
User          Frontend        Firebase        Firestore       Backend
 │               │               │               │               │
 │──Login───────>│               │               │               │
 │               │               │               │               │
 │               │──Authenticate>│               │               │
 │               │               │               │               │
 │               │<──UID + Token─│               │               │
 │               │               │               │               │
 │               │──Get Role────────────────────>│               │
 │               │               │               │               │
 │               │<──User Data───────────────────│               │
 │               │               │               │               │
 │               │──Store Local──│               │               │
 │               │               │               │               │
 │<──Navigate────│               │               │               │
 │  Dashboard    │               │               │               │
```

---

## Logout Flow

### Step-by-Step Process

#### 1. User Clicks Logout

**Frontend Component**: Any component with logout button

```jsx
import { useAuth } from './context/AuthContext';

function NavBar() {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };
  
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
```

#### 2. Clear Session Data

**File**: `src/context/AuthContext.jsx`

```javascript
const logout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    
    // Clear localStorage
    localStorage.removeItem("user");
    
    // Clear state
    setUser(null);
    setIsLogin(false);
    
    // Navigate to login
    navigate("/login");
  } catch (error) {
    throw new Error(error.message);
  }
};
```

### Logout Sequence Diagram

```
User          Frontend        Firebase        LocalStorage
 │               │               │               │
 │──Logout──────>│               │               │
 │               │               │               │
 │               │──Sign Out────>│               │
 │               │               │               │
 │               │<──Success─────│               │
 │               │               │               │
 │               │──Clear Data──────────────────>│
 │               │               │               │
 │               │──Clear State──│               │
 │               │               │               │
 │<──Navigate────│               │               │
 │  to Login     │               │               │
```

---

## Session Management

### LocalStorage Structure

```javascript
// Stored in localStorage with key "user"
{
  "uid": "firebase_abc123xyz",
  "email": "john.doe@university.edu",
  "name": "John Doe",
  "role": "student"
}
```

### Session Persistence

**File**: `src/context/AuthContext.jsx`

```javascript
// On app load, restore session from localStorage
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
    setIsLogin(true);
  }
}, []);

// Store user data
const storeUser = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
  setIsLogin(true);
};
```

### Session Expiration

**Current Implementation**:
- Firebase tokens expire after 1 hour
- JWT tokens expire after 1 hour
- LocalStorage persists until manual logout

**Recommended Enhancement**:
```javascript
// Add token expiration check
const isTokenExpired = (token) => {
  const decoded = jwt.decode(token);
  return decoded.exp < Date.now() / 1000;
};

// Refresh token before expiration
const refreshToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    return token;
  }
};
```

---

## Role-Based Access Control

### User Roles

1. **Student**
   - View own profile
   - Edit own profile
   - View assignments
   - View own LeetCode stats

2. **Teacher**
   - View all student profiles
   - Create/edit/delete assignments
   - View all students' LeetCode stats
   - Export student data

### Route Protection

**Current Implementation** (needs improvement):

```jsx
// Recommended: Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLogin } = useAuth();
  
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
}

// Usage
<Route 
  path="/teacherdashboard/:uid" 
  element={
    <ProtectedRoute allowedRoles={['teacher']}>
      <TeacherDashboard />
    </ProtectedRoute>
  } 
/>
```

### API Authorization

**Recommended Middleware** (not currently implemented):

```javascript
// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions' 
      });
    }
    next();
  };
};

// Usage
app.post('/api/assignments', 
  authenticateToken, 
  authorizeRole('teacher'), 
  createAssignment
);
```

---

## Security Measures

### 1. Password Security

**Hashing Algorithm**: bcrypt with 10 salt rounds

```javascript
// Hash password during registration
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password during login
const isMatch = await bcrypt.compare(password, user.password);
```

**Password Requirements** (recommended):
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

```javascript
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
```

### 2. JWT Token Security

**Current Configuration**:
```javascript
const token = jwt.sign(
  { email: user.email, role: user.role },
  "secretkey",  // ⚠️ Should be in environment variable
  { expiresIn: "1h" }
);
```

**Recommended Configuration**:
```javascript
const token = jwt.sign(
  { 
    uid: user.uid,
    email: user.email, 
    role: user.role 
  },
  process.env.JWT_SECRET,
  { 
    expiresIn: "1h",
    issuer: "gradsphere",
    audience: "gradsphere-users"
  }
);
```

### 3. CORS Configuration

**Current**: Allows all origins

```javascript
app.use(cors());
```

**Recommended**: Restrict to specific origins

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://gradsphere.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 4. Input Validation

**Recommended**: Use express-validator

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().notEmpty(),
  body('role').isIn(['student', 'teacher']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process registration
  }
);
```

### 5. Rate Limiting

**Recommended**: Prevent brute force attacks

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts, please try again later'
});

app.post('/api/login', authLimiter, loginHandler);
```

### 6. HTTPS in Production

**Recommended**: Force HTTPS

```javascript
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## Token Management

### Access Token Flow

```
1. User logs in
2. Backend generates JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in API requests
5. Backend verifies token
6. Backend processes request
```

### Token Storage

**Current**: User data in localStorage (no token stored)

**Recommended**: Store token separately

```javascript
// Store token
localStorage.setItem('accessToken', token);
localStorage.setItem('refreshToken', refreshToken);

// Retrieve token
const token = localStorage.getItem('accessToken');

// Include in API requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### Token Refresh Strategy

**Recommended Implementation**:

```javascript
// Axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/refresh-token', {
          refreshToken
        });
        
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## Security Checklist

### Current Status

✅ Password hashing with bcrypt
✅ Firebase authentication
✅ JWT token generation
✅ CORS enabled
✅ Duplicate user prevention

### Recommended Improvements

⚠️ Move JWT secret to environment variable
⚠️ Implement JWT verification middleware
⚠️ Add request validation
⚠️ Implement refresh tokens
⚠️ Add rate limiting on auth endpoints
⚠️ Sanitize user inputs
⚠️ Add HTTPS in production
⚠️ Implement role-based access control middleware
⚠️ Add password strength requirements
⚠️ Implement account lockout after failed attempts
⚠️ Add email verification
⚠️ Implement password reset functionality
⚠️ Add two-factor authentication (2FA)
⚠️ Log authentication events
⚠️ Implement session timeout

---

## Common Security Vulnerabilities

### 1. XSS (Cross-Site Scripting)
**Prevention**: Sanitize user inputs, use React's built-in XSS protection

### 2. CSRF (Cross-Site Request Forgery)
**Prevention**: Use CSRF tokens, SameSite cookies

### 3. SQL Injection
**Prevention**: Use Mongoose (already protected)

### 4. Brute Force Attacks
**Prevention**: Implement rate limiting, account lockout

### 5. Session Hijacking
**Prevention**: Use HTTPS, secure cookies, short token expiration

---

## Testing Authentication

### Manual Testing

```bash
# Register user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test123",
    "email": "test@example.com",
    "name": "Test User",
    "role": "student",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Automated Testing

```javascript
describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        uid: 'test123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'student',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });
  
  it('should login existing user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
```

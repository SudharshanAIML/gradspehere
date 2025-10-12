# Frontend Service Documentation

## Overview
The Frontend Service is a modern React application built with Vite, providing user interfaces for students and teachers to manage profiles, assignments, and LeetCode integration.

**Development URL**: `http://localhost:5173`

**Technology Stack**:
- React 19.0.0
- Vite 6.1.0
- React Router DOM 7.1.5
- Tailwind CSS 4.0.6
- Firebase Authentication
- Axios for API calls

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Routing Architecture](#routing-architecture)
3. [State Management](#state-management)
4. [Component Architecture](#component-architecture)
5. [Firebase Integration](#firebase-integration)
6. [API Integration](#api-integration)
7. [Styling Guide](#styling-guide)
8. [Build and Deployment](#build-and-deployment)

---

## Project Structure

```
frontend/
├── public/
│   └── assets/              # Static assets (images, icons)
├── src/
│   ├── Components/
│   │   ├── Auth/
│   │   │   └── AuthForm.jsx           # Login/Register form
│   │   ├── StudentDashboard/
│   │   │   └── Profile/
│   │   │       └── Profile.jsx        # Student profile view
│   │   ├── EditProfile/
│   │   │   └── Editprofile.jsx        # Profile editing form
│   │   └── Chatbot/
│   │       └── utils/
│   │           └── Chatbot.jsx        # AI chatbot component
│   ├── Pages/
│   │   ├── Landing/
│   │   │   └── Landing.jsx            # Landing page
│   │   ├── StudentDashboard/
│   │   │   └── StudentDashboard.jsx   # Student main dashboard
│   │   └── TeacherDashboard/
│   │       └── TeacherDashboard.jsx   # Teacher main dashboard
│   ├── context/
│   │   ├── AuthContext.jsx            # Authentication state
│   │   └── UserContext.jsx            # User data state
│   ├── utils/                         # Utility functions
│   ├── firebase.js                    # Firebase configuration
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html                         # HTML template
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind configuration
├── package.json                       # Dependencies
└── .gitignore                         # Git ignore rules
```

---

## Routing Architecture

### Route Configuration

```jsx
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<AuthForm />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/editprofile" element={<Editprofile />} />
  <Route path="/studentdashboard/:uid" element={<StudentDashboard />} />
  <Route path="/teacherdashboard/:uid" element={<TeacherDashboard />} />
</Routes>
```

### Route Details

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Landing | Public | Marketing/landing page |
| `/login` | AuthForm | Public | Login and registration |
| `/profile` | Profile | Protected | View user profile |
| `/editprofile` | Editprofile | Protected | Edit user profile |
| `/studentdashboard/:uid` | StudentDashboard | Student | Student dashboard |
| `/teacherdashboard/:uid` | TeacherDashboard | Teacher | Teacher dashboard |

### Dynamic Routing

**Student Dashboard**:
```
/studentdashboard/abc123xyz
```
- `:uid` parameter contains Firebase user ID
- Used to fetch user-specific data

**Teacher Dashboard**:
```
/teacherdashboard/xyz789abc
```
- `:uid` parameter contains Firebase user ID
- Access to all students' data

---

## State Management

### Context Providers

The application uses React Context API for global state management.

#### 1. AuthContext

**Location**: `src/context/AuthContext.jsx`

**Purpose**: Manages authentication state and operations

**State**:
```javascript
{
  user: {
    uid: "firebase_user_id",
    email: "user@example.com",
    name: "User Name",
    role: "student" | "teacher"
  },
  isLogin: boolean
}
```

**Methods**:
```javascript
{
  register(name, email, password, role),
  loginWithFirebase(email, password),
  logout(),
  setIsLogin(boolean)
}
```

**Usage Example**:
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isLogin, loginWithFirebase, logout } = useAuth();
  
  const handleLogin = async () => {
    try {
      await loginWithFirebase(email, password);
      // Automatically navigates based on role
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return (
    <div>
      {isLogin ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

#### 2. UserContext

**Location**: `src/context/UserContext.jsx`

**Purpose**: Manages user profile data and operations

**State**:
```javascript
{
  userData: {
    // Complete user profile data
  },
  loading: boolean,
  error: string | null
}
```

**Methods**:
```javascript
{
  fetchUserData(uid),
  updateUserData(uid, data),
  refreshUserData()
}
```

---

## Component Architecture

### Page Components

#### 1. Landing Page
**File**: `src/Pages/Landing/Landing.jsx`

**Purpose**: Marketing page for unauthenticated users

**Features**:
- Hero section
- Feature highlights
- Call-to-action buttons
- Navigation to login/register

---

#### 2. AuthForm Component
**File**: `src/Components/Auth/AuthForm.jsx`

**Purpose**: Handles user authentication

**Features**:
- Toggle between login and register
- Form validation
- Firebase authentication
- Backend API registration
- Role selection (student/teacher)
- Error handling with toast notifications

**Flow**:
1. User fills form
2. Firebase creates account (register) or authenticates (login)
3. Backend API called to store/verify user data
4. JWT token stored in localStorage
5. Redirect to appropriate dashboard

---

#### 3. Student Dashboard
**File**: `src/Pages/StudentDashboard/StudentDashboard.jsx`

**Purpose**: Main interface for students

**Features**:
- Profile overview
- Assignment list
- LeetCode statistics
- Progress tracking
- Certificate management
- Achievement showcase

**Data Sources**:
- Backend API: User profile, assignments
- LeetCode API: Coding statistics
- Firebase: Authentication state

---

#### 4. Teacher Dashboard
**File**: `src/Pages/TeacherDashboard/TeacherDashboard.jsx`

**Purpose**: Main interface for teachers

**Features**:
- View all students
- Create assignments
- Track student progress
- View LeetCode statistics for all students
- Manage course content

**Permissions**:
- Create/edit/delete assignments
- View all student profiles
- Export student data

---

#### 5. Profile Component
**File**: `src/Components/StudentDashboard/Profile/Profile.jsx`

**Purpose**: Display user profile information

**Sections**:
- Personal information
- Contact details
- Academic details
- Technical skills
- Job experience
- Coding profiles
- Certificates
- Achievements
- Volunteer work
- Soft skills

---

#### 6. Edit Profile Component
**File**: `src/Components/EditProfile/Editprofile.jsx`

**Purpose**: Edit user profile

**Features**:
- Form with all profile fields
- Image upload (Cloudinary integration)
- Dynamic arrays (skills, certificates, achievements)
- Form validation
- Auto-save functionality
- Success/error notifications

**Form Fields**:
```javascript
{
  // Personal
  name, email, mobile,
  
  // Links
  portfolio, linkedin, github,
  
  // Academic
  department, year, semester, rollNo, section,
  
  // Professional
  jobDetails: [{ company, role, description }],
  
  // Skills
  techStacks: [],
  softSkills: [],
  
  // Coding
  codingProfiles: { leetcode, codechef, codeforces },
  
  // Achievements
  certificates: [{ name, link, description }],
  achievements: [{ description }],
  volunteerWorks: [{ organization, role, description }]
}
```

---

#### 7. Chatbot Component
**File**: `src/Components/Chatbot/utils/Chatbot.jsx`

**Purpose**: AI-powered assistant

**Features**:
- Google Generative AI integration
- Context-aware responses
- Help with assignments
- Career guidance
- LeetCode problem suggestions

**Integration**:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

---

## Firebase Integration

### Configuration

**File**: `src/firebase.js`

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

### Authentication Methods

**Register**:
```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";

const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth, 
    email, 
    password
  );
  return userCredential.user;
};
```

**Login**:
```javascript
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth, 
    email, 
    password
  );
  return userCredential.user;
};
```

**Logout**:
```javascript
import { signOut } from "firebase/auth";

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};
```

### Firestore Operations

**Store User Data**:
```javascript
import { doc, setDoc } from "firebase/firestore";

await setDoc(doc(db, "users", user.uid), {
  name,
  email,
  role
});
```

**Fetch User Data**:
```javascript
import { doc, getDoc } from "firebase/firestore";

const userDoc = await getDoc(doc(db, "users", uid));
const userData = userDoc.data();
```

---

## API Integration

### Axios Configuration

**Base Setup**:
```javascript
import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const leetcodeAPI = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### API Call Examples

**Fetch User Profile**:
```javascript
const fetchProfile = async (uid) => {
  try {
    const response = await backendAPI.get(`/profile/${uid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
```

**Update Profile**:
```javascript
const updateProfile = async (uid, data) => {
  try {
    const response = await backendAPI.put(`/profile/${uid}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
```

**Fetch LeetCode Stats**:
```javascript
const fetchLeetCodeStats = async (username) => {
  try {
    const response = await leetcodeAPI.get(`/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw error;
  }
};
```

**Fetch Assignments**:
```javascript
const fetchAssignments = async () => {
  try {
    const response = await backendAPI.get('/assignments');
    return response.data;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};
```

**Create Assignment**:
```javascript
const createAssignment = async (assignmentData) => {
  try {
    const response = await backendAPI.post('/assignments', assignmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
};
```

---

## Styling Guide

### Tailwind CSS Configuration

**File**: `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Common Utility Classes

**Layout**:
```jsx
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

**Cards**:
```jsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

**Buttons**:
```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
  Click Me
</button>
```

**Forms**:
```jsx
<input 
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter text"
/>
```

### Responsive Design

**Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Example**:
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## Animations

### Framer Motion Integration

**Installation**:
```bash
npm install framer-motion
```

**Usage Example**:
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

**Page Transitions**:
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  <YourPage />
</motion.div>
```

---

## Notifications

### React Toastify

**Setup** (in App.jsx):
```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer autoClose={3000} />
```

**Usage**:
```jsx
import { toast } from 'react-toastify';

// Success
toast.success('Profile updated successfully!');

// Error
toast.error('Failed to update profile');

// Info
toast.info('Loading data...');

// Warning
toast.warning('Please fill all required fields');
```

---

## Build and Deployment

### Development

```bash
cd frontend
npm install
npm run dev
```

**Development Server**: `http://localhost:5173`

### Production Build

```bash
npm run build
```

**Output**: `dist/` directory

### Preview Production Build

```bash
npm run preview
```

### Environment Variables

Create `.env` file:
```env
VITE_BACKEND_API_URL=http://localhost:5000/api
VITE_LEETCODE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_AI_API_KEY=your_google_ai_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**Access in Code**:
```javascript
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
```

---

## Performance Optimization

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const StudentDashboard = lazy(() => import('./Pages/StudentDashboard/StudentDashboard'));

<Suspense fallback={<div>Loading...</div>}>
  <StudentDashboard />
</Suspense>
```

### Image Optimization

```jsx
<img 
  src={imageUrl} 
  alt="Description"
  loading="lazy"
  className="w-full h-auto"
/>
```

### Memoization

```jsx
import { useMemo, useCallback } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

---

## Testing

### Recommended Testing Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Example Test**:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Landing from './Landing';

describe('Landing Page', () => {
  it('renders hero section', () => {
    render(<Landing />);
    expect(screen.getByText(/Welcome to GradSphere/i)).toBeInTheDocument();
  });
});
```

---

## Accessibility

### Best Practices

**Semantic HTML**:
```jsx
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

**ARIA Labels**:
```jsx
<button aria-label="Close modal" onClick={handleClose}>
  <XIcon />
</button>
```

**Keyboard Navigation**:
```jsx
<div 
  role="button"
  tabIndex={0}
  onKeyPress={handleKeyPress}
  onClick={handleClick}
>
  Clickable div
</div>
```

---

## Common Issues and Solutions

### Issue: CORS Error
**Solution**: Ensure backend has CORS enabled and correct origin

### Issue: Firebase Auth Persistence
**Solution**: Use localStorage to persist user data

### Issue: Route Not Found on Refresh
**Solution**: Configure server to serve index.html for all routes

### Issue: Environment Variables Not Loading
**Solution**: Restart dev server after changing .env file

---

## Deployment Platforms

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

# Quick Reference Guide

## 🚀 Quick Commands

### Frontend
```bash
# Development
cd frontend
npm install
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Environment
cp .env.example .env     # Create environment file
```

### Backend
```bash
# Development
cd backend
npm install
node index.js            # Start server (http://localhost:5000)

# Production
NODE_ENV=production node index.js

# Environment
echo "MONGODB_URI=your_uri" > .env
echo "JWT_SECRET=your_secret" >> .env
```

### LeetCode API
```bash
# Development
cd leetcode_backend
npm install
npm run dev              # Start with nodemon (http://localhost:3000)
npm start                # Start production
npm test                 # Run tests
npm run build            # Build TypeScript

# Docker
docker-compose up -d     # Start with Docker
docker-compose down      # Stop Docker
docker-compose logs -f   # View logs
```

---

## 📡 API Endpoints Cheat Sheet

### Backend API (http://localhost:5000)

#### Authentication
```bash
# Register
POST /api/register
Body: { uid, email, name, role, password }

# Login
POST /api/login
Body: { email, password }
```

#### User Profile
```bash
# Get profile
GET /api/profile/:uid

# Get all users
GET /api/profile

# Update profile
PUT /api/profile/:uid
Body: { name, email, mobile, ... }
```

#### Assignments
```bash
# Get all assignments
GET /api/assignments

# Create assignment
POST /api/assignments
Body: { title, description, due_date, subject }
```

### LeetCode API (http://localhost:3000)

#### User Data
```bash
# User profile
GET /:username

# Badges
GET /:username/badges

# Solved problems
GET /:username/solved

# Contest details
GET /:username/contest

# Submissions
GET /:username/submission?limit=10

# Calendar
GET /:username/calendar
```

#### Problems
```bash
# Daily problem
GET /daily

# Selected problem
GET /select?titleSlug=two-sum

# Problem list
GET /problems?limit=20&tags=array+math&difficulty=EASY
```

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_BACKEND_API_URL=http://localhost:5000/api
VITE_LEETCODE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GOOGLE_AI_API_KEY=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gradsphere
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRATION=1h
```

### LeetCode API (.env)
```env
NODE_ENV=development
PORT=3000
LEETCODE_API_URL=https://leetcode.com/graphql
CACHE_DURATION=300
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=60
```

---

## 🗂️ Project Structure

```
gradsphere/
├── frontend/
│   ├── src/
│   │   ├── Components/      # React components
│   │   ├── Pages/           # Page components
│   │   ├── context/         # Context providers
│   │   ├── utils/           # Utility functions
│   │   ├── firebase.js      # Firebase config
│   │   ├── App.jsx          # Main app
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/
│   ├── assets/uploads/      # Uploaded files
│   ├── index.js             # Main server file
│   └── package.json
│
├── leetcode_backend/
│   ├── src/
│   │   ├── Controllers/     # Route controllers
│   │   ├── GQLQueries/      # GraphQL queries
│   │   ├── __tests__/       # Test files
│   │   ├── app.ts           # Express app
│   │   ├── index.ts         # Entry point
│   │   └── leetCode.ts      # LeetCode logic
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
│
└── documentation/           # This documentation
```

---

## 🔄 Common Workflows

### Student Registration
```
1. Navigate to /login
2. Click "Register"
3. Fill form (name, email, password, role: student)
4. Submit → Creates Firebase account
5. Backend stores user data
6. Redirect to /studentdashboard/:uid
```

### Profile Update
```
1. Navigate to /editprofile
2. Modify fields
3. Upload image (optional) → Cloudinary
4. Click "Save"
5. PUT /api/profile/:uid
6. Success message
7. Redirect to /profile
```

### View LeetCode Stats
```
1. Edit profile
2. Add LeetCode username
3. Save profile
4. Dashboard fetches: GET /:username
5. Display stats (solved, ranking, etc.)
```

### Create Assignment (Teacher)
```
1. Navigate to teacher dashboard
2. Click "Create Assignment"
3. Fill form (title, description, subject, due_date)
4. Submit → POST /api/assignments
5. Success message
6. Assignment appears in list
```

---

## 🐛 Quick Troubleshooting

### Frontend Issues
```bash
# App won't start
rm -rf node_modules package-lock.json
npm install
npm run dev

# CORS error
# Check backend CORS config
# Verify backend is running
# Check API URL

# Environment variables not loading
# Restart dev server
# Check variable names (VITE_ prefix)
```

### Backend Issues
```bash
# MongoDB connection failed
# Check connection string
# Verify network access in MongoDB Atlas
# Test: mongosh "connection-string"

# Port already in use
lsof -i :5000
kill -9 <PID>
# Or use different port: PORT=5001 node index.js

# JWT error
# Check JWT_SECRET is set
# Verify token format
```

### LeetCode API Issues
```bash
# Rate limit exceeded
# Wait 1 hour
# Implement client-side caching

# User not found
# Verify username spelling
# Check profile is public on LeetCode

# Cache not working
# Check cache middleware
# Clear cache: apicache.clear()
```

---

## 📊 Database Quick Reference

### MongoDB Queries

```javascript
// Find user by UID
User.findOne({ uid: "abc123" })

// Find all students
User.find({ role: "student" })

// Update profile
User.findOneAndUpdate(
  { uid: "abc123" },
  { $set: { name: "New Name" } },
  { new: true }
)

// Add to array
User.findOneAndUpdate(
  { uid: "abc123" },
  { $push: { techStacks: "React" } }
)

// Find upcoming assignments
Assignment.find({
  due_date: { $gte: new Date() }
}).sort({ due_date: 1 })
```

### Indexes
```javascript
// Create indexes
db.users.createIndex({ "uid": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.assignments.createIndex({ "due_date": 1 })
```

---

## 🔐 Authentication Quick Reference

### Firebase Auth
```javascript
// Register
import { createUserWithEmailAndPassword } from "firebase/auth";
await createUserWithEmailAndPassword(auth, email, password);

// Login
import { signInWithEmailAndPassword } from "firebase/auth";
await signInWithEmailAndPassword(auth, email, password);

// Logout
import { signOut } from "firebase/auth";
await signOut(auth);

// Get current user
const user = auth.currentUser;

// Refresh token
const token = await user.getIdToken(true);
```

### JWT
```javascript
// Generate token
const token = jwt.sign(
  { email, role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Verify token
jwt.verify(token, process.env.JWT_SECRET);

// Decode token
const decoded = jwt.decode(token);
```

---

## 🎨 Styling Quick Reference

### Tailwind CSS Common Classes

```jsx
// Layout
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="flex items-center justify-between">

// Cards
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">

// Buttons
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">

// Forms
<input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">

// Text
<h1 className="text-3xl font-bold text-gray-900">
<p className="text-gray-600 text-sm">

// Responsive
<div className="hidden md:block">
<div className="text-sm md:text-base lg:text-lg">
```

---

## 🚀 Deployment Quick Reference

### Vercel (Frontend)
```bash
npm install -g vercel
vercel login
cd frontend
vercel --prod
```

### Railway (Backend)
```
1. Connect GitHub repo
2. Select backend directory
3. Add environment variables
4. Deploy automatically
```

### Render (LeetCode API)
```
1. Connect GitHub repo
2. Select leetcode_backend directory
3. Build: npm install && npm run build
4. Start: npm start
5. Add environment variables
```

### MongoDB Atlas
```
1. Create cluster (M0 free tier)
2. Create database user
3. Add IP to whitelist (0.0.0.0/0 for cloud)
4. Get connection string
5. Add to backend .env
```

---

## 📦 Package Versions

### Frontend
```json
{
  "react": "^19.0.0",
  "vite": "^6.1.0",
  "react-router-dom": "^7.1.5",
  "tailwindcss": "^4.0.6",
  "firebase": "^11.3.1",
  "axios": "^1.7.9"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.10.1",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5"
}
```

### LeetCode API
```json
{
  "express": "^4.18.2",
  "axios": "^1.7.2",
  "apicache": "^1.6.3",
  "express-rate-limit": "^7.1.5"
}
```

---

## 🔗 Useful URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- LeetCode API: http://localhost:3000
- MongoDB Compass: mongodb://localhost:27017

### Production (Example)
- Frontend: https://gradsphere.com
- Backend: https://api.gradsphere.com
- LeetCode API: https://leetcode-api.gradsphere.com

### External Services
- MongoDB Atlas: https://cloud.mongodb.com
- Firebase Console: https://console.firebase.google.com
- Cloudinary: https://cloudinary.com/console
- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard

---

## 📝 Code Snippets

### Axios Instance
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Protected Route
```javascript
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
```

### Error Handling
```javascript
try {
  const response = await axios.get('/api/profile');
  return response.data;
} catch (error) {
  if (error.response) {
    toast.error(error.response.data.message);
  } else if (error.request) {
    toast.error('Network error');
  } else {
    toast.error('An error occurred');
  }
  throw error;
}
```

---

## 🎯 Performance Tips

### Frontend
- Use lazy loading for routes
- Implement code splitting
- Optimize images (WebP, lazy loading)
- Use React.memo for expensive components
- Implement virtual scrolling for long lists

### Backend
- Add database indexes
- Use lean queries
- Implement caching (Redis)
- Enable compression
- Use connection pooling

### LeetCode API
- Cache is already enabled (5 min)
- Rate limiting is configured
- Use batch requests when possible

---

## 📞 Quick Help

### Can't find something?
1. Check README.md for overview
2. Search in relevant documentation file
3. Check troubleshooting guide
4. Review code examples

### Still stuck?
1. Check error message in console
2. Review relevant documentation section
3. Test API endpoints with Postman
4. Check environment variables
5. Verify all services are running

---

**Last Updated**: December 10, 2024

# Troubleshooting Guide

## Overview
This guide helps you diagnose and resolve common issues in the GradSphere microservices architecture. It covers problems across frontend, backend, LeetCode API, database, and deployment.

---

## Table of Contents
1. [Frontend Issues](#frontend-issues)
2. [Backend Issues](#backend-issues)
3. [LeetCode API Issues](#leetcode-api-issues)
4. [Database Issues](#database-issues)
5. [Authentication Issues](#authentication-issues)
6. [Deployment Issues](#deployment-issues)
7. [Performance Issues](#performance-issues)
8. [Common Error Messages](#common-error-messages)

---

## Frontend Issues

### Issue 1: Application Won't Start

**Symptoms**:
```
Error: Cannot find module 'vite'
```

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### Issue 2: CORS Error

**Symptoms**:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/profile' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Causes**:
- Backend CORS not configured
- Backend not running
- Wrong API URL

**Solutions**:

**1. Check Backend CORS Configuration**:
```javascript
// backend/index.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**2. Verify Backend is Running**:
```bash
curl http://localhost:5000/api/profile
```

**3. Check API URL in Frontend**:
```javascript
// Should match backend port
const API_URL = 'http://localhost:5000/api';
```

---

### Issue 3: Firebase Configuration Error

**Symptoms**:
```
Firebase: Error (auth/invalid-api-key)
```

**Solution**:

**1. Verify Firebase Config**:
```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY", // Check this
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

**2. Check Environment Variables**:
```bash
# .env
VITE_FIREBASE_API_KEY=your_api_key
```

**3. Restart Dev Server**:
```bash
npm run dev
```

---

### Issue 4: Routes Not Working After Refresh

**Symptoms**:
- Page works when navigating from app
- 404 error when refreshing page
- Direct URL access fails

**Solution**:

**For Vite Dev Server**: Already handled

**For Production (Vercel/Netlify)**:

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Create `_redirects` (Netlify):
```
/*    /index.html   200
```

---

### Issue 5: Environment Variables Not Loading

**Symptoms**:
```
undefined is not a valid API URL
```

**Solution**:

**1. Check Variable Naming**:
```javascript
// Must start with VITE_
VITE_BACKEND_API_URL=http://localhost:5000
```

**2. Restart Dev Server**:
```bash
# Environment variables only load on startup
npm run dev
```

**3. Access Correctly**:
```javascript
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
// NOT process.env.VITE_BACKEND_API_URL
```

---

### Issue 6: Images Not Loading

**Symptoms**:
- Broken image icons
- 404 errors for images

**Solutions**:

**1. Check Image Path**:
```javascript
// Correct for public folder
<img src="/assets/logo.png" />

// Correct for src folder
import logo from './assets/logo.png';
<img src={logo} />
```

**2. Verify Cloudinary URL**:
```javascript
// Should be full HTTPS URL
profileImage: "https://res.cloudinary.com/..."
```

---

### Issue 7: React Context Not Updating

**Symptoms**:
- State changes but UI doesn't update
- Context values are stale

**Solution**:

**1. Check Context Provider Wrapping**:
```javascript
// App.jsx
<AuthProvider>
  <UserProvider>
    <Routes>
      {/* Your routes */}
    </Routes>
  </UserProvider>
</AuthProvider>
```

**2. Verify State Updates**:
```javascript
// Use functional updates
setUser(prevUser => ({ ...prevUser, name: newName }));
```

**3. Check Dependencies**:
```javascript
useEffect(() => {
  fetchData();
}, [dependency]); // Make sure dependencies are correct
```

---

## Backend Issues

### Issue 1: Server Won't Start

**Symptoms**:
```
Error: Cannot find module 'express'
```

**Solution**:
```bash
cd backend
npm install
node index.js
```

---

### Issue 2: MongoDB Connection Failed

**Symptoms**:
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Causes**:
- Wrong connection string
- Network access not configured
- MongoDB Atlas cluster paused

**Solutions**:

**1. Verify Connection String**:
```javascript
const uri = "mongodb+srv://username:password@cluster.mongodb.net/dbname";
// Check: username, password, cluster URL, database name
```

**2. Check MongoDB Atlas Network Access**:
- Go to MongoDB Atlas Dashboard
- Network Access > Add IP Address
- Add current IP or 0.0.0.0/0 (allow all)

**3. Verify Cluster is Running**:
- Check MongoDB Atlas dashboard
- Ensure cluster is not paused

**4. Test Connection**:
```bash
# Using MongoDB Compass or mongosh
mongosh "mongodb+srv://username:password@cluster.mongodb.net/dbname"
```

---

### Issue 3: JWT Token Error

**Symptoms**:
```
JsonWebTokenError: invalid signature
```

**Solution**:

**1. Check JWT Secret**:
```javascript
// Must be same for signing and verifying
const token = jwt.sign(payload, "secretkey");
jwt.verify(token, "secretkey"); // Same secret
```

**2. Verify Token Format**:
```javascript
// Should be: Bearer <token>
const token = authHeader.split(' ')[1];
```

---

### Issue 4: Password Hashing Error

**Symptoms**:
```
Error: data and hash arguments required
```

**Solution**:

**1. Verify Password Exists**:
```javascript
if (!password || typeof password !== "string") {
  return res.status(400).json({ 
    message: "Password is required and must be a string" 
  });
}
```

**2. Check bcrypt Usage**:
```javascript
// Hash
const hashedPassword = await bcrypt.hash(password, 10);

// Compare
const isMatch = await bcrypt.compare(password, user.password);
```

---

### Issue 5: Duplicate Key Error

**Symptoms**:
```
MongoServerError: E11000 duplicate key error collection
```

**Solution**:

**1. Check for Existing User**:
```javascript
const existingUser = await User.findOne({ 
  $or: [{ email }, { uid }] 
});

if (existingUser) {
  return res.status(400).json({ 
    message: "User already exists" 
  });
}
```

**2. Drop Duplicate Indexes** (if needed):
```javascript
// In MongoDB shell
db.users.dropIndex("email_1");
db.users.createIndex({ "email": 1 }, { unique: true });
```

---

### Issue 6: Request Body Empty

**Symptoms**:
```
req.body is undefined or {}
```

**Solution**:

**1. Add Body Parser Middleware**:
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

**2. Check Content-Type Header**:
```javascript
// Frontend
axios.post('/api/register', data, {
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

### Issue 7: Port Already in Use

**Symptoms**:
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:

**1. Find and Kill Process**:
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 node index.js
```

**2. Change Port**:
```javascript
const PORT = process.env.PORT || 5001;
```

---

## LeetCode API Issues

### Issue 1: Rate Limit Exceeded

**Symptoms**:
```
{
  "message": "Too many request from this IP, try again in 1 hour"
}
```

**Solution**:

**1. Wait for Rate Limit Reset**:
- Current limit: 60 requests/hour
- Wait 1 hour or until reset

**2. Implement Client-Side Caching**:
```javascript
// Cache responses for 5 minutes
const cachedData = localStorage.getItem('leetcode-stats');
const cacheTime = localStorage.getItem('leetcode-stats-time');

if (cachedData && Date.now() - cacheTime < 5 * 60 * 1000) {
  return JSON.parse(cachedData);
}
```

**3. Increase Rate Limit** (for production):
```javascript
// src/app.ts
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100, // Increase limit
});
```

---

### Issue 2: User Not Found

**Symptoms**:
```
{
  "error": "User not found or profile is private"
}
```

**Solutions**:

**1. Verify Username**:
- Check spelling
- Ensure profile is public on LeetCode
- Test on LeetCode website first

**2. Test API Directly**:
```bash
curl http://localhost:3000/testusername
```

---

### Issue 3: Cache Not Working

**Symptoms**:
- Every request takes long time
- X-Cache-Status always shows MISS

**Solution**:

**1. Verify Cache Middleware**:
```javascript
// src/app.ts
let cache = apicache.middleware;
app.use(cache('5 minutes'));
```

**2. Check Cache Headers**:
```bash
curl -I http://localhost:3000/username
# Look for X-Cache-Status header
```

**3. Clear Cache**:
```javascript
apicache.clear();
```

---

### Issue 4: TypeScript Compilation Error

**Symptoms**:
```
error TS2304: Cannot find name 'Request'
```

**Solution**:

**1. Install Type Definitions**:
```bash
npm install --save-dev @types/express @types/node
```

**2. Check tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

### Issue 5: Docker Container Won't Start

**Symptoms**:
```
Error: Cannot find module 'express'
```

**Solution**:

**1. Rebuild Image**:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

**2. Check Dockerfile**:
```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Database Issues

### Issue 1: Connection Timeout

**Symptoms**:
```
MongooseServerSelectionError: connection timed out
```

**Solutions**:

**1. Check Network Access**:
- MongoDB Atlas > Network Access
- Add your IP address

**2. Check Firewall**:
```bash
# Test connection
telnet cluster.mongodb.net 27017
```

**3. Use VPN** (if corporate network blocks MongoDB):

---

### Issue 2: Slow Queries

**Symptoms**:
- API responses take > 1 second
- Database queries timeout

**Solutions**:

**1. Add Indexes**:
```javascript
// Check query performance
db.users.find({ email: "test@example.com" }).explain("executionStats");

// Add index
db.users.createIndex({ "email": 1 });
```

**2. Use Lean Queries**:
```javascript
// Faster, returns plain objects
const users = await User.find().lean();
```

**3. Select Only Required Fields**:
```javascript
const users = await User.find().select('name email');
```

---

### Issue 3: Data Not Persisting

**Symptoms**:
- Data saves successfully
- Data missing on next query

**Solutions**:

**1. Check Write Concern**:
```javascript
mongoose.connect(uri, {
  w: 'majority',
  retryWrites: true
});
```

**2. Verify Save Operation**:
```javascript
const user = new User(data);
await user.save(); // Wait for save to complete
```

**3. Check for Errors**:
```javascript
try {
  await user.save();
} catch (error) {
  console.error('Save error:', error);
}
```

---

### Issue 4: Schema Validation Error

**Symptoms**:
```
ValidationError: User validation failed: email: Path `email` is required
```

**Solution**:

**1. Check Required Fields**:
```javascript
const user = new User({
  uid: "abc123",
  email: "test@example.com", // Required
  password: "hashed_password", // Required
  role: "student" // Required
});
```

**2. Update Schema** (if needed):
```javascript
const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: false // Make optional
  }
});
```

---

## Authentication Issues

### Issue 1: Firebase Auth Error

**Symptoms**:
```
Firebase: Error (auth/email-already-in-use)
```

**Solutions**:

**1. Check for Existing User**:
```javascript
try {
  await createUserWithEmailAndPassword(auth, email, password);
} catch (error) {
  if (error.code === 'auth/email-already-in-use') {
    toast.error('Email already registered. Please login.');
  }
}
```

**2. Use Sign In Instead**:
```javascript
// Try login if registration fails
await signInWithEmailAndPassword(auth, email, password);
```

---

### Issue 2: Token Expired

**Symptoms**:
```
Firebase: Error (auth/id-token-expired)
```

**Solution**:

**1. Refresh Token**:
```javascript
const user = auth.currentUser;
if (user) {
  const token = await user.getIdToken(true); // Force refresh
}
```

**2. Implement Auto-Refresh**:
```javascript
useEffect(() => {
  const interval = setInterval(async () => {
    const user = auth.currentUser;
    if (user) {
      await user.getIdToken(true);
    }
  }, 50 * 60 * 1000); // Every 50 minutes
  
  return () => clearInterval(interval);
}, []);
```

---

### Issue 3: User Not Logged In

**Symptoms**:
- User data in localStorage
- isLogin is false
- Can't access protected routes

**Solution**:

**1. Check Context Initialization**:
```javascript
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
    setIsLogin(true);
  }
}, []);
```

**2. Verify localStorage**:
```javascript
// In browser console
localStorage.getItem("user");
```

**3. Clear and Re-login**:
```javascript
localStorage.clear();
// Login again
```

---

### Issue 4: Wrong Password Error

**Symptoms**:
```
Error: Invalid credentials
```

**Solutions**:

**1. Verify Password**:
- Check for typos
- Check caps lock
- Ensure correct email

**2. Reset Password** (implement this feature):
```javascript
import { sendPasswordResetEmail } from "firebase/auth";

await sendPasswordResetEmail(auth, email);
```

---

## Deployment Issues

### Issue 1: Build Fails

**Symptoms**:
```
Error: Build failed with exit code 1
```

**Solutions**:

**1. Check Build Locally**:
```bash
npm run build
```

**2. Fix TypeScript Errors**:
```bash
npm run build
# Fix all errors shown
```

**3. Check Environment Variables**:
- Ensure all required variables are set
- Check variable names (VITE_ prefix for frontend)

---

### Issue 2: Environment Variables Not Working in Production

**Symptoms**:
- App works locally
- Fails in production with undefined errors

**Solutions**:

**1. Set Variables in Platform**:
- Vercel: Settings > Environment Variables
- Netlify: Site Settings > Build & Deploy > Environment
- Railway: Variables tab

**2. Rebuild Application**:
- Environment variables only apply after rebuild

**3. Check Variable Access**:
```javascript
// Frontend (Vite)
import.meta.env.VITE_API_URL

// Backend (Node)
process.env.API_URL
```

---

### Issue 3: API Calls Fail in Production

**Symptoms**:
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solutions**:

**1. Update API URLs**:
```javascript
// Use production URLs
const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://api.gradsphere.com';
```

**2. Check CORS**:
```javascript
// Backend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://gradsphere.com',
    'https://www.gradsphere.com'
  ]
}));
```

**3. Verify Backend is Running**:
```bash
curl https://api.gradsphere.com/health
```

---

### Issue 4: Database Connection Fails in Production

**Symptoms**:
```
MongooseServerSelectionError in production
```

**Solutions**:

**1. Whitelist Production IPs**:
- MongoDB Atlas > Network Access
- Add production server IPs
- Or use 0.0.0.0/0 (allow all)

**2. Check Connection String**:
```javascript
// Use environment variable
const uri = process.env.MONGODB_URI;
```

**3. Test Connection**:
```bash
# SSH into production server
mongosh "your-connection-string"
```

---

## Performance Issues

### Issue 1: Slow Page Load

**Symptoms**:
- Pages take > 3 seconds to load
- Poor Lighthouse scores

**Solutions**:

**1. Implement Code Splitting**:
```javascript
const StudentDashboard = lazy(() => import('./Pages/StudentDashboard'));
```

**2. Optimize Images**:
```javascript
// Use WebP format
// Compress images
// Use lazy loading
<img loading="lazy" src={imageUrl} />
```

**3. Enable Caching**:
```javascript
// Service Worker
// Cache API responses
```

---

### Issue 2: High API Response Time

**Symptoms**:
- API calls take > 1 second
- Timeout errors

**Solutions**:

**1. Add Database Indexes**:
```javascript
db.users.createIndex({ "uid": 1 });
db.users.createIndex({ "email": 1 });
```

**2. Use Caching**:
```javascript
// Redis or in-memory cache
const cachedData = await cache.get(key);
if (cachedData) return cachedData;
```

**3. Optimize Queries**:
```javascript
// Select only needed fields
User.find().select('name email');

// Use lean queries
User.find().lean();
```

---

### Issue 3: Memory Leaks

**Symptoms**:
- Application slows down over time
- High memory usage

**Solutions**:

**1. Clean Up useEffect**:
```javascript
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  
  return () => clearInterval(interval); // Cleanup
}, []);
```

**2. Remove Event Listeners**:
```javascript
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  
  return () => window.removeEventListener('resize', handler);
}, []);
```

---

## Common Error Messages

### Error: "Cannot read property 'map' of undefined"

**Cause**: Trying to map over undefined array

**Solution**:
```javascript
// Add default value
const items = data?.items || [];
items.map(item => ...)

// Or check before mapping
{items && items.map(item => ...)}
```

---

### Error: "Maximum update depth exceeded"

**Cause**: Infinite re-render loop

**Solution**:
```javascript
// Wrong
useEffect(() => {
  setState(newValue);
}); // Missing dependency array

// Correct
useEffect(() => {
  setState(newValue);
}, [dependency]);
```

---

### Error: "Failed to fetch"

**Cause**: Network error or CORS issue

**Solution**:
1. Check backend is running
2. Verify API URL
3. Check CORS configuration
4. Check network connection

---

### Error: "Unexpected token < in JSON"

**Cause**: Receiving HTML instead of JSON (usually 404 page)

**Solution**:
1. Verify API endpoint exists
2. Check API URL spelling
3. Ensure backend route is defined

---

## Debugging Tips

### 1. Enable Detailed Logging

**Frontend**:
```javascript
console.log('API Response:', response);
console.log('User Data:', user);
```

**Backend**:
```javascript
console.log('Request Body:', req.body);
console.log('Database Query:', query);
```

### 2. Use Browser DevTools

- Network tab: Check API calls
- Console tab: Check errors
- Application tab: Check localStorage
- React DevTools: Check component state

### 3. Use Postman/Thunder Client

Test API endpoints independently:
```
GET http://localhost:5000/api/profile/abc123
POST http://localhost:5000/api/login
Body: { "email": "test@example.com", "password": "password123" }
```

### 4. Check Logs

**Backend**:
```bash
# PM2 logs
pm2 logs gradsphere-backend

# Docker logs
docker logs container-name

# Railway/Render
Check platform dashboard logs
```

---

## Getting Help

### 1. Check Documentation
- Read relevant documentation section
- Check API documentation
- Review code examples

### 2. Search for Similar Issues
- GitHub Issues
- Stack Overflow
- Platform-specific forums

### 3. Create Detailed Bug Report

Include:
- Error message (full stack trace)
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, browser)
- Relevant code snippets
- Screenshots

### 4. Contact Support

- Platform support (Vercel, Railway, etc.)
- Firebase support
- MongoDB Atlas support
- Community forums

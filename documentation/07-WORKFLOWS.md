# Common Workflows and Use Cases

## Overview
This document provides detailed workflows for common user scenarios in the GradSphere platform, including step-by-step processes, API calls, and data flow diagrams.

---

## Table of Contents
1. [Student Workflows](#student-workflows)
2. [Teacher Workflows](#teacher-workflows)
3. [System Workflows](#system-workflows)
4. [Integration Workflows](#integration-workflows)
5. [Data Flow Diagrams](#data-flow-diagrams)

---

## Student Workflows

### 1. Student Registration and Onboarding

#### Step-by-Step Process

**Step 1: Access Registration Page**
- User navigates to `/login`
- Clicks "Register" tab

**Step 2: Fill Registration Form**
```
Required Fields:
- Full Name
- Email Address
- Password
- Role: Student
```

**Step 3: Submit Registration**

**Frontend Actions**:
```javascript
// 1. Create Firebase account
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const firebaseUser = userCredential.user;

// 2. Store in Firestore
await setDoc(doc(db, "users", firebaseUser.uid), {
  name,
  email,
  role: "student"
});

// 3. Register in backend
await axios.post('http://localhost:5000/api/register', {
  uid: firebaseUser.uid,
  email,
  name,
  role: "student",
  password
});

// 4. Store in localStorage
localStorage.setItem("user", JSON.stringify({
  uid: firebaseUser.uid,
  email,
  name,
  role: "student"
}));

// 5. Navigate to dashboard
navigate(`/studentdashboard/${firebaseUser.uid}`);
```

**Backend Actions**:
```javascript
// 1. Validate input
// 2. Check for existing user
// 3. Hash password with bcrypt
// 4. Create user document in MongoDB
// 5. Return success response
```

**Step 4: Complete Profile**
- Navigate to Edit Profile
- Fill in additional information:
  - Academic details (department, year, semester, roll number)
  - Contact information (mobile, portfolio, LinkedIn, GitHub)
  - Technical skills
  - Coding profiles (LeetCode, CodeChef, Codeforces)

---

### 2. Viewing and Managing Profile

#### View Profile Workflow

**Step 1: Navigate to Profile**
- Click "Profile" in navigation menu
- System loads `/profile` route

**Step 2: Fetch Profile Data**

**API Call**:
```javascript
const response = await axios.get(`http://localhost:5000/api/profile/${uid}`);
const profileData = response.data;
```

**Step 3: Display Profile Sections**
```
Profile Sections:
- Personal Information
- Academic Details
- Contact Information
- Technical Skills
- Soft Skills
- Work Experience
- Coding Profiles
- Certificates
- Achievements
- Volunteer Work
```

#### Edit Profile Workflow

**Step 1: Navigate to Edit Profile**
- Click "Edit Profile" button
- System loads `/editprofile` route

**Step 2: Load Current Data**
```javascript
const response = await axios.get(`http://localhost:5000/api/profile/${uid}`);
setFormData(response.data);
```

**Step 3: Modify Fields**
- User updates any field
- Form validates input in real-time

**Step 4: Upload Profile Image (Optional)**
```javascript
// Upload to Cloudinary
const formData = new FormData();
formData.append('file', imageFile);
formData.append('upload_preset', 'your_preset');

const response = await axios.post(
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  formData
);

const imageUrl = response.data.secure_url;
```

**Step 5: Save Changes**

**API Call**:
```javascript
await axios.put(`http://localhost:5000/api/profile/${uid}`, {
  name,
  email,
  mobile,
  portfolio,
  linkedin,
  github,
  department,
  year,
  semester,
  rollNo,
  section,
  techStacks,
  softSkills,
  jobDetails,
  codingProfiles,
  certificates,
  achievements,
  volunteerWorks,
  profileImage
});
```

**Step 6: Show Success Message**
```javascript
toast.success('Profile updated successfully!');
navigate('/profile');
```

---

### 3. Viewing Assignments

#### Workflow

**Step 1: Access Dashboard**
- Navigate to `/studentdashboard/${uid}`

**Step 2: Fetch Assignments**

**API Call**:
```javascript
const response = await axios.get('http://localhost:5000/api/assignments');
const assignments = response.data;
```

**Step 3: Display Assignments**
```javascript
assignments.map(assignment => ({
  title: assignment.title,
  description: assignment.description,
  subject: assignment.subject,
  dueDate: new Date(assignment.due_date),
  status: new Date(assignment.due_date) > new Date() ? 'Pending' : 'Overdue'
}));
```

**Step 4: Filter and Sort**
```javascript
// Filter by subject
const filteredAssignments = assignments.filter(a => a.subject === selectedSubject);

// Sort by due date
const sortedAssignments = assignments.sort((a, b) => 
  new Date(a.due_date) - new Date(b.due_date)
);

// Show only upcoming
const upcomingAssignments = assignments.filter(a => 
  new Date(a.due_date) > new Date()
);
```

---

### 4. Viewing LeetCode Statistics

#### Workflow

**Step 1: Configure LeetCode Username**
- Edit profile
- Add LeetCode username in coding profiles section
- Save profile

**Step 2: Dashboard Fetches Stats**

**API Call**:
```javascript
const leetcodeUsername = user.codingProfiles.leetcode;

if (leetcodeUsername) {
  const response = await axios.get(
    `http://localhost:3000/${leetcodeUsername}`
  );
  const leetcodeStats = response.data;
}
```

**Step 3: Display Statistics**
```javascript
{
  totalSolved: stats.matchedUser.submitStats.acSubmissionNum[0].count,
  easySolved: stats.matchedUser.submitStats.acSubmissionNum[1].count,
  mediumSolved: stats.matchedUser.submitStats.acSubmissionNum[2].count,
  hardSolved: stats.matchedUser.submitStats.acSubmissionNum[3].count,
  ranking: stats.matchedUser.profile.ranking,
  acceptanceRate: (totalSolved / totalSubmissions * 100).toFixed(2)
}
```

**Step 4: Show Submission Calendar**
```javascript
const calendar = JSON.parse(stats.matchedUser.submissionCalendar);
// Display heatmap visualization
```

**Step 5: Show Recent Submissions**
```javascript
const recentSubmissions = await axios.get(
  `http://localhost:3000/${leetcodeUsername}/submission?limit=10`
);
// Display list of recent submissions
```

---

### 5. Using AI Chatbot

#### Workflow

**Step 1: Open Chatbot**
- Click chatbot icon in dashboard
- Chatbot modal opens

**Step 2: Ask Question**
```javascript
const userMessage = "How do I solve dynamic programming problems?";
```

**Step 3: Send to AI**

**API Call** (Google Generative AI):
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const prompt = `
Context: You are a helpful assistant for students on GradSphere platform.
User Question: ${userMessage}
Provide a helpful, concise answer.
`;

const result = await model.generateContent(prompt);
const response = result.response.text();
```

**Step 4: Display Response**
```javascript
setChatHistory([
  ...chatHistory,
  { role: 'user', message: userMessage },
  { role: 'assistant', message: response }
]);
```

---

## Teacher Workflows

### 1. Teacher Registration

#### Workflow

Same as student registration, but:
- Select "Teacher" role
- No academic details required
- Focus on teaching subjects and expertise

---

### 2. Creating Assignments

#### Step-by-Step Process

**Step 1: Access Assignment Creation**
- Navigate to teacher dashboard
- Click "Create Assignment" button

**Step 2: Fill Assignment Form**
```javascript
const assignmentData = {
  title: "Data Structures Assignment",
  description: "Implement a binary search tree with insert, delete, and search operations.",
  subject: "Data Structures and Algorithms",
  due_date: "2024-12-31T23:59:59.000Z"
};
```

**Step 3: Validate Input**
```javascript
if (!title || !description || !subject || !due_date) {
  toast.error('All fields are required');
  return;
}

if (new Date(due_date) < new Date()) {
  toast.error('Due date must be in the future');
  return;
}
```

**Step 4: Submit Assignment**

**API Call**:
```javascript
const response = await axios.post(
  'http://localhost:5000/api/assignments',
  assignmentData
);

if (response.status === 201) {
  toast.success('Assignment created successfully!');
  refreshAssignmentList();
}
```

**Step 5: Notify Students (Future Enhancement)**
```javascript
// Send email notifications to all students
// Push notifications
// In-app notifications
```

---

### 3. Viewing All Students

#### Workflow

**Step 1: Access Student List**
- Navigate to teacher dashboard
- Click "View Students" tab

**Step 2: Fetch All Students**

**API Call**:
```javascript
const response = await axios.get('http://localhost:5000/api/profile');
const allUsers = response.data;

// Filter only students
const students = allUsers.filter(user => user.role === 'student');
```

**Step 3: Display Student Information**
```javascript
students.map(student => ({
  name: student.name,
  email: student.email,
  department: student.department,
  year: student.year,
  rollNo: student.rollNo,
  leetcodeUsername: student.codingProfiles?.leetcode
}));
```

**Step 4: View Individual Student Profile**
```javascript
const handleViewProfile = (uid) => {
  navigate(`/profile/${uid}`);
};
```

**Step 5: View Student LeetCode Stats**
```javascript
const fetchStudentLeetCodeStats = async (leetcodeUsername) => {
  const response = await axios.get(
    `http://localhost:3000/${leetcodeUsername}`
  );
  return response.data;
};
```

---

### 4. Tracking Student Progress

#### Workflow

**Step 1: Select Student**
- Click on student from list

**Step 2: Fetch Comprehensive Data**

**Parallel API Calls**:
```javascript
const [profileData, leetcodeStats] = await Promise.all([
  axios.get(`http://localhost:5000/api/profile/${uid}`),
  axios.get(`http://localhost:3000/${leetcodeUsername}`)
]);
```

**Step 3: Display Progress Dashboard**
```javascript
{
  academicInfo: {
    department: profileData.department,
    year: profileData.year,
    semester: profileData.semester
  },
  skills: {
    technical: profileData.techStacks,
    soft: profileData.softSkills
  },
  codingProgress: {
    totalSolved: leetcodeStats.totalSolved,
    easySolved: leetcodeStats.easySolved,
    mediumSolved: leetcodeStats.mediumSolved,
    hardSolved: leetcodeStats.hardSolved,
    ranking: leetcodeStats.ranking
  },
  achievements: profileData.achievements,
  certificates: profileData.certificates
}
```

**Step 4: Generate Reports (Future Enhancement)**
```javascript
// Export to PDF
// Generate progress charts
// Compare with class average
```

---

## System Workflows

### 1. Daily LeetCode Problem Sync

#### Automated Workflow

**Step 1: Scheduled Task (Cron Job)**
```javascript
// Run daily at 00:00 UTC
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
  await fetchAndCacheDailyProblem();
});
```

**Step 2: Fetch Daily Problem**

**API Call**:
```javascript
const response = await axios.get('http://localhost:3000/daily');
const dailyProblem = response.data;
```

**Step 3: Cache Problem**
```javascript
// Store in Redis or database
await cache.set('daily-problem', JSON.stringify(dailyProblem), 'EX', 86400);
```

**Step 4: Notify Users (Future Enhancement)**
```javascript
// Send push notifications
// Email notifications
// In-app notifications
```

---

### 2. User Session Management

#### Workflow

**Step 1: User Logs In**
```javascript
// Firebase authentication
// JWT token generation
// Store in localStorage
```

**Step 2: Session Validation**
```javascript
// On app load
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    // Validate token (if using JWT)
    // Refresh if expired
    setUser(storedUser);
    setIsLogin(true);
  }
}, []);
```

**Step 3: Token Refresh (Recommended)**
```javascript
// Before token expires
const refreshToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    return token;
  }
};

// Set up refresh interval
setInterval(refreshToken, 50 * 60 * 1000); // 50 minutes
```

**Step 4: Session Expiration**
```javascript
// After 1 hour of inactivity
let inactivityTimer;

const resetTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    logout();
    toast.info('Session expired due to inactivity');
  }, 60 * 60 * 1000); // 1 hour
};

// Reset on user activity
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
```

---

### 3. Data Synchronization

#### Workflow

**Step 1: User Updates Profile**
```javascript
// Frontend updates
await axios.put(`/api/profile/${uid}`, updatedData);
```

**Step 2: Backend Updates MongoDB**
```javascript
await User.findOneAndUpdate(
  { uid },
  { $set: updatedData },
  { new: true }
);
```

**Step 3: Sync with Firebase (Optional)**
```javascript
await setDoc(doc(db, "users", uid), {
  name: updatedData.name,
  email: updatedData.email,
  role: updatedData.role
}, { merge: true });
```

**Step 4: Update Cache (If Using)**
```javascript
await cache.del(`user:${uid}`);
```

**Step 5: Notify Frontend**
```javascript
// WebSocket or polling
// Real-time updates
```

---

## Integration Workflows

### 1. LeetCode Profile Integration

#### Complete Workflow

**Step 1: User Adds LeetCode Username**
```javascript
// In edit profile
codingProfiles: {
  leetcode: "johndoe"
}
```

**Step 2: Validate Username**

**API Call**:
```javascript
const validateLeetCodeUsername = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/${username}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
```

**Step 3: Save to Database**
```javascript
await axios.put(`/api/profile/${uid}`, {
  codingProfiles: {
    leetcode: username
  }
});
```

**Step 4: Fetch and Display Stats**
```javascript
// On dashboard load
const stats = await axios.get(`http://localhost:3000/${username}`);
displayLeetCodeStats(stats.data);
```

**Step 5: Auto-Refresh Stats**
```javascript
// Refresh every 5 minutes
useEffect(() => {
  const interval = setInterval(() => {
    fetchLeetCodeStats();
  }, 5 * 60 * 1000);
  
  return () => clearInterval(interval);
}, []);
```

---

### 2. Cloudinary Image Upload

#### Workflow

**Step 1: User Selects Image**
```javascript
<input 
  type="file" 
  accept="image/*"
  onChange={handleImageSelect}
/>
```

**Step 2: Validate Image**
```javascript
const handleImageSelect = (e) => {
  const file = e.target.files[0];
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    toast.error('Please select an image file');
    return;
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Image size must be less than 5MB');
    return;
  }
  
  uploadImage(file);
};
```

**Step 3: Upload to Cloudinary**
```javascript
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_preset');
  
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    
    const imageUrl = response.data.secure_url;
    setProfileImage(imageUrl);
    toast.success('Image uploaded successfully!');
  } catch (error) {
    toast.error('Image upload failed');
  }
};
```

**Step 4: Save Image URL**
```javascript
await axios.put(`/api/profile/${uid}`, {
  profileImage: imageUrl
});
```

---

## Data Flow Diagrams

### 1. User Registration Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Submit registration form
     ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 2. Create Firebase account
      ▼
┌──────────────┐
│   Firebase   │
└──────┬───────┘
       │
       │ 3. Return UID
       ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 4. Register in backend
      ▼
┌─────────────┐
│   Backend   │
└─────┬───────┘
      │
      │ 5. Hash password
      │ 6. Save to MongoDB
      ▼
┌─────────────┐
│   MongoDB   │
└─────┬───────┘
      │
      │ 7. Success response
      ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 8. Store in localStorage
      │ 9. Navigate to dashboard
      ▼
┌─────────┐
│  User   │
└─────────┘
```

### 2. Profile Update Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Edit profile
     ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 2. Upload image (if changed)
      ▼
┌──────────────┐
│  Cloudinary  │
└──────┬───────┘
       │
       │ 3. Return image URL
       ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 4. PUT /api/profile/:uid
      ▼
┌─────────────┐
│   Backend   │
└─────┬───────┘
      │
      │ 5. Update MongoDB
      ▼
┌─────────────┐
│   MongoDB   │
└─────┬───────┘
      │
      │ 6. Return updated profile
      ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 7. Update UI
      │ 8. Show success message
      ▼
┌─────────┐
│  User   │
└─────────┘
```

### 3. LeetCode Stats Display Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Open dashboard
     ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 2. GET /api/profile/:uid
      ▼
┌─────────────┐
│   Backend   │
└─────┬───────┘
      │
      │ 3. Fetch from MongoDB
      ▼
┌─────────────┐
│   MongoDB   │
└─────┬───────┘
      │
      │ 4. Return profile (with LeetCode username)
      ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 5. GET /:username (LeetCode API)
      ▼
┌──────────────────┐
│  LeetCode API    │
└─────┬────────────┘
      │
      │ 6. Check cache (5 min)
      │
      ├─ Cache HIT ──> Return cached data
      │
      └─ Cache MISS ─┐
                     │
                     │ 7. Query LeetCode GraphQL
                     ▼
              ┌──────────────┐
              │   LeetCode   │
              └──────┬───────┘
                     │
                     │ 8. Return stats
                     ▼
              ┌──────────────────┐
              │  LeetCode API    │
              └──────┬───────────┘
                     │
                     │ 9. Cache response
                     │ 10. Return to frontend
                     ▼
              ┌─────────────┐
              │  Frontend   │
              └─────┬───────┘
                    │
                    │ 11. Display stats
                    ▼
              ┌─────────┐
              │  User   │
              └─────────┘
```

### 4. Assignment Creation Flow

```
┌──────────┐
│ Teacher  │
└────┬─────┘
     │
     │ 1. Create assignment
     ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 2. POST /api/assignments
      ▼
┌─────────────┐
│   Backend   │
└─────┬───────┘
      │
      │ 3. Validate data
      │ 4. Save to MongoDB
      ▼
┌─────────────┐
│   MongoDB   │
└─────┬───────┘
      │
      │ 5. Return created assignment
      ▼
┌─────────────┐
│  Frontend   │
└─────┬───────┘
      │
      │ 6. Show success message
      │ 7. Refresh assignment list
      ▼
┌──────────┐
│ Teacher  │
└──────────┘
      │
      │ (Future: Send notifications)
      ▼
┌──────────┐
│ Students │
└──────────┘
```

---

## Performance Considerations

### 1. Caching Strategy

**LeetCode API**:
- Cache duration: 5 minutes
- Reduces API calls to LeetCode
- Improves response time

**Frontend**:
- Cache user profile in context
- Avoid redundant API calls
- Use React Query or SWR for data fetching

### 2. Lazy Loading

**Images**:
```javascript
<img loading="lazy" src={imageUrl} alt="Profile" />
```

**Components**:
```javascript
const StudentDashboard = lazy(() => import('./Pages/StudentDashboard'));
```

### 3. Pagination

**Assignments List**:
```javascript
const [page, setPage] = useState(1);
const itemsPerPage = 10;

const paginatedAssignments = assignments.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
```

---

## Error Handling

### 1. Network Errors

```javascript
try {
  const response = await axios.get('/api/profile');
} catch (error) {
  if (error.response) {
    // Server responded with error
    toast.error(error.response.data.message);
  } else if (error.request) {
    // No response received
    toast.error('Network error. Please check your connection.');
  } else {
    // Other errors
    toast.error('An unexpected error occurred.');
  }
}
```

### 2. Validation Errors

```javascript
if (!email || !password) {
  toast.error('All fields are required');
  return;
}

if (!/\S+@\S+\.\S+/.test(email)) {
  toast.error('Invalid email format');
  return;
}
```

### 3. Authentication Errors

```javascript
try {
  await loginWithFirebase(email, password);
} catch (error) {
  if (error.code === 'auth/user-not-found') {
    toast.error('User not found');
  } else if (error.code === 'auth/wrong-password') {
    toast.error('Invalid password');
  } else {
    toast.error('Login failed');
  }
}
```

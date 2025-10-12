# Backend Service API Documentation

## Overview
The Backend Service is the core API that handles user management, authentication, profile management, and assignment tracking. Built with Express.js and MongoDB.

**Base URL**: `http://localhost:5000`

**Technology Stack**:
- Express.js 4.18.2
- MongoDB with Mongoose 8.10.1
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads

---

## Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [User Profile Endpoints](#user-profile-endpoints)
3. [Assignment Endpoints](#assignment-endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)

---

## Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /api/register`

**Description**: Creates a new user account with hashed password

**Request Body**:
```json
{
  "uid": "firebase_user_id",
  "email": "student@example.com",
  "name": "John Doe",
  "role": "student",
  "password": "securePassword123"
}
```

**Required Fields**:
- `uid` (String): Unique Firebase user ID
- `email` (String): Valid email address
- `name` (String): User's full name
- `role` (String): Either "student" or "teacher"
- `password` (String): Plain text password (will be hashed)

**Response Success (201)**:
```json
{
  "message": "User registered successfully"
}
```

**Response Error (400)**:
```json
{
  "message": "User already exists"
}
```

**Response Error (400)**:
```json
{
  "message": "Password is required and must be a string"
}
```

**Response Error (500)**:
```json
{
  "error": "Error message details"
}
```

**Security**:
- Password is hashed using bcrypt with 10 salt rounds
- Duplicate email/uid checks before registration

---

### 2. Login User
**Endpoint**: `POST /api/login`

**Description**: Authenticates user and returns JWT token

**Request Body**:
```json
{
  "email": "student@example.com",
  "password": "securePassword123"
}
```

**Response Success (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "student",
  "email": "student@example.com"
}
```

**Response Error (404)**:
```json
{
  "message": "User not found"
}
```

**Response Error (401)**:
```json
{
  "message": "Invalid credentials"
}
```

**Token Details**:
- Algorithm: HS256
- Expiration: 1 hour
- Secret: "secretkey" (⚠️ should be in environment variable)
- Payload: `{ email, role }`

---

## User Profile Endpoints

### 3. Get User Profile by UID
**Endpoint**: `GET /api/profile/:uid`

**Description**: Retrieves complete user profile information

**URL Parameters**:
- `uid` (String): Firebase user ID

**Example Request**:
```
GET /api/profile/abc123xyz
```

**Response Success (200)**:
```json
{
  "_id": "mongodb_object_id",
  "uid": "abc123xyz",
  "email": "student@example.com",
  "name": "John Doe",
  "role": "student",
  "mobile": "+1234567890",
  "portfolio": "https://johndoe.dev",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "profileImage": "https://cloudinary.com/image.jpg",
  "techStacks": ["React", "Node.js", "MongoDB"],
  "jobDetails": [
    {
      "company": "Tech Corp",
      "role": "Software Engineer Intern",
      "description": "Worked on backend APIs"
    }
  ],
  "codingProfiles": {
    "leetcode": "johndoe",
    "codechef": "johndoe",
    "codeforces": "johndoe"
  },
  "department": "Computer Science",
  "year": 3,
  "semester": 6,
  "rollNo": "CS2021001",
  "section": "A",
  "certificates": [
    {
      "name": "AWS Certified Developer",
      "link": "https://aws.amazon.com/cert/123",
      "description": "Cloud computing certification"
    }
  ],
  "achievements": [
    {
      "description": "Won hackathon 2024"
    }
  ],
  "softSkills": ["Leadership", "Communication", "Problem Solving"],
  "volunteerWorks": [
    {
      "organization": "Code for Good",
      "role": "Volunteer Developer",
      "description": "Built apps for NGOs"
    }
  ]
}
```

**Response Error (404)**:
```json
{
  "message": "User not found"
}
```

---

### 4. Get All Users
**Endpoint**: `GET /api/profile`

**Description**: Retrieves all user profiles (useful for teacher dashboard)

**Response Success (200)**:
```json
[
  {
    "uid": "user1",
    "email": "student1@example.com",
    "name": "Student One",
    "role": "student",
    ...
  },
  {
    "uid": "user2",
    "email": "teacher1@example.com",
    "name": "Teacher One",
    "role": "teacher",
    ...
  }
]
```

**Response Error (404)**:
```json
{
  "error": "Error message"
}
```

---

### 5. Update User Profile
**Endpoint**: `PUT /api/profile/:uid`

**Description**: Updates user profile information

**URL Parameters**:
- `uid` (String): Firebase user ID

**Request Body** (all fields optional except uid, name, email):
```json
{
  "name": "John Doe Updated",
  "email": "newemail@example.com",
  "mobile": "+1234567890",
  "portfolio": "https://johndoe.dev",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "profileImage": "https://cloudinary.com/newimage.jpg",
  "techStacks": ["React", "Node.js", "TypeScript"],
  "jobDetails": [
    {
      "company": "New Company",
      "role": "Senior Developer",
      "description": "Leading backend team"
    }
  ],
  "codingProfiles": {
    "leetcode": "johndoe_new",
    "codechef": "johndoe",
    "codeforces": "johndoe"
  },
  "department": "Computer Science",
  "year": 4,
  "semester": 7,
  "rollNo": "CS2021001",
  "section": "A",
  "certificates": [
    {
      "name": "New Certification",
      "link": "https://cert.com/123",
      "description": "Description"
    }
  ],
  "achievements": [
    {
      "description": "New achievement"
    }
  ],
  "softSkills": ["Leadership", "Teamwork"],
  "volunteerWorks": [
    {
      "organization": "NGO Name",
      "role": "Volunteer",
      "description": "Description"
    }
  ]
}
```

**Response Success (200)**:
```json
{
  "message": "Profile updated successfully",
  "user": {
    // Updated user object
  }
}
```

**Response Error (400)**:
```json
{
  "message": "UID, name, and email are required"
}
```

**Response Error (404)**:
```json
{
  "message": "User not found"
}
```

---

## Assignment Endpoints

### 6. Get All Assignments
**Endpoint**: `GET /api/assignments`

**Description**: Retrieves all assignments

**Response Success (200)**:
```json
[
  {
    "_id": "assignment_id_1",
    "title": "Data Structures Assignment",
    "description": "Implement binary search tree",
    "due_date": "2024-12-20T23:59:59.000Z",
    "subject": "Data Structures"
  },
  {
    "_id": "assignment_id_2",
    "title": "Web Development Project",
    "description": "Build a CRUD application",
    "due_date": "2024-12-25T23:59:59.000Z",
    "subject": "Web Technologies"
  }
]
```

**Response Error (500)**:
```json
{
  "message": "Failed to retrieve assignments"
}
```

---

### 7. Create Assignment
**Endpoint**: `POST /api/assignments`

**Description**: Creates a new assignment (typically used by teachers)

**Request Body**:
```json
{
  "title": "Algorithm Assignment",
  "description": "Solve dynamic programming problems",
  "due_date": "2024-12-30T23:59:59.000Z",
  "subject": "Algorithms"
}
```

**Required Fields**:
- `title` (String): Assignment title
- `description` (String): Detailed description
- `due_date` (Date): Deadline in ISO format
- `subject` (String): Subject/course name

**Response Success (201)**:
```json
{
  "_id": "new_assignment_id",
  "title": "Algorithm Assignment",
  "description": "Solve dynamic programming problems",
  "due_date": "2024-12-30T23:59:59.000Z",
  "subject": "Algorithms"
}
```

**Response Error (400)**:
```json
{
  "message": "All fields are required."
}
```

**Response Error (500)**:
```json
{
  "message": "Failed to create assignment"
}
```

---

## Data Models

### User Schema
```javascript
{
  uid: String (unique, required),
  email: String (unique, required),
  password: String (hashed),
  role: String (required) // 'student' or 'teacher'
  name: String,
  mobile: String,
  portfolio: String,
  linkedin: String,
  github: String,
  profileImage: String,
  techStacks: [String],
  jobDetails: [{
    company: String,
    role: String,
    description: String
  }],
  codingProfiles: {
    leetcode: String,
    codechef: String,
    codeforces: String
  },
  department: String,
  year: Number,
  semester: Number,
  rollNo: String,
  section: String,
  certificates: [{
    name: String,
    link: String,
    description: String
  }],
  achievements: [{
    description: String
  }],
  softSkills: [String],
  volunteerWorks: [{
    organization: String,
    role: String,
    description: String
  }]
}
```

### Assignment Schema
```javascript
{
  title: String (required),
  description: String (required),
  due_date: Date (required),
  subject: String (required)
}
```

---

## Error Handling

### Common HTTP Status Codes

| Status Code | Meaning | Usage |
|------------|---------|-------|
| 200 | OK | Successful GET/PUT request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Missing required fields or validation error |
| 401 | Unauthorized | Invalid credentials |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error |

### Error Response Format
```json
{
  "message": "Human-readable error message",
  "error": "Technical error details (optional)"
}
```

---

## Authentication Flow

1. **Registration**:
   - User submits registration form
   - Frontend creates Firebase account
   - Backend receives uid, email, name, role, password
   - Password is hashed with bcrypt
   - User document created in MongoDB

2. **Login**:
   - User submits credentials
   - Backend verifies password with bcrypt.compare()
   - JWT token generated with 1-hour expiration
   - Token returned to client
   - Client stores token in localStorage

3. **Protected Routes**:
   - Client includes JWT token in Authorization header
   - Backend verifies token before processing request
   - ⚠️ Note: Current implementation doesn't have middleware for token verification

---

## Security Best Practices

### Current Implementation
✅ Password hashing with bcrypt
✅ JWT token generation
✅ CORS enabled
✅ Duplicate user prevention

### Recommended Improvements
⚠️ Move JWT secret to environment variable
⚠️ Implement JWT verification middleware
⚠️ Add request validation middleware
⚠️ Implement refresh tokens
⚠️ Add rate limiting
⚠️ Sanitize user inputs
⚠️ Add HTTPS in production
⚠️ Implement role-based access control middleware

---

## Testing Examples

### Using cURL

**Register User**:
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test123",
    "email": "test@example.com",
    "name": "Test User",
    "role": "student",
    "password": "password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Profile**:
```bash
curl -X GET http://localhost:5000/api/profile/test123
```

**Create Assignment**:
```bash
curl -X POST http://localhost:5000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Assignment",
    "description": "Test description",
    "due_date": "2024-12-31T23:59:59.000Z",
    "subject": "Testing"
  }'
```

---

## Database Connection

**MongoDB Atlas Connection**:
```javascript
const uri = "mongodb+srv://username:password@cluster.mongodb.net/dbname";
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
```

**Connection Features**:
- Automatic reconnection
- Connection pooling
- Error handling
- Retry writes enabled

---

## File Upload Configuration

The backend uses Multer for handling file uploads (profile images, certificates).

**Storage Location**: `backend/assets/uploads/`

**Supported Operations**:
- Profile image upload
- Certificate document upload
- File size limits (should be configured)
- File type validation (should be implemented)

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gradsphere

# JWT Configuration
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRATION=1h

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./assets/uploads
```

---

## Running the Backend

### Development Mode
```bash
cd backend
npm install
node index.js
```

### Production Mode
```bash
cd backend
npm install
NODE_ENV=production node index.js
```

### With PM2 (Process Manager)
```bash
pm2 start index.js --name gradsphere-backend
pm2 logs gradsphere-backend
pm2 restart gradsphere-backend
```

---

## API Response Times

Expected response times (approximate):
- Authentication: 200-500ms (bcrypt hashing)
- Profile GET: 50-150ms
- Profile UPDATE: 100-300ms
- Assignments GET: 50-100ms
- Assignments POST: 100-200ms

---

## Rate Limiting Recommendations

Suggested rate limits for production:
- Authentication endpoints: 5 requests/minute per IP
- Profile endpoints: 30 requests/minute per user
- Assignment endpoints: 60 requests/minute per user

---

## Monitoring and Logging

Recommended additions:
- Winston or Morgan for logging
- Request/response logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Database query logging

# GradSphere Microservices Architecture - Complete Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Services Overview](#services-overview)
5. [Quick Start Guide](#quick-start-guide)

---

## System Overview

GradSphere is a comprehensive student management platform built using a microservices architecture. The system consists of three independent services that work together to provide a complete solution for student portfolio management, assignment tracking, and LeetCode profile integration.

### Key Features
- **Student & Teacher Dashboards**: Role-based access control with dedicated interfaces
- **Profile Management**: Comprehensive student profiles with portfolios, skills, and achievements
- **Assignment Tracking**: Create and manage assignments with due dates
- **LeetCode Integration**: Real-time LeetCode profile statistics and problem-solving data
- **Authentication**: Secure Firebase authentication with JWT tokens
- **File Uploads**: Profile image and certificate uploads via Multer

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                    (React + Vite Frontend)                       │
│                     Port: 5173 (dev)                             │
└────────────┬────────────────────────────────┬───────────────────┘
             │                                │
             │                                │
             ▼                                ▼
┌────────────────────────┐      ┌────────────────────────────────┐
│   BACKEND SERVICE      │      │   LEETCODE API SERVICE         │
│   (Express + MongoDB)  │      │   (Express + TypeScript)       │
│   Port: 5000           │      │   Port: 3000                   │
│                        │      │                                │
│   - User Management    │      │   - LeetCode Profile Data      │
│   - Authentication     │      │   - Problem Statistics         │
│   - Assignments        │      │   - Contest History            │
│   - Profile CRUD       │      │   - Submission Tracking        │
└────────────┬───────────┘      └────────────────────────────────┘
             │
             ▼
┌────────────────────────┐
│   MongoDB Atlas        │
│   (Cloud Database)     │
│                        │
│   - Users Collection   │
│   - Assignments        │
└────────────────────────┘

┌────────────────────────┐
│   Firebase Services    │
│                        │
│   - Authentication     │
│   - Firestore          │
└────────────────────────┘
```

---

## Technology Stack

### Frontend Service
- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.1.0
- **Routing**: React Router DOM 7.1.5
- **Styling**: Tailwind CSS 4.0.6
- **State Management**: Context API (AuthContext, UserContext)
- **Authentication**: Firebase Auth 11.3.1
- **HTTP Client**: Axios 1.7.9
- **UI Components**: 
  - Framer Motion (animations)
  - Lucide React (icons)
  - React Toastify (notifications)
  - Recharts (data visualization)
- **PDF Generation**: @react-pdf/renderer
- **AI Integration**: Google Generative AI
- **Cloud Storage**: Cloudinary

### Backend Service
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Database**: MongoDB 6.13.0 with Mongoose 8.10.1
- **Authentication**: 
  - JWT (jsonwebtoken 9.0.2)
  - bcryptjs 2.4.3
- **File Upload**: Multer 1.4.5-lts.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.3.1

### LeetCode Backend Service
- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **HTTP Client**: Axios 1.7.2
- **Caching**: apicache 1.6.3
- **Rate Limiting**: express-rate-limit 7.1.5
- **CORS**: cors 2.8.5
- **Testing**: Jest 29.7.0 with Supertest
- **Development**: 
  - ts-node 10.9.2
  - nodemon 3.1.0
- **Containerization**: Docker

---

## Services Overview

### 1. Frontend Service (Port: 5173)
**Purpose**: User interface for students and teachers

**Key Components**:
- Landing page
- Authentication forms
- Student dashboard
- Teacher dashboard
- Profile management
- Assignment views
- AI Chatbot integration

**Routes**:
- `/` - Landing page
- `/login` - Authentication
- `/profile` - User profile view
- `/editprofile` - Profile editing
- `/studentdashboard/:uid` - Student dashboard
- `/teacherdashboard/:uid` - Teacher dashboard

### 2. Backend Service (Port: 5000)
**Purpose**: Core business logic and data management

**Database Schema**:
- Users (students & teachers)
- Assignments
- Profiles with portfolios
- Certificates and achievements

**API Endpoints**: See `01-BACKEND-API.md` for details

### 3. LeetCode Backend Service (Port: 3000)
**Purpose**: LeetCode data aggregation and caching

**Features**:
- User profile statistics
- Problem-solving history
- Contest rankings
- Submission tracking
- Daily problem fetching
- Rate limiting (60 requests/hour)
- 5-minute response caching

**API Endpoints**: See `03-LEETCODE-API.md` for details

---

## Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project
- npm or yarn package manager

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

#### 2. Setup Backend Service
```bash
cd backend
npm install
# Create .env file with MongoDB URI
echo "MONGODB_URI=your_mongodb_uri" > .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "PORT=5000" >> .env
npm start
```

#### 3. Setup Frontend Service
```bash
cd frontend
npm install
# Configure Firebase in src/firebase.js
npm run dev
```

#### 4. Setup LeetCode Backend Service
```bash
cd leetcode_backend
npm install
# Optional: Set PORT in .env
npm run dev
```

#### 5. Docker Deployment (LeetCode Service)
```bash
cd leetcode_backend
docker-compose up -d
```

---

## Environment Variables

### Backend Service (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Frontend Service
Firebase configuration is in `src/firebase.js` (should be moved to .env)

### LeetCode Backend Service (.env)
```env
PORT=3000
LEETCODE_API_URL=https://leetcode.com/graphql
```

---

## Security Considerations

1. **Authentication**: JWT tokens with 1-hour expiration
2. **Password Hashing**: bcrypt with salt rounds of 10
3. **CORS**: Enabled for cross-origin requests
4. **Rate Limiting**: 60 requests per hour on LeetCode API
5. **Environment Variables**: Sensitive data stored in .env files
6. **Firebase Rules**: Should be configured for production

⚠️ **Important**: The current codebase contains hardcoded credentials. These should be moved to environment variables before production deployment.

---

## Next Steps

For detailed documentation on each service, refer to:
- `01-BACKEND-API.md` - Backend service API documentation
- `02-FRONTEND-GUIDE.md` - Frontend architecture and components
- `03-LEETCODE-API.md` - LeetCode service API documentation
- `04-DATABASE-SCHEMA.md` - Database models and relationships
- `05-AUTHENTICATION-FLOW.md` - Authentication and authorization
- `06-DEPLOYMENT-GUIDE.md` - Production deployment instructions
- `07-WORKFLOWS.md` - Common workflows and use cases
- `08-TROUBLESHOOTING.md` - Common issues and solutions

# 🎓 GradSphere

> **A full-stack student development and academic progress platform designed to connect students and teachers, track performance, and provide actionable insights for career growth.**

GradSphere is a comprehensive student development platform that brings **academic management, coding progress, skill tracking, achievements, assignments, and AI-assisted guidance** into a single application.

The platform enables students to maintain their professional profiles and monitor their progress, while teachers can manage students, assignments, and academic activities through dedicated workflows.

---

## ✨ Features

### 👨‍🎓 Student Management

* Student profile and professional information management
* Skill and technology tracking
* Certificates and achievement management
* Academic progress monitoring
* Resume-oriented profile information

### 👨‍🏫 Teacher & Student Workflow

* Teacher-student interaction
* Assignment creation and management
* Student performance monitoring
* Academic activity tracking
* Role-based access to platform features

### 💻 Coding Progress Tracking

* Integration with **LeetCode** to retrieve coding statistics
* Track solved problems and competitive programming progress
* Centralized coding activity within the student profile
* Dedicated LeetCode backend service
* API caching and rate limiting for efficient requests

### 🤖 AI-Assisted Guidance

* AI-powered chatbot for student assistance
* Personalized guidance based on student information
* Interactive support for academic and career-related queries

### 📊 Progress & Analytics

* Student performance overview
* Coding progress insights
* Skill and achievement tracking
* Centralized dashboard for important student information

### 🔐 Authentication & Security

* Firebase authentication
* JWT-based authentication
* Role-Based Access Control (RBAC)
* Protected API endpoints
* Secure student and teacher workflows

---

## 🏗️ Architecture

GradSphere follows a modular full-stack architecture consisting of separate frontend, backend, and LeetCode integration services.

```text
                    ┌──────────────────────┐
                    │      GradSphere      │
                    │      Frontend        │
                    │      React.js         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Backend API     │
                    │ Node.js + Express.js │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐     ┌───────────┐   ┌──────────────┐
        │ MongoDB  │     │ Firebase  │   │ JWT / RBAC   │
        │ Database │     │   Auth    │   │ Authorization│
        └──────────┘     └───────────┘   └──────────────┘
                              
                               │
                               ▼
                    ┌──────────────────────┐
                    │  LeetCode Backend   │
                    │ API + Caching +      │
                    │ Rate Limiting       │
                    └──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB

### Authentication

* Firebase Authentication
* JSON Web Tokens (JWT)
* Role-Based Access Control

### AI

* AI-powered chatbot
* LLM-based student assistance

### External Integration

* LeetCode API
* Coding statistics and progress tracking

---

## 📂 Project Structure

```text
GradSphere/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── leetcode_backend/
│   ├── API services
│   ├── caching
│   └── rate limiting
│
└── documentation/
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SudharshanAIML/gradspehere.git

cd gradspehere
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file and configure the required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Setup LeetCode Backend

```bash
cd leetcode_backend
npm install
npm run dev
```

> Environment variables and configuration may need to be adjusted according to your local deployment setup.

---

## 🔄 Application Workflow

```text
Student / Teacher
       │
       ▼
Authentication
       │
       ▼
Role-Based Dashboard
       │
       ├───────────────┐
       ▼               ▼
 Student Profile    Teacher Portal
       │               │
       ▼               ▼
 Skills / Awards    Assignments
 Certificates       Student Tracking
       │               │
       └───────┬───────┘
               ▼
        Progress Tracking
               │
        ┌──────┴──────┐
        ▼             ▼
   LeetCode Data   AI Guidance
        │             │
        └──────┬──────┘
               ▼
        Student Insights
```

---

## 🎯 Key Highlights

* Full-stack student development ecosystem
* Modular frontend and backend architecture
* Dedicated LeetCode integration service
* API caching and rate limiting
* Secure JWT and RBAC-based authorization
* Firebase authentication
* AI-assisted student guidance
* Academic and coding progress tracking
* Teacher-student collaboration workflows

---

## 🔮 Future Improvements

* Personalized AI-based career recommendations
* Advanced student performance analytics
* Automated resume generation
* Additional competitive programming integrations
* Skill-gap analysis and learning recommendations
* Notification and reminder system
* Deployment with CI/CD automation

---

## 👨‍💻 Author

**Sudharshan R**

* GitHub: [SudharshanAIML](https://github.com/SudharshanAIML)

---

## 📄 License

This project is intended for educational and development purposes.

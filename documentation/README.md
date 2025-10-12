# GradSphere Documentation

Welcome to the complete documentation for the GradSphere microservices platform. This documentation provides comprehensive guides for developers, system administrators, and users.

---

## 📚 Documentation Structure

### [00-OVERVIEW.md](./00-OVERVIEW.md)
**System Overview and Architecture**
- Complete system architecture
- Technology stack details
- Service overview
- Quick start guide
- Environment setup
- Security considerations

**Read this first** to understand the overall system architecture and how all components work together.

---

### [01-BACKEND-API.md](./01-BACKEND-API.md)
**Backend Service API Documentation**
- Complete API reference
- Authentication endpoints
- User profile management
- Assignment management
- Data models and schemas
- Error handling
- Testing examples
- Security best practices

**Use this** when working with the backend API or integrating with the backend service.

---

### [02-FRONTEND-GUIDE.md](./02-FRONTEND-GUIDE.md)
**Frontend Service Documentation**
- Project structure
- Component architecture
- Routing configuration
- State management (Context API)
- Firebase integration
- API integration patterns
- Styling with Tailwind CSS
- Build and deployment

**Use this** when developing frontend features or understanding the React application structure.

---

### [03-LEETCODE-API.md](./03-LEETCODE-API.md)
**LeetCode Backend API Documentation**
- Complete endpoint reference
- User profile statistics
- Problem data retrieval
- Contest information
- Discussion endpoints
- Rate limiting details
- Caching strategy
- Docker deployment

**Use this** when integrating LeetCode features or working with the LeetCode API service.

---

### [04-DATABASE-SCHEMA.md](./04-DATABASE-SCHEMA.md)
**Database Schema and Models**
- MongoDB schema definitions
- User model structure
- Assignment model structure
- Indexes and optimization
- Sample documents
- Query examples
- Aggregation queries
- Best practices

**Use this** when working with database operations or understanding data structures.

---

### [05-AUTHENTICATION-FLOW.md](./05-AUTHENTICATION-FLOW.md)
**Authentication and Authorization**
- Complete authentication flow
- Registration process
- Login workflow
- Session management
- Role-based access control
- Security measures
- Token management
- Best practices

**Use this** when implementing authentication features or troubleshooting auth issues.

---

### [06-DEPLOYMENT-GUIDE.md](./06-DEPLOYMENT-GUIDE.md)
**Production Deployment Guide**
- Pre-deployment checklist
- Environment configuration
- Frontend deployment (Vercel, Netlify, Firebase)
- Backend deployment (Railway, Heroku, AWS)
- LeetCode API deployment (Render, Docker)
- Database setup
- Domain and SSL configuration
- Monitoring and logging

**Use this** when deploying to production or setting up new environments.

---

### [07-WORKFLOWS.md](./07-WORKFLOWS.md)
**Common Workflows and Use Cases**
- Student workflows
- Teacher workflows
- System workflows
- Integration workflows
- Data flow diagrams
- Step-by-step processes
- API call sequences

**Use this** to understand how different features work end-to-end.

---

### [08-TROUBLESHOOTING.md](./08-TROUBLESHOOTING.md)
**Troubleshooting Guide**
- Frontend issues
- Backend issues
- LeetCode API issues
- Database issues
- Authentication issues
- Deployment issues
- Performance issues
- Common error messages

**Use this** when encountering problems or debugging issues.

---

## 🚀 Quick Navigation

### For New Developers
1. Start with [00-OVERVIEW.md](./00-OVERVIEW.md) - Understand the system
2. Read [02-FRONTEND-GUIDE.md](./02-FRONTEND-GUIDE.md) - Frontend setup
3. Read [01-BACKEND-API.md](./01-BACKEND-API.md) - Backend setup
4. Check [05-AUTHENTICATION-FLOW.md](./05-AUTHENTICATION-FLOW.md) - Auth system

### For API Integration
1. [01-BACKEND-API.md](./01-BACKEND-API.md) - Backend endpoints
2. [03-LEETCODE-API.md](./03-LEETCODE-API.md) - LeetCode endpoints
3. [07-WORKFLOWS.md](./07-WORKFLOWS.md) - Integration patterns

### For Database Work
1. [04-DATABASE-SCHEMA.md](./04-DATABASE-SCHEMA.md) - Schema reference
2. [01-BACKEND-API.md](./01-BACKEND-API.md) - API operations
3. [08-TROUBLESHOOTING.md](./08-TROUBLESHOOTING.md) - Database issues

### For Deployment
1. [06-DEPLOYMENT-GUIDE.md](./06-DEPLOYMENT-GUIDE.md) - Complete deployment guide
2. [00-OVERVIEW.md](./00-OVERVIEW.md) - Environment setup
3. [08-TROUBLESHOOTING.md](./08-TROUBLESHOOTING.md) - Deployment issues

### For Troubleshooting
1. [08-TROUBLESHOOTING.md](./08-TROUBLESHOOTING.md) - Start here
2. Relevant service documentation
3. [07-WORKFLOWS.md](./07-WORKFLOWS.md) - Expected behavior

---

## 📋 System Requirements

### Development Environment
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **MongoDB**: Atlas account or local instance
- **Firebase**: Project with Authentication enabled
- **Git**: For version control

### Recommended Tools
- **VS Code**: Code editor
- **Postman/Thunder Client**: API testing
- **MongoDB Compass**: Database GUI
- **Docker**: Container management (optional)
- **Git**: Version control

---

## 🏗️ Architecture Overview

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
└────────────┬───────────┘      └────────────────────────────────┘
             │
             ▼
┌────────────────────────┐
│   MongoDB Atlas        │
│   (Cloud Database)     │
└────────────────────────┘

┌────────────────────────┐
│   Firebase Services    │
│   (Authentication)     │
└────────────────────────┘
```

---

## 🔑 Key Features

### Student Features
- ✅ Profile management with portfolio
- ✅ LeetCode statistics integration
- ✅ Assignment tracking
- ✅ Certificate management
- ✅ Achievement showcase
- ✅ Skills tracking (technical & soft)
- ✅ Work experience documentation
- ✅ AI chatbot assistance

### Teacher Features
- ✅ View all student profiles
- ✅ Create and manage assignments
- ✅ Track student progress
- ✅ View LeetCode statistics for all students
- ✅ Export student data

### System Features
- ✅ Firebase authentication
- ✅ JWT token authorization
- ✅ Role-based access control
- ✅ Real-time LeetCode data
- ✅ API caching (5 minutes)
- ✅ Rate limiting
- ✅ Image upload (Cloudinary)
- ✅ Responsive design

---

## 🛠️ Technology Stack

### Frontend
- React 19.0.0
- Vite 6.1.0
- React Router DOM 7.1.5
- Tailwind CSS 4.0.6
- Firebase 11.3.1
- Axios 1.7.9
- Framer Motion 12.4.3
- Google Generative AI

### Backend
- Node.js
- Express 4.18.2
- MongoDB 6.13.0
- Mongoose 8.10.1
- JWT (jsonwebtoken 9.0.2)
- bcryptjs 2.4.3
- Multer 1.4.5

### LeetCode API
- TypeScript
- Express 4.18.2
- Axios 1.7.2
- API Cache 1.6.3
- Express Rate Limit 7.1.5
- Docker

---

## 📦 Installation

### Quick Start

```bash
# Clone repository
git clone <repository-url>
cd gradsphere

# Install and run backend
cd backend
npm install
node index.js

# Install and run frontend (new terminal)
cd frontend
npm install
npm run dev

# Install and run LeetCode API (new terminal)
cd leetcode_backend
npm install
npm run dev
```

### Detailed Setup

See [00-OVERVIEW.md](./00-OVERVIEW.md) for complete installation instructions.

---

## 🔐 Environment Variables

### Frontend (.env)
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

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gradsphere
JWT_SECRET=your_secret_key
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

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### LeetCode API Testing
```bash
cd leetcode_backend
npm test
```

### Manual API Testing
```bash
# Test backend
curl http://localhost:5000/api/profile

# Test LeetCode API
curl http://localhost:3000/testuser
```

---

## 📊 API Endpoints Summary

### Backend API (Port 5000)
- `POST /api/register` - Register user
- `POST /api/login` - Login user
- `GET /api/profile/:uid` - Get user profile
- `GET /api/profile` - Get all users
- `PUT /api/profile/:uid` - Update profile
- `GET /api/assignments` - Get assignments
- `POST /api/assignments` - Create assignment

### LeetCode API (Port 3000)
- `GET /:username` - Get user profile
- `GET /:username/badges` - Get badges
- `GET /:username/solved` - Get solved count
- `GET /:username/contest` - Get contest details
- `GET /:username/submission` - Get submissions
- `GET /daily` - Get daily problem
- `GET /problems` - Get problem list

See [01-BACKEND-API.md](./01-BACKEND-API.md) and [03-LEETCODE-API.md](./03-LEETCODE-API.md) for complete API documentation.

---

## 🚨 Common Issues

### Frontend won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend connection error
- Check MongoDB connection string
- Verify MongoDB Atlas network access
- Ensure backend is running on correct port

### CORS errors
- Verify CORS configuration in backend
- Check API URLs in frontend
- Ensure backend is running

See [08-TROUBLESHOOTING.md](./08-TROUBLESHOOTING.md) for detailed troubleshooting.

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

### Code Style
- Use ESLint for JavaScript/TypeScript
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📝 Documentation Updates

When making changes:
1. Update relevant documentation files
2. Add new sections if needed
3. Update code examples
4. Keep diagrams current
5. Test all examples

---

## 🔗 Useful Links

### External Documentation
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Platform Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)

---

## 📞 Support

### Getting Help
1. Check [08-TROUBLESHOOTING.md](./08-TROUBLESHOOTING.md)
2. Search existing issues
3. Review relevant documentation
4. Ask in community forums
5. Create detailed bug report

### Reporting Issues
Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Error messages
- Screenshots

---

## 📄 License

[Add your license information here]

---

## 👥 Authors

[Add author information here]

---

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB Atlas for database hosting
- LeetCode for providing public API
- Open source community

---

## 📅 Version History

### Version 1.0.0 (Current)
- Initial release
- Complete documentation
- All core features implemented

---

## 🗺️ Roadmap

### Planned Features
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Assignment submission system
- [ ] Grade management
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Real-time chat
- [ ] Video conferencing integration
- [ ] Calendar integration

---

## 📚 Additional Resources

### Tutorials
- [Setting up MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/)
- [Firebase Authentication Setup](https://firebase.google.com/docs/auth/web/start)
- [Deploying to Vercel](https://vercel.com/docs/concepts/deployments/overview)

### Best Practices
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)

---

**Last Updated**: December 10, 2024

**Documentation Version**: 1.0.0

**Maintained By**: GradSphere Development Team

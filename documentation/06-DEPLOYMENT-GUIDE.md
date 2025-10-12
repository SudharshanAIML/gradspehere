# Deployment Guide

## Overview
This guide covers deploying all three microservices (Frontend, Backend, and LeetCode API) to production environments. Each service can be deployed independently to different platforms.

---

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [LeetCode API Deployment](#leetcode-api-deployment)
6. [Database Setup](#database-setup)
7. [Domain and SSL Configuration](#domain-and-ssl-configuration)
8. [Monitoring and Logging](#monitoring-and-logging)

---

## Pre-Deployment Checklist

### Security
- [ ] Move all secrets to environment variables
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS for production domains
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Review and update Firebase security rules
- [ ] Change default JWT secret
- [ ] Enable MongoDB IP whitelist

### Performance
- [ ] Enable production builds
- [ ] Configure caching strategies
- [ ] Optimize images and assets
- [ ] Enable compression (gzip/brotli)
- [ ] Set up CDN for static assets
- [ ] Configure database indexes

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Configure performance monitoring
- [ ] Set up alerts for critical errors

---

## Environment Configuration

### Frontend Environment Variables

Create `.env.production`:

```env
# API Endpoints
VITE_BACKEND_API_URL=https://api.gradsphere.com
VITE_LEETCODE_API_URL=https://leetcode-api.gradsphere.com

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=gradsphere-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gradsphere-prod
VITE_FIREBASE_STORAGE_BUCKET=gradsphere-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google AI
VITE_GOOGLE_AI_API_KEY=your_google_ai_key

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

### Backend Environment Variables

Create `.env.production`:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gradsphere?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_production_key_min_32_chars
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRATION=7d

# CORS
ALLOWED_ORIGINS=https://gradsphere.com,https://www.gradsphere.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./assets/uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@gradsphere.com
SMTP_PASS=your_email_password
```

### LeetCode API Environment Variables

Create `.env.production`:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# LeetCode API
LEETCODE_API_URL=https://leetcode.com/graphql

# Cache Configuration
CACHE_DURATION=300

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=60

# CORS
ALLOWED_ORIGINS=https://gradsphere.com,https://www.gradsphere.com
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Login to Vercel**
```bash
vercel login
```

**Step 3: Configure Project**

Create `vercel.json` in frontend directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_BACKEND_API_URL": "@backend-api-url",
    "VITE_LEETCODE_API_URL": "@leetcode-api-url"
  }
}
```

**Step 4: Deploy**
```bash
cd frontend
vercel --prod
```

**Step 5: Configure Environment Variables**
- Go to Vercel Dashboard
- Select your project
- Go to Settings > Environment Variables
- Add all variables from `.env.production`

---

### Option 2: Netlify

**Step 1: Build the Project**
```bash
cd frontend
npm run build
```

**Step 2: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 3: Deploy**
```bash
netlify deploy --prod --dir=dist
```

**Step 4: Configure Redirects**

Create `public/_redirects`:
```
/*    /index.html   200
```

**Step 5: Environment Variables**
- Go to Netlify Dashboard
- Site Settings > Build & Deploy > Environment
- Add all variables from `.env.production`

---

### Option 3: Firebase Hosting

**Step 1: Install Firebase CLI**
```bash
npm install -g firebase-tools
```

**Step 2: Login**
```bash
firebase login
```

**Step 3: Initialize**
```bash
cd frontend
firebase init hosting
```

**Step 4: Configure**

`firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

**Step 5: Build and Deploy**
```bash
npm run build
firebase deploy --only hosting
```

---

## Backend Deployment

### Option 1: Railway (Recommended)

**Step 1: Create Account**
- Go to https://railway.app
- Sign up with GitHub

**Step 2: Create New Project**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Select your repository
- Choose `backend` directory

**Step 3: Configure**
- Add environment variables from `.env.production`
- Set start command: `node index.js`
- Configure port: Railway auto-assigns

**Step 4: Deploy**
- Railway automatically deploys on push to main branch

---

### Option 2: Heroku

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
```

**Step 2: Login**
```bash
heroku login
```

**Step 3: Create App**
```bash
cd backend
heroku create gradsphere-backend
```

**Step 4: Configure Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_secret"
# Add all other variables
```

**Step 5: Create Procfile**

`Procfile`:
```
web: node index.js
```

**Step 6: Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

### Option 3: DigitalOcean App Platform

**Step 1: Create Account**
- Go to https://www.digitalocean.com
- Create account

**Step 2: Create App**
- Click "Create" > "Apps"
- Connect GitHub repository
- Select `backend` directory

**Step 3: Configure**

Create `.do/app.yaml`:
```yaml
name: gradsphere-backend
services:
- name: api
  github:
    repo: your-username/gradsphere
    branch: main
    deploy_on_push: true
  source_dir: /backend
  run_command: node index.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: PORT
    value: "8080"
  - key: MONGODB_URI
    value: ${MONGODB_URI}
    type: SECRET
  - key: JWT_SECRET
    value: ${JWT_SECRET}
    type: SECRET
```

**Step 4: Deploy**
- DigitalOcean automatically deploys

---

### Option 4: AWS EC2 (Advanced)

**Step 1: Launch EC2 Instance**
- Ubuntu Server 22.04 LTS
- t2.micro (free tier)
- Configure security group (ports 22, 80, 443, 5000)

**Step 2: Connect to Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

**Step 3: Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

**Step 4: Clone Repository**
```bash
git clone https://github.com/your-username/gradsphere.git
cd gradsphere/backend
npm install
```

**Step 5: Configure Environment**
```bash
nano .env
# Add production environment variables
```

**Step 6: Start with PM2**
```bash
pm2 start index.js --name gradsphere-backend
pm2 startup
pm2 save
```

**Step 7: Configure Nginx**

`/etc/nginx/sites-available/gradsphere`:
```nginx
server {
    listen 80;
    server_name api.gradsphere.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/gradsphere /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Step 8: SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.gradsphere.com
```

---

## LeetCode API Deployment

### Option 1: Render (Recommended)

**Step 1: Create Account**
- Go to https://render.com
- Sign up with GitHub

**Step 2: Create Web Service**
- Click "New +" > "Web Service"
- Connect repository
- Select `leetcode_backend` directory

**Step 3: Configure**
- Name: gradsphere-leetcode-api
- Environment: Node
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Instance Type: Free

**Step 4: Environment Variables**
- Add variables from `.env.production`

**Step 5: Deploy**
- Render automatically deploys

---

### Option 2: Docker on Any Platform

**Step 1: Build Docker Image**
```bash
cd leetcode_backend
docker build -t gradsphere-leetcode-api .
```

**Step 2: Test Locally**
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  gradsphere-leetcode-api
```

**Step 3: Push to Docker Hub**
```bash
docker tag gradsphere-leetcode-api your-username/gradsphere-leetcode-api
docker push your-username/gradsphere-leetcode-api
```

**Step 4: Deploy to Cloud**

**Railway**:
- Create new project
- Deploy from Docker image
- Use: `your-username/gradsphere-leetcode-api`

**DigitalOcean**:
```bash
# Create droplet with Docker
docker pull your-username/gradsphere-leetcode-api
docker run -d -p 3000:3000 \
  --name leetcode-api \
  --restart always \
  -e NODE_ENV=production \
  your-username/gradsphere-leetcode-api
```

---

## Database Setup

### MongoDB Atlas Configuration

**Step 1: Create Cluster**
- Go to https://cloud.mongodb.com
- Create free M0 cluster
- Choose region closest to your backend

**Step 2: Configure Network Access**
- Database Access > Add New Database User
- Network Access > Add IP Address
- For cloud deployments: Allow access from anywhere (0.0.0.0/0)

**Step 3: Get Connection String**
- Clusters > Connect > Connect your application
- Copy connection string
- Replace `<password>` with your password

**Step 4: Create Database**
```javascript
// Database will be created automatically on first connection
// Database name: gradsphere
// Collections: users, assignments
```

**Step 5: Set Up Indexes**
```javascript
// Connect to MongoDB
use gradsphere

// Create indexes
db.users.createIndex({ "uid": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
db.assignments.createIndex({ "due_date": 1 })
db.assignments.createIndex({ "subject": 1 })
```

**Step 6: Backup Configuration**
- Enable automated backups in Atlas
- Configure backup schedule
- Test restore process

---

## Domain and SSL Configuration

### Domain Setup

**Step 1: Purchase Domain**
- Namecheap, GoDaddy, or Google Domains
- Example: gradsphere.com

**Step 2: Configure DNS**

Add these DNS records:

```
Type    Name                Value                       TTL
A       @                   your-frontend-ip            3600
A       www                 your-frontend-ip            3600
CNAME   api                 your-backend-domain         3600
CNAME   leetcode-api        your-leetcode-api-domain    3600
```

**For Vercel/Netlify**:
```
Type    Name    Value
CNAME   @       cname.vercel-dns.com
CNAME   www     cname.vercel-dns.com
```

### SSL Certificates

**Option 1: Platform-Managed (Recommended)**
- Vercel, Netlify, Railway provide automatic SSL
- No configuration needed

**Option 2: Let's Encrypt (Self-Hosted)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d gradsphere.com -d www.gradsphere.com

# Auto-renewal
sudo certbot renew --dry-run
```

**Option 3: Cloudflare**
- Add site to Cloudflare
- Update nameservers
- Enable SSL/TLS (Full or Full Strict)
- Automatic certificate management

---

## Monitoring and Logging

### Error Tracking with Sentry

**Step 1: Create Sentry Account**
- Go to https://sentry.io
- Create project for each service

**Step 2: Install Sentry**

**Frontend**:
```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

**Backend**:
```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### Logging

**Winston Logger (Backend)**:
```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

### Uptime Monitoring

**UptimeRobot**:
- Go to https://uptimerobot.com
- Add monitors for:
  - Frontend: https://gradsphere.com
  - Backend: https://api.gradsphere.com/health
  - LeetCode API: https://leetcode-api.gradsphere.com

**Health Check Endpoints**:

```javascript
// Backend
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// LeetCode API
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

---

## Performance Optimization

### Frontend

**1. Code Splitting**:
```javascript
const StudentDashboard = lazy(() => import('./Pages/StudentDashboard'));
```

**2. Image Optimization**:
- Use WebP format
- Implement lazy loading
- Use Cloudinary transformations

**3. Caching**:
```javascript
// Service Worker for PWA
// Cache API responses
```

### Backend

**1. Database Connection Pooling**:
```javascript
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5
});
```

**2. Response Compression**:
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

**3. Caching with Redis** (optional):
```bash
npm install redis
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Security audit completed
- [ ] Performance testing done

### Deployment
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] LeetCode API deployed
- [ ] Database configured
- [ ] DNS configured
- [ ] SSL certificates installed

### Post-Deployment
- [ ] Smoke tests passed
- [ ] Monitoring configured
- [ ] Logging working
- [ ] Backups configured
- [ ] Documentation updated
- [ ] Team notified

---

## Rollback Strategy

### Quick Rollback

**Vercel/Netlify**:
- Go to Deployments
- Select previous deployment
- Click "Promote to Production"

**Railway/Render**:
- Go to Deployments
- Rollback to previous version

**Manual (PM2)**:
```bash
pm2 stop gradsphere-backend
git checkout previous-commit
npm install
pm2 restart gradsphere-backend
```

---

## Cost Estimation

### Free Tier Deployment

| Service | Platform | Cost |
|---------|----------|------|
| Frontend | Vercel/Netlify | Free |
| Backend | Railway/Render | Free (with limits) |
| LeetCode API | Render | Free |
| Database | MongoDB Atlas | Free (M0) |
| Domain | Namecheap | ~$10/year |
| **Total** | | **~$10/year** |

### Production Deployment

| Service | Platform | Cost |
|---------|----------|------|
| Frontend | Vercel Pro | $20/month |
| Backend | Railway | $5-20/month |
| LeetCode API | Render | $7/month |
| Database | MongoDB Atlas M10 | $57/month |
| Domain | Namecheap | ~$10/year |
| CDN | Cloudflare | Free |
| Monitoring | Sentry | Free tier |
| **Total** | | **~$90-110/month** |

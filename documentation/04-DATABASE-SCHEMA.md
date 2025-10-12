# Database Schema Documentation

## Overview
The GradSphere application uses MongoDB as its primary database, with Mongoose as the ODM (Object Document Mapper). The database stores user profiles, assignments, and related data.

**Database**: MongoDB Atlas
**ODM**: Mongoose 8.10.1
**Connection**: Cloud-hosted (MongoDB Atlas)

---

## Table of Contents
1. [Database Connection](#database-connection)
2. [User Schema](#user-schema)
3. [Assignment Schema](#assignment-schema)
4. [Indexes](#indexes)
5. [Data Relationships](#data-relationships)
6. [Sample Documents](#sample-documents)
7. [Query Examples](#query-examples)

---

## Database Connection

### Connection String
```javascript
const uri = "mongodb+srv://username:password@cluster.mongodb.net/gradsphere?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
```

### Connection Options
- **retryWrites**: true - Automatically retry write operations
- **w**: majority - Write concern for data durability
- **Connection Pooling**: Automatic
- **Auto-reconnect**: Enabled

---

## User Schema

### Schema Definition

```javascript
const UserSchema = new mongoose.Schema({
  // Authentication
  uid: { 
    type: String, 
    unique: true, 
    required: true,
    index: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String,
    required: true
  },
  role: { 
    type: String, 
    required: true,
    enum: ['student', 'teacher']
  },
  
  // Personal Information
  name: { 
    type: String,
    trim: true
  },
  mobile: { 
    type: String,
    trim: true
  },
  profileImage: { 
    type: String,
    default: null
  },
  
  // Professional Links
  portfolio: { 
    type: String,
    trim: true
  },
  linkedin: { 
    type: String,
    trim: true
  },
  github: { 
    type: String,
    trim: true
  },
  
  // Academic Information
  department: { 
    type: String,
    trim: true
  },
  year: { 
    type: Number,
    min: 1,
    max: 5
  },
  semester: { 
    type: Number,
    min: 1,
    max: 10
  },
  rollNo: { 
    type: String,
    trim: true
  },
  section: { 
    type: String,
    trim: true,
    uppercase: true
  },
  
  // Skills
  techStacks: [String],
  softSkills: [String],
  
  // Work Experience
  jobDetails: [{
    company: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  
  // Coding Profiles
  codingProfiles: {
    leetcode: {
      type: String,
      trim: true
    },
    codechef: {
      type: String,
      trim: true
    },
    codeforces: {
      type: String,
      trim: true
    }
  },
  
  // Achievements
  certificates: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  
  achievements: [{
    description: {
      type: String,
      required: true,
      trim: true
    }
  }],
  
  // Volunteer Work
  volunteerWorks: [{
    organization: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }]
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

const User = mongoose.model("User", UserSchema);
```

### Field Descriptions

#### Authentication Fields
| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| uid | String | Yes | Yes | Firebase user ID |
| email | String | Yes | Yes | User email address |
| password | String | Yes | No | Hashed password (bcrypt) |
| role | String | Yes | No | User role: 'student' or 'teacher' |

#### Personal Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | No | Full name |
| mobile | String | No | Phone number |
| profileImage | String | No | URL to profile image |

#### Professional Links
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| portfolio | String | No | Personal website URL |
| linkedin | String | No | LinkedIn profile URL |
| github | String | No | GitHub profile URL |

#### Academic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| department | String | No | Department/Major |
| year | Number | No | Current year (1-5) |
| semester | Number | No | Current semester (1-10) |
| rollNo | String | No | Student roll number |
| section | String | No | Class section |

#### Skills
| Field | Type | Description |
|-------|------|-------------|
| techStacks | Array[String] | Technical skills (e.g., React, Python) |
| softSkills | Array[String] | Soft skills (e.g., Leadership, Communication) |

#### Work Experience
| Field | Type | Description |
|-------|------|-------------|
| jobDetails | Array[Object] | Work experience entries |
| jobDetails.company | String | Company name |
| jobDetails.role | String | Job role/title |
| jobDetails.description | String | Job description |

#### Coding Profiles
| Field | Type | Description |
|-------|------|-------------|
| codingProfiles.leetcode | String | LeetCode username |
| codingProfiles.codechef | String | CodeChef username |
| codingProfiles.codeforces | String | Codeforces username |

#### Achievements
| Field | Type | Description |
|-------|------|-------------|
| certificates | Array[Object] | Certifications |
| certificates.name | String | Certificate name |
| certificates.link | String | Certificate URL |
| certificates.description | String | Certificate description |
| achievements | Array[Object] | Achievements |
| achievements.description | String | Achievement description |

#### Volunteer Work
| Field | Type | Description |
|-------|------|-------------|
| volunteerWorks | Array[Object] | Volunteer experiences |
| volunteerWorks.organization | String | Organization name |
| volunteerWorks.role | String | Volunteer role |
| volunteerWorks.description | String | Work description |

---

## Assignment Schema

### Schema Definition

```javascript
const assignmentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  due_date: { 
    type: Date, 
    required: true,
    index: true
  },
  subject: { 
    type: String, 
    required: true,
    trim: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Assignment title |
| description | String | Yes | Detailed description |
| due_date | Date | Yes | Submission deadline |
| subject | String | Yes | Subject/course name |
| createdAt | Date | Auto | Creation timestamp |
| updatedAt | Date | Auto | Last update timestamp |

---

## Indexes

### User Collection Indexes

```javascript
// Unique indexes (automatically created)
db.users.createIndex({ "uid": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })

// Recommended additional indexes
db.users.createIndex({ "role": 1 })
db.users.createIndex({ "department": 1, "year": 1 })
db.users.createIndex({ "rollNo": 1 })
```

### Assignment Collection Indexes

```javascript
// Index for querying by due date
db.assignments.createIndex({ "due_date": 1 })

// Index for querying by subject
db.assignments.createIndex({ "subject": 1 })

// Compound index for subject and due date
db.assignments.createIndex({ "subject": 1, "due_date": 1 })
```

---

## Data Relationships

### Relationship Diagram

```
┌─────────────────┐
│     Users       │
│  (Collection)   │
│                 │
│  - uid (PK)     │
│  - email        │
│  - role         │
│  - ...          │
└─────────────────┘
        │
        │ No direct relationship
        │ (Assignments are global)
        │
┌─────────────────┐
│  Assignments    │
│  (Collection)   │
│                 │
│  - _id (PK)     │
│  - title        │
│  - due_date     │
│  - subject      │
└─────────────────┘
```

### Notes on Relationships
- **No Foreign Keys**: MongoDB doesn't enforce foreign key constraints
- **Assignments**: Currently global (not linked to specific users)
- **Future Enhancement**: Add `createdBy` field to link assignments to teachers
- **Future Enhancement**: Add `submissions` collection to track student submissions

---

## Sample Documents

### Sample User Document (Student)

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "uid": "firebase_abc123xyz",
  "email": "john.doe@university.edu",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "role": "student",
  "name": "John Doe",
  "mobile": "+1234567890",
  "profileImage": "https://cloudinary.com/images/john-doe.jpg",
  "portfolio": "https://johndoe.dev",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "department": "Computer Science",
  "year": 3,
  "semester": 6,
  "rollNo": "CS2021001",
  "section": "A",
  "techStacks": [
    "React",
    "Node.js",
    "MongoDB",
    "Python",
    "TypeScript"
  ],
  "softSkills": [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Teamwork"
  ],
  "jobDetails": [
    {
      "company": "Tech Corp",
      "role": "Software Engineer Intern",
      "description": "Developed REST APIs using Node.js and Express"
    },
    {
      "company": "Startup Inc",
      "role": "Frontend Developer Intern",
      "description": "Built responsive web applications using React"
    }
  ],
  "codingProfiles": {
    "leetcode": "johndoe",
    "codechef": "johndoe_cc",
    "codeforces": "johndoe_cf"
  },
  "certificates": [
    {
      "name": "AWS Certified Developer - Associate",
      "link": "https://aws.amazon.com/verification/ABC123",
      "description": "Cloud computing and AWS services certification"
    },
    {
      "name": "MongoDB Certified Developer",
      "link": "https://university.mongodb.com/cert/XYZ789",
      "description": "Database design and MongoDB expertise"
    }
  ],
  "achievements": [
    {
      "description": "Won 1st place in University Hackathon 2024"
    },
    {
      "description": "Published research paper on Machine Learning"
    },
    {
      "description": "Contributed to 5+ open source projects"
    }
  ],
  "volunteerWorks": [
    {
      "organization": "Code for Good",
      "role": "Volunteer Developer",
      "description": "Built web applications for non-profit organizations"
    }
  ],
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-12-10T15:45:00.000Z")
}
```

### Sample User Document (Teacher)

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "uid": "firebase_teacher123",
  "email": "prof.smith@university.edu",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "role": "teacher",
  "name": "Dr. Jane Smith",
  "mobile": "+1987654321",
  "profileImage": "https://cloudinary.com/images/prof-smith.jpg",
  "portfolio": "https://janesmith.edu",
  "linkedin": "https://linkedin.com/in/profsmith",
  "github": "https://github.com/profsmith",
  "department": "Computer Science",
  "techStacks": [
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "Python"
  ],
  "softSkills": [
    "Teaching",
    "Mentoring",
    "Research"
  ],
  "createdAt": ISODate("2023-08-01T09:00:00.000Z"),
  "updatedAt": ISODate("2024-12-10T14:20:00.000Z")
}
```

### Sample Assignment Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "title": "Data Structures - Binary Search Tree Implementation",
  "description": "Implement a Binary Search Tree with insert, delete, and search operations. Include time complexity analysis for each operation. Submit both code and documentation.",
  "due_date": ISODate("2024-12-20T23:59:59.000Z"),
  "subject": "Data Structures and Algorithms",
  "createdAt": ISODate("2024-12-01T10:00:00.000Z"),
  "updatedAt": ISODate("2024-12-01T10:00:00.000Z")
}
```

---

## Query Examples

### User Queries

#### Find User by UID
```javascript
const user = await User.findOne({ uid: "firebase_abc123xyz" });
```

#### Find User by Email
```javascript
const user = await User.findOne({ email: "john.doe@university.edu" });
```

#### Find All Students
```javascript
const students = await User.find({ role: "student" });
```

#### Find Students by Department and Year
```javascript
const students = await User.find({ 
  role: "student",
  department: "Computer Science",
  year: 3
});
```

#### Find Users with Specific Tech Stack
```javascript
const users = await User.find({ 
  techStacks: { $in: ["React", "Node.js"] }
});
```

#### Update User Profile
```javascript
const updatedUser = await User.findOneAndUpdate(
  { uid: "firebase_abc123xyz" },
  { 
    $set: { 
      name: "John Updated",
      mobile: "+1234567890"
    },
    $push: { 
      techStacks: "Docker"
    }
  },
  { new: true }  // Return updated document
);
```

#### Add Certificate to User
```javascript
await User.findOneAndUpdate(
  { uid: "firebase_abc123xyz" },
  {
    $push: {
      certificates: {
        name: "New Certification",
        link: "https://cert.com/123",
        description: "Description"
      }
    }
  }
);
```

#### Remove Achievement
```javascript
await User.findOneAndUpdate(
  { uid: "firebase_abc123xyz" },
  {
    $pull: {
      achievements: { _id: achievementId }
    }
  }
);
```

### Assignment Queries

#### Find All Assignments
```javascript
const assignments = await Assignment.find();
```

#### Find Assignments by Subject
```javascript
const assignments = await Assignment.find({ 
  subject: "Data Structures and Algorithms" 
});
```

#### Find Upcoming Assignments
```javascript
const upcomingAssignments = await Assignment.find({
  due_date: { $gte: new Date() }
}).sort({ due_date: 1 });
```

#### Find Overdue Assignments
```javascript
const overdueAssignments = await Assignment.find({
  due_date: { $lt: new Date() }
}).sort({ due_date: -1 });
```

#### Create Assignment
```javascript
const newAssignment = new Assignment({
  title: "Algorithm Assignment",
  description: "Solve dynamic programming problems",
  due_date: new Date("2024-12-30T23:59:59.000Z"),
  subject: "Algorithms"
});

await newAssignment.save();
```

#### Update Assignment
```javascript
await Assignment.findByIdAndUpdate(
  assignmentId,
  {
    $set: {
      title: "Updated Title",
      due_date: new Date("2024-12-31T23:59:59.000Z")
    }
  }
);
```

#### Delete Assignment
```javascript
await Assignment.findByIdAndDelete(assignmentId);
```

---

## Aggregation Queries

### Count Students by Department
```javascript
const departmentCounts = await User.aggregate([
  { $match: { role: "student" } },
  { $group: { 
      _id: "$department", 
      count: { $sum: 1 } 
  }},
  { $sort: { count: -1 } }
]);
```

### Average Year by Department
```javascript
const avgYear = await User.aggregate([
  { $match: { role: "student" } },
  { $group: { 
      _id: "$department", 
      avgYear: { $avg: "$year" } 
  }}
]);
```

### Most Common Tech Stacks
```javascript
const techStackCounts = await User.aggregate([
  { $unwind: "$techStacks" },
  { $group: { 
      _id: "$techStacks", 
      count: { $sum: 1 } 
  }},
  { $sort: { count: -1 } },
  { $limit: 10 }
]);
```

### Assignments Due This Week
```javascript
const startOfWeek = new Date();
const endOfWeek = new Date();
endOfWeek.setDate(endOfWeek.getDate() + 7);

const weeklyAssignments = await Assignment.find({
  due_date: {
    $gte: startOfWeek,
    $lte: endOfWeek
  }
}).sort({ due_date: 1 });
```

---

## Data Validation

### Mongoose Validation

```javascript
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  year: {
    type: Number,
    min: [1, 'Year must be at least 1'],
    max: [5, 'Year cannot exceed 5']
  }
});
```

---

## Best Practices

### 1. Always Use Indexes
- Index frequently queried fields
- Use compound indexes for multi-field queries
- Monitor index usage with `explain()`

### 2. Avoid Large Arrays
- Limit array sizes (certificates, achievements)
- Consider separate collections for large datasets

### 3. Use Lean Queries
```javascript
// Faster, returns plain JavaScript objects
const users = await User.find().lean();
```

### 4. Select Only Required Fields
```javascript
// Only fetch name and email
const users = await User.find().select('name email');
```

### 5. Use Transactions for Critical Operations
```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  await User.create([userData], { session });
  await Assignment.create([assignmentData], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

---

## Backup and Recovery

### Backup Commands
```bash
# Backup entire database
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/gradsphere"

# Backup specific collection
mongodump --uri="mongodb+srv://..." --collection=users

# Restore database
mongorestore --uri="mongodb+srv://..." dump/
```

---

## Performance Monitoring

### Useful Commands
```javascript
// Check index usage
db.users.find({ email: "test@example.com" }).explain("executionStats")

// Get collection stats
db.users.stats()

// Get database stats
db.stats()
```

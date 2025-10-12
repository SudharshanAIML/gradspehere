const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://harshivkrishnam:jkI95zYgrsUZ7VVl@gradsphere.yv0fo.mongodb.net/?retryWrites=true&w=majority&appName=gradsphere";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  role: { type: String, required: true }, // 'student' or 'teacher'
  name: { type: String },
  mobile: { type: String },
  portfolio: { type: String },
  linkedin: { type: String },
  github: { type: String },
  profileImage: { type: String },
  techStacks: [String],
  jobDetails: [
    {
      company: String,
      role: String,
      description: String,
    },
  ],
  codingProfiles: {
    leetcode: String,
    codechef: String,
    codeforces: String,
  },
  department: { type: String },
  year: { type: Number },
  semester: { type: Number },
  rollNo: { type: String },
  section: { type: String },
  certificates: [
    {
      name: String,
      link: String,
      description: String,
    },
  ],
  achievements: [
    {
      description: String,
    },
  ],
  softSkills: [String], // New field for soft skills
  volunteerWorks: [
    // New field for volunteer works
    {
      organization: String,
      role: String,
      description: String,
    },
  ],
});

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  subject: { type: String, required: true },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
const User = mongoose.model("User", UserSchema);

// 🔹 Register User
app.post("/api/register", async (req, res) => {
  try {
    const { uid, email, name, role, password } = req.body;

    // Check if password is provided
    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Password is required and must be a string" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ uid, email, name, role, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Login User
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get User Profile
app.get("/api/profile/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/api/profile",async (req,res)=>{
  try{
    const allUsers = await User.find({});
    res.json(allUsers);
  }
  catch(error){
    res.status(404).json({error : error.message});
  }
})



// 🔄 GET: Fetch all assignments
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve assignments' });
  }
});

// ➕ POST: Create a new assignment
app.post('/api/assignments', async (req, res) => {
  const { title, description, due_date, subject } = req.body;
  if (!title || !description || !due_date || !subject) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const newAssignment = new Assignment({ title, description, due_date, subject });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create assignment' });
  }
});

// 🔹 Update User Profile
app.put("/api/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const {
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
      jobDetails,
      codingProfiles,
      profileImage,
      certificates,
      achievements,
      techStacks,
      softSkills,
      volunteerWorks,
    } = req.body;

    if (!uid || !name || !email) {
      return res
        .status(400)
        .json({ message: "UID, name, and email are required" });
    }

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    Object.assign(user, {
      name,
      email,
      mobile,
      portfolio,
      linkedin,
      github,
      jobDetails: jobDetails || user.jobDetails,
      codingProfiles: codingProfiles || user.codingProfiles,
      techStacks: techStacks || user.techStacks,
      profileImage,
      department,
      year,
      semester,
      rollNo,
      section,
      certificates: certificates || user.certificates,
      achievements: achievements || user.achievements,
      softSkills: softSkills || user.softSkills,
      volunteerWorks: volunteerWorks || user.volunteerWorks,
    });

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

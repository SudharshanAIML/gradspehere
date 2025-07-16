import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './Components/Auth/AuthForm';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import TeacherDashboard from './Components/TeacherDashboard/TeacherDashboard';
import Profile from './Components/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import Landing from './Pages/Landing/Landing';
import EditProfile from './Components/EditProfile/Editprofile';
import { useState } from 'react';
function App() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  return (
    <AuthProvider>
      
      <ToastContainer autoClose={3000}/>
        <Routes>
          <Route path='/' element={<Landing/> } />
          <Route path="/login" element={<AuthForm setEmail={setEmail} setName={setName} />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editprofile' element={<EditProfile/>}/>
          <Route path="/studentdashboard" element={<StudentDashboard name={name} />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;

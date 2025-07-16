import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Editprofile.css'
const EditProfile = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    portfolio: '',
    linkedin: '',
    github: '',
    profileImage: null,
    jobDetails: [{ company: '', role: '', description: '' }],
    codingProfiles: { leetcode: '', codechef: '', codeforces: '' },
    department: '',
    year: '',
    semester: '',
    rollNo: '',
    section: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile')
      .then(response => {
        if (response.data) {
          setFormData(response.data);
        }
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobDetails = [...formData.jobDetails];
    updatedJobDetails[index][name] = value;
    setFormData(prev => ({ ...prev, jobDetails: updatedJobDetails }));
  };

  const addJobField = () => {
    setFormData(prev => ({
      ...prev,
      jobDetails: [...prev.jobDetails, { company: '', role: '', description: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'jobDetails' || key === 'codingProfiles') {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    });

    if (formData.profileImage instanceof File) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      await axios.post('http://localhost:5000/api/profile', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/studentdashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='edit-container'>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className='edit-input-box' encType="multipart/form-data">
        {/* Basic Info */}
        <h4 className='input-title'>Personal Information</h4>
        <div className='input-container'>
          <label>Name</label>
          <input type='text' name='name' value={formData.name} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Mobile</label>
          <input type='text' name='mobile' value={formData.mobile} onChange={handleChange} required />
        </div>

        {/* Department Info */}
        <h4 className='input-title'>Department Information</h4>
        <div className='input-container'>
          <label>Department</label>
          <input type='text' name='department' value={formData.department} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Year</label>
          <input type='text'  maxLength={1} name='year' value={formData.year} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Semester</label>
          <input type='text'  maxLength={1} name='semester' value={formData.semester} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Roll No.</label>
          <input type='text' name='rollNo' value={formData.rollNo} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Section</label>
          <input type='text'  maxLength={1} name='section' value={formData.section} onChange={handleChange} required />
        </div>

        {/* Social Links */}
        <h4 className='input-title'>Social Profiles</h4>
        <div className='input-container'>
          <label>Portfolio</label>
          <input type='text' name='portfolio' value={formData.portfolio} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label>LinkedIn</label>
          <input type='text' name='linkedin' value={formData.linkedin} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label>GitHub</label>
          <input type='text' name='github' value={formData.github} onChange={handleChange} />
        </div>

        {/* Job Details */}
        <h4 className='input-title'>Job Experience</h4>
        {formData.jobDetails.map((job, index) => (
          <div key={index} className='job-details-container'>
            <div className='input-container'>
              <label>Company</label>
              <input type='text' name='company' value={job.company} onChange={(e) => handleJobChange(index, e)} />
            </div>
            <div className='input-container'>
              <label>Role</label>
              <input type='text' name='role' value={job.role} onChange={(e) => handleJobChange(index, e)} />
            </div>
            <div className='input-container'>
              <label>Description</label>
              <input type='text' name='description' value={job.description} onChange={(e) => handleJobChange(index, e)} />
            </div>
          </div>
        ))}
        <button type='button' className='job-btn'  onClick={addJobField}>+ Add Job</button>

        {/* Coding Profiles */}
        <h4 className='input-title'>Coding Profiles</h4>
        <div className='input-container'>
          <label>LeetCode</label>
          <input type='text' name='leetcode' value={formData.codingProfiles.leetcode} onChange={(e) => setFormData(prev => ({ ...prev, codingProfiles: { ...prev.codingProfiles, leetcode: e.target.value } }))} />
        </div>
        <div className='input-container'>
          <label>CodeChef</label>
          <input type='text' name='codechef' value={formData.codingProfiles.codechef} onChange={(e) => setFormData(prev => ({ ...prev, codingProfiles: { ...prev.codingProfiles, codechef: e.target.value } }))} />
        </div>
        <div className='input-container'>
          <label>CodeForces</label>
          <input type='text' name='codeforces' value={formData.codingProfiles.codeforces} onChange={(e) => setFormData(prev => ({ ...prev, codingProfiles: { ...prev.codingProfiles, codeforces: e.target.value } }))} />
        </div>

        {/* Profile Image */}
        <h4 className='input-title'>Profile Image</h4>
        <div className='input-profile-container'>
          <input type='file' placeholder='Choose file' name='profileImage' accept='image/*' onChange={handleFileChange} />
        </div>

        <button type='submit' className='form-submit-btn'>Save Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;

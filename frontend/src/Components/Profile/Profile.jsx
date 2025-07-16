import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    portfolio: '',
    linkedin: '',
    github: '',
    profileImage: '',
    jobDetails: [],
    codingProfiles: { leetcode: '', codechef: '', codeforces: '' },
    department: '',
    year: '',
    semester: '',
    rollNo: '',
    section: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile')
      .then(response => {
        if (response.data.message === 'User not found') {
          navigate('/editprofile');
        } else {
          setUser(response.data);
        }
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, [navigate]);

  return (
    <div className='profile-container'>
      <div className='profile-img-container'>
        <img
          className='profile-img'
          src={user.profileImage ? `http://localhost:5000${user.profileImage}` : '/assets/profile.jpg'}
          alt='Profile'
        />

        {/* Work Experience */}
        <div className='work-container'>
          <h4 className='profile-title'>Work Experience</h4>
          {user.jobDetails.length > 0 ? user.jobDetails.map((job, index) => (
            <div key={index}>
              <h6>{job.company} - {job.role}</h6>
              <p>{job.description}</p>
            </div>
          )) : <p>No job details available</p>}
        </div>

        {/* Skills */}
        <div className='skills-container'>
          <h4 className="profile-title">Skills</h4>
          <ul>
            <li>Java</li>
            <li>C++</li>
            <li>JavaScript</li>
            <li>HTML</li>
            <li>Python</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>

      <div className='description-container'>
        {/* Edit Profile Button */}
        <a href='/editprofile'>
          <div className='edit-profile-container'>
            <h6>Edit Profile</h6>
            <i className='bx bx-edit-alt'></i>
          </div>
        </a>

        {/* User Name & Role */}
        <h1>{user.name || 'Your Name'}</h1>
        <h4 className='role'>Full Stack Developer</h4>

        {/* Department Information */}
        <h4>Department Information</h4>
        <div className="info-parent-container">
          <div className="info-container">
            <h6>Department</h6>
            <p>{user.department || 'Not provided'}</p>
          </div>
          <div className="info-container">
            <h6>Year</h6>
            <p>{user.year || 'Not provided'}</p>
          </div>
          <div className="info-container">
            <h6>Semester</h6>
            <p>{user.semester || 'Not provided'}</p>
          </div>
          <div className="info-container">
            <h6>Roll No.</h6>
            <p>{user.rollNo || 'Not provided'}</p>
          </div>
          <div className="info-container">
            <h6>Section</h6>
            <p>{user.section || 'Not provided'}</p>
          </div>
        </div>

        {/* Contact Information */}
        <h4>Contact Information</h4>
        <div className='info-parent-container'>
          <div className='info-container'><h6>Phone</h6><p>{user.mobile || 'Not provided'}</p></div>
          <div className='info-container'><h6>Email</h6><p>{user.email || 'Not provided'}</p></div>
          <div className='info-container'><h6>Portfolio</h6><a href={user.portfolio || '#'}>{user.portfolio || 'Not provided'}</a></div>
          <div className='info-container'><h6>LinkedIn</h6><a href={user.linkedin || '#'}>{user.linkedin || 'Not provided'}</a></div>
          <div className='info-container'><h6>Github</h6><a href={user.github || '#'}>{user.github || 'Not provided'}</a></div>
        </div>

        {/* Coding Profiles */}
        <h4>Coding Profiles</h4>
        <div className='info-parent-container'>
          <div className='info-container'>
            <h6>LeetCode</h6>
            <a href={user.codingProfiles.leetcode ? `https://leetcode.com/${user.codingProfiles.leetcode}` : '#'}>
              {user.codingProfiles.leetcode || 'Not provided'}
            </a>
          </div>
          <div className='info-container'>
            <h6>CodeChef</h6>
            <a href={user.codingProfiles.codechef ? `https://www.codechef.com/users/${user.codingProfiles.codechef}` : '#'}>
              {user.codingProfiles.codechef || 'Not provided'}
            </a>
          </div>
          <div className='info-container'>
            <h6>Codeforces</h6>
            <a href={user.codingProfiles.codeforces ? `https://codeforces.com/profile/${user.codingProfiles.codeforces}` : '#'}>
              {user.codingProfiles.codeforces || 'Not provided'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

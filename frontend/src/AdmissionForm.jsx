import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits.';
    if (!formData.course.trim()) newErrors.course = 'Please select a course.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post('http://localhost:5000/submit-form', formData);
        console.log(res.data);
        setSuccess('🎉 Form submitted successfully!');
        setFormData({ fullName: '', email: '', phone: '', course: '' });
        setErrors({});
      } catch (error) {
        console.error('Submission error:', error);
        setSuccess('❌ Submission failed. Try again.');
      }
    }
  };

  return (
    <div className="wrapper">
      <h2 className="title">🎓 College Admission Form</h2>
      {success && <div className="success-msg">{success}</div>}

      <form onSubmit={handleSubmit} className="form-card">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? 'input-error' : ''}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'input-error' : ''}
          placeholder="Enter 10-digit phone number"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className={errors.course ? 'input-error' : ''}
        >
          <option value="">-- Select a Course --</option>
          <option value="BSc">BSc</option>
          <option value="BCA">BCA</option>
          <option value="BA">BA</option>
        </select>
        {errors.course && <p className="error">{errors.course}</p>}

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
};

export default AdmissionForm;

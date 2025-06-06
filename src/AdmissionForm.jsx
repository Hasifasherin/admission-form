import React, { useState } from 'react';
import './App.css';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      console.log(formData);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <h2>College Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div>
          <label>Course:</label>
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="BSc">BSc</option>
            <option value="BCA">BCA</option>
            <option value="BA">BA</option>
          </select>
          {errors.course && <span className="error">{errors.course}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdmissionForm;

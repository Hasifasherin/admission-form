const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admissionDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define a schema and model
const submissionSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  course: String
});

const Submission = mongoose.model('Submission', submissionSchema);

// ✅ Create the route that handles form submission
app.post('/submit-form', async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Submission failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

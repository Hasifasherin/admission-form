const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  course: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);

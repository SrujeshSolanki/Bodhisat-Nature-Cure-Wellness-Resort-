// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bodhisat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema
const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  preferable_call_time: String,
  city: String,
  country: String,
  visitprp: String,
  dateacefrm: String,
  dateaceto: String
});

// Model
const Inquiry = mongoose.model('Inquiry', InquirySchema);

// POST Route
app.post('/submit-inquiry', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(200).json({ success: true, message: "✅ Saved to MongoDB" });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ success: false, message: "❌ Error saving data", error });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});

document.getElementById("inquiry-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // assume you do a fetch POST here and get a successful response
  document.getElementById("popup").style.display = "block";
  
  // Hide after 3 seconds
  setTimeout(() => {
    document.getElementById("popup").style.display = "none";
  }, 3000);

  // Optionally reset form
  e.target.reset();
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema
const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  adults: String,
  kids: String,
  roomType: String,
  fromDate: String,
  toDate: String,
  wellnessProgram: String,
  otherProgram: String
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// Route to serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/form.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const formData = new Inquiry(req.body);

  try {
    await formData.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: 'New Inquiry Submission - Bodhisat Wellness Resort',
      html: `<h3>Inquiry Details</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Adults:</strong> ${req.body.adults}</p>
        <p><strong>Kids:</strong> ${req.body.kids}</p>
        <p><strong>Room Type:</strong> ${req.body.roomType}</p>
        <p><strong>From:</strong> ${req.body.fromDate}</p>
        <p><strong>To:</strong> ${req.body.toDate}</p>
        <p><strong>Wellness Program:</strong> ${req.body.wellnessProgram}</p>
        <p><strong>Other Program:</strong> ${req.body.otherProgram}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.send('<h2>Thank you for your inquiry. We will get back to you soon.</h2>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

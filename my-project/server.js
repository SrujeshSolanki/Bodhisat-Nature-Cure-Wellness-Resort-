const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/bodhisat_inquiries", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  type: String,
  treatment: String,
  otherreason: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

app.post("/submit-inquiry", async (req, res) => {
    try {
      // Save the inquiry to MongoDB
      const newInquiry = new Inquiry(req.body);
      await newInquiry.save();
  
      // Prepare the email content
      const mailOptions = {
        from: "your_email@gmail.com", // Sender address
        to: "solankisolanki@gmail.com", // Admin recipient address
        subject: "New Inquiry Received - Bodhisat Wellness Resort", // Email subject
        text: `
          Name: ${req.body.name}
          Email: ${req.body.email}
          Phone: ${req.body.phone}
          Type: ${req.body.type}
          Treatment: ${req.body.treatment || "N/A"}
          Other Reason: ${req.body.otherreason || "N/A"}
          Message: ${req.body.message || "N/A"}
        `, // Email body with inquiry details
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // Return success response
      res.status(200).json({ message: "Inquiry saved and email sent successfully" });
    } catch (error) {
      // Log any error that occurs and send error response
      console.error("Error saving inquiry or sending email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
  const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  type: String,
  treatment: String,
  otherreason: String,
  message: String,
}, { timestamps: true });

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const nodemailer = require("nodemailer");

// Create transporter using your email service (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "solankisrujesh@gmail.com",        // 🔁 replace with your email
    pass: "Solankii@1969",      // 🔁 use an app password, not your actual password
  },
});

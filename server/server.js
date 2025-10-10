const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gmail configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'gwellurah@gmail.com',
    pass: 'rdyo jcan rcih frhf' // App password
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Route to handle form submissions
app.post('/api/submit-application', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email content
    const mailOptions = {
      from: 'gwellurah@gmail.com',
      to: 'gwellurah@gmail.com',
      subject: `New Job Application - ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2c5aa0; text-align: center; margin-bottom: 30px;">
            🎉 New Job Application Received
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Applicant Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Full Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Position Applied For:</td>
                <td style="padding: 10px 0; color: #333; font-weight: bold; text-transform: capitalize;">${role}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2c5aa0;">
            <p style="margin: 0; color: #2c5aa0; font-weight: bold;">
              📧 This application was submitted through the CareConnect Kenya website.
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
              Please contact the applicant within 24 hours for the best response rate.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              🇰🇪 CareConnect Kenya - Building better lives through meaningful work
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`New application received from ${name} for ${role} position`);

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.'
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📧 Email service configured for gwellurah@gmail.com`);
});

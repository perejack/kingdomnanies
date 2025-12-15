const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Form submission handler - No email sending
// This is a demo form that doesn't send data anywhere
console.log('Server running in demo mode - form submissions are not sent anywhere');

// Route to handle form submissions (Demo mode - no data is sent)
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

    // Log the submission locally (not sent anywhere)
    console.log(`Form submitted (not sent anywhere):`);
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Phone: ${phone}`);
    console.log(`- Role: ${role}`);
    console.log('---');

    // Return success response without actually sending data
    res.status(200).json({
      success: true,
      message: 'Thank you for your interest! Your application has been received.'
    });

  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process application. Please try again.'
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
  console.log(`📝 Form submissions are processed locally only (demo mode)`);
});

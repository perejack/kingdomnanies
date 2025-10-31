// Demo function - no email sending

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Parse the request body
    const { name, email, phone, role } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Demo mode - Log the submission without sending it anywhere
    console.log('Form submission received (demo mode - not sent anywhere):');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Role: ${role}`);
    
    // Simulate successful submission without actually sending data

    console.log(`Demo: Application processed for ${name} (${role}) - no data sent`);

    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest! Your application has been received.'
    });

  } catch (error) {
    console.error('Error processing form:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to process application. Please try again.'
    });
  }
};

import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const { name, email, phone, role } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !phone || !role) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'All fields are required'
        })
      };
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

    // Create transporter and send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gwellurah@gmail.com',
        pass: 'rdyo jcan rcih frhf' // App password
      }
    });
    
    await transporter.sendMail(mailOptions);

    console.log(`New application received from ${name} for ${role} position`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Application submitted successfully!'
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to submit application. Please try again.'
      })
    };
  }
};

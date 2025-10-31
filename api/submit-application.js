import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { 
      firstName,
      lastName,
      email, 
      phone,
      role,
      experience,
      education,
      certifications,
      languages,
      availability,
      workSchedule,
      workLocation,
      paymentReference,
      formData
    } = req.body;

    // Validate required fields
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : (req.body.name || '');
    
    if (!fullName || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, email, phone' 
      });
    }

    // Prepare project-specific data
    const projectData = {
      firstName: firstName || '',
      lastName: lastName || '',
      role: role || '',
      experience: experience || '',
      education: education || '',
      certifications: certifications || '',
      languages: languages || '',
      availability: availability || '',
      workSchedule: workSchedule || '',
      workLocation: workLocation || '',
      submittedAt: new Date().toISOString(),
      ...formData // Include any additional form data
    };

    // Get client IP and user agent
    const ipAddress = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Insert into applications table
    const { data, error } = await supabase
      .from('applications')
      .insert({
        project_name: 'kingdomnanies',
        full_name: fullName,
        email: email,
        phone: phone,
        project_data: projectData,
        payment_reference: paymentReference || null,
        payment_status: 'unpaid',
        payment_amount: 120, // Verification fee
        ip_address: ipAddress.split(',')[0].trim(),
        user_agent: userAgent
      })
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to save application',
        error: error.message 
      });
    }

    console.log('Application saved successfully:', data.id);

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId: data.id,
        reference: data.payment_reference
      }
    });

  } catch (error) {
    console.error('Submit application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

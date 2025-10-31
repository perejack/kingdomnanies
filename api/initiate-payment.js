import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase credentials for Vercel deployment
const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    const { msisdn, amount, email, reference } = req.body;

    // Validate required fields
    if (!msisdn || !amount || !email || !reference) {
      return res.status(400).json({ 
        error: 'Missing required fields: msisdn, amount, email, reference' 
      });
    }

    // Validate phone number format
    if (!msisdn.match(/^254\d{9}$/)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format. Must be 254XXXXXXXXX' 
      });
    }

    // Validate amount
    if (amount < 1) {
      return res.status(400).json({ 
        error: 'Amount must be at least 1 KES' 
      });
    }

    // Hardcoded PesaFlux API key for deployment
    const apiKey = 'PSFXPCGLCY37';

    // Prepare request to PesaFlux API
    const pesafluxPayload = {
      api_key: apiKey,
      email: 'silverstonesolutions103@gmail.com',
      amount: amount.toString(),
      msisdn: msisdn,
      reference: reference,
      callback_url: 'https://completioncheckou.vercel.app/api/webhook',
    };

    // Try different API endpoints
    const endpoints = [
      'https://api.pesaflux.co.ke/v1/initiatestk',
      'https://api.pesaflux.co.ke/api/v1/payments/stk-push',
      'https://api.pesaflux.co.ke/api/payments/stk-push',
      'https://pesaflux.co.ke/v1/initiatestk'
    ];

    let response;

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'PesaFlux-Payment-App/1.0'
          },
          body: JSON.stringify(pesafluxPayload),
        });

        console.log(`API Response status: ${response.status} ${response.statusText}`);

        if (response.status !== 404) {
          // Found a working endpoint
          break;
        }
      } catch (error) {
        console.log(`Error with endpoint ${endpoint}:`, error.message);
        continue;
      }
    }

    if (!response || response.status === 404) {
      return res.status(502).json({
        error: 'PesaFlux API not accessible. Please check API endpoints.'
      });
    }

    console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('PesaFlux response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse PesaFlux response:', responseText);
      return res.status(502).json({ 
        error: 'Invalid response from payment service' 
      });
    }

    // Check if request was successful
    if (data.success === '200' || data.success === 200) {
      // Store transaction in Supabase
      try {
        const { error: dbError } = await supabase
          .from('transactions')
          .insert({
            transaction_request_id: data.transaction_request_id,
            status: 'pending',
            amount: amount,
            phone: msisdn,
            email: email,
            reference: reference,
          });

        if (dbError) {
          console.error('Database insert error:', dbError);
        } else {
          console.log('Transaction stored in database:', data.transaction_request_id);
        }
      } catch (dbErr) {
        console.error('Database error:', dbErr);
      }

      return res.status(200).json({
        success: data.success,
        massage: data.massage || data.message || 'Request sent successfully',
        transaction_request_id: data.transaction_request_id,
      });
    } else {
      console.error('PesaFlux error:', data);
      return res.status(400).json({
        error: data.massage || data.message || 'Payment initiation failed',
        details: data,
      });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

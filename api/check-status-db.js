import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase credentials for Vercel deployment
const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  // Allow both GET and POST requests
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let transaction_request_id;

    // Get transaction ID from query parameter (GET) or body (POST)
    if (req.method === 'GET') {
      // Extract from query parameter
      transaction_request_id = req.query.transaction_request_id;
    } else {
      // Parse from POST body
      transaction_request_id = req.body.transaction_request_id;
    }

    // Validate transaction ID
    if (!transaction_request_id) {
      return res.status(400).json({
        error: 'Missing transaction_request_id'
      });
    }

    console.log('Checking transaction status in database:', transaction_request_id);

    // Query database for transaction status
    const { data: transaction, error: dbError } = await supabase
      .from('transactions')
      .select('*')
      .eq('transaction_request_id', transaction_request_id)
      .single();

    if (dbError) {
      console.error('Database query error:', dbError);
      return res.status(404).json({
        error: 'Transaction not found'
      });
    }

    // Return the status data in the format expected by frontend
    return res.status(200).json({
      success: true,
      payment: {
        status: transaction.status, // 'success', 'failed', 'cancelled', 'pending'
        amount: transaction.amount,
        phoneNumber: transaction.phone,
        mpesaReceiptNumber: transaction.receipt_number,
        resultDesc: transaction.result_description,
        resultCode: transaction.result_code,
        timestamp: transaction.updated_at,
      }
    });
  } catch (error) {
    console.error('Status check error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

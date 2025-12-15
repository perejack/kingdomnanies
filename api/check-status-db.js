import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase credentials for Vercel deployment
const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc';

const supabase = createClient(supabaseUrl, supabaseKey);

// SwiftPay M-Pesa Verification Proxy
const MPESA_PROXY_URL = process.env.MPESA_PROXY_URL || 'https://swiftpay-backend-uvv9.onrender.com/api/mpesa-verification-proxy';
const MPESA_PROXY_API_KEY = process.env.MPESA_PROXY_API_KEY || '';

// Query M-Pesa payment status via SwiftPay proxy
async function queryMpesaPaymentStatus(checkoutId) {
  try {
    console.log(`Querying M-Pesa status for ${checkoutId} via proxy`);
    
    const response = await fetch(MPESA_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checkoutId: checkoutId,
        apiKey: MPESA_PROXY_API_KEY
      })
    });

    if (!response.ok) {
      console.error('Proxy response status:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Proxy response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error querying M-Pesa via proxy:', error.message);
    return null;
  }
}

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
      .maybeSingle();

    if (dbError) {
      console.error('Database query error:', dbError);
      return res.status(500).json({
        error: 'Error checking payment status',
        message: dbError.message
      });
    }

    if (transaction) {
      console.log(`Payment status found for ${transaction_request_id}:`, transaction);
      
      let paymentStatus = 'PENDING';
      if (transaction.status === 'success' || transaction.status === 'completed') {
        paymentStatus = 'SUCCESS';
      } else if (transaction.status === 'failed' || transaction.status === 'cancelled') {
        paymentStatus = 'FAILED';
      }
      
      // If status is still pending, query M-Pesa via SwiftPay proxy
      if (paymentStatus === 'PENDING') {
        console.log(`Status is pending, querying M-Pesa via proxy for ${transaction.transaction_request_id}`);
        try {
          const proxyResponse = await queryMpesaPaymentStatus(transaction.transaction_request_id);
          
          if (proxyResponse && proxyResponse.success && proxyResponse.payment.status === 'success') {
            console.log(`Proxy confirmed payment success for ${transaction.transaction_request_id}, updating database`);
            
            // Update transaction to success
            const { data: updatedTransaction, error: updateError } = await supabase
              .from('transactions')
              .update({
                status: 'success'
              })
              .eq('id', transaction.id)
              .select();
            
            if (!updateError && updatedTransaction && updatedTransaction.length > 0) {
              paymentStatus = 'SUCCESS';
              console.log(`Transaction ${transaction.transaction_request_id} updated to success:`, updatedTransaction[0]);
            } else if (updateError) {
              console.error('Error updating transaction:', updateError);
            }
          } else if (proxyResponse && proxyResponse.payment.status === 'failed') {
            paymentStatus = 'FAILED';
            console.log(`Proxy confirmed payment failed for ${transaction.transaction_request_id}`);
          }
        } catch (proxyError) {
          console.error('Error querying M-Pesa via proxy:', proxyError);
          // Continue with local status if proxy query fails
        }
      }
      
      // Return the status data in the format expected by frontend
      return res.status(200).json({
        success: true,
        payment: {
          status: paymentStatus,
          amount: transaction.amount,
          phoneNumber: transaction.phone,
          mpesaReceiptNumber: transaction.receipt_number,
          resultDesc: transaction.result_description,
          resultCode: transaction.result_code,
          timestamp: transaction.updated_at,
        }
      });
    } else {
      console.log(`Payment status not found for ${transaction_request_id}, still pending`);
      
      return res.status(200).json({
        success: true,
        payment: {
          status: 'PENDING',
          message: 'Payment is still being processed'
        }
      });
    }
  } catch (error) {
    console.error('Status check error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

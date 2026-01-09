import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import API handlers
import submitApplication from '../api/submit-application.js';
import initiatePayment from '../api/initiate-payment.js';
import checkStatus from '../api/check-status-db.js';
import webhook from '../api/webhook.js';

// API routes
app.post('/api/submit-application', submitApplication);
app.post('/api/initiate-payment', initiatePayment);
app.post('/api/check-status-db', checkStatus);
app.post('/api/webhook', webhook);
app.get('/api/check-status-db', checkStatus);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 API endpoints available:`);
  console.log(`   - POST /api/submit-application`);
  console.log(`   - POST /api/initiate-payment`);
  console.log(`   - POST /api/check-status-db`);
  console.log(`   - POST /api/webhook`);
});

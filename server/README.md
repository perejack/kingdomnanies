# CareConnect Kenya - Email Server

This backend server handles form submissions from the CareConnect Kenya website and sends email notifications to `gwellurah@gmail.com`.

## Setup Instructions

### 1. Install Dependencies
Navigate to the server directory and install the required packages:

```bash
cd server
npm install
```

### 2. Start the Server
Run the server in development mode:

```bash
npm run dev
```

Or in production mode:

```bash
npm start
```

The server will start on `http://localhost:3001`

### 3. Email Configuration
The server is already configured to use:
- **Email:** gwellurah@gmail.com
- **App Password:** rdyo jcan rcih frhf

## How It Works

1. When a user submits the application form on the website, the data is sent to `/api/submit-application`
2. The server validates the form data
3. An email is sent to `gwellurah@gmail.com` with the applicant's details
4. A success/error response is sent back to the frontend

## Email Format

The email includes:
- Applicant's full name
- Email address
- Phone number
- Position applied for
- Professional HTML formatting
- CareConnect Kenya branding

## API Endpoints

- `POST /api/submit-application` - Submit application form
- `GET /api/health` - Health check

## Security Notes

- The Gmail app password is included in the code for simplicity
- In production, use environment variables for sensitive data
- Consider rate limiting for form submissions

## Troubleshooting

1. **Email not sending:** Check Gmail app password and internet connection
2. **CORS errors:** Ensure the frontend is running on the expected port
3. **Port conflicts:** Change the PORT variable if 3001 is in use

## Running Both Frontend and Backend

1. **Terminal 1 (Frontend):**
   ```bash
   npm run dev
   ```

2. **Terminal 2 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

The frontend will be on `http://localhost:5173` and backend on `http://localhost:3001`.

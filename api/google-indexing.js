/**
 * Google Indexing API Serverless Function
 * 
 * This function submits URLs to Google Indexing API for faster indexing.
 * 
 * Environment variables required:
 * - GOOGLE_CLIENT_EMAIL: Service account email
 * - GOOGLE_PRIVATE_KEY: Service account private key
 * - SITE_URL: Your website URL (e.g., https://adsnow.ro)
 * 
 * Usage:
 * POST /api/google-indexing
 * Body: { "url": "https://adsnow.ro/blog/article-slug" }
 */

import jwt from 'jsonwebtoken';

// For Vercel Node.js runtime
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // In Vercel Node.js runtime, body is automatically parsed if Content-Type is application/json
  const body = req.body || {};

  const { url } = body;

  // Validate URL
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Get environment variables
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const siteUrl = process.env.SITE_URL || (process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://adsnow.ro');

  // Validate environment variables
  if (!clientEmail || !privateKey) {
    console.error('Missing Google credentials');
    return res.status(500).json({ 
      error: 'Google Indexing API credentials not configured' 
    });
  }

  // Verify URL belongs to the site
  if (!url.startsWith(siteUrl)) {
    return res.status(400).json({ 
      error: 'URL does not belong to the configured site' 
    });
  }

  try {
    // Get access token using service account
    const accessToken = await getAccessToken(clientEmail, privateKey);

    // Submit URL to Google Indexing API
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED' // Use 'URL_UPDATED' for updates, 'URL_DELETED' for deletions
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google Indexing API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to submit URL to Google',
        details: errorData
      });
    }

    const result = await response.json();
    
    return res.status(200).json({
      success: true,
      message: 'URL submitted to Google successfully',
      url: url,
      result: result
    });

  } catch (error) {
    console.error('Error submitting to Google Indexing API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Get access token using service account credentials
 */
async function getAccessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    },
    privateKey,
    { algorithm: 'RS256' }
  );

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

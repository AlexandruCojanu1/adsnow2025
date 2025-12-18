/**
 * Google Indexing API Serverless Function
 * 
 * This function submits URLs to Google Indexing API for faster indexing.
 * 
 * Environment variables required:
 * - GOOGLE_CLIENT_EMAIL: Service account email
 * - GOOGLE_PRIVATE_KEY: Service account private key
 * - SITE_URL: Your website URL (e.g., https://adsnow.vercel.app)
 * 
 * Usage:
 * POST /api/google-indexing
 * Body: { "url": "https://adsnow.vercel.app/blog/article-slug" }
 */

import jwt from 'jsonwebtoken';

// For Vercel serverless functions - using Request/Response format
export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  const { url } = body;

  // Validate URL
  if (!url || typeof url !== 'string') {
    return new Response(
      JSON.stringify({ error: 'URL is required' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid URL format' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Get environment variables
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const siteUrl = process.env.SITE_URL || (process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://adsnow.vercel.app');

  // Validate environment variables
  if (!clientEmail || !privateKey) {
    console.error('Missing Google credentials');
    return new Response(
      JSON.stringify({ 
        error: 'Google Indexing API credentials not configured' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Verify URL belongs to the site
  if (!url.startsWith(siteUrl)) {
    return new Response(
      JSON.stringify({ 
        error: 'URL does not belong to the configured site' 
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
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
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit URL to Google',
          details: errorData
        }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const result = await response.json();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'URL submitted to Google successfully',
        url: url,
        result: result
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    console.error('Error submitting to Google Indexing API:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
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

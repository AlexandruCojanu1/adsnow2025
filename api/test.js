/**
 * Test API endpoint to verify Vercel serverless functions work
 */
export default async function handler(req) {
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'API is working!',
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

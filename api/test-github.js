/**
 * Test GitHub API connectivity
 */
export default async function handler(req) {
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

  try {
    const { githubToken } = await req.json();
    
    if (!githubToken) {
      return new Response(
        JSON.stringify({ error: 'GitHub token is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Test 1: Verify token
    console.log('Test 1: Verifying GitHub token...');
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function',
      },
    });
    
    if (!userResponse.ok) {
      const error = await userResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ 
          error: 'Invalid token',
          status: userResponse.status,
          details: error
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
    
    const userData = await userResponse.json();
    console.log('✓ Token verified for user:', userData.login);

    // Test 2: Check repository access
    console.log('Test 2: Checking repository access...');
    const repoResponse = await fetch('https://api.github.com/repos/AlexandruCojanu1/adsnow2025', {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function',
      },
    });
    
    if (!repoResponse.ok) {
      const error = await repoResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ 
          error: 'Cannot access repository',
          status: repoResponse.status,
          details: error
        }),
        {
          status: repoResponse.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
    
    const repoData = await repoResponse.json();
    console.log('✓ Repository accessible:', repoData.full_name);

    // Test 3: Try to get a file
    console.log('Test 3: Testing file access...');
    const fileResponse = await fetch('https://api.github.com/repos/AlexandruCojanu1/adsnow2025/contents/src/Data/blogPosts.js', {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function',
      },
    });
    
    const fileData = fileResponse.ok ? await fileResponse.json() : null;
    console.log('✓ File access test:', fileResponse.ok ? 'Success' : `Failed (${fileResponse.status})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'All tests passed!',
        tests: {
          token: { success: true, user: userData.login },
          repository: { success: true, name: repoData.full_name },
          fileAccess: { success: fileResponse.ok, status: fileResponse.status, hasFile: !!fileData }
        }
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
    console.error('Test error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Test failed',
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

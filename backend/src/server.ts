import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

/**
 * Health check endpoint
 */
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Landing page
 */
app.get('/', (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>github-mcp Auth</title>
      <style>
        body { font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        h1 { color: #333; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>github-mcp Auth Backend</h1>
      <p>This service handles OAuth callbacks for <a href="https://github.com/ldraney/github-mcp">github-mcp</a>.</p>
      <p>To authenticate, run:</p>
      <pre><code>npx github-mcp</code></pre>
    </body>
    </html>
  `);
});

/**
 * OAuth callback handler
 *
 * Receives code from GitHub, exchanges for token, redirects to localhost
 * State format: <port>:<nonce>
 */
app.get('/callback', async (req: Request, res: Response) => {
  const { code, state, error, error_description } = req.query;

  // Handle OAuth errors from GitHub
  if (error) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Auth Error</title></head>
      <body>
        <h1>Authentication Error</h1>
        <p>${error_description || error}</p>
        <p>Please close this window and try again.</p>
      </body>
      </html>
    `);
    return;
  }

  // Validate required parameters
  if (!code || typeof code !== 'string') {
    res.status(400).send('Missing authorization code');
    return;
  }

  if (!state || typeof state !== 'string') {
    res.status(400).send('Missing state parameter');
    return;
  }

  // Parse state: <port>:<nonce>
  const [portStr, nonce] = state.split(':');
  const port = parseInt(portStr, 10);

  if (isNaN(port) || port < 1024 || port > 65535) {
    res.status(400).send('Invalid state: bad port');
    return;
  }

  if (!nonce || nonce.length < 16) {
    res.status(400).send('Invalid state: bad nonce');
    return;
  }

  // Check environment
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    console.error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET');
    res.status(500).send('Server configuration error');
    return;
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`GitHub token exchange failed: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json() as {
      access_token?: string;
      token_type?: string;
      scope?: string;
      error?: string;
      error_description?: string;
    };

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    if (!tokenData.access_token) {
      throw new Error('No access token in response');
    }

    // Redirect to localhost with token
    const redirectUrl = new URL(`http://localhost:${port}/callback`);
    redirectUrl.searchParams.set('token', tokenData.access_token);
    redirectUrl.searchParams.set('nonce', nonce);
    if (tokenData.scope) {
      redirectUrl.searchParams.set('scope', tokenData.scope);
    }

    res.redirect(redirectUrl.toString());
  } catch (err) {
    console.error('Token exchange error:', err);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Auth Error</title></head>
      <body>
        <h1>Authentication Failed</h1>
        <p>${err instanceof Error ? err.message : 'Unknown error'}</p>
        <p>Please close this window and try again.</p>
      </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`github-mcp auth backend listening on port ${PORT}`);
});

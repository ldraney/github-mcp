import http from 'node:http';
import { URL } from 'node:url';

interface CallbackResult {
  token: string;
  scopes?: string;
}

/**
 * Start a temporary HTTP server to receive OAuth callback
 *
 * @param expectedNonce - The nonce to validate against
 * @returns Promise that resolves with token when callback is received
 */
export function startLocalCallbackServer(expectedNonce: string): Promise<{
  port: number;
  waitForCallback: () => Promise<CallbackResult>;
  close: () => void;
}> {
  return new Promise((resolveServer, rejectServer) => {
    let callbackResolve: (result: CallbackResult) => void;
    let callbackReject: (error: Error) => void;

    const callbackPromise = new Promise<CallbackResult>((resolve, reject) => {
      callbackResolve = resolve;
      callbackReject = reject;
    });

    const server = http.createServer((req, res) => {
      if (!req.url) {
        res.writeHead(400);
        res.end('Bad request');
        return;
      }

      const url = new URL(req.url, `http://localhost`);

      if (url.pathname !== '/callback') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const token = url.searchParams.get('token');
      const nonce = url.searchParams.get('nonce');
      const scopes = url.searchParams.get('scope');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>Auth Error</title></head>
          <body>
            <h1>Authentication Failed</h1>
            <p>${error}</p>
            <p>You can close this window.</p>
          </body>
          </html>
        `);
        callbackReject(new Error(error));
        return;
      }

      if (!token) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>Auth Error</title></head>
          <body>
            <h1>Authentication Failed</h1>
            <p>No token received.</p>
            <p>You can close this window.</p>
          </body>
          </html>
        `);
        callbackReject(new Error('No token received'));
        return;
      }

      if (nonce !== expectedNonce) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>Auth Error</title></head>
          <body>
            <h1>Authentication Failed</h1>
            <p>Invalid nonce - possible CSRF attack.</p>
            <p>You can close this window.</p>
          </body>
          </html>
        `);
        callbackReject(new Error('Nonce mismatch - possible CSRF attack'));
        return;
      }

      // Success!
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authentication Successful</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .card {
              background: white;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
              text-align: center;
            }
            .checkmark {
              font-size: 64px;
              margin-bottom: 20px;
            }
            h1 { color: #333; margin: 0 0 10px 0; }
            p { color: #666; margin: 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="checkmark">&#10003;</div>
            <h1>Authenticated!</h1>
            <p>You can close this window and return to your terminal.</p>
          </div>
        </body>
        </html>
      `);

      callbackResolve({ token, scopes: scopes || undefined });
    });

    // Listen on random available port
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        rejectServer(new Error('Failed to get server port'));
        return;
      }

      resolveServer({
        port: address.port,
        waitForCallback: () => callbackPromise,
        close: () => server.close(),
      });
    });

    server.on('error', (err) => {
      rejectServer(err);
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      callbackReject(new Error('Authentication timed out'));
      server.close();
    }, 5 * 60 * 1000);
  });
}

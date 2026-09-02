import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<{ success: boolean; errorCodes?: string[] }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const outcome = (await verifyResponse.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };

    return {
      success: Boolean(outcome?.success),
      errorCodes: outcome?.['error-codes'],
    };
  } catch (err) {
    console.error('Error verifying Turnstile token server-side:', err);
    return {
      success: false,
      errorCodes: ['internal-verification-error'],
    };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Alqalam Islamic School Backend' });
  });

  // Dedicated Turnstile Token Verification endpoint
  app.post('/api/verify-turnstile', async (req, res) => {
    const { token } = req.body || {};
    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp;
    const result = await verifyTurnstileToken(token, clientIp);

    if (!result.success) {
      return res.status(403).json({
        success: false,
        error: 'Token validation failed',
        errorCodes: result.errorCodes,
      });
    }

    return res.json({ success: true, verified: true });
  });

  // Admission & Contact Inquiry submission endpoint with mandatory anti-bot token verification
  app.post('/api/admission-inquiry', async (req, res) => {
    const { parentName, phone, grade, email, message, turnstileToken } = req.body || {};

    // 1. Anti-bot validation is mandatory
    if (!turnstileToken) {
      return res.status(400).json({
        success: false,
        error: 'Security token is missing. Please complete the anti-bot verification.',
      });
    }

    // 2. Perform real server-side validation against Cloudflare
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp;
    const verification = await verifyTurnstileToken(turnstileToken, clientIp);

    if (!verification.success) {
      return res.status(403).json({
        success: false,
        error: 'Anti-bot verification failed. Please refresh the security check and try again.',
        errorCodes: verification.errorCodes,
      });
    }

    // 3. Field validation
    if (!parentName?.trim() || !phone?.trim() || !grade?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Parent Name, Contact Number, and Grade are required.',
      });
    }

    console.log(`[Admission Inquiry Verified] ${parentName} (${phone}) - Grade: ${grade}`);

    return res.json({
      success: true,
      message: 'Admission inquiry submitted and security verified successfully.',
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { parentName, phone, grade, turnstileToken } = req.body || {};

  if (!turnstileToken) {
    return res.status(400).json({
      success: false,
      error: 'Security token is missing. Please complete the anti-bot verification.',
    });
  }

  const secretKey =
    process.env.TURNSTILE_SECRET ||
    process.env.TURNSTILE_SECRET_KEY ||
    '0x4AAAAAAElDsi3_VsYuHvL2pfKsrJrZwNY';

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', turnstileToken);

    const rawIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
    if (rawIp) {
      const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp;
      formData.append('remoteip', clientIp);
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const outcome = (await verifyResponse.json()) as { success: boolean; 'error-codes'?: string[] };

    if (!outcome.success) {
      return res.status(403).json({
        success: false,
        error: 'Anti-bot verification failed. Please refresh the security check and try again.',
        errorCodes: outcome['error-codes'],
      });
    }

    if (!parentName?.trim() || !phone?.trim() || !grade?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Parent Name, Contact Number, and Grade are required.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Admission inquiry submitted and security verified successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Serverless turnstile error:', err);
    return res.status(500).json({ success: false, error: 'Internal verification error' });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface SendBody {
  to?: string;
  senderName?: string;
  dinnerChoice?: string;
  activityChoice?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHtml(senderName: string, dinner: string, activity: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px;background:#fdf6f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#3d2b1f;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 8px 32px rgba(192,108,108,0.12);">
      <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#c46b6b;margin:0 0 8px;font-weight:700;">Date Plan</p>
      <h1 style="font-size:28px;margin:0 0 24px;color:#c46b6b;">${escapeHtml(senderName)} picked our 3-month anniversary date 💖</h1>

      <div style="padding:16px 0;border-top:1px solid #f3dada;">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#c46b6b;font-weight:700;">🍽️ Dinner</p>
        <p style="margin:0;font-size:22px;">${escapeHtml(dinner)}</p>
      </div>

      <div style="padding:16px 0;border-top:1px solid #f3dada;">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#c46b6b;font-weight:700;">✨ Then</p>
        <p style="margin:0;font-size:22px;">${escapeHtml(activity)}</p>
      </div>

      <p style="margin:24px 0 0;font-size:16px;color:#7a5a4a;">Can't wait! 💕</p>
    </div>
  </body>
</html>`;
}

function renderText(senderName: string, dinner: string, activity: string): string {
  return `${senderName} picked our 3-month anniversary date!

Dinner: ${dinner}
Then: ${activity}

Can't wait!`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured' });
  }

  const body = (req.body ?? {}) as SendBody;
  const to = body.to?.trim();
  const senderName = body.senderName?.trim() || 'She';
  const dinner = body.dinnerChoice?.trim();
  const activity = body.activityChoice?.trim();

  if (!to || !dinner || !activity) {
    return res.status(400).json({ error: 'Missing to, dinnerChoice, or activityChoice' });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: 'Anniversary Invite <onboarding@resend.dev>',
      to: [to],
      subject: `${senderName} picked our 3-month anniversary date 💖`,
      html: renderHtml(senderName, dinner, activity),
      text: renderText(senderName, dinner, activity)
    });

    if (error) {
      return res.status(502).json({ error: error.message ?? 'Resend rejected the request' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err instanceof Error ? err.message : 'Unknown error sending email' });
  }
}

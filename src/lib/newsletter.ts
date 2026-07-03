// Newsletter subscribe — client helper. Posts to /api/subscribe, which adds the
// address to the Resend audience and sends a welcome email.

export type SubscribeResult = { ok: boolean; error?: string }

export async function subscribeNewsletter(email: string, honeypot?: boolean, mountedAt?: number): Promise<SubscribeResult> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        company: honeypot ? 'bot' : undefined,
        elapsedMs: mountedAt ? Date.now() - mountedAt : undefined,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return { ok: false, error: data.error || 'Could not subscribe just now.' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Could not reach the server. Please try again.' }
  }
}

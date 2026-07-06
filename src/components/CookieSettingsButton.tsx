'use client'

import { openCookiePreferences } from '@/lib/consent'

export default function CookieSettingsButton({ label = 'Manage cookie preferences' }: { label?: string }) {
  return (
    <button type="button" className="cp-manage-btn" onClick={openCookiePreferences}>
      {label}
    </button>
  )
}

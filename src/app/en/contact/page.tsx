import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Adventure Experts Georgia to plan your private trip in the Caucasus — WhatsApp, email or the enquiry form. Certified local guides based in Tbilisi.',
}

export default function ContactPage() {
  return <ContactContent />
}

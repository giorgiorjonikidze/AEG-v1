import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Adventure Experts Georgia collects, uses and protects your personal data. Aligned with the Law of Georgia on Personal Data Protection and EU GDPR.',
}

const SECTIONS = [
  { id: 'who-we-are',            label: '1. Who we are' },
  { id: 'data-we-collect',       label: '2. Data we collect' },
  { id: 'legal-basis',           label: '3. Legal basis' },
  { id: 'marketing',             label: '4. Marketing' },
  { id: 'cookies',               label: '5. Cookies & analytics' },
  { id: 'sharing',               label: '6. Who we share with' },
  { id: 'transfers',             label: '7. International transfers' },
  { id: 'retention',             label: '8. Retention' },
  { id: 'your-rights',           label: '9. Your rights' },
  { id: 'security',              label: '10. Security' },
  { id: 'breaches',              label: '11. Data breaches' },
  { id: 'children',             label: '12. Children & minors' },
  { id: 'changes',              label: '13. Changes' },
  { id: 'contact',              label: '14. Contact' },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Tokens ───────────────────────────────────────────────────── */
        :root {
          --pp-cream:    #FAF8F3;
          --pp-cream2:   #F4F1EB;
          --pp-ink:      #1E1C19;
          --pp-body:     #4A463E;
          --pp-muted:    #6B655C;
          --pp-stone:    #A8A296;
          --pp-terra:    #C75A37;
          --pp-forest:   #2E4034;
          --pp-dark:     #23332A;
          --pp-border:   rgba(30,28,25,.10);
          --pp-fill:     rgba(199,90,55,.07);
        }

        /* ── Layout ───────────────────────────────────────────────────── */
        .pp-hero {
          background: linear-gradient(158deg,#34503E 0%,#23332A 46%,#191712 100%);
          padding: clamp(72px,11vh,120px) clamp(20px,5vw,56px) clamp(48px,7vh,80px);
          position: relative;
          overflow: hidden;
        }
        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(250,248,243,.025) 0,
            rgba(250,248,243,.025) 1px,
            transparent 1px,
            transparent 8px
          );
          pointer-events: none;
        }
        .pp-hero-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
        }
        .pp-eyebrow {
          font-family: var(--font-hanken), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(240,184,148,.85);
          margin: 0 0 18px;
        }
        .pp-hero h1 {
          font-family: var(--font-spectral), serif;
          font-size: clamp(36px,6vw,64px);
          font-weight: 500;
          color: #FAF8F3;
          line-height: .98;
          letter-spacing: -1px;
          margin: 0 0 20px;
        }
        .pp-hero-meta {
          font-family: var(--font-hanken), sans-serif;
          font-size: 14px;
          color: rgba(250,248,243,.5);
          margin: 0;
        }
        .pp-hero-meta strong { color: rgba(250,248,243,.75); }
        .pp-draft-banner {
          margin-top: 28px;
          padding: 12px 18px;
          background: rgba(199,90,55,.18);
          border: 1px solid rgba(199,90,55,.35);
          border-radius: 10px;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13px;
          color: rgba(240,184,148,.9);
          line-height: 1.55;
        }
        .pp-draft-banner strong { color: #F0B894; }

        /* ── Body wrapper ─────────────────────────────────────────────── */
        .pp-body {
          background: var(--pp-cream);
          padding: clamp(48px,7vh,90px) clamp(20px,5vw,56px);
        }
        .pp-body-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0 56px;
          align-items: start;
        }

        /* ── TOC ──────────────────────────────────────────────────────── */
        .pp-toc {
          position: sticky;
          top: 96px;
          padding: 24px 0;
        }
        .pp-toc-label {
          font-family: var(--font-hanken), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--pp-stone);
          margin: 0 0 14px;
        }
        .pp-toc ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 1px solid var(--pp-border);
        }
        .pp-toc li { margin: 0; }
        .pp-toc a {
          display: block;
          padding: 5px 0 5px 14px;
          font-family: var(--font-hanken), sans-serif;
          font-size: 12.5px;
          color: var(--pp-muted);
          text-decoration: none;
          transition: color .2s;
          border-left: 2px solid transparent;
          margin-left: -1px;
        }
        .pp-toc a:hover { color: var(--pp-terra); border-left-color: var(--pp-terra); }

        /* ── Prose ────────────────────────────────────────────────────── */
        .pp-prose { max-width: 720px; }

        .pp-section { margin-bottom: 56px; }
        .pp-section:last-child { margin-bottom: 0; }

        .pp-section-num {
          font-family: var(--font-hanken), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--pp-terra);
          margin: 0 0 8px;
        }
        .pp-section h2 {
          font-family: var(--font-spectral), serif;
          font-size: clamp(22px,2.8vw,30px);
          font-weight: 500;
          color: var(--pp-ink);
          line-height: 1.1;
          letter-spacing: -.3px;
          margin: 0 0 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--pp-border);
        }
        .pp-prose p {
          font-family: var(--font-hanken), sans-serif;
          font-size: clamp(15px,1.6vw,17px);
          color: var(--pp-body);
          line-height: 1.72;
          margin: 0 0 16px;
        }
        .pp-prose p:last-child { margin-bottom: 0; }
        .pp-prose ul, .pp-prose ol {
          font-family: var(--font-hanken), sans-serif;
          font-size: clamp(15px,1.6vw,17px);
          color: var(--pp-body);
          line-height: 1.72;
          margin: 0 0 16px;
          padding-left: 22px;
        }
        .pp-prose li { margin-bottom: 6px; }
        .pp-prose strong { color: var(--pp-ink); font-weight: 600; }

        /* placeholder highlight */
        .pp-fill {
          background: var(--pp-fill);
          border: 1px solid rgba(199,90,55,.22);
          border-radius: 4px;
          padding: 0 5px;
          color: var(--pp-terra);
          font-weight: 600;
          font-style: normal;
          font-size: .9em;
        }

        /* note callout */
        .pp-note {
          background: var(--pp-cream2);
          border-left: 3px solid var(--pp-stone);
          border-radius: 0 8px 8px 0;
          padding: 12px 16px;
          margin: 16px 0;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13.5px;
          color: var(--pp-muted);
          line-height: 1.6;
        }
        .pp-note strong { color: var(--pp-body); }

        /* sub-heading within section */
        .pp-prose h3 {
          font-family: var(--font-hanken), sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--pp-ink);
          margin: 24px 0 8px;
        }

        /* table */
        .pp-table-wrap { overflow-x: auto; margin: 16px 0 24px; }
        .pp-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-hanken), sans-serif;
          font-size: 14.5px;
        }
        .pp-table thead tr {
          background: var(--pp-forest);
        }
        .pp-table thead th {
          color: rgba(250,248,243,.88);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 11px 16px;
          text-align: left;
        }
        .pp-table tbody tr {
          border-bottom: 1px solid var(--pp-border);
        }
        .pp-table tbody tr:last-child { border-bottom: none; }
        .pp-table tbody td {
          padding: 12px 16px;
          color: var(--pp-body);
          vertical-align: top;
          line-height: 1.55;
        }
        .pp-table tbody tr:nth-child(even) td {
          background: rgba(250,248,243,.6);
        }
        .pp-table tbody td:first-child { font-weight: 500; color: var(--pp-ink); }

        /* rights grid */
        .pp-rights {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          margin: 16px 0 24px;
        }
        .pp-right-card {
          background: #fff;
          border: 1px solid var(--pp-border);
          border-radius: 12px;
          padding: 14px 16px;
        }
        .pp-right-card strong {
          display: block;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--pp-forest);
          margin-bottom: 4px;
        }
        .pp-right-card span {
          font-family: var(--font-hanken), sans-serif;
          font-size: 13px;
          color: var(--pp-muted);
          line-height: 1.5;
        }

        /* contact card */
        .pp-contact-card {
          background: var(--pp-dark);
          border-radius: 16px;
          padding: 28px 30px;
          margin-top: 20px;
        }
        .pp-contact-card p {
          color: rgba(250,248,243,.72) !important;
        }
        .pp-contact-card strong { color: rgba(250,248,243,.92) !important; }
        .pp-contact-card a {
          color: #F0B894;
          text-decoration: underline;
          text-decoration-color: rgba(240,184,148,.35);
        }
        .pp-contact-card a:hover { color: #FAF8F3; }

        /* ── Responsive ───────────────────────────────────────────────── */
        @media (max-width: 800px) {
          .pp-body-inner {
            grid-template-columns: 1fr;
          }
          .pp-toc { display: none; }
        }
      ` }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pp-hero">
        <div className="pp-hero-inner">
          <p className="pp-eyebrow">Legal · Privacy</p>
          <h1>Privacy Policy</h1>
          <p className="pp-hero-meta">
            <strong>Last updated:</strong> <em className="pp-fill">[DATE]</em>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            Aligned with the Law of Georgia on Personal Data Protection &amp; EU GDPR
          </p>
          <div className="pp-draft-banner">
            <strong>DRAFT — not legal advice.</strong> Fill every <span style={{background:'rgba(199,90,55,.25)',padding:'0 4px',borderRadius:3}}>highlighted placeholder</span> with your real details, remove clauses that don't apply, and have this reviewed by a Georgian lawyer before publishing. Provide a Georgian-language version and state which controls.
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="pp-body">
        <div className="pp-body-inner">

          {/* TOC */}
          <nav className="pp-toc" aria-label="Page sections">
            <p className="pp-toc-label">Contents</p>
            <ul>
              {SECTIONS.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Prose */}
          <div className="pp-prose">

            {/* 1 */}
            <section id="who-we-are" className="pp-section">
              <p className="pp-section-num">Section 01</p>
              <h2>Who we are</h2>
              <p>
                This Privacy Policy explains how <strong><em className="pp-fill">[REGISTERED LEGAL NAME]</em> ("Adventure Experts Georgia", "we", "us")</strong> collects and uses your personal data when you visit <strong><em className="pp-fill">[adventure-experts-georgia.vercel.app / final domain]</em></strong>, send us an enquiry, or travel with us.
              </p>
              <p>We are the data <strong>controller</strong> of your information.</p>
              <ul>
                <li><strong>Registered address:</strong> <em className="pp-fill">[ADDRESS, GEORGIA]</em></li>
                <li><strong>Email:</strong> <em className="pp-fill">[PRIVACY/CONTACT EMAIL]</em></li>
                <li><strong>Phone / WhatsApp:</strong> <em className="pp-fill">[NUMBER]</em></li>
                <li><strong>Privacy contact:</strong> <em className="pp-fill">[NAME OR ROLE]</em></li>
              </ul>
              <div className="pp-note">
                A formal Data Protection Officer is generally only required for large-scale or sensitive processing. A small operator usually names a privacy contact instead — confirm with your lawyer, especially once the Children's Camp launches.
              </div>
            </section>

            {/* 2 */}
            <section id="data-we-collect" className="pp-section">
              <p className="pp-section-num">Section 02</p>
              <h2>The data we collect</h2>

              <h3>You give us directly</h3>
              <p>Mainly via enquiry forms, email and WhatsApp:</p>
              <ul>
                <li>Name, email, phone/WhatsApp, and country of residence</li>
                <li>Your trip enquiry details, group size, dates and preferences</li>
                <li>Booking and billing details once a trip is confirmed <em className="pp-fill">[list what you actually store]</em></li>
              </ul>

              <h3>Special-category data</h3>
              <p>Only when relevant to a trip:</p>
              <ul>
                <li>Health, medical conditions, fitness level, and dietary requirements you share so we can run your tour safely.</li>
              </ul>
              <div className="pp-note">
                This is "special category" data under Georgian law and the GDPR. We only collect it with your <strong>explicit consent</strong>, use it solely for trip safety and logistics, and do not keep it longer than needed. Confirm your handling matches this.
              </div>

              <h3>We collect automatically</h3>
              <ul>
                <li>IP address, device/browser type, and pages viewed, on an aggregate basis</li>
                <li>Cookie and analytics data — see our <a href="#cookies" style={{color:'var(--pp-terra)'}}>Cookie information</a> and section 5</li>
              </ul>
            </section>

            {/* 3 */}
            <section id="legal-basis" className="pp-section">
              <p className="pp-section-num">Section 03</p>
              <h2>Why we use it, and our legal basis</h2>
              <div className="pp-table-wrap">
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>Purpose</th>
                      <th>Legal basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Responding to your enquiry and planning a custom trip</td>
                      <td>Steps to enter a contract / legitimate interest</td>
                    </tr>
                    <tr>
                      <td>Delivering and managing a confirmed tour</td>
                      <td>Performance of a contract</td>
                    </tr>
                    <tr>
                      <td>Running your tour safely (health/dietary data)</td>
                      <td>Your explicit consent</td>
                    </tr>
                    <tr>
                      <td>Sending marketing/newsletters (if you opt in)</td>
                      <td>Your consent</td>
                    </tr>
                    <tr>
                      <td>Meeting legal, tax and accounting duties</td>
                      <td>Legal obligation</td>
                    </tr>
                    <tr>
                      <td>Improving and securing the website</td>
                      <td>Legitimate interest</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="pp-note">
                Delete rows that don't apply. Don't claim a basis you don't actually rely on.
              </div>
            </section>

            {/* 4 */}
            <section id="marketing" className="pp-section">
              <p className="pp-section-num">Section 04</p>
              <h2>Marketing communications</h2>
              <p>
                We only send marketing emails or newsletters if you have given <strong>explicit, opt-in consent</strong> (no pre-ticked boxes). You can <strong>withdraw consent at any time</strong> via the unsubscribe link or by contacting us, and we will stop within <strong>7 working days</strong>.
              </p>
              <p>
                Withdrawing marketing consent does not affect emails about a trip you have actually booked.
              </p>
            </section>

            {/* 5 */}
            <section id="cookies" className="pp-section">
              <p className="pp-section-num">Section 05</p>
              <h2>Cookies and analytics</h2>
              <p>
                We use <em className="pp-fill">[strictly necessary cookies only / strictly necessary plus analytics such as [TOOL] / plus marketing pixels such as [TOOL]]</em>. Non-essential cookies are only set <strong>after you consent</strong> via our cookie banner, and you can change your choice at any time.
              </p>
              <div className="pp-note">
                <strong>If you run Google Analytics, a Meta pixel, or similar</strong>, you MUST have a real consent banner with a working "reject" option — not just a notice.
              </div>
            </section>

            {/* 6 */}
            <section id="sharing" className="pp-section">
              <p className="pp-section-num">Section 06</p>
              <h2>Who we share data with</h2>
              <p>We do not sell your data. We share it only with:</p>
              <ul>
                <li>
                  <strong>Service providers</strong> running our operations on our behalf, under contract — e.g. <strong>website hosting (Vercel)</strong>, <strong>email/CRM <em className="pp-fill">[PROVIDER]</em></strong>, our <strong>content platform <em className="pp-fill">[CMS]</em></strong>, <strong>analytics <em className="pp-fill">[TOOL]</em></strong>, and our <strong>payment provider <em className="pp-fill">[PROVIDER]</em></strong>
                </li>
                <li>
                  <strong>Local guides, drivers, accommodation and activity partners</strong>, strictly as needed to deliver your trip
                </li>
                <li>
                  <strong>Authorities</strong>, where the law requires it
                </li>
              </ul>
            </section>

            {/* 7 */}
            <section id="transfers" className="pp-section">
              <p className="pp-section-num">Section 07</p>
              <h2>International transfers</h2>
              <p>
                Some of our providers (for example, website hosting and email) process data <strong>outside Georgia</strong>. Where this happens, we rely on <em className="pp-fill">[adequacy decisions / standard contractual clauses / other appropriate safeguards]</em> so your data stays protected to the standard required by Georgian law and the GDPR.
              </p>
              <div className="pp-note">
                <strong>This is real for you</strong> because Vercel and most SaaS tools host abroad. Confirm the actual safeguard with your lawyer — do not rely on "you agreed by browsing."
              </div>
            </section>

            {/* 8 */}
            <section id="retention" className="pp-section">
              <p className="pp-section-num">Section 08</p>
              <h2>How long we keep it</h2>
              <p>We keep your data only as long as needed:</p>
              <ul>
                <li><strong>Enquiries that don't become trips:</strong> <em className="pp-fill">[e.g. 12 months]</em></li>
                <li><strong>Booking, contract and financial records:</strong> <em className="pp-fill">[retain per Georgian tax/accounting law — confirm period]</em></li>
                <li><strong>Marketing data:</strong> until you unsubscribe</li>
                <li><strong>Health/dietary data:</strong> deleted shortly after your trip ends <em className="pp-fill">[confirm]</em></li>
              </ul>
            </section>

            {/* 9 */}
            <section id="your-rights" className="pp-section">
              <p className="pp-section-num">Section 09</p>
              <h2>Your rights</h2>
              <p>Under the Law of Georgia on Personal Data Protection and, where applicable, the GDPR, you have the right to:</p>
              <div className="pp-rights">
                {[
                  { right: 'Access', desc: 'Obtain a copy of the personal data we hold about you.' },
                  { right: 'Correct', desc: 'Ask us to fix inaccurate or incomplete data.' },
                  { right: 'Erase', desc: 'Request deletion of your data ("right to be forgotten").' },
                  { right: 'Restrict', desc: 'Ask us to pause processing in certain circumstances.' },
                  { right: 'Object', desc: 'Object to processing based on legitimate interest.' },
                  { right: 'Portability', desc: 'Receive your data in a structured, machine-readable format.' },
                  { right: 'Withdraw consent', desc: 'Withdraw consent at any time without affecting past processing.' },
                ].map(r => (
                  <div key={r.right} className="pp-right-card">
                    <strong>{r.right}</strong>
                    <span>{r.desc}</span>
                  </div>
                ))}
              </div>
              <p>
                To exercise any of these rights, contact us at <em className="pp-fill">[EMAIL]</em>. We respond within the legal time limit.
              </p>
              <p>
                You may also complain to the <strong>Personal Data Protection Service (PDPS) of Georgia</strong>, or — if you are in the EU/EEA — to your local data protection authority.
              </p>
            </section>

            {/* 10 */}
            <section id="security" className="pp-section">
              <p className="pp-section-num">Section 10</p>
              <h2>Security</h2>
              <p>
                We use appropriate technical and organisational measures to protect your data, and limit access to authorised people who need it. <em className="pp-fill">[Describe at a high level: encryption in transit, access controls, etc.]</em>
              </p>
            </section>

            {/* 11 */}
            <section id="breaches" className="pp-section">
              <p className="pp-section-num">Section 11</p>
              <h2>Data breaches</h2>
              <p>
                If a breach is likely to affect your rights, we will notify the relevant authority and, where required, you, without undue delay.
              </p>
            </section>

            {/* 12 */}
            <section id="children" className="pp-section">
              <p className="pp-section-num">Section 12</p>
              <h2>Children and minors</h2>
              <p>
                Our website and tours are intended for adults. We do not knowingly collect data from minors without verified parental or guardian consent.
              </p>
              <div className="pp-note">
                <strong>Expand this section significantly before launching any children's programme.</strong> Minors' data carries stricter requirements under Georgian law and the GDPR — additional consent mechanisms, shorter retention and tighter access controls are likely to be required.
              </div>
            </section>

            {/* 13 */}
            <section id="changes" className="pp-section">
              <p className="pp-section-num">Section 13</p>
              <h2>Changes to this policy</h2>
              <p>
                We may update this policy from time to time and will post changes here with a revised "last updated" date. We encourage you to review this page periodically.
              </p>
            </section>

            {/* 14 */}
            <section id="contact" className="pp-section">
              <p className="pp-section-num">Section 14</p>
              <h2>Contact</h2>
              <p>Questions or requests about your personal data:</p>
              <div className="pp-contact-card">
                <p>
                  <strong>Privacy contact:</strong> <em className="pp-fill">[NAME / ROLE]</em><br />
                  <strong>Email:</strong> <a href="mailto:[EMAIL]"><em className="pp-fill">[EMAIL]</em></a><br />
                  <strong>Address:</strong> <em className="pp-fill">[REGISTERED ADDRESS, GEORGIA]</em>
                </p>
                <p style={{marginTop:16,fontSize:'13px'}}>
                  You also have the right to lodge a complaint with the{' '}
                  <strong>Personal Data Protection Service of Georgia (PDPS)</strong>.
                </p>
              </div>
            </section>

          </div>{/* /pp-prose */}
        </div>{/* /pp-body-inner */}
      </div>{/* /pp-body */}

      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Adventure Experts Georgia',
  description: 'The booking contract between you and Adventure Experts Georgia. Covers payment, cancellation, insurance, liability, force majeure and your responsibilities as a traveller.',
}

const SECTIONS = [
  { id: 'about',        label: '1. About these terms' },
  { id: 'confirmation', label: '2. Enquiries & confirmation' },
  { id: 'prices',       label: '3. Prices & inclusions' },
  { id: 'payment',      label: '4. Payment' },
  { id: 'cancellation', label: '5. If you cancel or change' },
  { id: 'our-changes',  label: '6. If we cancel or change' },
  { id: 'force',        label: '7. Force majeure' },
  { id: 'insurance',    label: '8. Insurance (required)' },
  { id: 'health',       label: '9. Health & fitness' },
  { id: 'special',      label: '10. Special requirements' },
  { id: 'conduct',      label: '11. Responsibilities & conduct' },
  { id: 'risk',         label: '12. Assumption of risk' },
  { id: 'documents',    label: '13. Travel documents' },
  { id: 'liability',    label: '14. Our liability' },
  { id: 'photos',       label: '15. Photos & marketing' },
  { id: 'complaints',   label: '16. Complaints' },
  { id: 'privacy',      label: '17. Privacy' },
  { id: 'governing',    label: '18. Governing law' },
  { id: 'changes',      label: '19. Changes to these terms' },
  { id: 'contact',      label: '20. Contact' },
]

export default function TermsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --t-cream:  #FAF8F3;
          --t-cream2: #F4F1EB;
          --t-ink:    #1E1C19;
          --t-body:   #4A463E;
          --t-muted:  #6B655C;
          --t-stone:  #A8A296;
          --t-terra:  #C75A37;
          --t-forest: #2E4034;
          --t-dark:   #23332A;
          --t-border: rgba(30,28,25,.10);
        }

        .t-hero {
          background: linear-gradient(158deg,#1C2E24 0%,#191712 60%,#0E0D0B 100%);
          padding: clamp(72px,11vh,120px) clamp(20px,5vw,56px) clamp(48px,7vh,80px);
          position: relative;
          overflow: hidden;
        }
        .t-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(250,248,243,.022) 0,
            rgba(250,248,243,.022) 1px,
            transparent 1px,
            transparent 8px
          );
          pointer-events: none;
        }
        .t-hero-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
        }
        .t-eyebrow {
          font-family: var(--font-hanken), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(240,184,148,.8);
          margin: 0 0 18px;
        }
        .t-hero h1 {
          font-family: var(--font-spectral), serif;
          font-size: clamp(34px,6vw,62px);
          font-weight: 500;
          color: #FAF8F3;
          line-height: .98;
          letter-spacing: -1px;
          margin: 0 0 20px;
        }
        .t-hero-meta {
          font-family: var(--font-hanken), sans-serif;
          font-size: 13.5px;
          color: rgba(250,248,243,.45);
          margin: 0;
          line-height: 1.6;
        }
        .t-hero-meta strong { color: rgba(250,248,243,.7); }
        .t-draft {
          margin-top: 28px;
          padding: 13px 18px;
          background: rgba(199,90,55,.16);
          border: 1px solid rgba(199,90,55,.32);
          border-radius: 10px;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13px;
          color: rgba(240,184,148,.88);
          line-height: 1.58;
        }
        .t-draft strong { color: #F0B894; }

        /* body */
        .t-body {
          background: var(--t-cream);
          padding: clamp(48px,7vh,90px) clamp(20px,5vw,56px);
        }
        .t-wrap {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0 56px;
          align-items: start;
        }

        /* toc */
        .t-toc {
          position: sticky;
          top: 96px;
          padding: 24px 0;
        }
        .t-toc-label {
          font-family: var(--font-hanken), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--t-stone);
          margin: 0 0 14px;
        }
        .t-toc ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 1px solid var(--t-border);
        }
        .t-toc li { margin: 0; }
        .t-toc a {
          display: block;
          padding: 4px 0 4px 14px;
          font-family: var(--font-hanken), sans-serif;
          font-size: 12px;
          color: var(--t-muted);
          text-decoration: none;
          transition: color .2s;
          border-left: 2px solid transparent;
          margin-left: -1px;
          line-height: 1.45;
        }
        .t-toc a:hover { color: var(--t-terra); border-left-color: var(--t-terra); }

        /* prose */
        .t-prose { max-width: 720px; }
        .t-section { margin-bottom: 54px; }
        .t-section:last-child { margin-bottom: 0; }

        .t-num {
          font-family: var(--font-hanken), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--t-terra);
          margin: 0 0 8px;
        }
        .t-section h2 {
          font-family: var(--font-spectral), serif;
          font-size: clamp(21px,2.6vw,28px);
          font-weight: 500;
          color: var(--t-ink);
          line-height: 1.1;
          letter-spacing: -.3px;
          margin: 0 0 18px;
          padding-bottom: 13px;
          border-bottom: 1px solid var(--t-border);
        }
        .t-prose p {
          font-family: var(--font-hanken), sans-serif;
          font-size: clamp(15px,1.55vw,17px);
          color: var(--t-body);
          line-height: 1.72;
          margin: 0 0 15px;
        }
        .t-prose p:last-child { margin-bottom: 0; }
        .t-prose ul, .t-prose ol {
          font-family: var(--font-hanken), sans-serif;
          font-size: clamp(15px,1.55vw,17px);
          color: var(--t-body);
          line-height: 1.72;
          margin: 0 0 15px;
          padding-left: 22px;
        }
        .t-prose li { margin-bottom: 5px; }
        .t-prose strong { color: var(--t-ink); font-weight: 600; }
        .t-prose a { color: var(--t-terra); text-decoration: underline; text-decoration-color: rgba(199,90,55,.3); }
        .t-prose a:hover { text-decoration-color: var(--t-terra); }

        /* placeholder */
        .t-ph {
          background: rgba(199,90,55,.07);
          border: 1px solid rgba(199,90,55,.22);
          border-radius: 4px;
          padding: 0 5px;
          color: var(--t-terra);
          font-weight: 600;
          font-style: normal;
          font-size: .9em;
        }

        /* lawyer note */
        .t-note {
          background: var(--t-cream2);
          border-left: 3px solid var(--t-stone);
          border-radius: 0 8px 8px 0;
          padding: 11px 16px;
          margin: 14px 0;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13.5px;
          color: var(--t-muted);
          line-height: 1.58;
        }
        .t-note strong { color: var(--t-body); }

        /* alert note (stricter) */
        .t-alert {
          background: rgba(199,90,55,.06);
          border-left: 3px solid var(--t-terra);
          border-radius: 0 8px 8px 0;
          padding: 11px 16px;
          margin: 14px 0;
          font-family: var(--font-hanken), sans-serif;
          font-size: 13.5px;
          color: #7a3520;
          line-height: 1.58;
        }
        .t-alert strong { color: var(--t-terra); }

        /* table */
        .t-table-wrap { overflow-x: auto; margin: 16px 0 22px; }
        .t-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-hanken), sans-serif;
          font-size: 14.5px;
          border-radius: 10px;
          overflow: hidden;
        }
        .t-table thead tr { background: var(--t-forest); }
        .t-table thead th {
          color: rgba(250,248,243,.88);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 10px 16px;
          text-align: left;
        }
        .t-table tbody tr { border-bottom: 1px solid var(--t-border); }
        .t-table tbody tr:last-child { border-bottom: none; }
        .t-table tbody td {
          padding: 11px 16px;
          color: var(--t-body);
          vertical-align: top;
          line-height: 1.5;
        }
        .t-table tbody tr:nth-child(even) td { background: rgba(250,248,243,.55); }
        .t-table tbody td:first-child { font-weight: 500; color: var(--t-ink); }

        /* contact card */
        .t-contact {
          background: var(--t-dark);
          border-radius: 16px;
          padding: 28px 30px;
          margin-top: 18px;
        }
        .t-contact p {
          color: rgba(250,248,243,.7) !important;
          font-size: 15px !important;
        }
        .t-contact strong { color: rgba(250,248,243,.9) !important; }
        .t-contact a { color: #F0B894 !important; text-decoration: underline; }

        /* required badge */
        .t-badge-req {
          display: inline-block;
          background: var(--t-terra);
          color: #fff;
          font-family: var(--font-hanken), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 999px;
          vertical-align: middle;
          margin-left: 8px;
          position: relative;
          top: -1px;
        }

        @media (max-width: 800px) {
          .t-wrap { grid-template-columns: 1fr; }
          .t-toc { display: none; }
        }
      ` }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="t-hero">
        <div className="t-hero-inner">
          <p className="t-eyebrow">Legal · Booking</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="t-hero-meta">
            <strong>Operated by:</strong> <em className="t-ph">[REGISTERED LEGAL NAME]</em>, <em className="t-ph">[CITY]</em>, Georgia ("Adventure Experts Georgia")
            <br />
            <strong>Last updated:</strong> <em className="t-ph">[DATE]</em>
          </p>
          <div className="t-draft">
            <strong>DRAFT — not legal advice.</strong> This is your client-facing booking contract. Fill every <span style={{background:'rgba(199,90,55,.25)',padding:'0 4px',borderRadius:3}}>highlighted placeholder</span>, resolve decisions flagged in lawyer notes, and have this reviewed by a Georgian tourism lawyer before publishing — especially the payment, cancellation, force-majeure and liability clauses, which interact with EU consumer law.
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="t-body">
        <div className="t-wrap">

          {/* TOC */}
          <nav className="t-toc" aria-label="Terms sections">
            <p className="t-toc-label">Contents</p>
            <ul>
              {SECTIONS.map(s => (
                <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
              ))}
            </ul>
          </nav>

          {/* Prose */}
          <div className="t-prose">

            {/* 1 */}
            <section id="about" className="t-section">
              <p className="t-num">Section 01</p>
              <h2>About these terms</h2>
              <p>
                These Terms apply to every trip arranged with us. By confirming a booking you confirm that you have read, understood and accepted them. If you book for a group, you do so as the <strong>lead traveller</strong>: you confirm you are 18 or over, that you have authority to accept these Terms on behalf of everyone named (including any minor), that the information you give us about them is accurate, and that you have their consent to share it. You are our main point of contact for the booking.
              </p>
            </section>

            {/* 2 */}
            <section id="confirmation" className="t-section">
              <p className="t-num">Section 02</p>
              <h2>Enquiries, confirmation and contract</h2>
              <p>
                All trips begin with an <strong>enquiry</strong> or <strong>custom-trip request</strong> — there is no instant online checkout. A binding contract forms only when: (a) we send you <strong>written confirmation</strong> of your trip and price, and (b) you pay the <strong>deposit</strong> (section 4). Until both happen, no booking exists and prices and availability may change.
              </p>
            </section>

            {/* 3 */}
            <section id="prices" className="t-section">
              <p className="t-num">Section 03</p>
              <h2>Prices, inclusions and exclusions</h2>
              <p>
                Each trip confirmation lists what is included and excluded. Unless stated otherwise, the price <strong>excludes</strong>: international flights, travel insurance, visas, personal expenses, tips, and anything not expressly listed. Prices are in <em className="t-ph">[CURRENCY]</em>.
              </p>
              <p>
                We may correct genuine pricing errors and, before the balance is due, adjust prices for major cost changes (e.g. <em className="t-ph">[fuel, permit fees, exchange rate]</em>). We will not increase the price within <em className="t-ph">[e.g. 30]</em> days of departure.
              </p>
              <div className="t-note">
                <strong>Decision:</strong> choose your currency and whether you allow any price surcharge at all. Many operators promise a fully fixed price once confirmed — simpler and more trusted by clients.
              </div>
            </section>

            {/* 4 */}
            <section id="payment" className="t-section">
              <p className="t-num">Section 04</p>
              <h2>Payment</h2>
              <p>
                To confirm a trip we require a <strong>deposit of <em className="t-ph">[e.g. 20–30]</em>%</strong> of the total price. The <strong>balance is due <em className="t-ph">[e.g. 30]</em> days before departure</strong>. For trips confirmed within <em className="t-ph">[30]</em> days of departure, full payment is due on confirmation. We send a secure payment link; the booking is not confirmed until the deposit clears.
              </p>
              <div className="t-note">
                <strong>Open decision:</strong> fix your deposit %, balance-due window, and whether the deposit is refundable (see section 5). Match this wording exactly to whatever your payment-link provider actually does.
              </div>
            </section>

            {/* 5 */}
            <section id="cancellation" className="t-section">
              <p className="t-num">Section 05</p>
              <h2>If you cancel or change your trip</h2>
              <p>
                Cancellations take effect when we receive your <strong>written notice</strong>. The following charges apply as a percentage of the total trip price:
              </p>
              <div className="t-table-wrap">
                <table className="t-table">
                  <thead>
                    <tr>
                      <th>Notice before departure</th>
                      <th>Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><em className="t-ph">[e.g. 30+ days]</em></td>
                      <td><em className="t-ph">[deposit only / e.g. 20%]</em></td>
                    </tr>
                    <tr>
                      <td><em className="t-ph">[e.g. 15–29 days]</em></td>
                      <td><em className="t-ph">[e.g. 50%]</em></td>
                    </tr>
                    <tr>
                      <td><em className="t-ph">[e.g. 7–14 days]</em></td>
                      <td><em className="t-ph">[e.g. 75%]</em></td>
                    </tr>
                    <tr>
                      <td><em className="t-ph">[Under 7 days / no-show]</em></td>
                      <td><em className="t-ph">[e.g. 100%]</em></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                If you ask to change dates or other details, we will try to accommodate you but cannot guarantee availability, and any supplier costs arising from the change will be passed on.
              </p>
              <div className="t-note">
                A blanket non-refundable policy can be an unfair term under EU consumer law (which applies because you market to EU travellers). A transparent sliding scale like the above is both fairer and legally safer.
              </div>
            </section>

            {/* 6 */}
            <section id="our-changes" className="t-section">
              <p className="t-num">Section 06</p>
              <h2>If we change or cancel your trip</h2>
              <p>
                We aim to run every confirmed trip, subject to reasonable itinerary adjustments. Advertised or indicative dates are not confirmed until we issue written confirmation. If we cancel before departure for reasons not caused by you and not a force-majeure event, you may choose:
              </p>
              <ul>
                <li>A comparable or better alternative trip at no extra cost;</li>
                <li>A lower-value alternative plus a refund of the difference; or</li>
                <li>A <strong>full refund</strong> of all money paid to us.</li>
              </ul>
              <p>
                If a significant part of a trip cannot be delivered after it has started, we will arrange a suitable alternative or refund the unused portion. We are not responsible for incidental costs you incur separately (flights, visas, vaccinations, lost earnings, or other prepaid commitments).
              </p>
            </section>

            {/* 7 */}
            <section id="force" className="t-section">
              <p className="t-num">Section 07</p>
              <h2>Force majeure</h2>
              <p>
                We are not liable for failure or delay caused by events beyond our reasonable control — including extreme weather, road or mountain-pass closures, natural disasters, war, terrorism, civil unrest, strikes, epidemics, pandemics, or government action. Where such an event affects your trip, we will, depending on the circumstances, offer to <strong>reschedule</strong>, provide a <strong>credit</strong>, or refund any <strong>recoverable, unused</strong> portion after deducting unrecoverable supplier costs.
              </p>
              <div className="t-note">
                Pure forfeiture on force majeure invites disputes and payment chargebacks. The credit-or-reschedule approach protects your cash flow without appearing predatory — and is far more likely to be upheld under Georgian and EU consumer law.
              </div>
            </section>

            {/* 8 */}
            <section id="insurance" className="t-section">
              <p className="t-num">Section 08</p>
              <h2>Insurance <span className="t-badge-req">Required</span></h2>
              <p>
                You <strong>must</strong> hold comprehensive travel insurance valid for all trip dates, covering at minimum:
              </p>
              <ul>
                <li>Medical treatment, emergency evacuation and repatriation</li>
                <li>All adventure activities involved in your trip (trekking, caving, canyoning, climbing, glacier travel, high-altitude, or similar)</li>
              </ul>
              <p>
                We strongly recommend additional cover for cancellation, delay and baggage loss. Tell your insurer the exact activities and altitudes involved. The trip price does not include insurance.
              </p>
              <div className="t-alert">
                <strong>Mountain rescue and helicopter evacuation</strong> in Svaneti and Kazbegi is expensive and not always covered by standard travel policies. Require proof of appropriate cover before high-altitude or technical trips.
              </div>
            </section>

            {/* 9 */}
            <section id="health" className="t-section">
              <p className="t-num">Section 09</p>
              <h2>Health, fitness and medical information</h2>
              <p>
                Our trips are active and some are physically demanding. You must give us <strong>accurate, complete health, fitness and medical information</strong> when enquiring and before a booking is confirmed. Please assess your own suitability honestly — consult your doctor if in doubt, including about vaccinations and altitude.
              </p>
              <p>
                We are not medical professionals and do not give medical advice. We process health and dietary information only with your <strong>explicit consent</strong> and as described in our <a href="/en/privacy-policy">Privacy Policy</a>.
              </p>
            </section>

            {/* 10 */}
            <section id="special" className="t-section">
              <p className="t-num">Section 10</p>
              <h2>Special requirements</h2>
              <p>
                We will make reasonable efforts to meet dietary and other requests but cannot guarantee them, and they do not form part of the contract — <strong>except</strong> that you must clearly disclose any <strong>serious allergy or medically necessary dietary need</strong> in advance so we can advise whether a trip can safely accommodate it.
              </p>
            </section>

            {/* 11 */}
            <section id="conduct" className="t-section">
              <p className="t-num">Section 11</p>
              <h2>Your responsibilities and conduct</h2>
              <p>You must:</p>
              <ul>
                <li>Comply with Georgian law and local regulations throughout your trip</li>
                <li>Follow the reasonable instructions of your guide and all safety briefings</li>
                <li>Use safety equipment correctly (seatbelts, harnesses, helmets, life jackets) as directed</li>
                <li>Respect local customs and the environment</li>
              </ul>
              <p>
                If your behaviour endangers, distresses or seriously disrupts other group members or third parties, we may terminate your participation in the trip with no refund and no liability for your onward travel costs. You are responsible for any loss or damage you cause to property, accommodation or vehicles.
              </p>
            </section>

            {/* 12 */}
            <section id="risk" className="t-section">
              <p className="t-num">Section 12</p>
              <h2>The nature of adventure travel — assumption of risk</h2>
              <p>
                You acknowledge that adventure travel carries <strong>inherent risks</strong> — remote areas, variable infrastructure, weather, altitude, and physically demanding activities — and that you choose to accept these risks by booking. For higher-risk activities (e.g. caving, canyoning, rock climbing, glacier travel) you may be asked to sign a <strong>separate activity waiver</strong> before participating.
              </p>
              <p>
                Nothing in these Terms excludes our liability for death or personal injury caused by our own negligence, or any liability that cannot be excluded by law.
              </p>
              <div className="t-note">
                <strong>Two documents, not one:</strong> these Terms carry the assumption-of-risk language; the standalone signed waiver is what protects you operationally on high-risk activities. A waiver can never exclude gross negligence. Have both reviewed by a lawyer.
              </div>
            </section>

            {/* 13 */}
            <section id="documents" className="t-section">
              <p className="t-num">Section 13</p>
              <h2>Travel documents and entry</h2>
              <p>
                You are responsible for holding a valid passport, obtaining any required visas, and meeting any entry or health documentation requirements for Georgia and any area or border region visited. We are not liable for the consequences of missing, invalid or incorrect documents.
              </p>
            </section>

            {/* 14 */}
            <section id="liability" className="t-section">
              <p className="t-num">Section 14</p>
              <h2>Our liability</h2>
              <p>
                We accept responsibility for our own negligence and the negligence of those acting on our behalf. Where permitted by applicable law, our total liability to you is limited to the amount you paid us for the affected trip.
              </p>
              <p>
                We are not liable for: the independent acts or omissions of third-party suppliers (transport, accommodation, activity providers) beyond our reasonable control; indirect or consequential losses (lost earnings, lost enjoyment, or other prepaid commitments); or events covered by section 7 (force majeure).
              </p>
              <p>
                Nothing in this section limits liability that cannot lawfully be limited, including liability for death or personal injury caused by our negligence.
              </p>
              <div className="t-note">
                Confirm the liability cap and exclusions with your lawyer against Georgian and EU consumer rules. An unreasonably low cap may be unenforceable.
              </div>
            </section>

            {/* 15 */}
            <section id="photos" className="t-section">
              <p className="t-num">Section 15</p>
              <h2>Photos and marketing</h2>
              <p>
                We would love to feature trip photos in our marketing materials. We will only use images in which you are identifiable <strong>with your prior consent</strong>. You can decline or withdraw consent at any time by contacting us. Please tell your guide at the start of your trip if you prefer not to appear in any photos.
              </p>
            </section>

            {/* 16 */}
            <section id="complaints" className="t-section">
              <p className="t-num">Section 16</p>
              <h2>Complaints</h2>
              <p>
                If something goes wrong during your trip, please tell your guide or our team immediately so we have the opportunity to put it right. If the issue is not resolved on the trip, please write to us at <a href="mailto:[EMAIL]"><em className="t-ph">[EMAIL]</em></a> within <em className="t-ph">[e.g. 28]</em> days of returning home so we can investigate properly.
              </p>
            </section>

            {/* 17 */}
            <section id="privacy" className="t-section">
              <p className="t-num">Section 17</p>
              <h2>Privacy</h2>
              <p>
                We handle your personal data as described in our <a href="/en/privacy-policy">Privacy Policy</a>, which forms part of the information provided to you at the time of booking.
              </p>
            </section>

            {/* 18 */}
            <section id="governing" className="t-section">
              <p className="t-num">Section 18</p>
              <h2>Governing law and disputes</h2>
              <p>
                These Terms and any dispute arising from them are governed by the <strong>laws of Georgia</strong>, and the courts of <em className="t-ph">[CITY]</em>, Georgia have non-exclusive jurisdiction — unless mandatory consumer-protection law in your country of residence gives you other rights, which these Terms do not override.
              </p>
            </section>

            {/* 19 */}
            <section id="changes" className="t-section">
              <p className="t-num">Section 19</p>
              <h2>Changes to these terms</h2>
              <p>
                We may update these Terms and will publish the current version on our website with a revised "last updated" date. The Terms in force when you confirm your booking are the version that applies to that booking.
              </p>
            </section>

            {/* 20 */}
            <section id="contact" className="t-section">
              <p className="t-num">Section 20</p>
              <h2>Contact</h2>
              <div className="t-contact">
                <p>
                  <strong><em className="t-ph">[REGISTERED LEGAL NAME]</em></strong><br />
                  <strong>Address:</strong> <em className="t-ph">[ADDRESS, GEORGIA]</em><br />
                  <strong>Email:</strong> <a href="mailto:[EMAIL]"><em className="t-ph">[EMAIL]</em></a><br />
                  <strong>Phone / WhatsApp:</strong> <em className="t-ph">[NUMBER]</em>
                </p>
              </div>
            </section>

          </div>{/* /t-prose */}
        </div>{/* /t-wrap */}
      </div>{/* /t-body */}

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

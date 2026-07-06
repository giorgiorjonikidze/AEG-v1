import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CookieSettingsButton from '@/components/CookieSettingsButton'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'What cookies Adventure Experts Georgia uses, their purpose and how long they last, and how to change or withdraw your consent at any time.',
}

type Cookie = { name: string; provider: string; purpose: string; duration: string; category: 'Essential' | 'Analytics' }

const COOKIES: Cookie[] = [
  { name: 'aeg_consent', provider: 'Adventure Experts Georgia', purpose: 'Stores your cookie choices so we don’t ask again and only load what you allowed.', duration: '6 months', category: 'Essential' },
  { name: 'Language preference', provider: 'Adventure Experts Georgia', purpose: 'Remembers your chosen site language so pages load in the right locale.', duration: 'Up to 12 months', category: 'Essential' },
  { name: '_ga', provider: 'Google Analytics', purpose: 'Distinguishes unique visitors to measure site usage. Set only if you allow analytics.', duration: '2 years', category: 'Analytics' },
  { name: '_ga_<id>', provider: 'Google Analytics', purpose: 'Persists session state for GA4. Set only if you allow analytics.', duration: '2 years', category: 'Analytics' },
  { name: '_gid', provider: 'Google Analytics', purpose: 'Distinguishes visitors over a short window. Set only if you allow analytics.', duration: '24 hours', category: 'Analytics' },
]

export default function CookiePolicyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --cp-cream:#FAF8F3; --cp-cream2:#F4F1EB; --cp-ink:#1E1C19; --cp-body:#4A463E;
          --cp-muted:#6B655C; --cp-stone:#A8A296; --cp-terra:#C75A37; --cp-forest:#2E4034;
          --cp-dark:#23332A; --cp-border:rgba(30,28,25,.10);
        }
        .cp-hero { background:linear-gradient(158deg,#34503E 0%,#23332A 46%,#191712 100%); padding:clamp(72px,11vh,120px) clamp(20px,5vw,56px) clamp(48px,7vh,80px); position:relative; overflow:hidden; }
        .cp-hero::before { content:''; position:absolute; inset:0; background-image:repeating-linear-gradient(-45deg,rgba(250,248,243,.025) 0,rgba(250,248,243,.025) 1px,transparent 1px,transparent 8px); pointer-events:none; }
        .cp-hero-inner { max-width:860px; margin:0 auto; position:relative; }
        .cp-eyebrow { font-family:var(--font-hanken),sans-serif; font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:rgba(240,184,148,.85); margin:0 0 18px; }
        .cp-hero h1 { font-family:var(--font-spectral),serif; font-size:clamp(36px,6vw,64px); font-weight:500; color:#FAF8F3; line-height:.98; letter-spacing:-1px; margin:0 0 20px; }
        .cp-hero-lead { font-family:var(--font-hanken),sans-serif; font-size:clamp(15px,1.8vw,18px); color:rgba(250,248,243,.66); line-height:1.6; margin:0; max-width:620px; }
        .cp-body { background:var(--cp-cream); padding:clamp(48px,7vh,90px) clamp(20px,5vw,56px); }
        .cp-inner { max-width:760px; margin:0 auto; }
        .cp-section { margin-bottom:52px; }
        .cp-section:last-child { margin-bottom:0; }
        .cp-num { font-family:var(--font-hanken),sans-serif; font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--cp-terra); margin:0 0 8px; }
        .cp-section h2 { font-family:var(--font-spectral),serif; font-size:clamp(22px,2.8vw,30px); font-weight:500; color:var(--cp-ink); line-height:1.1; letter-spacing:-.3px; margin:0 0 20px; padding-bottom:14px; border-bottom:1px solid var(--cp-border); }
        .cp-inner p { font-family:var(--font-hanken),sans-serif; font-size:clamp(15px,1.6vw,17px); color:var(--cp-body); line-height:1.72; margin:0 0 16px; }
        .cp-inner p:last-child { margin-bottom:0; }
        .cp-inner ul { font-family:var(--font-hanken),sans-serif; font-size:clamp(15px,1.6vw,17px); color:var(--cp-body); line-height:1.72; margin:0 0 16px; padding-left:22px; }
        .cp-inner li { margin-bottom:6px; }
        .cp-inner a { color:var(--cp-terra); text-decoration:underline; text-decoration-color:rgba(199,90,55,.4); text-underline-offset:2px; }
        .cp-inner strong { color:var(--cp-ink); font-weight:600; }
        .cp-table-wrap { overflow-x:auto; margin:16px 0 8px; -webkit-overflow-scrolling:touch; }
        .cp-table { width:100%; border-collapse:collapse; font-family:var(--font-hanken),sans-serif; font-size:14px; min-width:560px; }
        .cp-table thead tr { background:var(--cp-forest); }
        .cp-table thead th { color:rgba(250,248,243,.88); font-weight:600; font-size:11px; letter-spacing:.08em; text-transform:uppercase; padding:11px 14px; text-align:left; }
        .cp-table tbody tr { border-bottom:1px solid var(--cp-border); }
        .cp-table tbody tr:last-child { border-bottom:none; }
        .cp-table tbody td { padding:12px 14px; color:var(--cp-body); vertical-align:top; line-height:1.5; }
        .cp-table tbody tr:nth-child(even) td { background:rgba(250,248,243,.6); }
        .cp-table td.cp-name { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:13px; color:var(--cp-ink); white-space:nowrap; }
        .cp-tag { display:inline-block; font-size:10.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; padding:3px 8px; border-radius:999px; }
        .cp-tag-ess { background:rgba(46,64,52,.12); color:var(--cp-forest); }
        .cp-tag-an { background:rgba(199,90,55,.12); color:var(--cp-terra); }
        .cp-manage { background:var(--cp-dark); border-radius:16px; padding:26px 28px; margin:20px 0 0; }
        .cp-manage p { color:rgba(250,248,243,.74) !important; margin-bottom:16px !important; }
        .cp-manage strong { color:rgba(250,248,243,.94) !important; }
        .cp-manage-btn { appearance:none; cursor:pointer; font-family:var(--font-hanken),sans-serif; font-size:14.5px; font-weight:600; color:#FFF; background:var(--cp-terra); border:none; border-radius:10px; padding:12px 22px; transition:background .18s, box-shadow .18s, transform .15s; }
        .cp-manage-btn:hover { background:#B44D2D; box-shadow:0 14px 30px -16px rgba(199,90,55,.8); }
        .cp-manage-btn:active { transform:translateY(1px); }
        .cp-manage-btn:focus-visible, .cp-inner a:focus-visible { outline:2px solid #F0B894; outline-offset:2px; }
        .cp-meta { font-family:var(--font-hanken),sans-serif; font-size:14px; color:rgba(250,248,243,.5); margin:16px 0 0; }
        .cp-meta strong { color:rgba(250,248,243,.75); }
      ` }} />

      <section className="cp-hero">
        <div className="cp-hero-inner">
          <p className="cp-eyebrow">Legal · Cookies</p>
          <h1>Cookie Policy</h1>
          <p className="cp-hero-lead">
            This policy explains what cookies we use, why we use them, how long they
            last, and how you can change or withdraw your consent at any time.
          </p>
          <p className="cp-meta"><strong>Last updated:</strong> July 2026</p>
        </div>
      </section>

      <div className="cp-body">
        <div className="cp-inner">

          <section className="cp-section">
            <p className="cp-num">Section 01</p>
            <h2>What cookies are</h2>
            <p>
              Cookies are small text files stored on your device when you visit a
              website. They let a site remember your actions and preferences (such as
              your language or your cookie choices) and, where you allow it, help the
              site understand how it is used.
            </p>
            <p>
              We group cookies into two categories: <strong>strictly necessary</strong>{' '}
              cookies that are required for the site to work, and{' '}
              <strong>analytics</strong> cookies that are optional and only set with
              your consent.
            </p>
          </section>

          <section className="cp-section">
            <p className="cp-num">Section 02</p>
            <h2>Cookies we use</h2>
            <div className="cp-table-wrap">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map(c => (
                    <tr key={c.name}>
                      <td className="cp-name">{c.name}</td>
                      <td>{c.provider}</td>
                      <td>{c.purpose}</td>
                      <td>{c.duration}</td>
                      <td>
                        <span className={`cp-tag ${c.category === 'Essential' ? 'cp-tag-ess' : 'cp-tag-an'}`}>
                          {c.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 16 }}>
              Analytics cookies are provided by <strong>Google Analytics (GA4)</strong>.
              The Google Analytics script is <strong>not loaded at all</strong> unless
              you enable analytics — so none of the <code>_ga</code> cookies are set
              until you consent.
            </p>
          </section>

          <section className="cp-section">
            <p className="cp-num">Section 03</p>
            <h2>Managing your consent</h2>
            <p>
              When you first visit, a banner lets you <strong>accept all</strong>,{' '}
              <strong>reject all</strong>, or <strong>customize</strong> which optional
              cookies you allow. Strictly necessary cookies are always on because the
              site cannot function without them.
            </p>
            <p>
              You can change or withdraw your consent at any time using the button
              below or the <strong>&ldquo;Cookie settings&rdquo;</strong> link in the
              footer of every page. You can also delete or block cookies through your
              browser settings, though some parts of the site may then not work as
              expected.
            </p>
            <div className="cp-manage">
              <p><strong>Change your mind?</strong> Reopen the preferences panel to update or withdraw your consent.</p>
              <CookieSettingsButton />
            </div>
          </section>

          <section className="cp-section">
            <p className="cp-num">Section 04</p>
            <h2>Third-party cookies</h2>
            <p>
              Optional analytics cookies are set by Google. Their use of data is
              governed by Google&rsquo;s own policies. We enable IP anonymisation and
              only load Google Analytics after you consent. See{' '}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google&rsquo;s cookie information</a>{' '}
              for more detail.
            </p>
          </section>

          <section className="cp-section">
            <p className="cp-num">Section 05</p>
            <h2>Changes &amp; contact</h2>
            <p>
              We may update this policy as our use of cookies changes, and will post
              any updates here with a revised date. For how we handle personal data
              more broadly, see our <Link href="/en/privacy-policy">Privacy Policy</Link>.
            </p>
            <p>
              Questions about this policy? Contact us via our{' '}
              <Link href="/en/contact">contact page</Link>.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </>
  )
}

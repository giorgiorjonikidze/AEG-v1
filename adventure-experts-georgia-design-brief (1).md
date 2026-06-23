# Adventure Experts Georgia — Website Design Brief

A build brief for the homepage (and supporting pages) of **Adventure Experts Georgia**, an adventure / outdoor tour company based in the country of Georgia. This document consolidates all design decisions and is written to be pasted directly into **Claude Design** (for visual mockups) or **Claude Code** (for the build).

> Working mode: this is a **planning/design brief**. Use it to generate mockups and to brief the build — decisions live here, not in code yet.

---

## 1. Project overview

- **Company:** Adventure Experts Georgia
- **What it offers:** Multi-day adventure tours + day tours, plus support services (custom trips, transfers, etc.) across the country of Georgia.
- **Existing site:** adventure-experts-georgia.vercel.app (being built via Claude Code)
- **Languages:** Multi-language. URLs use a language prefix, e.g. `/en/...`. Every internal link and anchor must carry the active language prefix so switching languages never breaks links. (Replace any `localhost:3000/...` dev links with production, language-prefixed paths.)
- **Audience:** Primarily international travelers (many unfamiliar with the brand and with Georgia's geography), plus expats and locals.

---

## 2. Brand & visual direction

- **Overall personality:** Clean & premium with rugged, earthy accents. Professional and trustworthy enough to reassure a foreigner booking abroad, while the imagery and palette keep it adventurous, not corporate.
- **Photography-led:** Big, full-bleed, *real* photos and short video of Georgian landscapes and actual tours do the selling. Design stays out of the way. Avoid stock photos for guides, reviews, and trips — authenticity is the whole point.
- **Suggested palette (adjustable):** earthy neutrals (forest green, stone/grey) with a warm contrast accent (e.g. sunset orange or terracotta) reserved for primary CTAs so "Book"/"View" buttons pop.
- **Typography:** clean modern sans-serif for body; optional stronger display font for headlines only. Legible, generous line-height.
- **Mobile-first:** design for the phone first; most browsing and a large share of booking happen on mobile.

---

## 3. Global / cross-cutting requirements

These apply site-wide:

- **Responsive, mobile-first** layouts throughout.
- **One obvious primary action per screen:** a repeated, high-contrast "Book Now" / "View Tour" CTA.
- **Performance:** lazy-load and optimize all images; the site is image-heavy and must stay fast on mobile data.
- **Accessibility:** all interactive elements keyboard-accessible and properly labeled; respect `prefers-reduced-motion` for every animation; sufficient contrast on text-over-image (use gradient scrims).
- **Horizontal-scroll convention** (used in several sections): card width narrower than the screen so the next card "peeks" in at the right edge; `scroll-snap` that respects the row's side padding (use `scroll-padding`) so cards snap to their inset position and the peek is preserved; position dots on mobile; left/right arrow buttons on desktop.
- **Consistent activity labels everywhere** (nav, sections, tour pages): **Trekking & Hiking · Biking · Caving · Canyoning · Overlanding · Mixed Tours · Summit Experience · Climbing.**

### 3.1 Section background rhythm
Not every section should be light. Alternate a small set of full-section backgrounds for visual rhythm, and flip text/CTA contrast on the dark/colored ones. Keep to ~3 background tones total (light default, one deep/dark tone, one warm accent) and define them as shared tokens so they're globally consistent.

Suggested rhythm (adjustable):

| Section | Background |
| --- | --- |
| Hero | Full-bleed image (dark scrim) |
| Your Local Adventure Team | Light |
| Choose Your Adventure (activities) | **Dark** (image cards pop) |
| Featured Adventures | Light |
| Day Tours — More Than Mountains | **Immersive image / dark** |
| Why Choose Us / Guides | **Colored accent** (e.g. deep forest green) |
| Explore Georgia by Region (map) | Light (best for map legibility) |
| Reviews | Light (or soft earthy tint to differentiate from the map) |
| Final CTA — Tailor-Made | **Dark / warm accent** |
| Footer | **Dark** (page anchor) |

Avoid placing two identical dark sections back-to-back; sandwich dark/colored sections between lighter ones.

---

## 4. Navigation bar

**Sticky.** Starts transparent over the hero image, turns solid (and may shrink slightly) on scroll.

**Desktop layout:**
- **Left:** logo (links to homepage).
- **Center:** Tours · Day Tours · Services · Guides · About Us · Contact.
- **Right:** language/currency switcher · WhatsApp (or phone) icon · **Book Now** button (primary, warm accent color).

**Dropdowns (open on hover AND on click/focus; labels themselves are clickable to the full page; small open/close delay to avoid flicker):**
- **Tours →** Trekking & Hiking · Biking · Caving · Canyoning · Overlanding · Mixed Tours · Summit Experience · Climbing (each links to its activity; build so these can become standalone pages later, e.g. `/en/tours/trekking`, for SEO — currently anchors like `/en/tours#trekking`).
- **Services →** headers only: Custom trip planning · Transfers & Logistics · Climbing course · Children Camp · Rope training · Winter Sports. Tag the not-yet-live ones (Climbing course, Children Camp, Rope training, Winter Sports) with a subtle "Soon" label. Full descriptions live on the Services page.

**Mobile layout:**
- **Left:** logo. **Right:** Book Now button (or WhatsApp icon) + hamburger menu — keep the booking action visible, never buried inside the menu.
- **Inside the hamburger menu (top → bottom):** Book Now → language/currency switcher → nav list (Tours and Services as expandable accordion dropdowns) → contact strip with **WhatsApp number + Instagram, Facebook, and email icons** at the bottom.

---

## 5. Homepage sections (in order)

### 5.1 Hero
- Full-screen (use `dvh`, not `vh`, so mobile browser chrome doesn't cut it off) photo or short looping video of a dramatic Georgian landscape.
- **Headline:** *Explore the Wild Heart of the Caucasus*
- **Subheadline:** *Small-group adventure tours and day trips across Georgia, led by certified local guides.*
- **Two buttons:** "Find Your Adventure" (primary, filled accent) + "Plan a Custom Trip" (secondary, outline/ghost; links to custom-trip service/contact).
- **Scroll cue** at the bottom: subtle white "Scroll" + thin animated line (or chevron), clickable to smooth-scroll to the next section, fades out once the user starts scrolling, animation disabled for reduced-motion. (No "mouse + wheel" icon.)
- No trust line, no search/filter bar in the hero.

### 5.2 Your Local Adventure Team (intro + trust) — light
- **Header:** *Your Local Adventure Team in Georgia*
- **Body:** *Adventure Experts Georgia creates guided outdoor and cultural experiences across one of the most diverse countries in the Caucasus. From high mountain trails and remote valleys to caves, cliffs, ancient villages, and off-road routes, we help travelers discover Georgia beyond the usual tourist path.*
- Beneath the paragraph, a row of **non-numeric trust points** (no review counts needed — company is new). Choose 3–4 that are genuinely true, e.g.: ✓ Certified professional guides · ✓ Licensed & insured · ✓ Born-and-raised local experts · ✓ Small groups.
- **Mobile:** the trust row stacks into a 2×2 grid (not 4-across).

### 5.3 Choose Your Adventure (activities) — dark background
- **Header:** *Choose Your Adventure* (+ short subhead, e.g. "Swipe to explore our activities").
- **Horizontal-scroll row** of 8 image cards: Trekking & Hiking · Biking · Caving · Canyoning · Overlanding · Mixed Tours · Summit Experience · Climbing.
- **Card:** full-bleed photo, portrait **3:4** aspect ratio, rounded corners (~12–16px), activity name on a **dark gradient scrim** at the bottom for legibility over any photo. Whole card clickable → that activity.
- **Dimensions:** mobile card width ~78% of viewport (next card peeks); desktop card width ~300–340px so ~3.5 cards show (half-card = peek). Gap ~12–16px.
- **Mechanics:** `scroll-snap` honoring side padding (preserves the peek), position dots on mobile, arrow buttons on desktop. Lazy-load images.
- Optional: subtle hover effect (image zoom + "View tours →").

### 5.4 Featured Adventures (best-seller tours) — light
- **Header:** e.g. *Featured Adventures*.
- **6 tour cards**, horizontal scroll on mobile (same mechanics as 5.3).
- **Card layout:** photo on top (landscape ~4:3 or 16:9) + info area below (NOT text-over-image — too many data points). Whole card clickable.
- **Card contents, top → bottom:** photo (small difficulty or "Day tour / X days" badge overlaid) → tour name → one-line hook (~5 words) → region · activity type → duration · difficulty → rating *or* "New" badge → **From €X / person** → **View Tour** button.
- **Rating rule:** show stars only with a meaningful review count; otherwise use a "New" / "Just launched" badge. Never show an empty or near-empty rating.
- End the scroll with a **"View all tours →"** link/card.

### 5.5 Day Tours spotlight — "More Than Mountains" — immersive image / dark
An immersive cultural band (emotion) with bookable day-tour cards below (action).
- **Eyebrow:** *Day Tours*
- **Headline:** *More Than Mountains*
- **Body:** *Beyond the trails lies a country layered with history — cliff-top monasteries, cave cities, frescoed churches, and old stone towns. Our day tours pair the outdoors with the flavors and stories of Georgia: a hike to a medieval fortress, a table of khinkali and homemade wine, a walk through streets older than most nations. Adventure by day, culture all the way through — and back by evening.*
- **Visual treatment:** full-bleed immersive cultural photo (cliff monastery, old Tbilisi street, or a Georgian *supra* feast) with a dark gradient scrim and the headline/copy over it; optional subtle slow zoom (motion-safe). Optionally followed by a thin row of four themed tiles: *Cuisine & Wine · Medieval Architecture · Ancient History · Mountain Trails* (collapses to 2×2 on mobile).
- **Below:** 3–4 **day-tour cards** (reuse the 5.4 tour-card component, horizontal scroll on mobile) → **"See all day tours →"** link.

### 5.6 Why Choose Us / Meet the Guides — colored accent background
- **Eyebrow:** *Why Choose Us* · **Headline:** *Led by Certified Local Guides*
- **Intro body:** *Every Adventure Experts trip is led by certified, local guides who were born in these mountains and know them better than any map. They're trained in wilderness safety and first aid, so you're in expert hands from the first step to the last — and because they're locals, they'll take you to the places, people, and stories most travelers never find.* (Covers certified · local · safety · experienced · authentic.)
- **3 guide cards:** real photo (portrait ~4:5, consistent style across all three, in-the-field not stock) → name → role/title → 1–2 sentence bio (specialty + personality); optional: real certification badges, languages spoken, specialty tag. Real alt text per guide.
- **Layout:** desktop 3-across; **mobile stacks vertically** (only 3 cards — no horizontal scroll here).
- Optional **"Meet all our guides →"** link to the Guides page.
- Note: on the colored background, use light text and re-check the CTA color for contrast.

### 5.7 Explore Georgia by Region (interactive map) — light
- **Eyebrow:** *Explore the Map* · **Headline:** e.g. *Where Will You Go?* / *Explore Georgia by Region*
- **Map:** stylized **SVG** of Georgia — borders and regions only (not detailed terrain). **A regions SVG/GeoJSON file will be supplied** (do not attempt to draw geography from scratch). Each region is its own path: hoverable, tappable, and linkable.
- **Interaction:** desktop = hover highlights the region and shows a card; **mobile = tap** highlights and shows the card (hover does not exist on touch). On mobile, show the card as a panel below the map or a bottom sheet — do not float a tiny popup over a small region.
- **Card contents:** region name + the **activities available there** (as small tags drawn from the activity taxonomy) + **"View [region] →"** button → that region's page.
- **Context:** show neighbouring countries' **borders** as muted shapes with labels + the Black Sea for orientation.
- **Airports:** pins + labels for **Tbilisi** and **Kutaisi** only. **No foreign airports.**
- **Disputed territories:** decide how to render Abkhazia and South Ossetia — typically shown within Georgia's borders (local convention) but greyed-out with no tours. Make this a deliberate choice.
- **Region pages:** each links to `/en/regions/[region]` with a hero image, intro/info about the region, the activities available, and the tours located there.
- **Data:** drive both the map cards and the region pages from a **single regions data file** (region name, blurb, activities, airport, tour list, page link) — one source of truth.
- **Accessibility:** regions keyboard-focusable with proper labels; highlight animations motion-safe.

### 5.8 Reviews — light (or soft earthy tint)
- **Eyebrow:** *Reviews* · **Headline:** *What Our Travelers Say*
- **3 review cards:** 5-star rating → quote → **tour taken + date** (e.g. "— Svaneti Trek, April 2026") → person photo *or* initials circle (never a stock headshot) → name · country → **source badge** ("via Google / TripAdvisor / Viator" with logo).
- **Reviews must be genuine.** If fewer than 3 real reviews exist, show fewer or hold the section. Optional aggregate line near the header ("Rated 4.9★ on TripAdvisor") only once the count is meaningful.
- **Layout:** desktop 3-across; mobile stacks vertically. No auto-rotating carousel.
- **"View All"** secondary/outline button → full reviews page or external profile.

### 5.9 Final CTA — Tailor-Made — dark / warm accent background
- **Eyebrow:** *TAILOR-MADE*
- **Headline:** *Want a Trip Designed Around You?*
- **Body:** *Tell us your dates, group size, interests, and fitness level, and we'll craft a private itinerary — hiking, climbing, caving, biking, overlanding, or a mix, with as much Georgian food and culture as you like.*
- **Button:** **Request a Custom Trip** → `/en/contact` (or a dedicated `/en/custom-trip` page). **Do not ship the `localhost:3000` link.**
- **Visual treatment:** either a warm solid earthy background (forest green / terracotta) with a high-contrast button — a clean, confident close after a photo-heavy page — or a full-bleed image of a guide and traveler planning over a map (literally pictures "designed around you"). Centered text, generous padding, stacks on mobile.
- **Why it's here:** bookends the hero's "Plan a Custom Trip" button and captures the "build your own" customer at the bottom of the page.

### 5.10 Footer — dark background
Modeled on a clean, minimal dark footer (Black Tomato style), adapted to Adventure Experts Georgia's content. Light text, uppercase letter-spaced section labels.

- **Top — trust / accreditation row:** **only credentials you genuinely hold.** Realistic options: "Licensed tour operator" + Georgian registration number; guide-certification logos (UIMLA, Wilderness First Aid) if applicable; TripAdvisor/Google rating badge once reviews exist; secure-payment icons. **Do not** use UK schemes like ATOL/ABTA.
- **Link sections — mobile = collapsible accordions (`+`); desktop = open side-by-side columns:**
  - **Adventure Experts Georgia** — About Us · Our Guides · Reviews · Contact
  - **Tours & Activities** — Trekking & Hiking · Biking · Caving · Canyoning · Overlanding · Mixed Tours · Summit Experience · Climbing · Day Tours
  - **Destinations** — region pages: Svaneti · Kazbegi · Imereti · Kakheti · …
  - **Services** — Custom Trip Planning · Transfers & Logistics · (Coming soon: Climbing Course, Children Camp, Rope Training, Winter Sports)
  - **Useful Information** — FAQ · What to Bring · Booking & Cancellation Policy · Privacy Policy · Terms
- **Newsletter:** *"Get adventure inspiration & Georgia travel tips"* + email field + arrow button.
- **Social row:** WhatsApp · Instagram · Facebook · Email (YouTube/TikTok only if actually used). Mirrors the mobile-menu contact strip.
- **Contact block:** physical address in Tbilisi · phone / WhatsApp number · email.
- **Legal bar:** © 2026 Adventure Experts Georgia · registered company / license number · Booking Conditions · Privacy. **Rewrite legal wording for Georgia** (no ATOL/UK-agent language).
- All links carry the `/en/` language prefix.

---

## 6. Optional add-on sections (not yet designed)

Can be added later if wanted; the page works without them:

- **How It Works** — simple 3-step strip (Choose → Book → Adventure) + reassurance line ("Free cancellation… · Instant confirmation").
- **Gallery** — grid of real trip photos (or live Instagram feed).
- **Responsible / local travel** — supporting local guides/communities and protecting Georgia's wild places.
- **FAQ teaser** — top pre-booking worries (fitness, what to bring, weather, cancellation) with a link to the full FAQ.

---

## 7. Supporting pages referenced

- **Tours page** (`/en/tours`) with activity anchors/sections (ideally evolving into per-activity pages for SEO).
- **Region pages** (`/en/regions/[region]`).
- **Services page** (`/en/services`, with `/en/services/transfers` etc.) — full descriptions of each service.
- **Guides page** — full team.
- **Contact / Custom-trip page** (`/en/contact`).
- **Reviews page** (or external profile).
- **Legal pages** — Booking & Cancellation Policy, Privacy Policy, Terms.

---

## 8. Assets / inputs needed before/while building

- **Real photos:** landscapes, tours in action, guides (portraits), cultural shots (food, architecture, history). No stock for guides/reviews/trips.
- **Regions SVG/GeoJSON** of Georgia (to be supplied to Claude Design — provide as **SVG** where each region is its own path).
- **Logo** and any existing brand colors.
- **Tour data:** names, regions, activity type, duration, difficulty, "from" price, hooks.
- **Guide data:** names, roles, bios, photos, certifications, languages.
- **Real reviews** with source platform, traveler name, country, tour, date.
- **True trust facts:** licensed? insured? group sizes? registration/license number? (to fill the trust row and footer honestly).
- **Real numbers** (years operating, traveler count, rating) — to add later once meaningful.

---

*Use Claude Design for the sections where seeing matters most (hero, tour/activity cards, the regional map), then hand off to Claude Code to build. Feed the rest to Claude Code directly from this brief.*

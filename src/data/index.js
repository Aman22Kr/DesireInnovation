// Mock content for the demo. All names, figures, prices and reviews are fictional sample data.
import { art } from '../utils/placeholder'

export const services = [
  { slug: 'product-design', title: 'Product Design', category: 'Design', price: 4800, summary: 'From first sketch to shippable interface, we shape products people want to use.', description: 'We run discovery, define the product model, and design the full interface system with working prototypes you can put in front of real users.', deliverables: ['Discovery workshop', 'User journeys and flows', 'Interactive prototype', 'Design system starter'], duration: '6 to 8 weeks', tags: ['ux', 'ui', 'prototype', 'app'] },
  { slug: 'brand-identity', title: 'Brand Identity', category: 'Brand', price: 3600, summary: 'Names, marks and visual languages that hold together on a shelf and on a screen.', description: 'A focused identity programme: positioning, naming support, logo, colour, type and usage guidelines.', deliverables: ['Positioning brief', 'Logo suite', 'Colour and type system', 'Brand guidelines PDF'], duration: '4 to 6 weeks', tags: ['logo', 'branding', 'guidelines'] },
  { slug: 'web-development', title: 'Web Development', category: 'Engineering', price: 5400, summary: 'Fast, accessible sites and web apps built with modern tooling.', description: 'React and static-first builds with performance budgets, accessibility checks and clean handover documentation.', deliverables: ['Responsive build', 'CMS or data layer', 'Performance audit', 'Handover docs'], duration: '6 to 10 weeks', tags: ['react', 'website', 'frontend'] },
  { slug: 'innovation-sprints', title: 'Innovation Sprints', category: 'Strategy', price: 2900, summary: 'Five days to move from a fuzzy problem to a tested concept.', description: 'A facilitated sprint that frames the problem, generates concepts, prototypes the best one and tests it with five people.', deliverables: ['Sprint facilitation', 'Concept prototype', 'User test report', 'Next-steps roadmap'], duration: '1 week', tags: ['workshop', 'research', 'strategy'] },
  { slug: 'motion-and-video', title: 'Motion and Video', category: 'Brand', price: 3200, summary: 'Short films and interface motion that explain ideas quickly.', description: 'Storyboarding, animation and sound for launch films, product explainers and interface motion guidelines.', deliverables: ['Storyboard', 'Animated film', 'Motion guidelines', 'Social cut-downs'], duration: '3 to 5 weeks', tags: ['animation', 'film', 'explainer'] },
  { slug: 'design-systems', title: 'Design Systems', category: 'Design', price: 4200, summary: 'Shared components and rules so teams ship consistent products faster.', description: 'We audit what you have, define tokens and components, and document them so design and engineering stay aligned.', deliverables: ['Interface audit', 'Token library', 'Component set', 'Contribution guide'], duration: '5 to 8 weeks', tags: ['components', 'tokens', 'library'] },
]

export const projects = [
  { slug: 'lumen-health', title: 'Lumen Health', client: 'Lumen (sample client)', category: 'Product', year: 2025, summary: 'A patient companion app that turns appointment chaos into a calm daily plan.', body: ['Lumen wanted to reduce missed appointments. We mapped the patient journey and found that reminders were not the problem, confusion was.', 'The redesigned app groups every task for the day into one short list, with plain-language explanations for each step.', 'In pilot testing with sample users, task completion rose noticeably and support questions fell.'], metrics: [['Missed visits', '-31%'], ['Task completion', '+44%'], ['Build time', '9 weeks']], services: ['product-design', 'design-systems'], tags: ['health', 'mobile', 'app'] },
  { slug: 'terra-coffee', title: 'Terra Coffee', client: 'Terra (sample client)', category: 'Brand', year: 2025, summary: 'A rebrand for a roaster moving from market stall to national shelf presence.', body: ['Terra had a loyal local following and a logo drawn on a napkin. We kept the warmth and added structure.', 'The identity uses a single bold mark, an earthy palette and packaging that is easy to recognise from across a shop.'], metrics: [['Retail stockists', '12 to 140'], ['Packaging SKUs', '18'], ['Timeline', '5 weeks']], services: ['brand-identity'], tags: ['packaging', 'food', 'logo'] },
  { slug: 'northwind-portal', title: 'Northwind Portal', client: 'Northwind (sample client)', category: 'Web', year: 2024, summary: 'A supplier portal rebuilt for speed, clarity and keyboard-first workflows.', body: ['Northwind staff spent hours in a slow legacy portal. We rebuilt it as a fast single-page app with saved views and bulk actions.', 'Accessibility was a first-class goal, so every flow works with a keyboard and screen reader.'], metrics: [['Page load', '0.9s'], ['Steps per order', '-40%'], ['Accessibility score', '98']], services: ['web-development', 'product-design'], tags: ['portal', 'react', 'b2b'] },
  { slug: 'orbit-sprint', title: 'Orbit Sprint', client: 'Orbit Labs (sample client)', category: 'Strategy', year: 2024, summary: 'A five-day sprint that found the one feature worth building first.', body: ['Orbit had twelve feature ideas and budget for one. We ran a sprint to test the riskiest assumptions.', 'By Friday, five users had tried a prototype and the team had a clear, evidence-backed first release.'], metrics: [['Ideas tested', '12'], ['Users interviewed', '5'], ['Duration', '5 days']], services: ['innovation-sprints'], tags: ['workshop', 'research'] },
  { slug: 'kite-launch-film', title: 'Kite Launch Film', client: 'Kite (sample client)', category: 'Motion', year: 2024, summary: 'A 60-second launch film explaining a complex payments tool in plain terms.', body: ['Kite needed to explain a technical product to non-technical buyers. We wrote a story around one customer problem.', 'The film pairs simple shapes with a confident voice, and was cut into social formats for launch week.'], metrics: [['Film length', '60s'], ['Cut-downs', '6'], ['Timeline', '4 weeks']], services: ['motion-and-video'], tags: ['film', 'fintech', 'animation'] },
  { slug: 'atlas-design-system', title: 'Atlas Design System', client: 'Atlas (sample client)', category: 'Product', year: 2023, summary: 'One component library to replace five inconsistent product interfaces.', body: ['Atlas teams each had their own buttons, colours and spacing. We audited every product and defined shared tokens.', 'Teams now ship from a single documented component set, and new screens take far less design time.'], metrics: [['Products unified', '5'], ['Components', '64'], ['Design time', '-35%']], services: ['design-systems', 'web-development'], tags: ['components', 'tokens'] },
  { slug: 'meadow-market', title: 'Meadow Market', client: 'Meadow (sample client)', category: 'Web', year: 2023, summary: 'A farm-to-door grocery storefront that makes seasonal eating easy.', body: ['Meadow sells weekly boxes from local farms. We built a storefront where the season leads, not the catalogue.', 'Customers browse by what is fresh this week and save favourites for reorders.'], metrics: [['Repeat orders', '+27%'], ['Checkout steps', '3'], ['Build time', '7 weeks']], services: ['web-development', 'brand-identity'], tags: ['ecommerce', 'food', 'storefront'] },
  { slug: 'pulse-fitness', title: 'Pulse Fitness', client: 'Pulse (sample client)', category: 'Product', year: 2023, summary: 'A training app with a coach-first interface and streaks that feel earned.', body: ['Pulse members dropped off after week three. We reframed the app around the coach relationship rather than gamified points.', 'Streaks and weekly check-ins now feel personal, and members stay longer.'], metrics: [['Week-4 retention', '+22%'], ['Screens designed', '48'], ['Timeline', '8 weeks']], services: ['product-design'], tags: ['fitness', 'mobile', 'retention'] },
]

export const posts = [
  { slug: 'designing-for-calm', title: 'Designing for calm in busy products', category: 'Design', date: '2026-09-12', readTime: 6, summary: 'Why the best interfaces remove decisions instead of adding features.', body: ['Busy products often confuse completeness with value. Every extra option asks the user to make a decision.', 'Start by listing what the user must decide today, and hide everything else behind progressive disclosure.', 'Calm is not minimalism for its own sake. It is the result of careful ordering, clear language and restraint.'], tags: ['ux', 'principles'] },
  { slug: 'sprint-playbook', title: 'A five-day innovation sprint, day by day', category: 'Strategy', date: '2026-08-28', readTime: 8, summary: 'The exact rhythm we use to get from problem to tested prototype in a week.', body: ['Monday is for framing: agree the problem, the user and the riskiest assumption.', 'Tuesday and Wednesday are for concepts and choosing one to build. Thursday is prototype day.', 'Friday is five user conversations. Watching people use the prototype settles most debates.'], tags: ['workshop', 'process'] },
  { slug: 'tokens-first', title: 'Why we start design systems with tokens', category: 'Engineering', date: '2026-08-10', readTime: 5, summary: 'Colour, spacing and type decisions belong in one place before any component exists.', body: ['Tokens are named design decisions. Naming a colour by its job, such as surface or accent, makes change cheap.', 'Once tokens exist, components become thin layers that read from them.', 'Teams that start with components inherit hundreds of unmanaged values.'], tags: ['systems', 'css'] },
  { slug: 'brand-on-a-budget', title: 'Building a brand when you have three weeks', category: 'Brand', date: '2026-07-19', readTime: 4, summary: 'A tight scope still produces a coherent identity if you choose the right constraints.', body: ['Pick one typeface pairing, one primary colour and one memorable shape.', 'Test the mark at small sizes first. If it fails at favicon size, it will fail everywhere.', 'Document usage in a single page that anyone on the team can follow.'], tags: ['branding', 'startups'] },
  { slug: 'motion-with-purpose', title: 'Motion with purpose: when animation helps', category: 'Design', date: '2026-06-30', readTime: 5, summary: 'Animation should explain change, not decorate it. Here is how we decide.', body: ['Good motion shows where something came from and where it went.', 'We tune duration and distance by importance, and always respect the visitor’s reduced-motion preference.', 'If removing the animation loses no meaning, it is decoration and should be quiet.'], tags: ['motion', 'accessibility'] },
  { slug: 'static-first-web', title: 'The case for static-first websites', category: 'Engineering', date: '2026-06-02', readTime: 7, summary: 'Most marketing sites need fast delivery and simple hosting, not a server.', body: ['Static builds are cheap to host, quick to load and hard to break.', 'Interactive pieces can be added where needed, with data stored in the browser or fetched from an API.', 'The result is a site that is easy to maintain years after launch.'], tags: ['performance', 'hosting'] },
]

export const faqs = [
  { q: 'Is this a real company website?', a: 'No. DesireInnovation is a demo website built for practice. Projects, clients, prices and reviews are fictional sample data.' },
  { q: 'Where is my data stored?', a: 'Favourites, your basket, theme, search history and form drafts are saved in your own browser using localStorage. They stay on this device and do not sync anywhere.' },
  { q: 'Can I really request a quote?', a: 'The quote and contact forms are demos. They save your entry in this browser only. Nothing is sent to a server and nobody receives it.' },
  { q: 'Is there a real checkout?', a: 'No. The basket is a planning tool. No payment is taken and no booking is made.' },
  { q: 'How do I change the animations?', a: 'Open Settings from the header and choose a speed and intensity. You can switch animations off entirely. Your device’s reduced-motion setting is always respected.' },
  { q: 'How do I clear my saved data?', a: 'Go to Settings and use Clear saved data, or clear site data in your browser settings.' },
  { q: 'Can I reuse this project for another website?', a: 'Yes. Edit src/config.js for brand and defaults, and replace the content in src/data/index.js.' },
  { q: 'What do the ads at the bottom mean?', a: 'They are a placeholder strip showing where adverts could go. No ad network is connected.' },
]

export const team = [
  { name: 'Aanya Rao', role: 'Design Director', seed: 1 },
  { name: 'Kabir Shah', role: 'Lead Engineer', seed: 2 },
  { name: 'Meera Iyer', role: 'Strategy Lead', seed: 3 },
  { name: 'Dev Nair', role: 'Motion Designer', seed: 4 },
]

export const testimonials = [
  { quote: 'They turned a tangled brief into something our whole team could rally behind.', name: 'Sample reviewer', role: 'Product lead, sample client' },
  { quote: 'Clear communication, sharp design and a build that was fast from day one.', name: 'Sample reviewer', role: 'Founder, sample client' },
  { quote: 'The sprint saved us months of building the wrong thing.', name: 'Sample reviewer', role: 'Head of growth, sample client' },
]

export const processSteps = [
  { title: 'Listen', text: 'We start with your goals, users and constraints.' },
  { title: 'Explore', text: 'Fast sketches and prototypes test the big ideas early.' },
  { title: 'Build', text: 'Design and engineering work side by side in short cycles.' },
  { title: 'Launch', text: 'We ship, measure, and hand over with clear documentation.' },
]

// Attach artwork after the arrays are defined
services.forEach((s, i) => { s.image = art(i, s.title) })
projects.forEach((p, i) => { p.image = art(i + 1, p.title) })
posts.forEach((p, i) => { p.image = art(i + 3, p.title, 800, 450) })
team.forEach((t) => { t.image = art(t.seed + 2, '', 400, 400) })

export const catalog = [
  ...services.map((s) => ({ id: `service:${s.slug}`, type: 'service', slug: s.slug, title: s.title, summary: s.summary, category: s.category, tags: s.tags, image: s.image, path: `/services/${s.slug}`, sortDate: 0, price: s.price })),
  ...projects.map((p) => ({ id: `project:${p.slug}`, type: 'project', slug: p.slug, title: p.title, summary: p.summary, category: p.category, tags: p.tags, image: p.image, path: `/portfolio/${p.slug}`, sortDate: p.year })),
  ...posts.map((p) => ({ id: `post:${p.slug}`, type: 'post', slug: p.slug, title: p.title, summary: p.summary, category: p.category, tags: p.tags, image: p.image, path: `/blog/${p.slug}`, sortDate: Number(p.date.slice(0, 4)) })),
]

export const findItem = (id) => catalog.find((c) => c.id === id)
export const typeLabel = { service: 'Service', project: 'Project', post: 'Article' }

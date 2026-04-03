/**
 * prerender-meta.js
 *
 * Runs after `vite build`. For each known public route, writes a
 * route-specific index.html to dist/ with the correct Open Graph /
 * Twitter Card meta tags baked in — so social-media crawlers (which
 * don't run JavaScript) see the right preview for every page.
 *
 * Usage (added to package.json build script):
 *   vite build && cp -r assets dist/ && node scripts/prerender-meta.js
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SITE_URL = 'https://learnhubdev.com'
const SITE_NAME = 'LearnHub'

// ── Route metadata ──────────────────────────────────────────────────────────
// title: shown as "<title> — LearnHub" (matches SEO component behaviour)
// description: og:description + twitter:description + meta description
// image: absolute URL to OG image (1200x630)
// path: canonical path

const ROUTES = [
  {
    path: '/courses',
    title: 'All Courses — Free Developer Roadmaps',
    description:
      'Browse 5 free structured developer courses: Node.js (30 days), Frontend (60 days), SQL & MongoDB (20 days), AI-First Web Dev (49 days), and Business Analysis. Free, self-paced.',
    image: `${SITE_URL}/assets/og/learnhub-og.png`,
  },
  {
    path: '/roadmaps',
    title: 'Learning Roadmaps for Developers',
    description:
      '5 structured learning roadmaps for developers: Node.js (30 days), Frontend (60 days), Databases (20 days), AI-First Web Dev (49 days), Business Analysis. Free, self-paced.',
    image: `${SITE_URL}/assets/og/learnhub-og.png`,
  },
  {
    path: '/about',
    title: 'About LearnHub',
    description:
      'LearnHub is a free, structured learning platform for developers. We believe every developer deserves a clear, actionable path to real-world skills — without paywalls or tutorial chaos.',
    image: `${SITE_URL}/assets/og/learnhub-og.png`,
  },
  {
    path: '/pricing',
    title: 'Pricing — Free Developer Courses',
    description:
      'LearnHub is free forever. All 5 courses, 200+ lessons, progress tracking, and certificates — zero cost, no credit card required. Optional Pro plan coming soon.',
    image: `${SITE_URL}/assets/og/learnhub-og.png`,
  },
  {
    path: '/blog',
    title: 'Blog — Developer Learning Tips & Roadmaps',
    description:
      'LearnHub blog: developer learning tips, roadmap guides, career advice, and how to master Node.js, Frontend, Databases, and AI development. Coming soon.',
    image: `${SITE_URL}/assets/og/learnhub-og.png`,
  },
  {
    path: '/courses/nodejs-30day',
    title: '30-Day Node.js Mastery Plan',
    description:
      'Master Node.js in 30 structured days. Build production REST APIs with Express, connect to SQL and MongoDB databases, implement JWT auth, and deploy to the cloud. Free, self-paced, certificate included.',
    image: `${SITE_URL}/assets/og/nodejs-og.png`,
  },
  {
    path: '/courses/frontend-roadmap',
    title: 'Frontend Development Roadmap',
    description:
      'Go from zero to building interactive websites in 60 structured days. Master HTML5, CSS3, and JavaScript ES6+ with daily lessons. Free, beginner-friendly, certificate included.',
    image: `${SITE_URL}/assets/og/frontend-og.png`,
  },
  {
    path: '/courses/sql-mongodb-20day',
    title: 'SQL & MongoDB 20-Day Plan',
    description:
      'Learn SQL and MongoDB in 20 structured days. Master relational schema design, complex queries, document modeling, and Node.js database integration. Free, beginner-friendly, certificate included.',
    image: `${SITE_URL}/assets/og/sql-mongodb-og.png`,
  },
  {
    path: '/courses/ai-first-webdev-49day',
    title: 'AI-First Web Dev — 49 Days',
    description:
      'Build production AI-powered web apps in 49 structured days. Master React, Next.js, Nuxt, OpenAI API, Claude API, and Playwright testing. Free, advanced course, certificate included.',
    image: `${SITE_URL}/assets/og/ai-first-webdev-og.png`,
  },
  {
    path: '/courses/smart-ba-roadmap',
    title: 'Smart Business Analyst Roadmap',
    description:
      'Become a Business Analyst with a structured self-paced roadmap. Cover requirements engineering, BPMN process modeling, Agile & Scrum, JIRA, Confluence, and career preparation. Free, certificate included.',
    image: `${SITE_URL}/assets/og/smart-ba-og.png`,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Replace a single <meta> attribute value in an HTML string.
 * Matches both property="…" and name="…" variants.
 */
function replaceMeta(html, attrName, attrValue, newContent) {
  const re = new RegExp(
    `(<meta\\s[^>]*(?:property|name)="${escape(attrName)}"[^>]*content=")[^"]*(")|(<meta\\s[^>]*content="[^"]*"[^>]*(?:property|name)="${escape(attrName)}"[^>]*>)`,
    'i'
  )
  // Simpler targeted replacement: build two patterns (attr before content, content before attr)
  const r1 = new RegExp(
    `(<meta[^>]*(?:property|name)=["']${attrName}["'][^>]*content=["'])([^"']*)`,
    'i'
  )
  const r2 = new RegExp(
    `(<meta[^>]*content=["'])([^"']*)([^>]*(?:property|name)=["']${attrName}["'])`,
    'i'
  )
  if (r1.test(html)) return html.replace(r1, `$1${escape(newContent)}`)
  if (r2.test(html)) return html.replace(r2, `$1${escape(newContent)}$3`)
  return html
}

function replaceTitle(html, newTitle) {
  return html.replace(/(<title>)[^<]*(<\/title>)/, `$1${escape(newTitle)}$2`)
}

function replaceCanonical(html, newUrl) {
  return html.replace(
    /(<link[^>]*rel=["']canonical["'][^>]*href=["'])[^"']*([^>]*>)/i,
    `$1${escape(newUrl)}$2`
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────

const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const fullTitle = `${route.title} — ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${route.path}`

  let html = baseHtml

  // <title>
  html = replaceTitle(html, fullTitle)

  // canonical
  html = replaceCanonical(html, canonicalUrl)

  // Standard meta
  html = replaceMeta(html, 'description', 'name', route.description)

  // Open Graph
  html = replaceMeta(html, 'og:title', 'property', fullTitle)
  html = replaceMeta(html, 'og:description', 'property', route.description)
  html = replaceMeta(html, 'og:image', 'property', route.image)
  html = replaceMeta(html, 'og:image:secure_url', 'property', route.image)
  html = replaceMeta(html, 'og:image:alt', 'property', `${SITE_NAME} — ${route.title}`)
  html = replaceMeta(html, 'og:url', 'property', canonicalUrl)

  // Twitter Card
  html = replaceMeta(html, 'twitter:title', 'name', fullTitle)
  html = replaceMeta(html, 'twitter:description', 'name', route.description)
  html = replaceMeta(html, 'twitter:image', 'name', route.image)

  // Write to dist/<route path>/index.html
  const outDir = join(DIST, route.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')

  console.log(`  ✓ ${route.path}`)
}

console.log(`\nPre-rendered ${ROUTES.length} routes into dist/`)

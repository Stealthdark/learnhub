import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://learnhubdev.com'
const SITE_NAME = 'LearnHub'
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og/learnhub-og.png`

/* ── Organization schema — injected on every page ── */
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LearnHub',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/og/logo/learnhub-logo.png`,
  description: 'Free, structured learning roadmaps for developers. Master Node.js, Frontend, Databases, AI, and Business Analysis with day-by-day guided paths.',
  foundingDate: '2024',
  knowsAbout: ['Web Development', 'Node.js', 'Frontend Development', 'SQL', 'MongoDB', 'AI Development', 'Business Analysis'],
}

export default function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  keywords,
  jsonLd,
  breadcrumb,
}) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Structured Learning Roadmaps for Developers`
  const canonicalUrl = `${SITE_URL}${path}`

  const breadcrumbSchema = breadcrumb
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          ...breadcrumb.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
          })),
        ],
      }
    : null

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="LearnHub" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title || 'Structured Learning Roadmaps'}`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  )
}

import { useState, useMemo } from 'react'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'
import BlogCard from '../components/marketing/BlogCard'
import { BLOGS } from '../data/blogs'

const CATEGORIES = [
  'All',
  'Career & Learning',
  'Node.js',
  'Frontend',
  'Database',
  'AI & ML',
  'Business Analysis',
  'Full Stack',
]

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'LearnHub Blog',
  description:
    'Developer learning tips, roadmap deep-dives, career advice, and practical guides for mastering Node.js, Frontend, Databases, AI development, and Business Analysis.',
  url: 'https://learnhubdev.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'LearnHub',
    url: 'https://learnhubdev.com',
    logo: 'https://learnhubdev.com/assets/og/logo/learnhub-logo.png',
  },
  blogPost: BLOGS.map(b => ({
    '@type': 'BlogPosting',
    headline: b.title,
    description: b.excerpt,
    url: `https://learnhubdev.com/blog/${b.slug}`,
    datePublished: b.dateISO,
    author: { '@type': 'Organization', name: b.author },
    keywords: b.tags.join(', '),
    articleSection: b.category,
  })),
}

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [copiedSlug, setCopiedSlug] = useState(null)

  const filteredPosts = useMemo(() => {
    return BLOGS.filter(post => {
      const matchCat = activeCategory === 'All' || post.category === activeCategory
      const term = search.toLowerCase()
      const matchSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some(t => t.toLowerCase().includes(term))
      return matchCat && matchSearch
    })
  }, [search, activeCategory])

  async function handleShare(post, e) {
    e.preventDefault()
    e.stopPropagation()
    const url = `https://learnhubdev.com/blog/${post.slug}`
    const shareData = { title: post.title, text: post.excerpt, url }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (_) {
        // user cancelled — no action needed
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
      } catch (_) {
        // execCommand fallback for older browsers
        const el = document.createElement('input')
        el.value = url
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      setCopiedSlug(post.slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    }
  }

  return (
    <>
      <SEO
        title="Blog — Developer Learning Tips & Roadmaps"
        description="LearnHub blog: practical guides on Node.js, Frontend, SQL, AI development, and Business Analysis. Real advice for self-taught developers, updated every week."
        path="/blog"
        keywords="developer blog, coding tips, learning roadmap blog, Node.js tutorials, web development articles, programming career advice"
        breadcrumb={[{ name: 'Blog', path: '/blog' }]}
        jsonLd={BLOG_SCHEMA}
      />

      <Navbar />

      <main>
        {/* Hero */}
        <section className="mkt-page-hero">
          <div className="container">
            <h1>LearnHub Blog</h1>
            <p className="mkt-page-hero__sub">
              Practical guides, honest advice, and deep-dives for developers who are serious about learning.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div className="mkt-blog-filters">
          <div className="mkt-blog-search">
            <span className="mkt-blog-search__icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search blog posts"
            />
          </div>
          <div className="mkt-blog-filter-chips" role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`mkt-blog-filter-chip${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mkt-blog-grid" aria-live="polite" aria-label="Blog posts">
          {filteredPosts.length === 0 ? (
            <div className="mkt-blog-empty">
              <h3>No posts found</h3>
              <p>
                Try a different search term or category.{' '}
                <button
                  className="mkt-blog-filter-chip active"
                  style={{ display: 'inline-flex', marginTop: 12 }}
                  onClick={() => { setSearch(''); setActiveCategory('All') }}
                >
                  Clear filters
                </button>
              </p>
            </div>
          ) : (
            filteredPosts.map((post, i) => (
              <BlogCard
                key={post.slug}
                post={post}
                featured={i === 0 && activeCategory === 'All' && !search}
                onShare={handleShare}
                copiedSlug={copiedSlug}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

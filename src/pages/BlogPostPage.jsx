import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Navbar from '../components/marketing/Navbar'
import Footer from '../components/marketing/Footer'
import SEO from '../components/SEO'
import BlogCard from '../components/marketing/BlogCard'
import { getBlogBySlug, getRelatedPosts } from '../data/blogs'

// ─── Content section renderer ───────────────────────────────
function ContentRenderer({ sections }) {
  return sections.map((section, i) => {
    switch (section.type) {
      case 'heading':
        return <h2 key={i}>{section.text}</h2>
      case 'paragraph':
        return <p key={i}>{section.text}</p>
      case 'list':
        return (
          <ul key={i}>
            {section.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        )
      case 'image':
        return (
          <figure key={i} className="mkt-blog-post__inline-img">
            <img src={section.src} alt={section.alt} loading="lazy" />
            {section.caption && <figcaption>{section.caption}</figcaption>}
          </figure>
        )
      case 'code':
        return (
          <div key={i} className="mkt-blog-post__code">
            {section.language && (
              <span className="mkt-blog-post__code-label">{section.language}</span>
            )}
            <pre>
              <code>{section.code}</code>
            </pre>
          </div>
        )
      default:
        return null
    }
  })
}

// ─── Share icon SVGs ─────────────────────────────────────────
function IconTwitter() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

// ─── Main component ──────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const related = getRelatedPosts(post.slug, post.category, 3)
  const postUrl = `https://learnhubdev.com/blog/${post.slug}`

  const POST_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    url: postUrl,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://learnhubdev.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LearnHub',
      url: 'https://learnhubdev.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://learnhubdev.com/assets/og/logo/learnhub-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    timeRequired: `PT${post.readTime}M`,
    wordCount: post.content
      .filter(s => s.type === 'paragraph')
      .reduce((acc, s) => acc + s.text.split(' ').length, 0),
  }

  return (
    <PostContent
      post={post}
      related={related}
      postUrl={postUrl}
      schema={POST_SCHEMA}
    />
  )
}

// Separate component so hooks work cleanly after the early return
function PostContent({ post, related, postUrl, schema }) {
  const [copied, setCopied] = useState(false)
  const [copiedRelated, setCopiedRelated] = useState(null)

  function shareTwitter() {
    const text = encodeURIComponent(`${post.title} — via @learnhubdev`)
    const url = encodeURIComponent(postUrl)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(postUrl)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(postUrl)
    } catch (_) {
      const el = document.createElement('input')
      el.value = postUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleRelatedShare(relatedPost, e) {
    e.preventDefault()
    e.stopPropagation()
    const url = `https://learnhubdev.com/blog/${relatedPost.slug}`
    try {
      await navigator.clipboard.writeText(url)
    } catch (_) {
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopiedRelated(relatedPost.slug)
    setTimeout(() => setCopiedRelated(null), 2000)
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.heroImage}
        keywords={post.tags.join(', ')}
        breadcrumb={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        jsonLd={schema}
      />

      <Navbar />

      <main>
        {/* Breadcrumb */}
        <nav className="mkt-blog-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="mkt-blog-breadcrumb__sep" aria-hidden="true">›</span>
          <Link to="/blog">Blog</Link>
          <span className="mkt-blog-breadcrumb__sep" aria-hidden="true">›</span>
          <span className="mkt-blog-breadcrumb__current">{post.title}</span>
        </nav>

        {/* Hero image */}
        <div className="mkt-blog-post__hero">
          <img src={post.heroImage} alt={post.title} />
        </div>

        {/* Article + sidebar */}
        <div className="mkt-blog-post__layout">
          <article>
            <header className="mkt-blog-post__header">
              <div className="mkt-blog-post__meta">
                <span className="chip chip-blue">{post.category}</span>
                <span className="mkt-blog-post__meta-dot">•</span>
                <span className="mkt-blog-post__readtime">{post.readTime} min read</span>
                <span className="mkt-blog-post__meta-dot">•</span>
                <time className="mkt-blog-post__date" dateTime={post.dateISO}>
                  {post.date}
                </time>
              </div>
              <h1 className="mkt-blog-post__title">{post.title}</h1>
              <p className="mkt-blog-post__excerpt">{post.excerpt}</p>
            </header>

            <div className="mkt-blog-post__content">
              <ContentRenderer sections={post.content} />
            </div>
          </article>

          {/* Share sidebar */}
          <aside className="mkt-blog-share" aria-label="Share this post">
            <div className="mkt-blog-share__inner">
              <span className="mkt-blog-share__title">Share this post</span>
              <div className="mkt-blog-share__btns">
                <button
                  className="mkt-blog-share__btn mkt-blog-share__btn--twitter"
                  onClick={shareTwitter}
                  aria-label="Share on X (Twitter)"
                >
                  <IconTwitter />
                  Share on X
                </button>
                <button
                  className="mkt-blog-share__btn mkt-blog-share__btn--linkedin"
                  onClick={shareLinkedIn}
                  aria-label="Share on LinkedIn"
                >
                  <IconLinkedIn />
                  LinkedIn
                </button>
                <button
                  className="mkt-blog-share__btn mkt-blog-share__btn--copy"
                  onClick={copyLink}
                  aria-label="Copy link to clipboard"
                >
                  <IconLink />
                  {copied ? '✓ Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mkt-blog-related" aria-label="Related posts">
            <div className="mkt-blog-related__inner">
              <h2 className="mkt-blog-related__title">More from LearnHub</h2>
              <div className="mkt-blog-related__grid">
                {related.map(relPost => (
                  <BlogCard
                    key={relPost.slug}
                    post={relPost}
                    onShare={handleRelatedShare}
                    copiedSlug={copiedRelated}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mkt-blog-cta">
          <p>Ready to stop reading and start building?</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/blog" className="btn btn-ghost">
              ← Back to Blog
            </Link>
            <Link to="/sign-up" className="btn btn-primary">
              Start Learning Free
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

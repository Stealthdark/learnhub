import { Link } from 'react-router-dom'

// Category → chip color mapping
const CATEGORY_CHIP = {
  'Career & Learning': 'chip-green',
  'Node.js': 'chip-blue',
  'Frontend': 'chip-purple',
  'Database': 'chip-cyan',
  'AI & ML': 'chip-amber',
  'Business Analysis': 'chip-amber',
  'Full Stack': 'chip-blue',
}

export default function BlogCard({ post, featured = false, onShare, copiedSlug }) {
  const chipClass = CATEGORY_CHIP[post.category] ?? 'chip-blue'
  const isCopied = copiedSlug === post.slug

  return (
    <article className={`mkt-blog-card${featured ? ' mkt-blog-card--featured' : ''}`}>
      <img
        className="mkt-blog-card__img"
        src={post.heroImage}
        alt={post.title}
        loading={featured ? 'eager' : 'lazy'}
      />

      <div className="mkt-blog-card__body">
        <div className="mkt-blog-card__meta">
          <span className={`chip ${chipClass}`}>{post.category}</span>
          <span className="mkt-blog-card__meta-dot">•</span>
          <span className="mkt-blog-card__readtime">{post.readTime} min read</span>
          <span className="mkt-blog-card__meta-dot">•</span>
          <span className="mkt-blog-card__date">{post.date}</span>
        </div>

        <h2 className="mkt-blog-card__title">{post.title}</h2>
        <p className="mkt-blog-card__excerpt">{post.excerpt}</p>

        <div className="mkt-blog-card__footer">
          <Link to={`/blog/${post.slug}`} className="mkt-blog-card__read-link">
            Read article →
          </Link>
          <button
            className="mkt-blog-card__share"
            onClick={e => onShare(post, e)}
            aria-label={`Share: ${post.title}`}
          >
            {isCopied ? '✓ Copied!' : '⬆ Share'}
          </button>
        </div>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────
//  LearnHub Blog Data
//  Add new posts to the top of the BLOGS array (newest first).
//  Each post is fully self-contained — no CMS needed.
//  Updated roughly every 7 days.
// ─────────────────────────────────────────────────────────────

export const BLOGS = [
  // ── 1 ──────────────────────────────────────────────────────
  {
    slug: 'tutorial-hell-dev-career',
    title: 'Why Tutorial Hell Is Killing Your Dev Career (And How to Break Free)',
    excerpt:
      'Most developers spend months watching tutorials and building nothing. Here\'s why that happens, why it\'s not your fault, and the one shift that fixes it.',
    category: 'Career & Learning',
    tags: ['learning', 'career', 'tutorial hell', 'roadmaps', 'self-taught'],
    readTime: 7,
    date: 'January 14, 2025',
    dateISO: '2025-01-14',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1552664-8d638d5d65b0?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "You open YouTube, search 'learn React', and pick the highest-rated video. Four hours later you've watched someone build a to-do app and you couldn't reproduce it without pausing every 30 seconds. Sound familiar? That's tutorial hell — and it's not a learning problem, it's a structure problem.",
      },
      { type: 'heading', text: 'What Tutorial Hell Actually Is' },
      {
        type: 'paragraph',
        text: "Tutorial hell isn't about watching tutorials — that's completely fine. It's about watching tutorials instead of building. You keep consuming content because it feels productive. Your watch history grows. Your GitHub stays empty. And the worst part? You probably don't even notice it's happening.",
      },
      {
        type: 'paragraph',
        text: "Here's how you know you're in it:",
      },
      {
        type: 'list',
        items: [
          'You can follow along but freeze the moment you face a blank file',
          'You jump to a different tutorial the second something gets hard',
          "You've technically 'learned' the same concept three times and still feel lost",
          'Building feels terrifying; watching feels safe and productive',
          'Your notes folder is enormous. Your projects folder is not.',
        ],
      },
      { type: 'heading', text: 'Why Following Along Feels Like Learning' },
      {
        type: 'paragraph',
        text: "Dopamine. Following a tutorial fires the same reward circuits as actually solving a problem — you're making progress, things are working, the code runs. But there's no real friction. The instructor has already done the thinking for you. When the video ends, that thinking lives in their head, not yours.",
      },
      {
        type: 'paragraph',
        text: "This is why you can watch a 10-hour Node.js course and still not be able to build a basic API from scratch. You weren't learning — you were transcribing. There's a difference.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        alt: 'Developer working at a laptop with code on screen',
        caption:
          'The gap between watching and building is where most self-taught developers get stuck.',
      },
      { type: 'heading', text: 'The Real Fix: Change the Ratio' },
      {
        type: 'paragraph',
        text: "The problem isn't tutorials — it's the ratio. If you're spending 80% of your time watching and 20% building, you've got it backwards. Every tutorial should lead to something you make without the tutorial open. Even if it's ugly. Even if it breaks.",
      },
      {
        type: 'paragraph',
        text: "Structured learning paths force this. They point you at one resource for each concept, then immediately give you something to build. The discomfort you feel when the instructions run out? That discomfort is learning. Don't run from it.",
      },
      { type: 'heading', text: 'A Practical 30-Day Reset' },
      {
        type: 'list',
        items: [
          'Pick one technology. One. Not React and Vue simultaneously.',
          'After each tutorial session, close it and try to rebuild what you just saw from memory',
          'Set two "build days" per week where no tutorials are allowed — just you and a blank file',
          "Track what you ship, not what you watch — 'watched 3 hours of JS' is not progress",
          'Use a structured roadmap that tells you exactly what to learn each day',
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
        alt: 'Code editor open on a laptop with coffee nearby',
        caption: 'Building something imperfect beats watching something perfect.',
      },
      { type: 'heading', text: 'One More Thing' },
      {
        type: 'paragraph',
        text: "If you're in tutorial hell right now, you're not lazy or slow. You're using the wrong tool. Tutorials are a reference, not a curriculum. The moment you treat them that way, everything changes. LearnHub's Node.js and Frontend roadmaps exist for exactly this reason — they give you a day-by-day structure that forces you off the passive consumption track and into the building track.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────
  {
    slug: 'learn-nodejs-30-days',
    title: 'How to Learn Node.js in 30 Days Without Burning Out',
    excerpt:
      'A realistic plan for going from Node.js beginner to someone who can actually build and ship a backend — without the overwhelm that kills most learning streaks.',
    category: 'Node.js',
    tags: ['node.js', 'backend', 'javascript', '30 days', 'learning plan'],
    readTime: 8,
    date: 'January 21, 2025',
    dateISO: '2025-01-21',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1627398242-4b1a8027aabd?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509966756634-9c52a7c9b8e6?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "30 days sounds short, but it's enough to go from zero to someone who can build a real Express API, connect it to a database, handle authentication, and deploy it. The catch is you have to be deliberate about how you spend those days. Most people aren't — and that's why they end up on day 45 still confused about what 'async/await' actually does.",
      },
      { type: 'heading', text: 'The Problem With Most Node.js Learning Paths' },
      {
        type: 'paragraph',
        text: "Most beginner resources front-load theory. You spend a week on modules, streams, and the event loop before you ever build anything. By day 7 you've memorized a bunch of concepts with no context for why they matter, and your motivation is already tanking.",
      },
      {
        type: 'paragraph',
        text: 'The better approach: get something working on day 1. Then learn the theory behind it after you have a reason to care.',
      },
      { type: 'heading', text: 'A Realistic Week-by-Week Breakdown' },
      {
        type: 'list',
        items: [
          'Week 1: Node.js core, npm, modules, and your first Express server up and running on day 3',
          'Week 2: REST API fundamentals, route handling, middleware, and connecting to a database',
          'Week 3: Authentication (JWT or sessions), input validation, and error handling',
          'Week 4: Deployment to a real server, environment variables, and a complete mini-project',
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        alt: 'Terminal window showing Node.js server output',
        caption: 'Getting a server running on day one changes the entire trajectory of your learning.',
      },
      { type: 'heading', text: 'The Express Server You Should Build on Day 3' },
      {
        type: 'paragraph',
        text: "Don't wait until week 2 to run actual server code. Here's a minimal Express setup that covers the core concepts — HTTP, routing, JSON responses — in about 15 lines:",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `import express from 'express'

const app = express()
app.use(express.json())

// In-memory store for the example
const items = []

app.get('/api/items', (req, res) => {
  res.json(items)
})

app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), ...req.body }
  items.push(item)
  res.status(201).json(item)
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})`,
      },
      {
        type: 'paragraph',
        text: "Build this first. Then take it apart. Add a DELETE route. Break it intentionally and debug it. You'll learn more from that one hour than from a week of video lectures.",
      },
      { type: 'heading', text: 'The Biggest Mistake People Make in Week 2' },
      {
        type: 'paragraph',
        text: "They try to add too much at once. Authentication, a database, file uploads, and a frontend all in the same project. Complexity compounds and nothing works and they quit. Pick one thing per week. Get it working. Then add the next thing.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1509966756634-9c52a7c9b8e6?w=800&auto=format&fit=crop&q=80',
        alt: 'Developer reviewing backend code on multiple monitors',
        caption: 'One feature working solidly beats five features half-built.',
      },
      { type: 'heading', text: 'How to Actually Finish 30 Days' },
      {
        type: 'list',
        items: [
          'Keep daily sessions under 90 minutes — longer sessions cause fatigue that kills streaks',
          'Write down one thing you built or understood each day (not what you watched)',
          'Use the LearnHub Node.js roadmap — it sequences the topics so you never have to decide what to do next',
          'Ship something at the end of every week, even if it\'s tiny',
          "Don't skip weekends — 20 minutes on Saturday beats zero",
        ],
      },
      {
        type: 'paragraph',
        text: "The 30-day Node.js mastery roadmap on LearnHub is built around exactly this structure — daily tasks, curated resources, and a project at the end of each phase. If you follow it, by day 30 you'll have a working API you built yourself, and that changes how you see the rest of your learning.",
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────
  {
    slug: 'frontend-vs-backend-first',
    title: 'Frontend vs Backend: Which Should You Learn First?',
    excerpt:
      'The most common question from new developers — and most of the advice online gets it wrong. Here\'s an honest breakdown based on what actually works.',
    category: 'Frontend',
    tags: ['frontend', 'backend', 'beginners', 'career', 'web development'],
    readTime: 6,
    date: 'January 28, 2025',
    dateISO: '2025-01-28',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "This is the most Googled question in developer learning, and it gets a lot of unhelpful answers. 'It depends on your goals' — thanks, that's not useful. Let's actually break down what you're choosing between and when each makes sense.",
      },
      { type: 'heading', text: 'What Frontend and Backend Actually Mean' },
      {
        type: 'paragraph',
        text: "Frontend is everything the user sees and interacts with — the browser, the buttons, the animations. You're working with HTML, CSS, and JavaScript. Backend is everything behind the scenes — servers, databases, APIs, authentication. You're working with Node.js, Python, databases, and server infrastructure.",
      },
      {
        type: 'paragraph',
        text: "Both require real skill. Neither is easier. They just demand different ways of thinking.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        alt: 'Code editor showing HTML and CSS side by side',
        caption: 'Frontend and backend are two entirely different problem spaces.',
      },
      { type: 'heading', text: 'Start With Frontend If...' },
      {
        type: 'list',
        items: [
          'You want immediate visual feedback — HTML/CSS shows results in seconds',
          "You're coming from a design, marketing, or non-technical background",
          'You want to build things people can actually see and interact with quickly',
          'You learn better with visual/tangible progress',
          "You're targeting freelance or agency work where UI is the deliverable",
        ],
      },
      { type: 'heading', text: 'Start With Backend If...' },
      {
        type: 'list',
        items: [
          "You've already got some JavaScript under your belt",
          'You enjoy logic problems more than visual design',
          'You want to go into data engineering, APIs, or systems programming',
          'You work at a company that needs backend work and you want to contribute fast',
          "You're specifically targeting backend or full-stack roles at product companies",
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
        alt: 'Laptop on a desk with code visible on the screen',
        caption: 'The best choice depends on your starting point, not some abstract ideal order.',
      },
      { type: 'heading', text: "The Honest Answer Most People Won't Give You" },
      {
        type: 'paragraph',
        text: "For most complete beginners, frontend first is the right call. Not because it's easier, but because the feedback loop is faster. You write HTML and you immediately see something. That early momentum matters — it's what keeps you going through the harder parts.",
      },
      {
        type: 'paragraph',
        text: "But here's the thing nobody says: you will eventually need both. The distinction between 'frontend developer' and 'backend developer' is getting blurry. If you want to be genuinely hireable in 2025, you need to at least understand both, even if you specialize in one.",
      },
      { type: 'heading', text: 'What To Do After You Pick One' },
      {
        type: 'paragraph',
        text: 'Go deep before you go wide. Pick one path and stay on it until you can build something real without help. Once you have that baseline, picking up the other side is much faster than you think — the concepts transfer. LearnHub has separate structured roadmaps for both, so you can sequence them properly rather than trying to learn everything simultaneously.',
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────
  {
    slug: 'sql-for-javascript-developers',
    title: 'The Honest Guide to SQL for JavaScript Developers',
    excerpt:
      "SQL feels weird when you come from JavaScript. The syntax is different, the mindset is different. Here's how to make it click — with real examples from a JS dev perspective.",
    category: 'Database',
    tags: ['sql', 'javascript', 'database', 'backend', 'postgres'],
    readTime: 9,
    date: 'February 4, 2025',
    dateISO: '2025-02-04',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a2e2?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614332287897-6d3b33e56eff?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Most JavaScript developers avoid SQL for too long. You get comfortable with MongoDB, or you lean on ORMs so hard you never understand what's happening underneath. Then one day you're on a project with a real relational database and you're lost. This guide is the thing I wish existed when I was in that spot.",
      },
      { type: 'heading', text: "Why SQL Feels Weird at First" },
      {
        type: 'paragraph',
        text: "SQL is declarative, not imperative. In JavaScript, you tell the program what to do step by step. In SQL, you describe what data you want and let the database engine figure out how to get it. That's a mental shift, and it's the reason most JS developers find SQL confusing at first — not because SQL is hard, but because it's a different kind of thinking.",
      },
      {
        type: 'paragraph',
        text: 'Think of it this way: SQL is like asking a question, not writing a recipe.',
      },
      { type: 'heading', text: 'The Queries You Actually Need to Know' },
      {
        type: 'paragraph',
        text: "You don't need to memorize every SQL function. 90% of real-world backend work involves SELECT, INSERT, UPDATE, DELETE, and JOINs. Get those solid and everything else is just variation. Here's a JOIN query that's typical for a real app:",
      },
      {
        type: 'code',
        language: 'sql',
        code: `-- Get all users who enrolled in the last 30 days, with course names
SELECT
  u.name,
  u.email,
  c.title AS course_title,
  e.enrolled_at
FROM users u
JOIN enrollments e ON u.id = e.user_id
JOIN courses c ON e.course_id = c.id
WHERE e.enrolled_at >= NOW() - INTERVAL '30 days'
ORDER BY e.enrolled_at DESC;`,
      },
      {
        type: 'paragraph',
        text: "Read that left to right: you're asking for four columns, from three tables joined on their IDs, filtered to the last 30 days, sorted newest first. Once you understand that structure, you can read and write almost any SELECT query.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        alt: 'Database table rows visible on a terminal screen',
        caption: 'JOINs are the most powerful concept in SQL. Understand those and the rest follows.',
      },
      { type: 'heading', text: "JOINs Aren't Complicated — The Name Just Sounds Scary" },
      {
        type: 'list',
        items: [
          'INNER JOIN: only rows where both tables have a matching record',
          'LEFT JOIN: all rows from the left table, plus matches from the right (nulls where no match)',
          'RIGHT JOIN: opposite of LEFT — you probably won\'t use this much',
          'You almost never need FULL OUTER JOIN in application code',
        ],
      },
      {
        type: 'paragraph',
        text: "If you understand INNER JOIN and LEFT JOIN, you can handle nearly everything you'll encounter in real projects. The other types exist, but they're uncommon.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1614332287897-6d3b33e56eff?w=800&auto=format&fit=crop&q=80',
        alt: 'Person writing queries on a laptop with database visualization',
        caption: 'Start with real data from your own projects. Abstract examples never stick.',
      },
      { type: 'heading', text: 'How to Actually Learn SQL Fast' },
      {
        type: 'list',
        items: [
          "Don't start with documentation — start with a real database and real data",
          'Use PostgreSQL (not SQLite) so you learn production-grade behavior',
          'Practice with the queries you would actually write for a real app you care about',
          "Use an ORM after you understand raw SQL — not before",
          "The LearnHub SQL & MongoDB roadmap walks you through 20 days of practical queries with a real schema",
        ],
      },
      {
        type: 'paragraph',
        text: "SQL is one of those skills that seems intimidating until you write your first real query and it just works. That moment changes things. The LearnHub SQL & MongoDB roadmap is built to get you to that moment fast — using real schemas, real data, and practical problems instead of toy exercises.",
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────
  {
    slug: 'building-ai-web-apps-2025',
    title: 'Building AI-Powered Web Apps: Where to Actually Start in 2025',
    excerpt:
      "Everyone wants to build with AI. Most tutorials skip the part where your app actually has to work in production. Here's a grounded starting point.",
    category: 'AI & ML',
    tags: ['ai', 'openai', 'next.js', 'web development', 'api integration'],
    readTime: 8,
    date: 'February 11, 2025',
    dateISO: '2025-02-11',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Every week there's a new AI wrapper app tutorial. Most of them show you how to put a chat box on a page and call the OpenAI API. That part takes 20 minutes. What they don't show is how to handle streaming responses, rate limits, costs, token counts, and building something people actually want to use. Let's talk about the real stuff.",
      },
      { type: 'heading', text: 'What "Building With AI" Actually Means Right Now' },
      {
        type: 'paragraph',
        text: "In 2025, most web developers working with AI are doing one of three things: calling a model API (OpenAI, Anthropic, Gemini) and processing the response, building RAG (retrieval-augmented generation) pipelines where the model answers questions about your data, or fine-tuning smaller models for specific tasks. The first one is where 80% of real products live, and it's also the right place to start.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        alt: 'Abstract visualization of AI neural networks and data flow',
        caption: 'Most production AI web apps are simpler than they look — solid API integration plus good UX.',
      },
      { type: 'heading', text: 'The Stack That Actually Works' },
      {
        type: 'list',
        items: [
          'Next.js (App Router) — server components and API routes handle streaming naturally',
          'OpenAI SDK or Anthropic SDK — pick one, they work the same way conceptually',
          'Vercel AI SDK — the best library for streaming AI responses in Next.js (free, open source)',
          'PostgreSQL or Supabase — for storing conversation history and user data',
          "Redis or Upstash — rate limiting so you don't get surprised API bills",
        ],
      },
      { type: 'heading', text: 'The Thing Nobody Warns You About: Costs' },
      {
        type: 'paragraph',
        text: "AI APIs are priced per token. Input tokens, output tokens, context window size — it all adds up. A naive implementation that passes the entire conversation history on every request will burn through money fast at scale. You need to be deliberate from day one about what context you're actually sending.",
      },
      {
        type: 'paragraph',
        text: "A practical approach: store the last N turns in context rather than the entire history. For most chatbot use cases, 10-15 turns is plenty. Anything older can be summarized and compressed.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        alt: 'Matrix-style code streams representing AI data processing',
        caption: "Token management isn't glamorous but it's what separates hobby projects from production apps.",
      },
      { type: 'heading', text: 'What to Build First' },
      {
        type: 'list',
        items: [
          'A document Q&A tool — upload a PDF, ask questions about it',
          'A writing assistant with custom system prompts per use case',
          'A code review bot that wraps your team\'s existing style guide',
          "Anything that solves a problem you personally have — you'll iterate faster",
        ],
      },
      { type: 'heading', text: 'Prerequisites You Actually Need' },
      {
        type: 'paragraph',
        text: "You don't need to understand machine learning. You don't need to know Python. What you do need: solid JavaScript/TypeScript, understanding of async/await and fetch, a grasp of REST APIs, and some Node.js basics for the server side. That's it. The AI-First Web Dev roadmap on LearnHub is designed for exactly this starting point.",
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────
  {
    slug: 'spreadsheets-to-sql-business-analyst',
    title: "From Spreadsheets to SQL: A Business Analyst's Path to Real Data Skills",
    excerpt:
      "If you're still running reports from Excel pivot tables, you're spending twice the time getting half the insight. SQL isn't a developer skill anymore — it's a business analyst superpower.",
    category: 'Business Analysis',
    tags: ['sql', 'business analysis', 'data', 'excel', 'career'],
    readTime: 7,
    date: 'February 18, 2025',
    dateISO: '2025-02-18',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544383835-bda2bc66a2e2?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "There's a specific kind of pain that business analysts who work only in spreadsheets know well: you need a report, you export a CSV from some system, you spend 45 minutes building a pivot table, you share it, someone asks for a slight variation, and you start over. SQL fixes this. Not tomorrow, not after a 6-month data science course — in about three weeks of focused practice.",
      },
      { type: 'heading', text: 'Why BAs Are Often the Last to Learn SQL' },
      {
        type: 'paragraph',
        text: "SQL has historically been positioned as a developer skill. The person who 'knows SQL' in most companies is an engineer. So business analysts don't bother — they request reports from engineering, wait three days, get something that's not quite right, and request a revision. Sound familiar? That bottleneck is unnecessary.",
      },
      {
        type: 'paragraph',
        text: "The reality is that the SQL a BA needs is a subset of what developers use. You don't need to write stored procedures or design database schemas. You need to read and filter data confidently. That's a much smaller surface area to learn.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        alt: 'Business analytics dashboard showing data visualizations',
        caption: 'SQL lets you ask the database exactly what you need — no engineering ticket required.',
      },
      { type: 'heading', text: 'The Excel-to-SQL Translation You Need' },
      {
        type: 'list',
        items: [
          'VLOOKUP → JOIN (match data across two tables based on a shared column)',
          'Filter rows → WHERE clause',
          'Pivot table → GROUP BY + aggregate functions (SUM, COUNT, AVG)',
          'Sorting → ORDER BY',
          'Calculated column → expression in SELECT',
        ],
      },
      {
        type: 'paragraph',
        text: "Once you see SQL as 'Excel but in text form', it clicks. The operations are the same. The syntax is just different.",
      },
      { type: 'heading', text: 'A Real BA Query Example' },
      {
        type: 'paragraph',
        text: "Say you need a monthly breakdown of course enrollments by region. In Excel, that's a multi-step pivot exercise. In SQL — once you know your schema — it's one query. This is the kind of thing you can write after two weeks of practice.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a2e2?w=800&auto=format&fit=crop&q=80',
        alt: 'Database visualization showing connected tables',
        caption: 'Understanding table relationships unlocks the kind of analysis spreadsheets can never do cleanly.',
      },
      { type: 'heading', text: 'What Changes When You Have SQL' },
      {
        type: 'list',
        items: [
          'You can answer your own data questions in minutes instead of days',
          'You stop being dependent on engineering to pull reports',
          'Your analysis is reproducible — SQL queries are documentation',
          'You become the person in the room who can actually interrogate the data live',
          'It makes you significantly more valuable in any data-adjacent role',
        ],
      },
      { type: 'heading', text: 'How to Start' },
      {
        type: 'paragraph',
        text: "Don't start with a textbook. Start with a database that has data you care about. LearnHub's SQL & MongoDB roadmap is structured for exactly this: real queries, real schemas, and a logical progression from basic SELECT statements to the multi-table analysis that BAs actually need. By day 20, you'll be writing queries that would take hours to replicate in Excel.",
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────
  {
    slug: 'structured-roadmaps-vs-youtube',
    title: 'Structured Roadmaps vs YouTube Playlists: What Actually Works',
    excerpt:
      "YouTube is free and has everything. So why do so many self-taught developers plateau? The answer has less to do with content quality and more to do with structure.",
    category: 'Career & Learning',
    tags: ['learning', 'roadmaps', 'self-taught', 'career', 'productivity'],
    readTime: 6,
    date: 'February 25, 2025',
    dateISO: '2025-02-25',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b3c3e?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "YouTube is genuinely incredible for learning to code. Thousands of free, high-quality tutorials from people who know their craft. And yet most self-taught developers hit a wall somewhere around intermediate level and can't figure out why they're not progressing. The problem isn't the content — it's the structure around the content.",
      },
      { type: 'heading', text: 'What Playlists Get Right (and Wrong)' },
      {
        type: 'paragraph',
        text: "A YouTube playlist gets one thing right: it's sequential. That's better than nothing. But it usually gets everything else wrong. There's no built-in accountability. No projects at regular intervals. No way to know if you understood something before moving on. And most importantly — no mechanism to force you to build before you watch the next video.",
      },
      {
        type: 'list',
        items: [
          'No feedback loop: you can watch 50 videos without knowing if you actually understood any of them',
          'No pacing: nothing stops you from binging 6 hours in a day and retaining almost nothing',
          'No projects: most playlists end with a big project, but learning happens during projects, not after them',
          "Scope creep: recommended videos pull you sideways into topics you don't need yet",
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
        alt: 'Group of developers collaborating around a laptop',
        caption: 'Structure creates momentum. Content alone does not.',
      },
      { type: 'heading', text: "What Structured Roadmaps Get Right" },
      {
        type: 'list',
        items: [
          'Daily targets: you always know exactly what to do today — no decision fatigue',
          'Curated resources: one good resource per concept, not 12 options to choose from',
          "Regular builds: every phase ends with something you made — not just something you watched",
          "Milestone checkpoints: you can't meaningfully move on until you've applied what you learned",
          'Progress visibility: seeing a roadmap fill in week by week is surprisingly motivating',
        ],
      },
      { type: 'heading', text: "The Role YouTube Should Actually Play" },
      {
        type: 'paragraph',
        text: "YouTube shouldn't be your curriculum — it should be your reference library. When a concept doesn't click, search for a specific explanation. When you want to see how someone else approaches a problem, watch a video. But let a structured roadmap drive what you work on and when. Use YouTube to supplement, not to lead.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        alt: 'Developer focused on laptop with notes nearby',
        caption: 'The best learners treat YouTube as a reference, not a teacher.',
      },
      { type: 'heading', text: "The Real Test: Can You Build It Without Looking?" },
      {
        type: 'paragraph',
        text: "Here's a simple way to test whether a learning approach is working: after finishing a topic, close everything and try to build something with it from scratch. If you can't, you didn't learn it — you watched it. Structured roadmaps build this into the process. YouTube playlists almost never do. LearnHub's roadmaps are designed around exactly this principle: short learning, long building, with clear checkpoints to keep you honest.",
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────
  {
    slug: 'mongodb-vs-sql-when-to-use',
    title: 'MongoDB vs SQL: When to Use Each (Without the Hype)',
    excerpt:
      "The debate between MongoDB and SQL has been running for a decade. Most of the takes online are tribalism. Here's a practical breakdown of what each is actually good for.",
    category: 'Database',
    tags: ['mongodb', 'sql', 'database', 'nosql', 'backend'],
    readTime: 7,
    date: 'March 4, 2025',
    dateISO: '2025-03-04',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1569098644584-210a0e3c4ede?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544383835-bda2bc66a2e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Ask a MongoDB advocate and they'll say relational databases are dinosaurs. Ask a SQL purist and they'll say MongoDB is a toy. Both camps are wrong, and both camps are making people choose based on tribalism instead of requirements. Here's the clear-eyed version.",
      },
      { type: 'heading', text: 'What SQL (Relational) Databases Are Good At' },
      {
        type: 'list',
        items: [
          'Data with clear, stable relationships between entities (users → orders → products)',
          'Complex queries across multiple tables using JOINs',
          'Strict data consistency — transactions ensure either everything saves or nothing does',
          'Audit trails, financial records, anything where data integrity is non-negotiable',
          'Reporting and analytics where you need to aggregate across many rows',
        ],
      },
      { type: 'heading', text: 'What MongoDB Is Good At' },
      {
        type: 'list',
        items: [
          'Data with variable or evolving structure (think: user preferences, event logs)',
          'Storing and retrieving documents that naturally live together (a blog post with its comments)',
          'High write throughput at scale where rigid schema would slow you down',
          "Prototyping — you can change your data model without a migration",
          "Content management where each item has a different shape",
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a2e2?w=800&auto=format&fit=crop&q=80',
        alt: 'Visualization of database tables and document structures',
        caption: 'Relational databases organize data in tables. Document databases store it in flexible JSON-like objects.',
      },
      { type: 'heading', text: 'The Decision Is Simpler Than You Think' },
      {
        type: 'paragraph',
        text: "Do your entities have clear, defined relationships that won't change much? Use PostgreSQL. Does your data structure vary significantly between records or change frequently? MongoDB handles that better. Are you building something that needs both? You can actually use both — many production systems do.",
      },
      {
        type: 'paragraph',
        text: "Most startups in 2025 are using PostgreSQL for core business data and MongoDB (or something similar) for logs, events, or user-generated content. It's not an either/or choice.",
      },
      { type: 'heading', text: 'What Most Beginners Get Wrong' },
      {
        type: 'paragraph',
        text: "Choosing MongoDB because it feels more like JavaScript. Yes, documents look like JSON objects. Yes, Mongoose models feel familiar if you know JS. But 'it looks familiar' is a terrible reason to choose a database for a real project. Choose based on your data's shape and your query patterns.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        alt: 'Server room with database infrastructure',
        caption: "The right database isn't the one you know best — it's the one that fits your data best.",
      },
      { type: 'heading', text: 'Learn Both. Know When to Pick Each.' },
      {
        type: 'paragraph',
        text: "The most practical skill is understanding both well enough to make an informed decision on a new project. The LearnHub SQL & MongoDB roadmap covers both in 20 days — not just syntax, but the reasoning behind when you'd reach for each. That understanding is what separates developers who can architect systems from those who just implement what they're told.",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────
  {
    slug: 'what-full-stack-means-2025',
    title: "What Full-Stack Actually Means in 2025 (And What to Learn First)",
    excerpt:
      "Full-stack used to mean HTML/CSS/JS plus a backend language plus a database. In 2025 the surface area has exploded. Here's what it actually means to be hireable as a full-stack developer today.",
    category: 'Full Stack',
    tags: ['full stack', 'career', 'web development', 'javascript', '2025'],
    readTime: 8,
    date: 'March 11, 2025',
    dateISO: '2025-03-11',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1627398242-4b1a8027aabd?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Five years ago, a full-stack developer meant someone who could write React on the frontend and Node.js on the backend. That was it. In 2025, the same label is attached to people who also deploy to Vercel or AWS, manage CI/CD pipelines, write database migrations, handle authentication flows, work with AI APIs, and occasionally touch a mobile codebase. The scope has grown significantly. So what do you actually need?",
      },
      { type: 'heading', text: 'The Core Stack That Still Matters' },
      {
        type: 'paragraph',
        text: "Despite all the noise, the fundamentals haven't moved. If you can build a real web app with a React frontend, a Node.js API, a relational database, and auth — you're employable as a junior full-stack developer. That's a clear, achievable target. Everything else is expansion.",
      },
      {
        type: 'list',
        items: [
          'JavaScript/TypeScript — still the primary language for full-stack web work',
          'React — dominant frontend library, and React Server Components are changing the model',
          'Node.js + Express or Next.js — your backend and API layer',
          'PostgreSQL — understand relational databases before you reach for anything else',
          'Git and basic deployment — nobody expects you to be a DevOps engineer, but shipping code matters',
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
        alt: 'Modern development setup with multiple screens showing code',
        caption: 'Full-stack in 2025 means being dangerous across the whole web application stack.',
      },
      { type: 'heading', text: "What 'Senior Full-Stack' Actually Requires" },
      {
        type: 'list',
        items: [
          "System design intuition — knowing when to split services, not just how to write them",
          "Performance awareness — understanding where bottlenecks live (N+1 queries, re-renders, etc.)",
          "Security basics — auth, CORS, SQL injection, input validation are not optional",
          "Infrastructure fundamentals — containers, environment variables, CI/CD pipelines",
          "AI integration — calling LLM APIs is now a standard skill, not a niche one",
        ],
      },
      { type: 'heading', text: "The Trap: Trying to Learn Everything at Once" },
      {
        type: 'paragraph',
        text: "The surface area of full-stack is enormous. The mistake most people make is trying to cover it all before building anything real. You end up with shallow knowledge across too many things and can't actually ship. The better path: get one layer solid (frontend or backend), build real projects with it, then extend into the other layer from a position of strength.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1627398242-4b1a8027aabd?w=800&auto=format&fit=crop&q=80',
        alt: 'Developer focused on terminal and code editor',
        caption: "Depth first, breadth second. You learn the second layer faster when you already understand the first.",
      },
      { type: 'heading', text: 'A Realistic Learning Order' },
      {
        type: 'list',
        items: [
          '1. Frontend fundamentals: HTML, CSS, JavaScript (the real basics, not shortcuts)',
          '2. Frontend framework: React, including hooks, state management, and API calls',
          '3. Backend basics: Node.js, Express, REST APIs, and basic auth',
          '4. Database: SQL fundamentals and one NoSQL option',
          '5. Deployment: get something live on Vercel or a VPS — even once',
          '6. Expand based on the job requirements you actually see in listings',
        ],
      },
      {
        type: 'paragraph',
        text: "That order is deliberate. Each layer gives you the context to understand the next one. LearnHub's roadmaps are built around exactly this sequence — and they're free, because we think the barrier to becoming a full-stack developer should be effort, not money.",
      },
    ],
  },

  // ── 10 ─────────────────────────────────────────────────────
  {
    slug: 'tracking-progress-learn-faster',
    title: 'Why Tracking Progress Makes You Learn Faster (And How to Do It Right)',
    excerpt:
      "Progress tracking sounds like admin work. It's actually one of the most effective learning tools available — but almost nobody does it the right way.",
    category: 'Career & Learning',
    tags: ['learning', 'productivity', 'progress tracking', 'habit', 'self-taught'],
    readTime: 5,
    date: 'March 18, 2025',
    dateISO: '2025-03-18',
    author: 'LearnHub Team',
    heroImage:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b3c3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Most self-taught developers don't track their progress. They just... learn. They watch videos, build projects, read docs, and hope they're moving forward. The problem is that 'hope you're moving forward' is not a learning strategy — it's wishful thinking. Progress tracking is the feedback mechanism that makes the whole system work.",
      },
      { type: 'heading', text: 'What Actually Happens When You Track' },
      {
        type: 'paragraph',
        text: "When you mark something as complete, two things happen. First, you get a small dopamine hit that reinforces the behavior. Second, and more importantly, you're forced to evaluate whether you actually understood it. Clicking 'mark as complete' on a concept you're fuzzy on feels wrong. That discomfort is valuable — it surfaces gaps you'd otherwise carry forward.",
      },
      {
        type: 'list',
        items: [
          'You build momentum that carries you through hard stretches',
          'You know exactly where you are — no more "I think I covered this" ambiguity',
          'You can identify patterns in where you slow down or get stuck',
          'Seeing a roadmap fill in week over week is a form of accountability that\'s hard to replicate',
          'It makes returning after a break much easier — you pick up exactly where you left off',
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b3c3e?w=800&auto=format&fit=crop&q=80',
        alt: 'Planner and notebook showing organized learning goals',
        caption: "Tracking isn't about record-keeping. It's about honest self-assessment.",
      },
      { type: 'heading', text: "What Most People Track Wrong" },
      {
        type: 'paragraph',
        text: "Time spent. Most learners track hours: 'I studied for 3 hours today.' That number is meaningless. Three hours of passive video watching is not equivalent to three hours of active debugging. What you should track is output — what did you build, write, or understand today that you couldn't yesterday?",
      },
      {
        type: 'list',
        items: [
          "Don't track: hours watched, pages read, videos completed",
          "Do track: concepts understood, functions written, features shipped, bugs solved",
          "Weekly review: 'What can I build now that I couldn't build last Monday?'",
        ],
      },
      { type: 'heading', text: 'The Minimum Viable Tracking System' },
      {
        type: 'paragraph',
        text: "You don't need an elaborate system. A simple list of 'what I can do now' that you update daily is enough. If it gets longer every week, you're progressing. If it stays flat, something needs to change.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
        alt: 'Team looking at progress dashboard together',
        caption: 'The simplest tracking system you will actually use beats the perfect system you abandon after a week.',
      },
      { type: 'heading', text: 'How LearnHub Builds This In' },
      {
        type: 'paragraph',
        text: "Every LearnHub course has built-in progress tracking — not just a progress bar, but lesson-level completion that persists across sessions. The point isn't gamification. It's honest accountability. When you return after a few days off, you know exactly where you are. No recapping, no re-watching, no lost momentum. That continuity is what turns a learning sprint into a consistent skill-building habit.",
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
//  Helper functions
// ─────────────────────────────────────────────────────────────

export function getBlogBySlug(slug) {
  return BLOGS.find(b => b.slug === slug) ?? null
}

export function getRelatedPosts(slug, category, limit = 3) {
  return BLOGS.filter(b => b.slug !== slug && b.category === category).slice(0, limit)
}

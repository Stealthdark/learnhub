/* ═══════════════════════════════════════════════════════
   COURSE DATA — 20-Day Database Mastery: SQL + MongoDB
   Relational & NoSQL · Queries · Schema Design · Projects
   To add a new course: follow this same structure.
═══════════════════════════════════════════════════════ */
const SQL_MONGODB_20DAY_COURSE={
  id:"sql-mongodb-20day",
  title:"20-Day Database Mastery: SQL + MongoDB",
  subtitle:"Relational & NoSQL · Queries · Schema Design · Real Projects",
  description:"A focused, 20-day deep dive into both worlds of data — relational SQL (PostgreSQL) and document-oriented NoSQL (MongoDB). Learn to model data, write powerful queries, design scalable schemas, and pick the right database for any job. Built for developers who want database confidence.",
  duration:"20 Days",dailyEffort:"2–3 Hours",prerequisites:"Basic programming knowledge",
  outcome:"Full Database Layer + 2 Portfolio Projects",
  category:"Database Engineering",level:"Beginner",
  image:"assets/og/courses/sql-mongodb-card.svg",
  weeks:[
    {id:1,label:"Week 1",title:"SQL Fundamentals — The Relational Model",color:"#0288d1",colorSoft:"rgba(2,136,209,0.1)",days:[1,2,3,4,5]},
    {id:2,label:"Week 2",title:"Advanced SQL — Aggregations, Joins & Performance",color:"#00796b",colorSoft:"rgba(0,121,107,0.1)",days:[6,7,8,9,10]},
    {id:3,label:"Week 3",title:"MongoDB Fundamentals — The Document Model",color:"#388e3c",colorSoft:"rgba(56,142,60,0.1)",days:[11,12,13,14,15]},
    {id:4,label:"Week 4",title:"MongoDB Advanced — Aggregation, Indexing & Capstone",color:"#7b1fa2",colorSoft:"rgba(123,31,162,0.1)",days:[16,17,18,19,20]}
  ],
  days:[
    /* ── Week 1: SQL Fundamentals ── */
    {id:1,title:"Relational Databases & PostgreSQL Setup",subtitle:"What is a RDBMS · Tables · Data types · psql CLI",tags:["Concept"],time:"~2 hrs",
     topics:["What is a relational database? Rows, columns, tables","Primary keys, foreign keys, constraints","PostgreSQL installation + pgAdmin or DBeaver","psql CLI basics: \\l, \\c, \\dt commands","CREATE DATABASE, CREATE TABLE, DROP TABLE","Common data types: INT, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, NUMERIC"],
     resources:[{label:"PostgreSQL Official Docs",url:"https://www.postgresql.org/docs/current/"},{label:"pgAdmin Download",url:"https://www.pgadmin.org/"},{label:"PostgreSQL Tutorial — tutorialspoint",url:"https://www.postgresqltutorial.com/"},{label:"Database Design Course (freeCodeCamp)",url:"https://www.youtube.com/watch?v=ztHopE5Wnpc"}],
     goal:"Install PostgreSQL, create a database called 'learndb', and create your first table (students) with at least 6 columns including a primary key."},

    {id:2,title:"SELECT Queries — Reading Data",subtitle:"WHERE · ORDER BY · LIMIT · DISTINCT · Pattern matching",tags:["Practice"],time:"~2 hrs",
     topics:["SELECT * vs SELECT specific columns","WHERE clause — =, !=, >, <, >=, <=","Logical operators: AND, OR, NOT","BETWEEN, IN, IS NULL, IS NOT NULL","LIKE and ILIKE for pattern matching (%, _)","ORDER BY ASC/DESC · LIMIT · OFFSET","DISTINCT to remove duplicates"],
     resources:[{label:"SQL SELECT Statement — w3schools",url:"https://www.w3schools.com/sql/sql_select.asp"},{label:"PostgreSQL WHERE Clause",url:"https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/"},{label:"SQLZoo — Interactive Exercises",url:"https://sqlzoo.net/wiki/SELECT_basics"}],
     goal:"Seed your students table with 20 rows. Write 8 different SELECT queries using WHERE, LIKE, IN, BETWEEN, ORDER BY, and LIMIT."},

    {id:3,title:"INSERT, UPDATE, DELETE & Constraints",subtitle:"DML statements · NOT NULL · UNIQUE · CHECK · DEFAULT",tags:["Practice"],time:"~2 hrs",
     topics:["INSERT INTO — single and multi-row insert","UPDATE with WHERE (avoid full-table updates!)","DELETE with WHERE — the danger of forgetting WHERE","RETURNING clause to get back modified rows","NOT NULL, UNIQUE, CHECK, DEFAULT constraints","ALTER TABLE — add column, drop column, rename"],
     resources:[{label:"PostgreSQL INSERT Docs",url:"https://www.postgresql.org/docs/current/sql-insert.html"},{label:"PostgreSQL Constraints Guide",url:"https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-constraints/"},{label:"Mode SQL Tutorial",url:"https://mode.com/sql-tutorial/"}],
     goal:"Insert 10 records, update 3 rows with conditions, safely delete 2 rows. Add a CHECK constraint that ensures age is between 18 and 100."},

    {id:4,title:"JOINs — Connecting Tables",subtitle:"INNER · LEFT · RIGHT · FULL OUTER · CROSS · Self JOIN",tags:["Concept"],time:"~2.5 hrs",
     topics:["Why JOINs exist — normalisation & foreign keys","INNER JOIN — only matching rows","LEFT JOIN — all from left, matched from right","RIGHT JOIN — all from right, matched from left","FULL OUTER JOIN — all rows from both tables","CROSS JOIN — Cartesian product","Self JOIN — joining a table to itself","ON vs USING keyword"],
     resources:[{label:"Visual JOIN Explanation",url:"https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/"},{label:"SQL JOINs (Illustrated Guide)",url:"https://joins.spathon.com/"},{label:"Mode SQL Tutorial — JOINs",url:"https://mode.com/sql-tutorial/sql-joins/"}],
     goal:"Create a 'courses' table and an 'enrollments' junction table. Write all 4 JOIN types to answer different business questions about student enrollments."},

    {id:5,title:"Week 1 Project — Blog Database Schema",subtitle:"Full schema design · CRUD queries · FK relationships",tags:["Project"],time:"~3 hrs",
     topics:["Design a blog schema: users, posts, comments, tags, post_tags","Foreign key relationships and referential integrity","CASCADE DELETE vs SET NULL vs RESTRICT","Insert realistic seed data (20+ rows per table)","Write 10 queries answering real questions: top authors, recent posts, comment counts","Export schema as SQL file for version control"],
     resources:[{label:"dbdiagram.io — Schema Visualizer",url:"https://dbdiagram.io/"},{label:"PostgreSQL Foreign Keys",url:"https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-foreign-key/"}],
     goal:"Ship a fully designed blog database. ERD diagram + SQL schema file + 10 working queries answering business questions."},

    /* ── Week 2: Advanced SQL ── */
    {id:6,title:"Aggregations — GROUP BY & Window Functions",subtitle:"COUNT · SUM · AVG · GROUP BY · HAVING · Window functions",tags:["Practice"],time:"~2.5 hrs",
     topics:["Aggregate functions: COUNT, SUM, AVG, MIN, MAX","GROUP BY — grouping rows","HAVING — filtering groups (not rows)","DISTINCT COUNT for unique values","Window functions: ROW_NUMBER, RANK, DENSE_RANK","OVER() clause — PARTITION BY, ORDER BY","LAG and LEAD — comparing with previous/next row"],
     resources:[{label:"PostgreSQL Aggregate Functions",url:"https://www.postgresql.org/docs/current/functions-aggregate.html"},{label:"Window Functions Explained",url:"https://www.postgresqltutorial.com/postgresql-window-function/"},{label:"Mode — Window Functions Tutorial",url:"https://mode.com/sql-tutorial/sql-window-functions/"}],
     goal:"Answer 6 analytical questions on your blog database using GROUP BY + HAVING. Rank authors by post count using ROW_NUMBER()."},

    {id:7,title:"Subqueries & CTEs",subtitle:"Correlated subqueries · IN/EXISTS · WITH clause · Recursive CTEs",tags:["Advanced"],time:"~2.5 hrs",
     topics:["Scalar subqueries in SELECT clause","Subqueries in WHERE — IN, NOT IN, EXISTS, NOT EXISTS","Correlated vs non-correlated subqueries","WITH clause (CTEs) for readable queries","Chaining multiple CTEs","Recursive CTEs — hierarchies and trees","LATERAL joins for row-by-row subqueries"],
     resources:[{label:"PostgreSQL Subqueries Guide",url:"https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-subquery/"},{label:"PostgreSQL CTEs Docs",url:"https://www.postgresql.org/docs/current/queries-with.html"},{label:"Recursive CTEs Explained",url:"https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-recursive-query/"}],
     goal:"Rewrite 3 JOIN queries as CTEs for readability. Write a correlated subquery that finds users who have more posts than average."},

    {id:8,title:"Indexes, EXPLAIN & Query Optimization",subtitle:"B-tree indexes · Composite indexes · EXPLAIN ANALYZE · Vacuum",tags:["Advanced"],time:"~2.5 hrs",
     topics:["How indexes work — B-tree structure","CREATE INDEX, DROP INDEX, REINDEX","Composite indexes — column order matters","Partial indexes for filtered queries","EXPLAIN and EXPLAIN ANALYZE output","Reading query plans: Seq Scan vs Index Scan","VACUUM and ANALYZE for statistics","Common performance anti-patterns"],
     resources:[{label:"PostgreSQL Indexes Docs",url:"https://www.postgresql.org/docs/current/indexes.html"},{label:"Use The Index Luke — Free Book",url:"https://use-the-index-luke.com/"},{label:"PostgreSQL EXPLAIN Guide",url:"https://www.postgresql.org/docs/current/using-explain.html"}],
     goal:"Run EXPLAIN ANALYZE on 3 slow queries. Add indexes and measure the improvement. Add a partial index for published posts only."},

    {id:9,title:"Transactions, ACID & Stored Procedures",subtitle:"BEGIN/COMMIT/ROLLBACK · Isolation levels · Functions · Triggers",tags:["Advanced"],time:"~2.5 hrs",
     topics:["ACID properties — Atomicity, Consistency, Isolation, Durability","BEGIN, COMMIT, ROLLBACK in practice","Transaction isolation levels: READ COMMITTED, REPEATABLE READ, SERIALIZABLE","Deadlocks — how to avoid them","CREATE FUNCTION in PL/pgSQL","RETURNS TABLE for set-returning functions","CREATE TRIGGER — BEFORE/AFTER INSERT/UPDATE/DELETE","Stored procedures vs functions"],
     resources:[{label:"PostgreSQL Transactions Docs",url:"https://www.postgresql.org/docs/current/tutorial-transactions.html"},{label:"PostgreSQL Isolation Levels",url:"https://www.postgresql.org/docs/current/transaction-iso.html"},{label:"PL/pgSQL Guide",url:"https://www.postgresql.org/docs/current/plpgsql.html"}],
     goal:"Write a transaction that transfers credits between two users atomically. Create a trigger that auto-updates an updated_at timestamp on any row change."},

    {id:10,title:"Week 2 Project — E-Commerce Analytics",subtitle:"Complex schema · Analytical queries · Stored procedures",tags:["Project"],time:"~4 hrs",
     topics:["Design an e-commerce schema: products, orders, order_items, customers, categories","Multi-table analytical queries: revenue by category, top customers, monthly trends","Window functions: running total of revenue, rank products by sales","CTEs for complex multi-step analytics","Stored procedure to process an order atomically","Index strategy for common read patterns","Export as SQL dump"],
     resources:[{label:"PostgreSQL COPY command (bulk import)",url:"https://www.postgresql.org/docs/current/sql-copy.html"},{label:"Mockaroo — Realistic Test Data",url:"https://www.mockaroo.com/"}],
     goal:"Ship an e-commerce analytics database. 5 analytical reports using GROUP BY + window functions. 1 transaction-based stored procedure. Documented SQL dump."},

    /* ── Week 3: MongoDB Fundamentals ── */
    {id:11,title:"NoSQL vs SQL — Mental Model Shift",subtitle:"Document model · When to use MongoDB · Atlas setup",tags:["Concept"],time:"~2 hrs",
     topics:["SQL vs NoSQL — key differences","Document model: JSON-like BSON documents","Collections vs tables, documents vs rows","When to use MongoDB vs PostgreSQL","MongoDB Atlas free tier setup","mongosh CLI basics — show dbs, use, show collections","MongoDB Compass GUI overview","BSON types: ObjectId, Date, NumberInt, NumberLong"],
     resources:[{label:"MongoDB Atlas — Free Cluster",url:"https://www.mongodb.com/atlas"},{label:"MongoDB vs SQL — Official Guide",url:"https://www.mongodb.com/nosql-explained/nosql-vs-sql"},{label:"MongoDB University M001 (Free)",url:"https://learn.mongodb.com/learning-paths/introduction-to-mongodb"},{label:"MongoDB Compass Download",url:"https://www.mongodb.com/try/download/compass"}],
     goal:"Create a free MongoDB Atlas cluster. Connect via mongosh. Create a database and insert your first 5 documents manually. Explore them in Compass."},

    {id:12,title:"MongoDB CRUD Operations",subtitle:"insertOne · find · updateOne · deleteOne · Query operators",tags:["Practice"],time:"~2 hrs",
     topics:["insertOne() and insertMany()","find() with query filter objects","Query operators: $eq, $ne, $gt, $lt, $gte, $lte","$in, $nin, $exists, $type","$and, $or, $not, $nor logical operators","Dot notation for nested field queries","Projection — include/exclude fields","updateOne, updateMany — $set, $unset, $inc, $push, $pull","deleteOne, deleteMany — be careful!","findOneAndUpdate with returnDocument option"],
     resources:[{label:"MongoDB CRUD Docs",url:"https://www.mongodb.com/docs/manual/crud/"},{label:"MongoDB Query Operators Reference",url:"https://www.mongodb.com/docs/manual/reference/operator/query/"},{label:"MongoDB Update Operators",url:"https://www.mongodb.com/docs/manual/reference/operator/update/"}],
     goal:"Create a 'library' collection. Insert 20 books. Write 10 queries covering: price ranges, genre filters, nested fields, array queries. Update and delete with conditions."},

    {id:13,title:"Schema Design — Embedding vs Referencing",subtitle:"Data modelling patterns · One-to-many · Many-to-many · Anti-patterns",tags:["Concept"],time:"~2.5 hrs",
     topics:["Embedding vs referencing — the core tradeoff","One-to-one: always embed","One-to-few: embed array","One-to-many: reference with foreign key","Many-to-many: array of references","The 16MB document size limit","Unbounded arrays — the anti-pattern","Attribute pattern for variable properties","Bucket pattern for time-series data","Schema versioning strategy"],
     resources:[{label:"MongoDB Schema Design Guide",url:"https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design"},{label:"MongoDB Data Modeling Docs",url:"https://www.mongodb.com/docs/manual/data-modeling/"},{label:"MongoDB University — Data Modeling",url:"https://learn.mongodb.com/learning-paths/data-modeling-for-mongodb"}],
     goal:"Design two schemas for the same blog app — one over-embedded, one over-referenced. Then design the optimal hybrid schema. Document your reasoning."},

    {id:14,title:"Aggregation Pipeline",subtitle:"$match · $group · $sort · $project · $lookup · $unwind",tags:["Advanced"],time:"~2.5 hrs",
     topics:["What is the aggregation pipeline?","$match — filter documents (like WHERE)","$group — group by field (like GROUP BY)","$project — reshape documents (like SELECT)","$sort and $limit — order and paginate","$count, $sum, $avg, $min, $max accumulators","$lookup — join collections (like SQL JOIN)","$unwind — flatten arrays","$addFields, $set, $replaceRoot","Faceted search with $facet"],
     resources:[{label:"MongoDB Aggregation Docs",url:"https://www.mongodb.com/docs/manual/aggregation/"},{label:"Aggregation Pipeline Builder (Compass)",url:"https://www.mongodb.com/docs/compass/current/aggregation-pipeline-builder/"},{label:"Aggregation Pipeline Tutorial (MongoDB)",url:"https://www.mongodb.com/docs/manual/tutorial/aggregation-zip-code-data-set/"}],
     goal:"Write 5 aggregation pipelines on your library collection: average price by genre, top 5 authors by book count, books published per year, genre distribution."},

    {id:15,title:"Week 3 Project — Product Catalog in MongoDB",subtitle:"Schema design · CRUD API · Aggregation reports",tags:["Project"],time:"~3 hrs",
     topics:["Design a product catalog: products, categories, reviews, inventory","Embed reviews inside products (array limit: max 50)","Reference categories (separate collection)","Full CRUD via mongosh scripts","Aggregation: average rating per product, top-rated by category","Text search with $text and $search","Complex filter: price range + category + min-rating","Export collection to JSON"],
     resources:[{label:"MongoDB Text Search",url:"https://www.mongodb.com/docs/manual/text-search/"},{label:"mongodump / mongorestore",url:"https://www.mongodb.com/docs/database-tools/mongodump/"}],
     goal:"Ship a product catalog with 50 products, 10 categories, and 200 reviews. 5 aggregation reports. Text search working. Exported JSON seed file."},

    /* ── Week 4: MongoDB Advanced & Capstone ── */
    {id:16,title:"Mongoose ODM — Schemas, Models & Validation",subtitle:"Schema types · Validators · Middleware hooks · Static methods",tags:["Practice"],time:"~2.5 hrs",
     topics:["Mongoose connect and connection events","Schema definition — types, required, default, enum","Built-in validators: min, max, minlength, maxlength","Custom validators with validate property","Schema instance methods and static methods","Virtual properties","pre/post middleware (hooks) — save, findOneAndUpdate","Timestamps: createdAt, updatedAt auto-management"],
     resources:[{label:"Mongoose Official Docs",url:"https://mongoosejs.com/docs/"},{label:"Mongoose Schema Types",url:"https://mongoosejs.com/docs/schematypes.html"},{label:"Mongoose Validation Docs",url:"https://mongoosejs.com/docs/validation.html"}],
     goal:"Build Mongoose models for User, Post, Comment with full validation. Add a pre-save hook to slug a post title. Add a static method to find recent posts."},

    {id:17,title:"Advanced Mongoose — Population & Aggregation",subtitle:"populate() · lean() · Query chaining · Aggregation with Mongoose",tags:["Advanced"],time:"~2.5 hrs",
     topics:["populate() — virtual JOINs between collections","Deep populate (nested refs)","lean() for plain JS objects (2× faster reads)","Query chaining — sort, limit, select, skip","Mongoose aggregate() wrapper","$lookup in Mongoose aggregation","Discriminators for polymorphic schemas","Middleware for cascading deletes"],
     resources:[{label:"Mongoose Populate Docs",url:"https://mongoosejs.com/docs/populate.html"},{label:"Mongoose Queries Guide",url:"https://mongoosejs.com/docs/queries.html"},{label:"Mongoose Aggregate Docs",url:"https://mongoosejs.com/docs/api/model.html#Model.aggregate()"}],
     goal:"Implement a paginated feed API with populate (author details, comment count). Use lean() and measure the query time improvement vs without lean()."},

    {id:18,title:"MongoDB Indexing & Query Optimization",subtitle:"Explain plans · Compound indexes · Text search · TTL indexes",tags:["Advanced"],time:"~2.5 hrs",
     topics:["db.collection.explain(\"executionStats\")","COLLSCAN vs IXSCAN — the goal is always IXSCAN","Single field indexes — ascending vs descending","Compound indexes — the ESR (Equality, Sort, Range) rule","Multikey indexes for array fields","Text indexes — $text search, $meta score","TTL (Time-To-Live) indexes for auto-expiration","Sparse indexes — only index documents that have the field","Covered queries — index covers all needed fields","Index intersection vs compound index"],
     resources:[{label:"MongoDB Indexing Strategies",url:"https://www.mongodb.com/docs/manual/applications/indexes/"},{label:"The ESR Rule Explained",url:"https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/"},{label:"MongoDB Index Types",url:"https://www.mongodb.com/docs/manual/indexes/"}],
     goal:"Add explain() to 5 queries and identify COLLSCAN operations. Add appropriate indexes and verify they switch to IXSCAN. Set a TTL index on a 'sessions' collection."},

    {id:19,title:"SQL + MongoDB Together — Hybrid Architecture",subtitle:"Choosing the right database · Polyglot persistence · Migration",tags:["Advanced"],time:"~2 hrs",
     topics:["Polyglot persistence — using multiple databases","When to use SQL: financial data, reporting, relationships","When to use MongoDB: content, catalogs, events, logs","Migrating data from SQL to MongoDB","Migrating from MongoDB to SQL","Handling transactions across databases","Connection pooling for both databases","Environment config for dual database apps","Data sync patterns"],
     resources:[{label:"Martin Fowler — Polyglot Persistence",url:"https://martinfowler.com/bliki/PolyglotPersistence.html"},{label:"PostgreSQL vs MongoDB — When to use",url:"https://www.mongodb.com/compare/mongodb-postgresql"},{label:"Prisma — ORM for SQL",url:"https://www.prisma.io/"}],
     goal:"Design an architecture doc: which parts of a social media app use PostgreSQL vs MongoDB and why. Implement a Node.js script that reads from PostgreSQL and writes to MongoDB."},

    {id:20,title:"Capstone — Full Database Layer for a Real App",subtitle:"SQL + MongoDB combined · REST endpoints · Seed data · Docs",tags:["Project"],time:"~5 hrs",
     topics:["Full-stack app: PostgreSQL for users/auth + MongoDB for content","PostgreSQL: users, sessions, payments (ACID-critical data)","MongoDB: posts, comments, notifications, activity logs","Mongoose models + PostgreSQL Sequelize/pg models","3 complex SQL queries with JOINs + window functions","3 MongoDB aggregation pipelines","Database seed script that populates both DBs","README with ERD diagram for SQL + collection diagrams for MongoDB","Deploy: Supabase (PostgreSQL) + MongoDB Atlas (free tiers)"],
     resources:[{label:"Supabase — Free PostgreSQL",url:"https://supabase.com/"},{label:"MongoDB Atlas — Free Tier",url:"https://www.mongodb.com/atlas"},{label:"Prisma Studio — Visual DB Browser",url:"https://www.prisma.io/studio"},{label:"Sequelize ORM Docs",url:"https://sequelize.org/"}],
     goal:"Ship a production database layer: PostgreSQL + MongoDB Atlas both deployed. Seed scripts. 6 complex queries. README with diagrams. You are now a database engineer."}
  ]
};

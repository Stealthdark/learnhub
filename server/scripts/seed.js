/**
 * seed.js — push all 5 bundled courses to Firestore via Admin SDK.
 * Run once after deploying: cd server && node scripts/seed.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const vm = require('vm');
const fs = require('fs');
const path = require('path');
const { setCourse } = require('../services/firestore');

const COURSE_FILES = [
  '../../courses/nodejs-30day.js',
  '../../courses/frontend-roadmap.js',
  '../../courses/sql-mongodb-20day.js',
  '../../courses/ai-first-webdev-49day.js',
  '../../courses/smart-ba-roadmap.js',
];

// Variable names exported by each course file
const COURSE_VARS = [
  'NODEJS_30DAY_COURSE',
  'FRONTEND_ROADMAP_COURSE',
  'SQL_MONGODB_20DAY_COURSE',
  'AI_FIRST_WEBDEV_COURSE',
  'SMART_BA_ROADMAP_COURSE',
];

async function main() {
  const sandbox = {};
  vm.createContext(sandbox);

  for (const file of COURSE_FILES) {
    const fullPath = path.resolve(__dirname, file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`[warn] Not found, skipping: ${fullPath}`);
      continue;
    }
    // const/let are block-scoped in vm and won't attach to the sandbox;
    // rewrite them as var so declarations become sandbox properties.
    const code = fs.readFileSync(fullPath, 'utf-8')
      .replace(/^\s*(const|let)\s+/gm, 'var ');
    try {
      vm.runInContext(code, sandbox);
    } catch (err) {
      console.warn(`[warn] Could not evaluate ${path.basename(fullPath)}:`, err.message);
    }
  }

  const courses = COURSE_VARS.map(v => sandbox[v]).filter(Boolean);
  if (!courses.length) {
    console.error('[error] No course data found. Check file paths.');
    process.exit(1);
  }

  console.log(`Seeding ${courses.length} course(s)...`);
  for (const course of courses) {
    await setCourse(course);
    console.log(`  ✓ ${course.title} (${course.id})`);
  }
  console.log('Done.');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const { getCourses, getCourseById, setCourse, deleteCourse } = require('../services/firestore');
const { requireFields } = require('../utils/validate');

const router = express.Router();

/* GET /api/courses — public */
router.get('/', async (_req, res, next) => {
  try {
    res.json(await getCourses());
  } catch (err) {
    next(err);
  }
});

/* GET /api/courses/:id — public */
router.get('/:id', async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
});

/* POST /api/courses — admin, server assigns ID */
router.post('/', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['title']);
    if (missing) return res.status(400).json({ error: missing });
    const course = { weeks: [], days: [], ...req.body, id: uuidv4(), createdAt: new Date().toISOString() };
    await setCourse(course);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

/* PUT /api/courses/:id — admin, full upsert (client may supply ID) */
router.put('/:id', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['title']);
    if (missing) return res.status(400).json({ error: missing });
    const course = { weeks: [], days: [], ...req.body, id: req.params.id };
    if (!course.createdAt) course.createdAt = new Date().toISOString();
    await setCourse(course);
    res.json(course);
  } catch (err) {
    next(err);
  }
});

/* DELETE /api/courses/:id — admin */
router.delete('/:id', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    await deleteCourse(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
});

/* POST /api/courses/seed — admin, push bundled courses from server/scripts/seed.js */
router.post('/seed', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    // Seed is invoked by POSTing the course array in the body
    const { courses } = req.body;
    if (!Array.isArray(courses) || !courses.length) {
      return res.status(400).json({ error: 'courses array required' });
    }
    for (const c of courses) {
      if (c.id) await setCourse(c);
    }
    res.json({ message: `${courses.length} course(s) seeded` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { getProgress, saveProgress, getUserAllProgress } = require('../services/firestore');

const router = express.Router();

function canAccess(req, userId) {
  return req.user.id === userId || req.user.role === 'admin';
}

/* GET /api/progress/:userId/:courseId */
router.get('/:userId/:courseId', verifyToken, async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;
    if (!canAccess(req, userId)) return res.status(403).json({ error: 'Forbidden' });
    res.json(await getProgress(userId, courseId));
  } catch (err) {
    next(err);
  }
});

/* PUT /api/progress/:userId/:courseId */
router.put('/:userId/:courseId', verifyToken, async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;
    if (!canAccess(req, userId)) return res.status(403).json({ error: 'Forbidden' });
    await saveProgress(userId, courseId, req.body);
    res.json({ message: 'Progress saved' });
  } catch (err) {
    next(err);
  }
});

/* GET /api/progress/:userId — batch progress for all courses */
router.get('/:userId', verifyToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!canAccess(req, userId)) return res.status(403).json({ error: 'Forbidden' });
    const list = await getUserAllProgress(userId);
    // Return as { courseId: progressDoc } map
    const map = {};
    list.forEach(p => { if (p.courseId) map[p.courseId] = p; });
    res.json(map);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

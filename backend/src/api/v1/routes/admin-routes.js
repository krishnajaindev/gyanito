import express from 'express';

const router = express.Router();
router.get('/add-subject', subject);
router.post('/add-chapter', chapter);
router.post('/add-quiz', quiz);
router.post('/add-question', question);
export default router;

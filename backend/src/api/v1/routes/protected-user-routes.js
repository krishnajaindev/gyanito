import express from 'express';
import { auth, authorize } from '../../../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all protected user routes
router.use(auth);

// Protected user routes (accessible by both regular users and admins)
router.get('/dashboard', (req, res) => {
    res.json({ message: 'User Dashboard', status: true, user: req.user });
});

router.get('/profile', (req, res) => {
    res.json({ message: 'User Profile', status: true, user: req.user });
});

// Add more protected user routes as needed

export default router;
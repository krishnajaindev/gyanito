import express from 'express';
import { auth, adminOnly } from '../../../middleware/auth.js';

const router = express.Router();

// Apply authentication and admin-only middleware to all admin routes
router.use(auth);
router.use(adminOnly);

// Admin routes
router.get('/dashboard', (req, res) => {
    res.json({ message: 'Admin Dashboard', status: true });
});

// Add more admin routes as needed

export default router;
import express from 'express';
import { signup, login, getCurrentUser } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/signup', signup);

// Login user
router.post('/login', login);

// Get current user
router.get('/me', authenticateToken, getCurrentUser);

export default router;
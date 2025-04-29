import express from 'express';
import { getRecentTasks } from '../controllers/tasks.js';

const router = express.Router();

// Get recent tasks
router.get('/recent', getRecentTasks);

export default router;
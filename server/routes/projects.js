import express from 'express';
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projects.js';
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} from '../controllers/tasks.js';

const router = express.Router();

// Project routes
router.get('/', getProjects);
router.get('/:projectId', getProject);
router.post('/', createProject);
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);

// Task routes (nested under projects)
router.get('/:projectId/tasks', getTasks);
router.post('/:projectId/tasks', createTask);
router.put('/:projectId/tasks/:taskId', updateTask);
router.patch('/:projectId/tasks/:taskId/status', updateTaskStatus);
router.delete('/:projectId/tasks/:taskId', deleteTask);

export default router;
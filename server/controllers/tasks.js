import Task from '../models/Task.js';
import Project from '../models/Project.js';

// Get tasks for a project
export const getTasks = async (req, res) => {
  try {
    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const tasks = await Task.find({ project: req.params.projectId })
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recent tasks across all projects
export const getRecentTasks = async (req, res) => {
  try {
    // Get user's projects
    const projects = await Project.find({ user: req.user.id });
    const projectIds = projects.map(project => project._id);
    
    // Get recent tasks from these projects
    const tasks = await Task.find({ project: { $in: projectIds } })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Add project names to tasks
    const projectMap = {};
    projects.forEach(project => {
      projectMap[project._id.toString()] = project.name;
    });
    
    const tasksWithProjectNames = tasks.map(task => {
      const projectId = task.project.toString();
      return {
        ...task.toObject(),
        projectName: projectMap[projectId],
        projectId
      };
    });
    
    res.status(200).json(tasksWithProjectNames);
  } catch (error) {
    console.error('Error getting recent tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Set completedAt if status is completed
    const completedAt = status === 'completed' ? new Date() : null;
    
    const task = new Task({
      title,
      description,
      status,
      project: req.params.projectId,
      user: req.user.id,
      completedAt
    });
    
    await task.save();
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if completedAt should be updated
    let updateData = { title, description, status };
    if (status === 'completed') {
      const existingTask = await Task.findById(req.params.taskId);
      if (!existingTask || existingTask.status !== 'completed') {
        updateData.completedAt = new Date();
      }
    }
    
    const task = await Task.findOneAndUpdate(
      { 
        _id: req.params.taskId,
        project: req.params.projectId
      },
      updateData,
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if completedAt should be updated
    let updateData = { status };
    if (status === 'completed') {
      const existingTask = await Task.findById(req.params.taskId);
      if (!existingTask || existingTask.status !== 'completed') {
        updateData.completedAt = new Date();
      }
    }
    
    const task = await Task.findOneAndUpdate(
      { 
        _id: req.params.taskId,
        project: req.params.projectId
      },
      updateData,
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      project: req.params.projectId
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
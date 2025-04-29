import Project from '../models/Project.js';
import Task from '../models/Task.js';

// Get all projects for current user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    // Get task counts for each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ project: project._id });
        const completedTaskCount = await Task.countDocuments({ 
          project: project._id,
          status: 'completed'
        });
        
        return {
          _id: project._id,
          name: project.name,
          description: project.description,
          createdAt: project.createdAt,
          taskCount,
          completedTaskCount
        };
      })
    );
    
    res.status(200).json(projectsWithCounts);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single project by ID
export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ 
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Get tasks for this project
    const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      _id: project._id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      tasks
    });
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Check if user already has 4 projects
    const projectCount = await Project.countDocuments({ user: req.user.id });
    if (projectCount >= 4) {
      return res.status(400).json({ message: 'Maximum number of projects reached (4)' });
    }
    
    const project = new Project({
      name,
      description,
      user: req.user.id
    });
    
    await project.save();
    
    res.status(201).json({
      _id: project._id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      taskCount: 0,
      completedTaskCount: 0
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId, user: req.user.id },
      { name, description },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    // Find and delete the project
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      user: req.user.id
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Delete all tasks associated with this project
    await Task.deleteMany({ project: req.params.projectId });
    
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
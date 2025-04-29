import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { fetchProject, deleteProject } from '../services/api.jsx'
import TaskItem from '../components/TaskItem.jsx'
import TaskForm from '../components/TaskForm.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { STATUS_OPTIONS } from '../config/constants.jsx'

function ProjectDetails() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    loadProject()
  }, [projectId])

  const loadProject = async () => {
    try {
      setLoading(true)
      const data = await fetchProject(projectId)
      setProject(data)
      setTasks(data.tasks || [])
    } catch (error) {
      toast.error('Failed to load project')
      navigate('/projects')
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
    setShowTaskForm(false)
    toast.success('Task created successfully!')
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ))
    setEditingTask(null)
    toast.success('Task updated successfully!')
  }

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId))
    toast.success('Task deleted successfully!')
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  const confirmDeleteProject = async () => {
    try {
      await deleteProject(projectId)
      toast.success('Project deleted successfully!')
      navigate('/projects')
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  const filteredTasks = statusFilter 
    ? tasks.filter(task => task.status === statusFilter)
    : tasks

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded mb-6"></div>
        
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded mb-3"></div>
        ))}
      </div>
    )
  }

  if (!project) return null

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link to="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" /> Back to Projects
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={() => setShowTaskForm(true)}
            className="btn btn-primary"
            disabled={showTaskForm}
          >
            <FaPlus className="mr-2" /> Add Task
          </button>
          
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="btn btn-danger"
          >
            <FaTrash className="mr-2" /> Delete Project
          </button>
        </div>
      </div>
      
      {showTaskForm && (
        <div className="mb-8 card animate-slide-in">
          <TaskForm 
            projectId={projectId}
            task={editingTask}
            onSuccess={editingTask ? handleTaskUpdated : handleTaskCreated}
            onCancel={() => {
              setShowTaskForm(false)
              setEditingTask(null)
            }}
          />
        </div>
      )}
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-xl font-semibold mb-3 md:mb-0">
          Tasks ({filteredTasks.length})
        </h2>
        
        <div className="flex items-center">
          <FaFilter className="text-gray-500 mr-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input py-1 px-3"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-500 mb-4">
            {statusFilter 
              ? `No tasks with ${STATUS_OPTIONS.find(s => s.value === statusFilter)?.label} status` 
              : 'No tasks in this project yet'}
          </p>
          
          {!statusFilter && (
            <button 
              onClick={() => setShowTaskForm(true)}
              className="btn btn-primary"
            >
              <FaPlus className="mr-2" /> Add your first task
            </button>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="divide-y">
            {filteredTasks.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onEdit={() => handleEditTask(task)}
                onDelete={handleTaskDeleted}
              />
            ))}
          </div>
        </div>
      )}
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? All tasks will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteProject}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  )
}

export default ProjectDetails
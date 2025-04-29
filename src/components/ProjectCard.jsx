import { Link } from 'react-router-dom'
import { FaExternalLinkAlt, FaTrash, FaTasks, FaCalendarAlt } from 'react-icons/fa'
import { useState } from 'react'
import { deleteProject } from '../services/api.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'

function ProjectCard({ project, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }
  
  // const confirmDelete = async () => {
  //   try {
  //     setIsDeleting(true)
  //     await deleteProject(project._id)
  //     onDelete && onDelete(project._id)
  //   } catch (error) {
  //     console.error('Error deleting project:', error)
  //   } finally {
  //     setIsDeleting(false)
  //     setShowDeleteConfirm(false)
  //   }
  // }
  

  const confirmDelete = async () => {
    try {
      setIsDeleting(true)
      console.log('Deleting Task:', task.projectId, task._id);  // Add this line to debug
      if (!task.projectId || !task._id) {
        throw new Error('Missing projectId or taskId');
      }
      await deleteTask(task.projectId, task._id)
      onDelete && onDelete(task._id)
    } catch (error) {
      toast.error('Error deleting task: ' + error.message)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }
  

  const taskCount = project.taskCount || 0
  const completedTaskCount = project.completedTaskCount || 0
  
  return (
    <>
      <Link to={`/projects/${project._id}`} className="card block hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
            {project.name}
          </h3>
          
          <div className="flex space-x-2">
            <button
              onClick={handleDeleteClick}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Delete project"
            >
              <FaTrash size={14} />
            </button>
            
            <div className="text-gray-400 p-1">
              <FaExternalLinkAlt size={14} />
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <FaTasks className="mr-2" />
          <span>
            {taskCount} task{taskCount !== 1 ? 's' : ''} 
            {taskCount > 0 && ` (${completedTaskCount} completed)`}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <FaCalendarAlt className="mr-2" />
          <span>Created on {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </Link>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? All tasks will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isProcessing={isDeleting}
      />
    </>
  )
}

export default ProjectCard
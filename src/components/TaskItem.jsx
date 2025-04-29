import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit, FaCalendarAlt, FaCalendarCheck } from 'react-icons/fa'
import { deleteTask, updateTaskStatus } from '../services/api.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'
import { toast } from 'react-hot-toast'

function TaskItem({ task, onEdit, onDelete, showProject = false }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'badge-pending';
      case 'in-progress': return 'badge-in-progress';
      case 'completed': return 'badge-completed';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  }
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }
  
  const confirmDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteTask(task.projectId, task._id)
      onDelete && onDelete(task._id)
    } catch (error) {
      toast.error('Error deleting task')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    try {
      await updateTaskStatus(task.projectId, task._id, newStatus)
      onEdit && onEdit({ ...task, status: newStatus })
      toast.success('Task status updated')
    } catch (error) {
      toast.error('Failed to update task status')
    }
  }
  
  return (
    <>
      <div className="py-4 flex flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <div className="flex items-start">
            <div className="mr-3">
              <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
            </div>
            
            <div className="flex-1">
              {showProject && task.projectName && (
                <Link to={`/projects/${task.projectId}`} className="text-xs text-blue-600 hover:underline mb-1 block">
                  {task.projectName}
                </Link>
              )}
              
              <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{task.description}</p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <FaCalendarAlt className="mr-1" />
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                
                {task.status === 'completed' && task.completedAt && (
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarCheck className="mr-1" />
                    <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-3 md:mt-0">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="mr-3 text-sm py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button
            onClick={() => onEdit && onEdit(task)}
            className="text-gray-500 hover:text-blue-600 transition-colors p-2"
            title="Edit task"
          >
            <FaEdit />
          </button>
          
          <button
            onClick={handleDeleteClick}
            className="text-gray-500 hover:text-red-600 transition-colors p-2"
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isProcessing={isDeleting}
      />
    </>
  )
}

export default TaskItem
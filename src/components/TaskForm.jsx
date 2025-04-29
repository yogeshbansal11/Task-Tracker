import { useState, useEffect } from 'react'
import { createTask, updateTask } from '../services/api.jsx'
import { toast } from 'react-hot-toast'
import { STATUS_OPTIONS } from '../config/constants.jsx'

function TaskForm({ projectId, task, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending'
      })
    }
  }, [task])

  const validate = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setLoading(true)
    
    try {
      let result
      
      if (task) {
        // Update existing task
        result = await updateTask(projectId, task._id, formData)
      } else {
        // Create new task
        result = await createTask(projectId, formData)
      }
      
      onSuccess(result)
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        `Failed to ${task ? 'update' : 'create'} task`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {task ? 'Edit Task' : 'Create New Task'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-input ${errors.title ? 'border-red-500' : ''}`}
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className={`form-input ${errors.description ? 'border-red-500' : ''}`}
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          <p className="text-gray-500 text-xs mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            className="form-input"
            value={formData.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (task ? 'Saving...' : 'Creating...') : (task ? 'Save Changes' : 'Create Task')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
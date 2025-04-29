import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { fetchProjects } from '../services/api.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectForm from '../components/ProjectForm.jsx'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject])
    setShowForm(false)
    toast.success('Project created successfully!')
  }

  const handleProjectDeleted = (projectId) => {
    setProjects(projects.filter(project => project._id !== projectId))
    toast.success('Project deleted successfully!')
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        
        {projects.length < 4 && !showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> New Project
          </button>
        )}
      </div>
      
      {showForm && (
        <div className="mb-8 animate-slide-in">
          <ProjectForm 
            onSuccess={handleProjectCreated} 
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse h-48">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Projects Yet</h3>
          <p className="text-gray-500 mb-6">Start by creating your first project</p>
          
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> Create Project
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              onDelete={handleProjectDeleted}
            />
          ))}
          
          {projects.length < 4 && (
            <button 
              onClick={() => setShowForm(true)}
              className="card flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
            >
              <FaPlus className="text-gray-400 text-3xl mb-3" />
              <p className="text-gray-500 font-medium">Add New Project</p>
              <p className="text-gray-400 text-sm">{4 - projects.length} slot{projects.length === 3 ? '' : 's'} remaining</p>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Projects
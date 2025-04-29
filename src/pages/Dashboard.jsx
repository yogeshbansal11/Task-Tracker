// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { FaPlus, FaProjectDiagram, FaTasks } from 'react-icons/fa'
// import { toast } from 'react-hot-toast'
// import { useAuth } from '../context/AuthContext.jsx'
// import { fetchProjects, fetchRecentTasks } from '../services/api.jsx'
// import ProjectCard from '../components/ProjectCard.jsx'
// import TaskItem from '../components/TaskItem.jsx'

// function Dashboard() {
//   const { user } = useAuth()
//   const [projects, setProjects] = useState([])
//   const [recentTasks, setRecentTasks] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       try {
//         setLoading(true)
//         const [projectsData, tasksData] = await Promise.all([
//           fetchProjects(),
//           fetchRecentTasks()
//         ])
        
//         setProjects(projectsData)
//         setRecentTasks(tasksData)
//       } catch (error) {
//         toast.error('Failed to load dashboard data')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     loadDashboardData()
//   }, [])

//   return (
//     <div className="animate-fade-in">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
//         </div>
        
//         <div className="mt-4 md:mt-0">
//           <Link to="/projects" className="btn btn-primary">
//             <FaPlus className="mr-2" /> New Project
//           </Link>
//         </div>
//       </div>
      
//       {loading ? (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="card animate-pulse h-48">
//               <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <FaProjectDiagram className="text-blue-600 mr-2" />
//               <h2 className="text-xl font-semibold">Your Projects</h2>
//             </div>
            
//             {projects.length === 0 ? (
//               <div className="card text-center py-10">
//                 <p className="text-gray-500 mb-4">You don't have any projects yet</p>
//                 <Link to="/projects" className="btn btn-primary inline-flex">
//                   <FaPlus className="mr-2" /> Create your first project
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {projects.map(project => (
//                   <ProjectCard key={project._id} project={project} />
//                 ))}
                
//                 {projects.length < 4 && (
//                   <Link to="/projects" className="card flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
//                     <FaPlus className="text-gray-400 text-3xl mb-3" />
//                     <p className="text-gray-500 font-medium">Add New Project</p>
//                     <p className="text-gray-400 text-sm">{4 - projects.length} slot{projects.length === 3 ? '' : 's'} remaining</p>
//                   </Link>
//                 )}
//               </div>
//             )}
//           </div>
          
//           <div>
//             <div className="flex items-center mb-4">
//               <FaTasks className="text-blue-600 mr-2" />
//               <h2 className="text-xl font-semibold">Recent Tasks</h2>
//             </div>
            
//             {recentTasks.length === 0 ? (
//               <div className="card text-center py-8">
//                 <p className="text-gray-500">You don't have any tasks yet</p>
//               </div>
//             ) : (
//               <div className="card">
//                 <div className="divide-y">
//                   {recentTasks.map(task => (
//                     <TaskItem key={task._id} task={task} showProject />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// export default Dashboard





import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaProjectDiagram, FaTasks } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchProjects, fetchRecentTasks } from '../services/api.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import TaskItem from '../components/TaskItem.jsx'

function Dashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const [projectsData, tasksData] = await Promise.all([
          fetchProjects(),
          fetchRecentTasks()
        ])
        setProjects(projectsData)
        setRecentTasks(tasksData)
      } catch (error) {
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="animate-fade-in p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name || 'User'}!</p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center px-5 py-2.5 mt-4 md:mt-0 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium shadow"
        >
          <FaPlus className="mr-2" /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg bg-white p-4 shadow animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <FaProjectDiagram className="text-blue-600 mr-2 text-lg" />
              <h2 className="text-xl font-semibold text-gray-800">Your Projects</h2>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500 mb-4">You don't have any projects yet</p>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
                >
                  <FaPlus className="mr-2" /> Create your first project
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                  <ProjectCard key={project._id} project={project} />
                ))}

                {projects.length < 4 && (
                  <Link
                    to="/projects"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition"
                  >
                    <FaPlus className="text-3xl text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Add New Project</p>
                    <p className="text-sm text-gray-400">
                      {4 - projects.length} slot{projects.length === 3 ? '' : 's'} remaining
                    </p>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-4">
              <FaTasks className="text-blue-600 mr-2 text-lg" />
              <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
            </div>

            {recentTasks.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">You don't have any tasks yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow divide-y">
                {recentTasks.map(task => (
                  <TaskItem key={task._id} task={task} showProject />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard

// import { NavLink } from 'react-router-dom'
// import { FaTimes, FaHome, FaProjectDiagram } from 'react-icons/fa'

// function Sidebar({ isOpen, closeSidebar }) {
//   return (
//     <>
//       {/* Mobile sidebar backdrop */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
//           onClick={closeSidebar}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside 
//         className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-all duration-300 transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//         } md:w-64 w-64 pt-5 ${isOpen ? 'md:w-64' : 'md:w-16'}`}
//       >
//         <div className="px-4 mb-6 flex justify-between items-center">
//           <h2 className={`font-bold text-blue-600 text-xl transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
//             TaskTracker
//           </h2>
//           <button 
//             onClick={closeSidebar}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
//           >
//             <FaTimes className="h-5 w-5" />
//           </button>
//         </div>

//         <nav className="mt-5">
//           <NavLink 
//             to="/" 
//             className={({ isActive }) => 
//               `flex items-center py-3 px-4 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'} hover:bg-gray-100 transition-colors`
//             }
//             onClick={() => window.innerWidth < 768 && closeSidebar()}
//           >
//             <FaHome className="h-5 w-5" />
//             <span className={`ml-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>Dashboard</span>
//           </NavLink>
          
//           <NavLink 
//             to="/projects" 
//             className={({ isActive }) => 
//               `flex items-center py-3 px-4 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'} hover:bg-gray-100 transition-colors`
//             }
//             onClick={() => window.innerWidth < 768 && closeSidebar()}
//           >
//             <FaProjectDiagram className="h-5 w-5" />
//             <span className={`ml-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>Projects</span>
//           </NavLink>
//         </nav>
//       </aside>
//     </>
//   )
// }

// export default Sidebar

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaTimes, FaHome, FaProjectDiagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Sidebar({ isOpen, closeSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'} md:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2
            className={`text-xl font-bold text-indigo-600 whitespace-nowrap overflow-hidden transition-all duration-300
            ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}
          >
            TaskTracker
          </h2>
          <button
            onClick={closeSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-2 rounded-md text-sm font-medium transition-colors
              ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => window.innerWidth < 768 && closeSidebar()}
          >
            <FaHome className="w-5 h-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-2 rounded-md text-sm font-medium transition-colors
              ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`
            }
            onClick={() => window.innerWidth < 768 && closeSidebar()}
          >
            <FaProjectDiagram className="w-5 h-5" />
            {!isCollapsed && <span>Projects</span>}
          </NavLink>
        </nav>

        {/* Collapse Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={toggleCollapse}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md"
            aria-label="Toggle sidebar collapse"
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

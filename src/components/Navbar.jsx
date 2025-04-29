import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { FaBars, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
            >
              <FaBars className="h-5 w-5" />
            </button>
            <Link to="/" className="text-xl font-bold text-blue-600">TaskTracker</Link>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
              </div>
              <span className="ml-2 hidden md:block">{user?.name || 'User'}</span>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-gray-500 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
import axios from 'axios'
import { API_URL } from '../config/constants.jsx'

// Auth API
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials)
  return response.data
}

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, userData)
  return response.data
}

// Projects API
export const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/api/projects`)
  return response.data
}

export const fetchProject = async (projectId) => {
  const response = await axios.get(`${API_URL}/api/projects/${projectId}`)
  return response.data
}

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/api/projects`, projectData)
  return response.data
}

export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`${API_URL}/api/projects/${projectId}`, projectData)
  return response.data
}

export const deleteProject = async (projectId) => {
  const response = await axios.delete(`${API_URL}/api/projects/${projectId}`)
  return response.data
}

// Tasks API
export const fetchTasks = async (projectId) => {
  const response = await axios.get(`${API_URL}/api/projects/${projectId}/tasks`)
  return response.data
}

export const fetchRecentTasks = async () => {
  const response = await axios.get(`${API_URL}/api/tasks/recent`)
  return response.data
}

export const createTask = async (projectId, taskData) => {
  const response = await axios.post(
    `${API_URL}/api/projects/${projectId}/tasks`, 
    taskData
  )
  return response.data
}

export const updateTask = async (projectId, taskId, taskData) => {
  const response = await axios.put(
    `${API_URL}/api/projects/${projectId}/tasks/${taskId}`, 
    taskData
  )
  return response.data
}

export const updateTaskStatus = async (projectId, taskId, status) => {
  const response = await axios.patch(
    `${API_URL}/api/projects/${projectId}/tasks/${taskId}/status`,
    { status }
  )
  return response.data
}

export const deleteTask = async (projectId, taskId) => {
  const response = await axios.delete(
    `${API_URL}/api/projects/${projectId}/tasks/${taskId}`
  )
  return response.data
}
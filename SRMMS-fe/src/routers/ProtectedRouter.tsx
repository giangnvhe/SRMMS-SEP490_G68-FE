import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authProvider'

export const ProtectedRoute = () => {
  const { token, user } = useAuth()
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to='/' />
  }

  // If authenticated, render the child routes
  return <Outlet />
}

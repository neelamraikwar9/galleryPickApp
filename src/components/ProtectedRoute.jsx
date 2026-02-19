import { Navigate, Outlet } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

export default function ProtectedRoute(){
    const { token } = useAuth(); 
  return (
    <main>
    <div>{token ? <Outlet/> : <Navigate to="/"/>}</div>
    </main>
  )
}

// token exists → <Outlet /> = Show protected page
// token missing → <Navigate to="/" /> = Redirect to home
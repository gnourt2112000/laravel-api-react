import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}:any) => {
    if (!localStorage.getItem('auth_token')) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default ProtectedRoute
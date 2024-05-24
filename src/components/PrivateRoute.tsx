import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string[];
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  console.log('ssssssssssss',auth);
  const location = useLocation();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && auth?.role && requiredRole.includes(auth?.role) ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;

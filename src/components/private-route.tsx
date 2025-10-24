import React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  children: React.ReactNode;
  isAuthorized: boolean;
};

export default function PrivateRoute({ children, isAuthorized }: PrivateRouteProps) {
  if (!isAuthorized) {
    return <Navigate to="/login" replace />
  }

  return children
}

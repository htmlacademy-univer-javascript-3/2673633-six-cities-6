import React from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '@/components/spinner/spinner.tsx';
import { useAppSelector } from '@/hooks/use-app-selector.ts';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const status = useAppSelector((state) => state.authorizationStatus);

  if (status === 'unknown') {
    return <Spinner />;
  }

  if (status === 'no-auth') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

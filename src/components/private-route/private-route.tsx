import React from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '@/components/spinner/spinner.tsx';
import { useAppSelector } from '@/hooks/use-app-selector/use-app-selector.ts';
import { AUTH_STATUS } from '@/constants/auth-status/auth-status.ts';
import { PATHS } from '@/constants/paths/paths.ts';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const status = useAppSelector((state) => state.user.authorizationStatus);

  if (status === AUTH_STATUS.Unknown) {
    return <Spinner />;
  }

  if (status === AUTH_STATUS.NoAuth) {
    return <Navigate to={PATHS.Login} replace />;
  }

  return children;
}

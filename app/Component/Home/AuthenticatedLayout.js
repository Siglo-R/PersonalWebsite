import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

const AuthenticatedLayout = ({ children, pathname }) => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Redirect to landing page if user is not authenticated
    if (!loading && !user && pathname !== '/auth') {
      // Use window.location.href to perform the redirection
      window.location.href = '/auth';
    }
  }, [user, loading, pathname]);

  return <>{children}</>;
};

export default AuthenticatedLayout;

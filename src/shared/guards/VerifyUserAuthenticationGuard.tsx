import useAccount from '@/account/hooks/useAccount';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface VerifyUserAuthenticationGuardProps {
  children: React.ReactNode;
}

/**
 *
 * @param children
 * @returns  {null} `null` If the user is not authenticated, return null
 * @returns {children } `children` If the user is authenticated, return the children
 * @description This guard is used to verify that the user is authenticated
 *
 */

const VerifyUserAuthenticationGuard = ({ children }: VerifyUserAuthenticationGuardProps): React.ReactNode | null => {
  const { loadingAuthenticate, authenticated } = useAccount();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // If the user is not authenticated, redirect to the login page
  if (loadingAuthenticate) return null;

  //  If the user is not authenticated, redirect to the login page
  if (!authenticated) {
    setTimeout(() => {
      navigate('/auth/login', {
        state: {
          from: pathname,
        },
      });
    }, 0);
    return null;
  }

  // If the user is authenticated, return the children
  return children;
};

export default VerifyUserAuthenticationGuard;

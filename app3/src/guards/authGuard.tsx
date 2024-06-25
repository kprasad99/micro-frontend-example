import React from "react";

import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const { children } = props;
//  const auth = useAuth() as any;
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = React.useState<string | null>();

//   if (!auth.isAuthenticated) {
//     if (location.pathname !== requestedLocation) {
//       setRequestedLocation(location.pathname);
//     }

//     return <Login />;
//   }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
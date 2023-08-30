import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  

  if (user == null && !loading) {
    router.push('/accounts/login');
    return null;
  }
  
  return children;
};

export default PrivateRoute;

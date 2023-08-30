import { useAuth } from '@/app/contexts/authContext';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to the login page if the user is not authenticated
  if (!user) {
    router.push('/accounts/login');
    return null;
  }

  // If the user is authenticated, render the child components
  return children;
};

export default PrivateRoute;

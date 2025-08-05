import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // adjust path as needed

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/signin'); // redirect to login
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return children;
};

export default PrivateRoute;

// src/components/AdminRoute.jsx
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const ADMIN_EMAIL = 'aakashdahiya167@gmail.com';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        navigate('/unauthorized'); // redirect if not admin
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="text-center mt-10">Checking admin access...</div>;

  return isAdmin ? children : null;
};

export default AdminRoute;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';

const CompleteRegistration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const token = searchParams.get('token');

  const completeRegistration = async () => {
    try {
      if (!token) {
        setError('No token provided');
        return;
      }

      await api.complete_registration(token);
      navigate('/login');
    } catch (err) {
      setError('Failed to complete registration');
    }
  };

  useEffect(() => {
    completeRegistration();
  }, []);  
  
  return (
    <div>
      {error && <p>{error}</p>}
      <p>Completing registration...</p>
    </div>
  );
}

export default CompleteRegistration;
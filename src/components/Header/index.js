import React, { useEffect } from 'react';
import './styles.css';
import { auth, signOut } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/dashboard');
    }
  }, [user, loading]);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='navbar'>
      <p className='logo'>WallTrack</p>
      {user && <p className='logout' onClick={logout}>Logout</p>}
    </div>
  )
}

export default Header
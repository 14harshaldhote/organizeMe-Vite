import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Logout = ({ userName }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <p className="text-black" >{userName}</p>
          
        <button
        className=" btn-danger cursor-pointer hover:text-grey-800"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />

      </button>
     

    </div>
    
  );
};

export default Logout;

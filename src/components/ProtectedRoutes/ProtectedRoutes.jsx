import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../config/contexts/AuthContext';



function ProtectedRoutes({ children }) {
    const { currentUser, loginID } = useAuth();
    const user = localStorage.getItem('currentUser')
    // const navigate = useNavigate('');

    if (!user) {
        // console.log('Working')
       return <Navigate to='/login'/>
    }

    return children;
}

export default ProtectedRoutes;
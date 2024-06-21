import  { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RestrictedRoute = ({ children }) => {
    const [userRole, setUserRole] = useState('');
    const token = window.localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const roleId = decodedToken.role;
                setUserRole(roleId);
            } catch (error) {
                console.error("Error decoding token:", error);
                window.localStorage.removeItem("token");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate, token]);

    
    return (
        <>
            {userRole === 'Alcalde' && children}
        </>
    );
};
RestrictedRoute.propTypes = {
    children: PropTypes.node.isRequired
}
export default RestrictedRoute;

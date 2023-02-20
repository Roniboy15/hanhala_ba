import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './adminAuth';


const AdminHome = () => {

    const { admin, setAdmin } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!admin) {
            const timeoutId = setTimeout(() => {
                nav("/admin");
            }, 2000);
            return () => {
                clearTimeout(timeoutId);
            };
        }

    }, []);

    return (
        <div>
            {admin ? (
                <div className='container'>
                   Home

                </div>) : (
                <div>
                    <h3>Gang dich go ilogge Globi</h3>
                </div>
            )}
        </div>
    );

}

export default AdminHome
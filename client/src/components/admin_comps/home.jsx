import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import AdminLogin from './adminLogin';


const AdminHome = () => {

    const { admin, setAdmin } = useContext(AuthContext);
    const nav = useNavigate();

    // useEffect(() => {
    //     if (!admin) {
    //         const timeoutId = setTimeout(() => {
    //             nav("/admin");
    //         }, 2000);
    //         return () => {
    //             clearTimeout(timeoutId);
    //         };
    //     }

    // }, []);

    return (
        <div>
            {admin ? (
                <div className='container'>
                    Home

                </div>) : (
                <div>
                    <AdminLogin />
                </div>
            )}
        </div>
    );

}

export default AdminHome
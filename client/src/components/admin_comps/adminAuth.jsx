import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import { API_URL, doApiGet } from '../../services/apiServices';


const AdminAuth = ({children}) => {

    const [admin, setAdmin] = useState(false);

    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [admin])

    const doApi = async () => {
        let url = API_URL + "/users/checkToken"
        try {
            let data = await doApiGet(url);
            if (data.role != "admin") {
                setAdmin(false)
            }
            else setAdmin(true)
        }
        catch (err) {
            setAdmin(false)
           
        }
    }

    return(
    <AuthContext.Provider value={{admin, setAdmin}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AdminAuth
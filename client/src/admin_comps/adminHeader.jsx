import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import useWidth from '../general_comps/useWidth';
import { TOKEN_KEY } from '../services/apiServices';
import AdminAuth, { AuthContext } from './adminAuth';
import logo from '../images/ba_logo.png';

const AdminHeader = () => {

    const [collapse, setCollapse] = useState(false);
    const [counter, setCounter] = useState(0);
    const width = useWidth();
    const nav = useNavigate();

    const {admin, setAdmin} = useContext(AuthContext);


    const onLogOut = () => {
        localStorage.removeItem(TOKEN_KEY);
        setAdmin(false);
        nav("/")
      }

      const home = () => {
        nav("/")
      }

    useEffect(() => {
        if (width > 990) setCollapse(true);
        else if (width < 990 && !collapse) { setCollapse(false) }
        console.log(collapse)

        
    }, [width])


    return (
        <header className='container-fluid bg-light'>
            <div className="container">
                <div className="row align-items-center">
                    <nav className="navbar navbar-expand-lg">
                        <img src={logo} alt="ba_logo" className='mx-1' style={{height:"60px"}}/>
                        <br/>
                        <a className="navbar-brand"><h2 className=''>Hanhala</h2></a>
                        <button onClick={() => {
                            if (counter == 0) {
                                setCollapse(true);
                                setCounter(1);
                            }
                            else {
                                setCollapse(false)
                                setCounter(0)
                            }
                            console.log(collapse)
                        }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={collapse ? 'navbar-collapse' : 'collapse'} id='navbarNav'>
                            <ul className="navbar-nav p-3">
                                <li className="nav-item active">
                                    <Link className='nav-link sr-only' to="/admin/sommermachane">Suma</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/wintermachane">Wima</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/il-reise">IL Reise</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/sayarim">Sayarim</Link>
                                </li>
                                <li className="nav-item">
                                <button className='btn btn-outline-warning align' onClick={home}>Home</button>
                                </li>
                                </ul>
                            {admin? 
                                    <button onClick={onLogOut} className='btn btn-outline-dark float-end' >Log out</button>
                                 : <div></div>}
                                

                        </div>
                    </nav>

                </div>
            </div>
        </header>
    )
}

export default AdminHeader
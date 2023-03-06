import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import useWindowWidth from '../../general_comps/useWidth';
import { TOKEN_KEY } from '../../services/apiServices';
import AdminAuth from './adminAuth';
import logo from '../../images/ba_logo.png'
import { AuthContext } from '../../context/Context';

const AdminHeader = () => {

    const [collapse, setCollapse] = useState(false);
    const [counter, setCounter] = useState(0);
    const width = useWindowWidth();
    const nav = useNavigate();

    const { admin, setAdmin } = useContext(AuthContext);


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


    }, [width])


    return (
        <header style={{backgroundColor:"#f7f7f7"}} className='container-fluid'>
            <div className="container">
                <div className="row align-items-center">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand">
                            <img src={logo} alt="ba_logo" className='mx-1' style={{ height: "60px" }} />
                            <h2 className='m-2'>Hanhala</h2>
                        </a>
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
                        }} className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {admin ?
                            <div
                                className={collapse ? 'navbar-collapse' : 'collapse'} id='navbarNav'>

                                <ul className="navbar-nav p-3">
                                    <li className="nav-item">
                                        <Link className='nav-link' to="/admin/sommermachane">Suma</Link>
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
                                        <Link className='nav-link' to="/admin/forms">Update Forms</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className='btn btn-outline-warning align' onClick={home}>Home</button>
                                    </li>
                                </ul>

                                <button onClick={onLogOut} className='btn btn-outline-dark float-end' >Log out</button>


                            </div>
                            :
                            <button style={{backgroundColor:"#f7f7f7"}} className='btn align border' onClick={home}>Home</button>
                        }
                    </nav>

                </div>
            </div>
        </header>
    )
}

export default AdminHeader
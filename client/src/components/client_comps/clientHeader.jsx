import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useWindowWidth from '../../general_comps/useWidth';
import logo from '../../images/ba_logo.png';


const ClientHeader = () => {

    const [collapse, setCollapse] = useState(false);
    const [counter, setCounter] = useState(0);
    const width = useWindowWidth();
    const nav = useNavigate();


    useEffect(() => {
        if (width > 990) setCollapse(true);
        else if (width < 990 && !collapse) { setCollapse(false) }
    }, [width])


    return (
        <header className='container-fluid bg-secondary bg-opacity-25'>
            <div className="container">
                <div className="row align-items-center">
                    <nav className="navbar navbar-expand-lg">

                        <a className="navbar-brand p-2">
                            <img src={logo} alt="ba_logo" className='p-1 p-md-0' style={{ height: "60px" }} />
                           <Link className='text-decoration-none text-dark' to={'/'}><h4 className='p-1 p-md-3'>Bne Akiwa Schweiz</h4></Link> 
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
                        }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={collapse ? 'navbar-collapse' : 'collapse'} id='navbarNav'>
                            <ul className="navbar-nav p-3">
                                <li className="nav-item">
                                    <Link className='nav-link' to="/contact">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/sommermachane">Admin</Link>
                                </li>


                            </ul>

                        </div>
                    </nav>

                </div>
            </div>
        </header>
    )
}

export default ClientHeader
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useWindowWidth from '../../general_comps/useWidth';
import { TOKEN_KEY } from '../../services/apiServices';
import logo from '../../images/ba_logo.png';
import { AuthContext } from '../../context/Context';

const AdminHeader = () => {

    const [collapse, setCollapse] = useState(true);
    const width = useWindowWidth();
    const nav = useNavigate();
    const location = useLocation();
    const { admin, setAdmin } = useContext(AuthContext);

    // Function to get machane from path
    const getCurrentMachane = () => {
        const machanePaths = {
            "/admin/sommermachane": "Suma",
            "/admin/wintermachane": "Wima",
            "/admin/il-reise": "IL Reise",
            "/admin/sayarim": "Sayarim",
        };
        return machanePaths[location.pathname] || "";
    }

    const onLogOut = () => {
        localStorage.removeItem(TOKEN_KEY);
        setAdmin(false);
        nav("/")
    }

    const home = () => {
        nav("/")
    }

    useEffect(() => {
        setCollapse(width > 990);
    }, [width])

    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setOpacity(0); // Reset the opacity to 0 immediately when the location changes
        const timer = setTimeout(() => {
            setOpacity(1); // After 0.5 seconds, fade in the text by setting opacity to 1
        }, 500);

        // Cleanup function to clear the timer if the location changes before 0.5 seconds has passed
        return () => clearTimeout(timer);
    }, [location]); // Add 'location' to the dependencies array


    return (
        <header style={{ backgroundColor: "#f7f7f7" }} className='container-fluid'>
            <div className="container">
                <div className="row align-items-center">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand">
                            <img src={logo} alt="ba_logo" className='mx-1' style={{ height: "60px" }} />
                            <h2 className='m-2'>Hanhala</h2>
                        </a>
                        <div>
                        <h5 style={{color: 'rgb(59, 94, 168)', opacity: opacity, transition: 'opacity 0.5s ease-in' }}>{getCurrentMachane()}</h5>
                        </div>
                        <button onClick={() => setCollapse(!collapse)} className="navbar-toggler border-0" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {admin && <div className={collapse ? 'collapse navbar-collapse' : 'navbar-collapse'} id='navbarNav'>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/sommermachane" onClick={() => setCollapse(!collapse)}>Suma</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/wintermachane" onClick={() => setCollapse(!collapse)}>Wima</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/il-reise" onClick={() => setCollapse(!collapse)}>IL Reise</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/sayarim" onClick={() => setCollapse(!collapse)}>Sayarim</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link' to="/admin/forms" onClick={() => setCollapse(!collapse)}>Update Forms</Link>
                                </li>
                            </ul>
                            <button onClick={onLogOut} className='btn btn-outline-dark float-end'>Log out</button>
                        </div>}
                        {!admin && <button style={{ backgroundColor: "#f7f7f7" }} className='btn align border' onClick={home}>Home</button>}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader;

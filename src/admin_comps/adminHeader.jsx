import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useWidth from '../general_comps/useWidth';

const AdminHeader = () => {

    const [collapse, setCollapse] = useState(false);
    const [counter, setCounter] = useState(0);
    const width = useWidth();

    useEffect(() => {
            if (width > 990) setCollapse(true);
            else if(width < 990 && !collapse){setCollapse(false)}
            console.log(collapse)
    }, [width])

    return (
        <header className='container-fluid bg-info p-2'>
            <div className="container">
                <div className="row align-items-center">
                    <nav className="navbar navbar-expand-lg p-3">
                        <a className="navbar-brand" href="/admin/home"><h2 className=''>Hanhala</h2></a>
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
                            <ul className="navbar-nav">
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
                                    <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>
            </div>
        </header>
    )
}

export default AdminHeader
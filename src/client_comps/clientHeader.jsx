import React from 'react'
import { Link } from 'react-router-dom'

const ClientHeader = () => {
    return (
        <header className="container-fluid bg-warning p-2 shadow">
            <div className="container">
                <div className="row align-items-center">
                    <div className='logo col-auto'>
                        <h2>Bne Akiwa</h2>
                    </div>
                    <div className='col row align-items-center justify-content-between'>
                        <ul className='col-auto'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/admin">Admin</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>)
}

export default ClientHeader
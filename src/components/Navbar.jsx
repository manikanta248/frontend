import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("name");

        Navigate("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1" to="/">Taskify</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link fs-4" aria-current="page" to="/">Home</Link>
                            {(!localStorage.getItem("userEmail")) ? <Link className="nav-link fs-4" to="/mytasks">My Tasks</Link>
                                : <Link className="nav-link fs-4" to="/tasks">Tasks</Link>}
                        </div>
                    </div>
                </div>
                {(!localStorage.getItem("authToken")) ?
                    <div className='d-flex m-3 justify-content-center'>
                        <Link className="btn bg-success m-1" to="/login">User Login</Link>
                        <Link className="btn bg-danger m-1" to="/adminlogin">Admin Login</Link>
                    </div>
                    :
                    <div className='d-flex'>
                        <div class="bi bi-person mt-4"></div>
                        <div className='mt-4'>{localStorage.getItem("userEmail").slice(0,4)}</div>

                        <div className='d-flex m-3 justify-content-center'>
                            <button className="btn bg-danger m-1" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                }
            </nav>
        </div>
    );
}

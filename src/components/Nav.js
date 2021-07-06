import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Nav = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Lab Notes</Link>
        <div>
            <div className="nav">
                <NavLink  className="btn-nav" to="/" exact>
                    Inicio
                </NavLink>
            
                <NavLink className="btn-nav"  to="/login" >
                    Login
                </NavLink>
            </div>
        </div>
    </div>
    )
}

export default Nav

import React from 'react'
import { auth } from '../firebase'
import {Link, NavLink, withRouter, useHistory} from 'react-router-dom'
import  './styles/Nav.css'
import logo from '../assets/img/notas.png';


//Funcion para cerrar sesion con firebase y renderice a login
const Nav = () => { 
    const history = useHistory()
    const logout = () => {
            auth.signOut()
            .then(() => {
            history.push('/login')
            })
    }


    return (
        <div className="navbar ">
        <Link to="/" 
            className="navbar-brand">
            <img src={logo}></img>
        </Link>
        <nav>
            <div className="nav">
                <NavLink  className="btn-nav" to="/" exact>
                    Inicio
                </NavLink>
                {
                    auth.currentUser !== null ? (
                        <NavLink className="btn-nav"  to="/timeline" >
                        Notas
                        </NavLink>
                    ) : null
                }

                
                    
                { auth.currentUser !== null ? (
                        <button
                        onClick={() =>logout()} 
                        >Cerrar Sesión
                        </button>
                        
                    ) : (
                        <NavLink className="btn-nav"  to="/login">
                        Login
                        </NavLink>
                    )
                }
                
            </div>
        </nav>
    </div>
    )
}

export default withRouter(Nav)

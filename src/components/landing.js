import React from 'react'
import {Link, } from "react-router-dom";

const landing = () => {
    return (
        <div>
        <Link to="/register">
            Registrarse
        </Link>
        <Link to="/login">
            Iniciar Sesiòn
        </Link>
           
        </div>
    )
}

export default landing

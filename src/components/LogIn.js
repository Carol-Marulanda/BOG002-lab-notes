import React from 'react'

const LoginAndRegister = () => {

    const [email, setEmail] = React.useState('') 
    const [password, setPass] = React.useState('')
    const [error, setError] = React.useState(null) //Para pitar errores-null para poder pintar
    const [esRegistro, setesRegistro] = React.useState(true)
    //validacion del formulario
    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
           // console.log('Datos vacíos email!')
            setError('Datos vacíos email!') //Se manda el string para que pinte
            return
        }
        if(!password.trim()){
           // console.log('Datos vacíos password!')
            setError('Datos vacíos password!')
            return
        }
        if(password.length < 6){
            //console.log('6 o más carácteres')
            setError('6 o más carácteres en password')
            return
        }
        console.log('correcto...')
        setError(null) //Se  pasa a null para que desaparezcan los errores de validaciones
    }

    return (
        <div className="form-register">
            <h3 className="text-center">
                {
                        esRegistro ? 'Registro de usuarios' : 'Inicia Sesiòn'
                }
            </h3>
            <hr/>
            <div className="">
                <div className="">
                    <form onSubmit={procesarDatos}> 

                    {                               //Si existe un error se pintan aqui llamamos al error
                        error && (
                        <div>
                            {error} 
                        </div>  
                        )  
                    }
                        <input 
                            type="email" 
                            className=""
                            placeholder="Ingrese Email"
                            onChange= {e => setEmail(e.target.value)}// onchange se tiliza para relacionar con el input al setEmail
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="btn-password"
                            placeholder="Ingrese Contraseña"
                            onChange= {e => setPass(e.target.value)}
                            value={password}
                        />
                        <button 
                            className="btn-register"
                            type="submit"
                        >
                            {esRegistro ? 'Registrarse' : 'Acceder'}
                        </button>
                        <button 
                            className="btn-login"
                            onClick={() => setesRegistro(!esRegistro)}
                            type="button" 
                        >
                            {
                                esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginAndRegister

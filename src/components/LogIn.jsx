import React from 'react'
import { auth, db} from '../firebase'
import { withRouter, useHistory } from 'react-router-dom'//Permite empujar al usuario a diferentes rutas
import  './styles/Login.css'



const LogIn = () => { //Se llaman los props de History

    const [email, setEmail] = React.useState('') // hooks
    const [password, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro, setesRegistro] = React.useState(false)
    const history = useHistory();
   

    //validacion del formulario
    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
           // console.log('Datos vacíos email!')
            setError('Datos vacíos email!') 
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
        setError(null) 
        
        if(esRegistro){
            registrar()
        }else{
            login()
        }
    }


// funcion para loguear al usuario y validacion de errores
    const login = React.useCallback(async() =>{
        
        try{
            const respuesta = await auth.signInWithEmailAndPassword(email, password)
            console.log(respuesta.user)
    
        setEmail('')
        setPass('')
        setError(null)
        history.push('/timeline')

        }catch(error){
            console.log(error) 
            if(error.code ===  "auth/user-not-found"){
                setError('Usuario no existe')
            }
            if(error.code ===   "auth/wrong-password"){
                setError('Contraseña invalida')
            }
        }
    }, [email, password, history])

    //Funcion con metodo de firebase para crear Usuario y validacion de errores
    const registrar = React.useCallback(async() => {

    try{
        const respuesta = await auth.createUserWithEmailAndPassword(email, password)
        console.log(respuesta.user)
        //Relacionar aunth con firestore
        await db.collection('notes').doc(respuesta.user.email).set({
            email:respuesta.user.email,
            uid: respuesta.user.uid
        })
        await db.collection(respuesta.user.uid).add({
            name:'nota de ejemplo',
            fecha:Date.now()
        })
      
        setEmail('')
        setPass('')
        setError(null)
        history.push('/timeline')
        //props.history.push("/timeline")
    }catch (error) {
            console.log(error)
            if(error.code ===  "auth/invalid-email"){
                setError('Email no valido')
            }

            if(error.code ===  "auth/email-already-in-use"){
                setError('Email ya utilizado')
            }
          
        }

    }, [email, password, history])


    return (
        <div className="form-datos">
            <div className="form">
                <h1 className="text-center">
                {
                        esRegistro ? 'Registro de usuarios' : 'Inicia Sesiòn'
                }
                </h1>
            
                <div className="form">
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
                            className="btn"
                            placeholder="Ingrese Email"
                            onChange= {e => setEmail(e.target.value)}// onchange se tiliza para relacionar con el input al setEmail
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="btn"
                            placeholder="Ingrese Contraseña"
                            onChange= {e => setPass(e.target.value)}
                            value={password}
                        />
                        <button 
                            className="btn-login"
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


export default withRouter(LogIn) //Se envuelve el componente, withRouter genera props

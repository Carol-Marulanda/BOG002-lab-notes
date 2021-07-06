import React from 'react'
import { auth, db} from './firebase'


const LogIn = () => {

    const [email, setEmail] = React.useState('') // hooks
    const [password, setPass] = React.useState('')
    const [error, setError] = React.useState(null) //Para pitar errores-null para poder pintar
    const [esRegistro, setesRegistro] = React.useState(false)

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

        }catch(error){
            console.log(error) 
            if(error.code ===  "auth/user-not-found"){
                setError('Usuario no existe')
            }
            if(error.code ===   "auth/wrong-password"){
                setError('Contraseña invalida')
            }
        }
    }, [email, password])

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

        setEmail('')
        setPass('')
        setError(null)

        }catch (error) {
            console.log(error)
            if(error.code ===  "auth/invalid-email"){
                setError('Email no valido')
            }

            if(error.code ===  "auth/email-already-in-use"){
                setError('Email ya utilizado')
            }
          
        }

    }, [email, password])


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


export default LogIn

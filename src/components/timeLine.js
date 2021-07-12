import React from 'react'
import { auth } from '../firebase'
import { withRouter} from 'react-router-dom'


const timeLine = (props) => {
    //const history = useHistory()
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        
        if(auth.currentUser){ // Se trae toda la info de CurrenUser
            console.log('Existe el usuario')
            
            setUser(auth.currentUser)
        }else {
            console.log('no existe el usuario')
            props.history.push('/login')

              // Si no existe el usuario se renderiza a login

        }
    }, [])

    return (
        <div>
            <h1>cuerpo de Lab Notes</h1>
            {
                user && (
                    <p>{user.email}</p>
                )
            }
        </div>
    )
}

export default withRouter (timeLine) // Envolver la funcion por que se utilizan los props

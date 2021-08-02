import React from 'react'
import { db} from '../firebase'

function Delete (props)  {
    console.log(props)
    

    
    const eliminar = async (id) => {
    //console.log(id)

        try{
        

            await db.collection(props.user.uid).doc(id).delete()
            const arrayFiltrado = props.nota.filter(item => item.id !== id)
            props.setNota(arrayFiltrado)




        } catch(error){
            console.log(error)
                    }
    }
    return (
        <div>
            <button
                onClick={() => eliminar(props.id)}
                
            >
                Eliminar
            </button>
        </div>
    )
}

export default Delete

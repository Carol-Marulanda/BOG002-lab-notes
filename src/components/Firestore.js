
import React from 'react'
import { db } from '../firebase'
import Delete from './Delete.jsx'
import Edit from './Edit.jsx'

function Firestore(props) {
    //console.log(props)

    const [nota, setNota] = React.useState([])
    const [notas, setNotas] = React.useState('')

    const obtenerDatos = async () => {

        try{

            const data =  await db.collection(props.user.uid).get()
            //console.log(data.docs)
            const arrayData =  data.docs.map(doc =>({ id: doc.id, ...doc.data()}) )
            //console.log(arrayData)
            setNota(arrayData)
            
          

        } catch(error){
            console.log(error)
        }


    }

    React.useEffect(() => {

       
        obtenerDatos()
    },[])

    const agregar = async (e) => {
        e.preventDefault()
        console.log(notas)

        //validaciones

        if(!notas.trim()){
            console.log('está vacio')
            return
        }

        try{

            const nuevaNota= {
                name: notas,
                fecha: Date.now()
            }

            const data =  await db.collection(props.user.uid).add(nuevaNota)
            
            setNota([
                ...nota,
                {...nuevaNota, id: data.id}
            ])

            setNotas('')
            data

        } catch(error){
            console.log(error)
        }

        console.log(notas)
    }

    // const eliminar = async (id) => {
    // //console.log(id)

    //     try{

    //         await db.collection(props.user.uid).doc(id).delete()

    //         const arrayFiltrado = nota.filter(item => item.id !== id)
    //         setNota(arrayFiltrado)

    //     } catch(error){
    //         console.log(error)
    //                 }
    // }

    return (
        <div className='container'>
            <div className=''>
                <div className=''>
                    <ul >
                        {
                            nota.map(item => (    //rrecorrido map para iterar los datos
                                <li key={item.id}>
                                    {item.name}
                                    {/* <button
                                        onClick={() => eliminar(item.id)}
                                    >
                                        Eliminar
                                    </button> */}
                                    <Delete user={props.user} id={item.id} nota={nota} setNota={setNota}/>
                                    <Edit />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h3>Notas</h3>
                    <form onSubmit={agregar}>
                        <input 
                            className=''
                            type="text" 
                            placeholder='Ingrese nota'
                            onChange={e => setNotas(e.target.value)}
                            value={notas}
                        />
                        <button
                            className=''
                            type='submit'
                        >
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Firestore

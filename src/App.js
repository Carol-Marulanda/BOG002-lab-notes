import React from 'react';
import Nav from './components/Nav'
import LogIn from './components/LogIn';
import TimeLine from './components/TimeLine';
// import Landing from './components/Landing'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { auth } from './firebase'
import './App.css';



function App() {

  const[firebaseUser, setFirebaseUser] = React.useState(false) //Traer informacion del usuario con firebaseUser y el usuario que se detecte parte en falso
  // detectar el usuario con firebase y esperar para que cargue todos los componentes
  React.useEffect(() => {
    
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){ //Si existe un usuario pasarlo a este estado
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null) //Caso contrario en null
      }
    })
  }, [])


  return firebaseUser !== false ? (
    <Router>
      <div className='container'>
      <div>
        <Nav firebaseUser={firebaseUser} />   
      </div>
      <hr/>
      <Switch>
      
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/timeline">
          <TimeLine />
        </Route>
        <Route path="/" >
          Inicio....
        </Route>
      </Switch>
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
)
}

export default App;
import React from 'react'
import {address_server} from "./diverse.js"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.js'
import Chat from './Pages/Chat.js';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const App = () => {

  const [user, setUser] = useState(false);

  const [arNotifications, setArNotifications] = useState([
    // {type: 'succes', mes: 'OKOKOK'}, {type: 'danger'}, {type: 'warning'},
    // {type: 'succes'}, {type: 'danger'}, {type: 'warning'},
    // {type: 'succes'}, {type: 'danger'}, {type: 'warning'}

  ]);
  
  
  
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log(user);
      }else{
        setUser(false);
      } 

    });
  }, []);

 


  return (
    <div  >
      <Router>
        <Routes>
          <Route path='/'  
          element={<Home user={user} setUser={setUser} 
          arNotifications={arNotifications} setArNotifications={setArNotifications}
          />} />

          <Route path='/chat' 
          element={<Chat user={user} setUser={setUser}
          arNotifications={arNotifications} setArNotifications={setArNotifications}
          />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
import React from 'react'
import {address_server} from "./diverse.js"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.js'
import Chat from './Pages/Chat.js';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';


const App = () => {

  const [user, setUser] = useState(false);

  const [arNotifications, setArNotifications] = useState([
    // {type: 'succes', mes: 'OKOKOK'}, {type: 'danger'}, {type: 'warning'},
  ]);

  //////////////////////////////////////////////////

  function make_query(){
    console.log('se executa!!')
    // axios.post('http://localhost:4444/send_mes', {mesaj: 'Zi mi te rog mai multe detalii despre Olimpiada din Rio'}).then((data)=>{
    //   console.log(data);
    // })
    // https://test.bvb-reports.site/send_mes
    // http://localhost:4444/send_mes
    fetch(`https://test.bvb-reports.site/send_mes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "responseType": "stream"
      },
      body: JSON.stringify( {mesaj: 'Zi mi te rog mai multe detalii despre Olimpiada din Rio'})
    }).then((response)=>{

      let reader = response.body.getReader();
      const decoder = new TextDecoder();

      function readStream(){
        console.log('se executa!! recursivitatea---');
        reader.read().then(({done, value})=>{
          if(done){
            console.log('este gataaa')
          }else{
            let cuv =  decoder.decode(value, {stream: true});
            console.log(cuv, '----------');
            readStream();
          }
        });
      }
      readStream();
    })
  }


  //////////////////////////////////////////////////


  
  
  
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


      <buton
      style={{cursor: 'pointer'}}
       onClick={()=>{make_query()}} >ok</buton>
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
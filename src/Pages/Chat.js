import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import {address_server_ai} from '../diverse.js';
import {arObNameToken} from '../variables.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar.js';
import ChatInput from '../Components/ChatInput.js';
import {addParamInUrl, getParamFromUrl, deleteParamFromUrl} from '../diverse.js';
import Searchbar from '../Components/Searchbar.js';

const Chat = () => {

  const [input, setInput] = useState('');
  const [arMesaje, setArMesaje] = useState([]);
  const [company, setCompany] = useState(false);
  
  useEffect(()=>{
    const comp = getParamFromUrl("company");
    if(comp)setCompany(comp);
  }, [])



  function sendMes(){
    axios.post(`${address_server_ai}/send_mes`, {
      "context" : arMesaje.slice(-7),
      "intrebare": input, 
      "token": company
    }).then((data)=>{
      setArMesaje((prev)=> {return [...prev, 
        {type: 'intrebare', mes: input}, {type:"raspuns", mes: data.data}
      ]})
    }).catch((err)=>{
      console.log(err);
    })    
  }

  


  return (
    <div>
      {company ? 

      <div className='fullPage' >

        <div className='div_1' >
          <Navbar/>
        </div>


        <div className='div_2' >
          <div>
            {arMesaje.map((ob, index)=>{
              if(ob.type === 'intrebare'){
                return <div key={index} className="flex items-start gap-2.5 marginDreaptaCovAi justify-end">
                  <div className="flex  max-w-[400px]  p-4 border-gray-200 rounded-l-xl rounded-tr-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{ob.mes}</p>
                  </div>
                </div>
              }else{
                return <div key={index} className="flex items-start gap-2.5 marginStangaCovAi "> 
                  <div className="flex  max-w-[400px] p-4 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="whitespace-pre-wrap max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">{ob.mes}</p>   
                  </div>
                </div>
              }
            })}
          </div>
        </div>

        <div className='div_3' >
          <ChatInput sendMes={sendMes}  input={input} setInput={setInput} />
        </div>
      </div>
      
      
      
      :<div> 
        <Navbar/>
        <div className="min-h-full">
          

          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Searchbar  setCompany={setCompany} />
            </div>
          </main>
        </div>
      </div>} 
    </div>
  )
}

export default Chat
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import {address_server, address_server_ai} from '../diverse.js';
import Navbar from '../Components/Navbar.js';
import ChatInput from '../Components/ChatInput.js';
import {addParamInUrl, getParamFromUrl, deleteParamFromUrl} from '../diverse.js';
import Searchbar from '../Components/Searchbar.js';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../Components/Modal.js';

const Chat = (props) => {

  const [input, setInput] = useState('');
  const [arMesaje, setArMesaje] = useState([]);
  const [company, setCompany] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState({type:false});



  
  useEffect(()=>{
    const comp = getParamFromUrl("company");
    if(comp)setCompany(comp);

    const id_conv = getParamFromUrl("id_conv");
    if(props.user && id_conv && comp){
      getMessFromId_conv(id_conv, props.user.uid, comp);
    }
    
  }, [props.user]);


  function putDataInUrl(token, id_conv){
    addParamInUrl('company', token);
    setCompany(token);
    addParamInUrl('id_conv', id_conv)
  }


  function newChat(){
    setArMesaje([]);
    setCompany(false);
    deleteParamFromUrl('id_conv');
    deleteParamFromUrl('company');
  }


  function getMessFromId_conv(id_conversatie, uid, token){
    axios.post(`${address_server}/getMessFromId_conv`, {
      id_conversatie, uid, token
    }).then((data)=>{
      let ar = data.data.data;
      let arNou  = ar.map((ob)=>{return {type: ob.tip_mesaj, mes:ob.mesaj}})
      setArMesaje([...arNou]);
    })
  }


  function create_and_add_idconv(){
    const id_conv = uuidv4().slice(0 , 10);
    addParamInUrl("id_conv", id_conv);
    return id_conv;
  };

  function add_conv_in_db(uid, id_conv, token){
    console.log( uid, id_conv, token);
    axios.post(`${address_server}/add_conv_in_db`, {
      uid, id_conv, token
    }).then((data)=>{
      // console.log(data.data);
    })
  }

  function add_mess_in_db(obQuesAndAnsw){
    axios.post(`${address_server}/add_mess_in_db`, {
      obQuesAndAnsw
    }).then((data)=>{
      // console.log(data.data);
    })
  }

  function sendMes(){
    axios.post(`${address_server_ai}/send_mes`, {
      "context" : arMesaje.slice(-7),
      "intrebare": input, 
      "token": company
    }).then((data)=>{
      let id_conv = '';
      
      if(props.user){
        if(!getParamFromUrl("id_conv")){
          id_conv = create_and_add_idconv();
          add_conv_in_db(props.user.uid, id_conv, company);
        }else{
          id_conv = getParamFromUrl("id_conv");
        }

        console.log(props.user, 'se adauga in db ')
        add_mess_in_db({
            question: {mesaj: input, tip_mesaj:"intrebare", uid: props.user.uid, id_conversatie: id_conv, token: company},
            answer: {mesaj: data.data, tip_mesaj: 'raspuns', uid: props.user.uid, id_conversatie: id_conv, token: company}
        })
      }

      setArMesaje((prev)=> {return [...prev, 
        {type: 'intrebare', mes: input}, {type:"raspuns", mes: data.data}
      ]})
    }).catch((err)=>{
      console.log(err);
    })    
  }

  
  return (
    <div>

      <Modal  modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
        user={props.user} putDataInUrl={putDataInUrl}
        getMessFromId_conv={getMessFromId_conv}
      />

      {/* The page =>>>>  */}


    {company ? 

      <div className='fullPage' >

        <div className='div_1' >
          <Navbar user={props.user} setUser={props.setUser}
          modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
          newChat={newChat}
          />
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
      <Navbar user={props.user} setUser={props.setUser} 
          modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
          newChat={newChat}
      />
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


// trebuie sa fac cumva sa ii arat mereu care este compania cu care vorbeste
// <== fac asta sa ii arat in stanga sus unde e poza
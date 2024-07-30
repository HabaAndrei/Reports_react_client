import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import {address_server, address_server_ai} from '../diverse.js';
import Navbar from '../Components/Navbar.js';
import ChatInput from '../Components/ChatInput.js';
import {addParamInUrl, getParamFromUrl, deleteParamFromUrl, deruleazaInJos} from '../diverse.js';
import Searchbar from '../Components/Searchbar.js';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../Components/Modal.js';
import {arObNameToken} from '../variables.js'

const Chat = (props) => {

  const [input, setInput] = useState('');
  const [arMesaje, setArMesaje] = useState([]);
  const [company, setCompany] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState({type:false});
  const [numeCompanie, setNumeCompanie] = useState(false);
  const [isLoading, setIsLoanding] = useState(false);

  useEffect(()=>{
    if(!company)return;
    arObNameToken.forEach((ob)=>{
      if(ob.token === company){setNumeCompanie(ob.nume);  return; }
    })
  }, [company]);

  useEffect(()=>{
    if(arMesaje.length)deruleazaInJos('scrollJos');
  }, [arMesaje])


  
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
    if(isLoading)return;

    let input_var = input;
    setInput('');
    setIsLoanding(true);



    setArMesaje((prev)=>{
      return [...prev, {type: 'intrebare', mes: input_var}, {type: 'loading'}]
    })
    axios.post(`${address_server_ai}/send_mes`, {
      "context" : arMesaje.slice(-7),
      "intrebare": input_var, 
      "token": company
    }).then((data)=>{
      setIsLoanding(false);
      let id_conv = '';
      if(props.user){
        if(!getParamFromUrl("id_conv")){
          id_conv = create_and_add_idconv();
          add_conv_in_db(props.user.uid, id_conv, company);
        }else{
          id_conv = getParamFromUrl("id_conv");
        }

        add_mess_in_db({
            question: {mesaj: input_var, tip_mesaj:"intrebare", uid: props.user.uid, id_conversatie: id_conv, token: company},
            answer: {mesaj: data.data, tip_mesaj: 'raspuns', uid: props.user.uid, id_conversatie: id_conv, token: company}
        })
      }

      setArMesaje((prev)=> {
        let arNou = [];
        prev.forEach((ob)=>{
          if(ob.type === 'loading'){arNou.push({type:'raspuns', mes: data.data}); return};
          arNou.push({type: ob.type, mes: ob.mes});
        })
        return [...arNou]});
    }).catch((err)=>{
      console.log(err);
    })    
  }

  
  return (
    <div>

      <Modal  modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
        user={props.user} putDataInUrl={putDataInUrl} 
        getMessFromId_conv={getMessFromId_conv}
        setArMesaje={setArMesaje}
        setCompany={setCompany}
      />

      {/* The page =>>>>  */}


    {company ? 

      <div className='fullPage' >

        <div className='div_1' >
          <Navbar user={props.user} setUser={props.setUser}
          modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
          />
        </div>


        <div className='div_2' id='scrollJos'>
          <div className='divNume' >
            <p>Simbol: {company}{' - '} Nume: {numeCompanie}</p>  
          </div>
          <div className='divMesaje' >
            {arMesaje.map((ob, index)=>{
              if(ob.type === 'intrebare'){
                return <div key={index} className="flex items-start gap-2.5 marginDreaptaCovAi justify-end">
                  <div className="flex  max-w-[800px]  p-4 border-gray-200 rounded-l-xl rounded-tr-xl dark:bg-gray-700">
                    <p className="text font-normal py-2.5 text-gray-800 max-w-xl dark:text-white">{ob.mes}</p>
                  </div>
                </div>
              }else if(ob.type === 'loading'){
                return <div key={index}  className="flex items-start gap-2.5 marginStangaCovAi ">
                  <div className="flex  max-w-[800px] p-4 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                  </div>
                </div>
              }else{
                return <div key={index}  className="flex items-start gap-2.5 marginStangaCovAi "> 
                  <div className="flex  max-w-[800px] p-4 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="whitespace-pre-wrap max-w-xl space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">{ob.mes}</p>   
                  </div>
                </div>
              }
            })}
          </div>
        </div>

        <div className='div_3' >
          <ChatInput sendMes={sendMes}  input={input} setInput={setInput} newChat={newChat}/>
        </div>
      </div>
      
      
      
    :<div> 
      <Navbar user={props.user} setUser={props.setUser} 
          modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
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



// adaug titlul sus si il pun pe centru in linie
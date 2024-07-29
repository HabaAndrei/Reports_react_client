import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios';
import { address_server, deleteChat } from '../diverse';
import {createAccount, deleteAccount, sign_out} from '../Firebase.js';
import {ReactComponent as Google} from '../icons/google.svg';
import {ReactComponent as Trash} from '../icons/trash.svg';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'



const Modal = (props) => {


    const [arConv, setArConv] = useState([]);

    useEffect(()=>{
        if(!props.modalIsOpen.type)return;

        // {type:true, data:{
        //     request: 'getAllConversations',
        //     uid: props.user.uid
        //   }}

        if(props.modalIsOpen?.data?.request === 'getAllConversations'){
            const uid = props.modalIsOpen?.data?.uid;
            getAllConversations(uid);
        }else if(props.modalIsOpen?.data?.request === "getDataUser"){
            // console.log(props.modalIsOpen?.data)
        }else if(props.modalIsOpen?.data?.request === 'deleteConv'){
            console.log(props.modalIsOpen?.data);
        }

    }, [props.modalIsOpen]);


    async function connect_with_google(){
        let rez = await createAccount();
        if(rez.type){
            props.modalIsOpen?.data['props.setUser'](rez.user)
        };

    }

    async function deleteAcc(){
        let rez = await deleteAccount(props.modalIsOpen?.data['props.user']);
        if(rez.type)props.modalIsOpen?.data['props.setUser'](false);
    }

    async function log_out(){
        let rez = await sign_out();
        if(rez.type)props.modalIsOpen?.data['props.setUser'](false);

    }

    function getAllConversations(uid){
        axios.post(`${address_server}/getAllConversations`, {uid}).then((data)=>{
            if(data.data.type){
                setArConv(data.data.data)
            }
        })
    }

    return (
        <div>
            <Dialog open={props.modalIsOpen.type} onClose={()=>props.setModalIsOpen({type:false})} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                
                                {props.modalIsOpen?.data?.request === 'getAllConversations' &&
                                <ul
                                className="mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                >
                                    {arConv.map((ob, index)=>{
                                        return <li
                                        
                                        className="p-2  flex justify-between"
                                        key={index}
                                        >
                                            <span 
                                            style={{fontSize: '14px', fontWeight: 'bold'}}
                                            className='hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'
                                            onClick={()=>{
                                                props.getMessFromId_conv(ob.id_conversatie, props.user.uid, ob.token);
                                                props.putDataInUrl(ob.token, ob.id_conversatie);
                                            }}
                                            >{ob.mesaj.slice(0, 15)}</span> -
                                            
                                            <span style={{fontSize: '14px', fontWeight: 'bold'}}>
                                                {ob.token}
                                            </span> 

                                            <span className='hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'
                                            onClick={()=>{
                                                props.setModalIsOpen(
                                                    {type:true, data:{
                                                        request: 'deleteConv',
                                                        uid: props.user.uid,
                                                        id_conversatie: ob.id_conversatie,
                                                        token: ob.token,
                                                        mesaj: ob.mesaj.slice(0, 15)
                                                    }})
                                            }} ><Trash/></span>
                                        </li>
                                    })}
                                </ul>
                                }

                                {props.modalIsOpen?.data?.request === "getDataUser" && 
                                <div>
                                    {props.user ? 
                                        <ul
                                        className="mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <li
                                            onClick={()=>log_out()}
                                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex justify-between"
                                            >
                                                Deconecteaza-te 
                                    
                                            </li>
                                            <li
                                            onClick={()=>deleteAcc()}
                                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex justify-between"
                                            >
                                                Sterge contul 
                                    
                                            </li>

                                        </ul>
                                        :<ul
                                        className="mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <li
                                            onClick={()=>connect_with_google()}
                                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex justify-between"
                                            >
                                                <span>Conecteaza-te cu google</span>
                                                <span> <Google/> </span> 
                                            </li>
                                        </ul>
                                    }
                                </div>
                                }

                                {props.modalIsOpen?.data?.request === 'deleteConv' && 
                                <div>
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                    <p>Esti sigur ca vrei sa stergi conversatia?</p>
                                    <p>{props.modalIsOpen?.data?.mesaj} - {props.modalIsOpen?.data?.token}</p>
                                    <button style={{fontSize: '15px', fontWeight:'bold', cursion: 'pointer'}} 
                                    onClick={()=>{
                                        deleteChat(props.modalIsOpen?.data?.uid, props.modalIsOpen?.data?.id_conversatie);
                                        props.setModalIsOpen({type: false});
                                    }}
                                    >Da</button>
                                </div>
                                }
                            </div>
                            
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Modal
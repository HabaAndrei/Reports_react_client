import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios';
import { address_server } from '../diverse';


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
        }

    }, [props.modalIsOpen]);

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
                                
                                {props.modalIsOpen?.data?.request === 'getAllConversations' ?
                                <ul
                                className="mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                >
                                    {arConv.map((ob, index)=>{
                                        return <li
                                        onClick={()=>{
                                            props.getMessFromId_conv(ob.id_conversatie, props.user.uid, ob.token);
                                            props.putDataInUrl(ob.token, ob.id_conversatie);
                                        }}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex justify-between"
                                        key={index}
                                        >
                                            <span>{ob.mesaj.slice(0, 15)}</span>
                                            
                                            <span>{ob.token}</span>
                                        </li>
                                    })}
                                </ul> : <p></p>
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
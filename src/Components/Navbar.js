import React, { useEffect } from 'react'
import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';


const Navbar = (props) => {

  const navigate = useNavigate();



  const [navigation, setNavigation] = useState([
    { name: 'Acasa', href: '/'},
    { name: 'Chat', href: '/chat'},
    {name: 'Contul meu'}
  ])

  useEffect(()=>{

    if(!props.user){
      setNavigation((prev)=>{
        let arObNou = [];
        prev.forEach((ob)=>{
          if(ob.name === 'Conversatii')return;
          arObNou.push(ob);
        })
        return [...arObNou];
      })
  
    }else{
      setNavigation((prev)=>{
        let arObNou = [];
        prev.forEach((ob)=>{
          if(ob.name === 'Conversatii' 
          )return;
          arObNou.push(ob);
        })
        return [...arObNou,{name: "Conversatii"} ];
      })
    }

  }, [props.user]);


 
  


  return (

    
    <Disclosure as="nav" className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              alt="Your Company"
              src="../logo.jpg"
              className="h-8 w-8"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item, index) => {
                if(item.name === 'Conversatii'){
                  return <button
                    onClick={()=>{
                      if(!props.setModalIsOpen)return;
                      props.setModalIsOpen({type:true, data:{
                        request: 'getAllConversations',
                        uid: props.user.uid
                      }})
                    }}
                    key={index}
                    className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                  >
                  {item.name} 
                  </button>
                }else if(item.name === 'Contul meu'){
                  return <button
                  onClick={()=>{
                    
                    if(!props.setModalIsOpen)return;
                    props.setModalIsOpen({type:true, data:{
                      request: 'getDataUser',
                      'props.user' : props.user,
                      "props.setUser" : props.setUser 
                    }})
                  }}
                    key={index}
                    className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                  >
                  {item.name} 
                  </button>
                }else{
                  return <button
                    onClick={()=>navigate(item.href)}
                    key={index}
                    className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                  >
                  {item.name}
                  </button>
                }
              })}
            </div>
          </div>
        </div>
        
        <div className="-mr-2 flex md:hidden">
          {/* Mobile menu button */}
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item, index) => {                
          if(item.name === 'Conversatii'){

            return <button
              onClick={()=>{
                if(!props.setModalIsOpen)return;
                props.setModalIsOpen({type:true, data:{
                  request: 'getAllConversations',
                  uid: props.user.uid
                }})
              }}
              key={index}
              className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
            >
            {item.name} 
            </button>
          
          }else if(item.name === 'Contul meu'){
            
            return <button
            onClick={()=>{
              if(!props.setModalIsOpen)return;
              props.setModalIsOpen({type:true, data:{
                request: 'getDataUser',
                'props.user' : props.user,
                "props.setUser" : props.setUser
              }})
            }}
              key={index}
              className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
            >
            {item.name} 
            </button>
          
          
          }else{
            return <DisclosureButton
              onClick={()=>navigate(item.href)}
              key={index}
              className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
            >
            {item.name}
            </DisclosureButton>

          }
        })}
      </div>
      
    </DisclosurePanel>
  </Disclosure>


  )
}

export default Navbar;




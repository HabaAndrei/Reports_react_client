import React, { useEffect } from 'react'
import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import { createAccount, deleteAccount, sign_out} from '../Firebase.js';



const Navbar = (props) => {

  const navigate = useNavigate();


  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/'},
    { name: 'Chat', href: '/chat'},
  ])

  useEffect(()=>{


    if(!props.user){
      setNavigation((prev)=>{
        let arObNou = [];
        prev.forEach((ob)=>{
          if(ob.name === 'Log out' || ob.name === 'Connect with google')return;
          arObNou.push(ob);
        })
        return [...arObNou, {name: 'Connect with google'}];
      })
  
    }else{
      setNavigation((prev)=>{
        let arObNou = [];
        prev.forEach((ob)=>{
          if(ob.name === 'Connect with google' || ob.name === 'Log out')return;
          arObNou.push(ob);
        })
        return [...arObNou, {name: "Log out"}];
      })
    }
  }, [props.user]);

  

  async function log_out(){
    let rez = await sign_out();
    if(rez.type)props.setUser(false);
  }  
  
  async function create_accout(){
    let rez = await createAccount();
    if(rez)props.setUser(rez.user);
  }

  return (

    
  <Disclosure as="nav" className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-8"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item, index) => {
                
                if(item.name === "Connect with google"){
                  return <button
                  onClick={()=>{create_accout()}}
                  key={index}
                  className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                  >
                  {item.name}
                  </button>
                }else if(item.name === 'Log out'){
                  return <button
                    onClick={()=>{log_out()}}
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
          if(item.name === "Connect with google"){
            return <DisclosureButton
            onClick={()=>{create_accout()}}
            key={index}
            className={'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}
            >
            {item.name}
            </DisclosureButton>
          }else if(item.name === 'Log out'){
            return <button
              onClick={()=>{log_out()}}
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
      
    </DisclosurePanel>
  </Disclosure>


  )
}

export default Navbar;




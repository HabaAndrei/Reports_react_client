import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar.js';
import Searchbar from '../Components/Searchbar.js';
import {    createAccount, deleteAccount, sign_out} from '../Firebase.js';


const Home = (props) => {


  async function create(){
    let rez = await  createAccount();
    console.log(rez);

  } 

  async function ok(){
    let rez  = await deleteAccount();
    console.log(rez);
  } 
  
  async function sign_out__(){
    let rez = sign_out();
    console.log(rez);
  }

  
  return (
    <div>

      <Navbar/>
      <div className="min-h-full">
        

        <main>
          
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Searchbar/>
          </div>
        </main>
      </div>

      
      <button onClick={create} >CREATE</button>
      <br/>

      <button onClick={ok}> STERGE</button>
       <br/>
       <button onClick={sign_out__} >SIGN OUT</button>
       <br/>
    </div>
  )
}

export default Home





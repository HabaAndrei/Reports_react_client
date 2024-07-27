import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar.js';
import Searchbar from '../Components/Searchbar.js';

const Home = (props) => {
  
  return (
    <div>

      <Navbar  user={props.user} setUser={props.setUser} />
      <div className="min-h-full">
        

        <main>
          
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Searchbar  />
          </div>
        </main>
      </div>


    </div>
  )
}

export default Home





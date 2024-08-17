import React from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar.js';
import Searchbar from '../Components/Searchbar.js';
import Modal from '../Components/Modal.js';
import Notification from '../Components/Notification.js';

const Home = (props) => {
  
  const [modalIsOpen, setModalIsOpen] = useState({type:false});
  
  return (
    <div>

      <div>
        <Notification  arNotifications={props.arNotifications} setArNotifications={props.setArNotifications} />
      </div>


      <Modal  modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
        user={props.user}
        arNotifications={props.arNotifications} setArNotifications={props.setArNotifications}
      />

      <Navbar  user={props.user} setUser={props.setUser} 
        modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
        arNotifications={props.arNotifications} setArNotifications={props.setArNotifications}
      />
      <div className="min-h-full">
        

        <main>
          
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Searchbar  />
          </div>
        </main>
      </div>


      <div>
        <div  style={{ "padding": '20px'}} className="flex justify-start" >
          
          <a className="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BVB Reports</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Această platformă oferă toate detaliile pe care ți le dorești dintr-un raport anual (ex. anul 2023) despre toate companiile de pe Bursa de Valori București (companiile care sunt listate pe bursă).</p>
          <p className="font-normal text-gray-700 dark:text-gray-400">Un raport anual conține între 100 și 400 de pagini, iar noi am sumarizat informațiile pentru a-ți răspunde rapid la orice întrebare și pentru a-ți clarifica nelămuririle.</p>
          </a>

        </div>


        <div style={{'padding': '20px'}}  className="flex justify-end" >
          
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inteligenta Artificiala</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
          Pentru a oferi informații rapide din rapoartele companiilor listate pe Bursa de Valori București, am implementat un sistem în care folosim inteligența artificială pentru a ne ajuta să oferim răspunsuri exacte.</p>
          </a>

        </div>

        <div  style={{ "padding": '20px'}} className="flex justify-start">
          
          <a className="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">-----------------</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Alege o companie despre care dorești să afli mai multe detalii și adaugă întrebarea specifică.</p>
          <p  className="font-normal text-gray-700 dark:text-gray-400">Compania noastră oferă acest serviciu pentru a ajuta oamenii să economisească timp prețios, găsind instant informațiile de care au nevoie, fără a mai căuta în detalii extinse.</p>
          </a>

        </div>


      </div>



    </div>
  )
}

export default Home





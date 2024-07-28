import React from 'react'
import {arObNameToken} from '../variables.js';
import { useState, useEffect } from 'react';
import Fuse from "fuse.js";
import { useNavigate } from 'react-router-dom';


const Searchbar = (props) => {
    
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const options = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.2,
        keys: ["nume", "token"]
      }
    const fuse = new Fuse(arObNameToken, options);



    return (
    <div>
        
        <div style={{"maxWidth": "600px", "marginLeft": "auto","marginRight": "auto", "marginTop": "50px"}} >
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                    onChange={(e)=>{
                        if(e.target.value.length === 0){setSearchResults([]); return };
                        const results = fuse.search(e.target.value);
                        const items = results.map((result) => result.item);
                        setSearchResults(items.slice(0, 5));
                    }}
                
                type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
            <ul 
            className="mt-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
                
                {searchResults.map((ob, index)=>{
                    
                    return <li key={index} 
                    onClick={()=>{
                        navigate(`/chat?company=${ob.token}`)
                        if(props.setCompany){
                            props.setCompany(ob.token);
                        }
                    }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex justify-between">
                        <span>{ob.nume}</span>
                        <span>{ob.token}</span>
                    </li>
                })}
                
            </ul>
        </div>
    </div>
  )
}

export default Searchbar
import React from 'react'
import {ReactComponent as Plus} from '../icons/plus.svg';
const ChatInput = (props) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Plus onClick={props.newChat} style={{"cursor":  "pointer"}} />
        <div style={{"maxWidth": "600px", "width": '100%'}} >
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea 
                onChange={(e)=>props.setInput(e.target.value)}
                value={props.input}
                
                id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                <button 
                onClick={()=>{props.sendMes()}}
                type="submit" className="inline-flex  p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                </button>
            </div>
        </div>

    </div>
  )
}

export default ChatInput


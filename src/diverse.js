import axios from 'axios';


const address_server = process.env.REACT_APP_ADDRESS_SERVER;
const address_server_ai = process.env.REACT_APP_ADDRESS_SERVER_AI;

////////////////////////////////////////////////////////
function addParamInUrl(nameParam, valueParam){
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(nameParam, valueParam);
    window.history.pushState(null, '', `${window.location.pathname}?${urlParams}`);  
}

function getParamFromUrl(nameParam){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nameParam);
}
function deleteParamFromUrl(nameParam){
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(nameParam);
    window.history.pushState(null, '', `${window.location.pathname}?${urlParams}`);
}


////////////////////////////////////////////
function deruleazaInJos(id){
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  
};

///////////////////////////////////////////////////

function deleteChat(uid, id_conversatie){
    if(!uid || !id_conversatie)return;
    axios.post(`${address_server}/deleteChat`, {uid, id_conversatie}).then((data)=>{
    //   console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
  }

async function get_ip_address(){

    try{
        let rez = await axios.get('https://api.ipify.org?format=json')
        let ip = rez?.data?.ip;
        if(ip)return ip
        else return null
    }catch(err){
        console.log(err);
    }
    
}

async function manage_question_FU(ip){
    try{
        let rez = await axios.post(`${address_server}/manage_question_FU`, {ip})
        return rez.data?.data?.[0]?.manage_question ;
    }catch(err){
        console.log(err);
    }
}

function addNotification(func, type, mes){
    func((prev)=>{
        return [...prev, {type, mes}];
    })
}

export {address_server, address_server_ai, 
    addParamInUrl, getParamFromUrl, deleteParamFromUrl,
    deruleazaInJos, deleteChat,
    get_ip_address, manage_question_FU, addNotification
}
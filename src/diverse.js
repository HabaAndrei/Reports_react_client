

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


///////////////////////////////////////////////////

//Fac o functei care face o noua conversatie!!!!!!!!

////////////////////////////////////////////////////


export {address_server, address_server_ai, 
    addParamInUrl, getParamFromUrl, deleteParamFromUrl,
}
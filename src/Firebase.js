import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, deleteUser } from "firebase/auth";
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};

initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

async function createAccount(){
    

    try{
        const result = await  signInWithPopup(auth, provider);
        const user = result.user;
        const {uid, email , displayName} = user;
        return {type: true, data: {uid, email , displayName}, user: user};
    }catch(err){
        return {type: false, err: err};
    }
  
}



async function sign_out(){
    try{
        await signOut(auth);
        return {type: true};
    }catch(err){
        return {type: false, err: err};
    }
}


async function deleteAccount(user){
    try{
        await deleteUser(user);
        return {type: true};
    }catch(err){
        return {type: false, err: err};
    }   
}

//////////////////////////////

async function idTokenFirebase(){

    try{
        let token = await getAuth().currentUser.getIdToken(true);
        if(token){
            return {type:true, token: token}
        }else{
            return {type: false}
        }
    }catch(err){
        return {type: false, err: err};
    }
}

//////////////////////////////

export {
    createAccount, deleteAccount, sign_out,
    idTokenFirebase
}
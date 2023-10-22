import { useState, useEffect } from 'react'
import { auth, fs } from '../config/Config'

export const GetUserUid = () => {
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
    return uid;
};

export const GetCurrentUser = () => {
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().Name);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
};
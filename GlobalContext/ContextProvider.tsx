'use client'
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'

interface ContextProviderProps{
    currentUser : User | null,
}


const StateContext = createContext<ContextProviderProps>({
    currentUser : null,
});


const ContextProvider = ({children}:{children:React.ReactNode}) => {
    

    const pathname = usePathname();
    const router = useRouter();

    const [currentUser,setCurrentUser] = useState<User | null>(null);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            if(user){
                if(pathname.includes('/sign-in') || pathname.includes('/sign-up')){
                    router.replace('/');
                }else{
                    return;
                }
            }else{
                if(pathname.includes('/sign-in') || pathname.includes('/sign-up')){
                    return;
                }else{
                    router.replace('/sign-in');
                }
            }
        });
    },[pathname]);

  return (
    <StateContext.Provider value={{
        currentUser
    }}>
        {children}
    </StateContext.Provider>
  )
}

export default ContextProvider

export const useStateContext = () => useContext(StateContext);
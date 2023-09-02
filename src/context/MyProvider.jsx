import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react"
import { auth } from "../firebase";
import { useEffect } from "react";

export const AuthContext = createContext(null);

export default function MyProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currUser, setCurrUser] = useState({displayName:"", uid:""})
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.displayName && user.uid) {
                setCurrUser({displayName: user.displayName, uid: user.uid});
                setIsLoggedIn(true);
            }
            else {
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value = {{isLoggedIn, setIsLoggedIn, isLoading, currUser}}>
            {children}
        </AuthContext.Provider>
    )
}
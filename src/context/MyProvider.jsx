import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react"
import { auth } from "../firebase";

export const AuthContext = createContext(null);

export default function MyProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoading(false);
        }
    });

    return (
        <AuthContext.Provider value = {{isLoggedIn, setIsLoggedIn, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
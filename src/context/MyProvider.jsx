import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react"
import { auth } from "../firebase";

export const AuthContext = createContext(null);

export default function MyProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
        }
    });

    return (
        <AuthContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}
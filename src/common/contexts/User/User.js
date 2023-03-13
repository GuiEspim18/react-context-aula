import { createContext, useState } from "react";

export const UserContext = createContext();

// dando nome ao nosso contexto
UserContext.displayName = "UserContext"

export const UserProider = ({ children }) => {
    const [name, setName] = useState('')
    const [balance, setBalance] = useState(0)

    return (
        <UserContext.Provider value={{name, setName, balance, setBalance}}>
            {children}
        </UserContext.Provider>
    );
}
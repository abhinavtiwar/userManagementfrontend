import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children, startupUser,investorUser}) => {

    
    const [startupLoggedin, setStartupLoggedin] = useState(Boolean(startupUser));

    const [investorLoggedin, setInvestorLoggedin] = useState(Boolean(investorUser));

    return <UserContext.Provider value={{
        startupLoggedin,
        setStartupLoggedin,
        investorLoggedin,
        setInvestorLoggedin
    }} >
        {children}
    </UserContext.Provider>
}
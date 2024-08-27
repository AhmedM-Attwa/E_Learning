import { createContext, useContext, useState } from "react";
export const UserContext = createContext();
const SignContext = ({children}) => {
  const [isMember, setIsMember] = useState(false);
  return <UserContext.Provider value={{isMember , setIsMember}}>
    {children}
  </UserContext.Provider>
}
export const userGlobalContext = () => useContext(UserContext)
export default SignContext;
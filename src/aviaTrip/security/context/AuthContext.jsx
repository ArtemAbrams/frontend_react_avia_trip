import {createContext, useContext, useEffect, useState} from "react";
import {loginController} from "../../uriRequest/URlCountryController";
import Interceptor from "../authenticationcomponent/interceptorRequest";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export default function AuthProvider({ children }) {


    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [roles, setRoles] = useState(null);
    useEffect(() => {
        console.log(roles)
    }, [roles]);
    async function login(username, password) {
        const loginData = {
            email: username,
            password: password
        };
        try {
            const response = await loginController(loginData)
            const a = response.data.token;
            if(response.status===200){
                setAuthenticated(true);
                setUsername(username);
                setRoles(response.data.roleDTOList);
                Interceptor(a);
                return true;
            }
            else {
                setAuthenticated(false);
                setUsername(null);
                return false;
            }
        }
        catch (error)
        {
            setAuthenticated(false);
            setUsername(null);
            return false;
        }

    }
    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
        Interceptor(null);
    }
    return(
      <AuthContext.Provider value={ { isAuthenticated,
          setAuthenticated,
          login,
          logout,
          username,
          roles} }>
          {children}
      </AuthContext.Provider>
    )
}
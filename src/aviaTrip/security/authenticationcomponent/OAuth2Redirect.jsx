import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Interceptor from "./interceptorRequest";
import { useState, useEffect } from "react"; 

export default function OAuth2Redirect() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function authenticate() {
            try {
                const tokenFromUrl = await getParameterFromUrl("token");

                if (tokenFromUrl) {
                    auth.setAuthenticated(true);
                    Interceptor(tokenFromUrl);
                    navigate(`/welcome/user`);
                } else {
                    console.log(tokenFromUrl);
                    navigate("/");
                }
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        }
        authenticate();
    }, [auth, navigate]);

    async function getParameterFromUrl(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        const results = regex.exec(window.location.search);
        return results === null ? "" : results[1];
    }

    return null;
}






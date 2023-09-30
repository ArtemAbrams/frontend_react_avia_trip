import {useAuth} from "../context/AuthContext";

export default function Logout(){
    const auth = useAuth();
    return(
        <div>
            {
                auth.logout()
            }
        </div>
    )
}
import {useState} from "react";
import './Login.css'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import LoginGoogle from "./GoogleComponent";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

export default  function Login (){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const auth = useAuth();
    function handleUsername(event){
        setUsername(event.target.value)
    }
    function handlePassword(event){
        setPassword(event.target.value)
    }
    async function handleSubmit(){
       if(await auth.login(username, password)){
           auth.setAuthenticated(true);
           navigate(`/welcome/${username}`);
       }
       else {
           auth.setAuthenticated(false);
       }
    }
    function SuccessSubmit(){
        if(auth.isAuthenticated){
            return <div> You are authenticated </div>
        }
         return null
    }
    function FailedSubmit(){
        if(auth.isAuthenticated) {
            return <div>
                You are not authenticated
            </div>
        }

        return null
    }

    return (
      <div className="Login">
          <SuccessSubmit />
          <FailedSubmit />
          <div className="LoginForm">
              <div>
                  <label> User Name </label>
                  <input type="text" name="username" onChange={handleUsername}/>
              </div>
              <div>
                  <label> Password </label>
                  <input type="password" name="password" onChange={handlePassword}/>
              </div>
              <div>
                  <button type="button" onClick={handleSubmit}> Login </button>
              </div>
              <div>
                 <LoginGoogle />
              </div>
              <div>
                  <GoogleOAuthProvider clientId="806640123815-je0i6607n6v0trrkcd6gv1onqlmmvcl2.apps.googleusercontent.com">
                      <GoogleLogin
                          onSuccess={credentialResponse => {
                              console.log(credentialResponse.credential);
                          }}
                          onError={() => {
                              console.log('Login Failed');
                          }}
                      />;
                  </GoogleOAuthProvider>
              </div>
          </div>
      </div>
    );
}
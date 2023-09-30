import googleLogo from "./google-logo.png"
import "./Login.css"
export default function LoginGoogle () {
   function SampleLogin () {
            return (
                <div className="social-login">
                    <a className="btn btn-block social-btn google" href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect">
                        <img src={googleLogo} alt="Google" /> Log in with Google
                    </a>
                </div>
            );
    }
        return (
            <div className="login-container">
                    <SampleLogin />
            </div>
        );
    }

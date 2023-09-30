import {Link} from "react-router-dom";
import {AuthContext, useAuth} from "../security/context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Header(){
    const auth = useAuth();
    const authenticated = auth.isAuthenticated;
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                       <a className="navbar-brand ms-2 fs-2 fw-bold text-black" >Artem</a>
                        <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {authenticated && <Link className="nav-link" to="/countries">Countries</Link> }
                            </li>
                            <li className="nav-item">
                                {authenticated && <Link className="nav-link" to="/welcome/Artem">Hello</Link> }
                            </li>
                        </ul>
                        </div>
                        <ul className="navbar-brand">
                            {!authenticated && <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>}
                            {authenticated && <li className="nav-item">
                                  <Link className="nav-link" to="/logout">Logout</Link>
                            </li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./aviaTrip/security/authenticationcomponent/Login";
import Welcome from "./aviaTrip/MainComponent/WelcomeComponent";
import NotFoundComponent from "./aviaTrip/error/NotFoundComponent";
import Countries from "./aviaTrip/country/CountriesList";
import Header from "./aviaTrip/MainComponent/HeaderComponent";
import Footer from "./aviaTrip/MainComponent/FooterComponent";
import Logout from "./aviaTrip/security/authenticationcomponent/logout";
import AuthProvider, {useAuth} from "./aviaTrip/security/context/AuthContext";
import CountryComponent from "./aviaTrip/country/CountryComponent";
import OAuth2Redirect from "./aviaTrip/security/authenticationcomponent/OAuth2Redirect";
import CreateCountry from "./aviaTrip/country/CreateCountry";
function App() {

  function AuthenticatedRoute({ children }){
    const auth = useAuth();
    if(auth.isAuthenticated){
      return children;
    }
    return <Navigate to="/" />
  }
  function Role({children}){
    const auth = useAuth();
    const roles = auth.roles;
    const isAdmin = roles.some(role => role === 'Admin');
    return isAdmin ? children : null;
  }
  return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Login />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path="/oauth2/redirect" element={<OAuth2Redirect />}></Route>
              <Route path='/welcome/:username' element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }></Route>
              <Route path='/countries/' element={
                <AuthenticatedRoute>
                    <Countries />
                </AuthenticatedRoute>
              }></Route>
              <Route path='/createCountry/' element={
                <AuthenticatedRoute>
                  <Role>
                     <CreateCountry />
                  </Role>
                </AuthenticatedRoute>
              }></Route>
              <Route path='/update/:id' element={
                <AuthenticatedRoute>
                  <Role>
                     <CountryComponent />
                  </Role>
                </AuthenticatedRoute>
              }></Route>
              <Route path='/logout' element={
                <AuthenticatedRoute>
                  <Logout />
                </AuthenticatedRoute>
              }></Route>
              <Route path='*' element={<NotFoundComponent />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
  );
}

export default App;

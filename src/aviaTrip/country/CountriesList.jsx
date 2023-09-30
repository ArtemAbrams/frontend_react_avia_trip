import './style/countriesList.css'
import {countryToDelete} from "../uriRequest/URlCountryController";
import {useNavigate} from "react-router-dom";
import {apiClient} from "../uriRequest/apiClient";
import {useEffect, useState} from "react";
import {useAuth} from "../security/context/AuthContext";


export default function Countries(){
    const [countries, setCountries] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();
    const isAdmin = auth.roles.some(role => role === 'Admin');
    useEffect(
        () => getCountries()
    )
    function getCountries(){
         apiClient.get("http://localhost:8080/country/getAll")
            .then((response) => Success(response))
            .catch((error) => Error(error))
    }
    function Success(response){
        console.log(response.data)
        setCountries(response.data);
        setErrorMessage(null);
    }
    function Error(error){
        setErrorMessage(error.response.data);
    }
    const [deleteCountryErrorMessage, setDeleteCountryErrorMessage] = useState(null)
    function ErrorDeleteCountry(error){
        console.log(error);
        setDeleteCountryErrorMessage(error)

    }
    function SuccessDeleteCountry(error){
        console.log(error);
        setDeleteCountryErrorMessage(null)

    }
    function Delete(id){
        countryToDelete(id)
            .then(() => SuccessDeleteCountry())
            .catch((error) => ErrorDeleteCountry(error.response.data))
    }
    function Update(id){
        console.log("I am here " + id)
        navigate(`/update/${id}`)
    }
    function Create(){
        navigate('/createCountry')
    }
    return(
        <div>
            {errorMessage && <div className="error-message"> {errorMessage} </div>}
            {deleteCountryErrorMessage && <div className="error-message"> {deleteCountryErrorMessage} </div>}
            {isAdmin &&
                <button className="btn btn-success m-4" onClick={() => Create()}> Create </button>}
        <div className="card-list">
            {countries.map((e) => (
                <div className="card" key={e.id}>
                    <p>Name: {e.name}</p>
                    <img src={"data:image/jpeg;base64," + e.file} alt="image.png" />
                    <div>
                        {isAdmin && <button className="btn btn-warning m-4" onClick={() => Delete(e.id)}> Delete </button>}
                        {isAdmin &&  <button className="btn btn-success m-4" onClick={() =>Update(e.id)}> Update </button>}
                    </div>
                </div>
            ))}
         </div>
        </div>
    )
}
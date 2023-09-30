import {useParams} from "react-router-dom";
import {useState} from "react";
import {welcome} from "../uriRequest/URlCountryController";


export default function Welcome(){
    const {username } = useParams();
    const [message, setMessage] = useState(null);

    function HelloComponent(){
         console.log("hello-world")
         welcome()
             .then( (response) => Success(response))
             .catch((error) => Error(error))
             .finally(() => console.log("clean up"));
    }
    function Success(response){
        console.log(response);
        setMessage(response.data);
    }
    function Error(error){
      console.log(error);
    }
    return(
        <>
         <div>
             Welcome page
             Hi {username}
         </div>
         <div>
             <button className="btn-success m-5" onClick={HelloComponent}>Rest api hello-world</button>
         </div>
            <div>
                {message}
            </div>
        </>
    )
}
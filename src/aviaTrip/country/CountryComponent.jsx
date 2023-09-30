import {useEffect, useState} from "react";
import {getCountryById, update} from "../uriRequest/URlCountryController";
import './style/countriesList.css'
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";

export default function CountryComponent(){
    const [countryNotFoundMessage, setCountryNotFoundMessage] = useState(null);
    const {id} = useParams();
    const [file, setFile] = useState(new Blob());
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() =>
        getCountry(),
        [id]
    );
    function getCountry(){
       getCountryById(id)
           .then((response) => Success(response.data))
           .catch((error) => Error(error.response.data))
    }
    function Success(response){
        setName(response.name)
        setFile(null)
        setCountryNotFoundMessage(null);
    }
    function Error(error){
        setCountryNotFoundMessage(error);
    }
    function Submit(values){
        console.log(values);
        const jsonPayload = {
            name: values.name
        };
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(jsonPayload)], {
            type: "application/json"
        }));
        formData.append('file', values.file);
        formData.append('id', new Blob([JSON.stringify(id)], {
            type: "application/json"
        }));
        update(formData)
            .then((response) => SuccessRequest(response))
            .catch((error) => {console.log(error)})
    }
    function SuccessRequest(response){
        navigate('/countries')
    }
    return (
        <>
            {countryNotFoundMessage && <div>{countryNotFoundMessage}</div>}
            <h1>Country detail</h1>
            <div className="container">
                <div>
                    <Formik initialValues={{name, file}} enableReinitialize={true}
                            onSubmit={(values) => Submit(values)}
                    >
                        {(props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field type="text" className="form-control" name="name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Flag</label>
                                    <input
                                        type="file"
                                        onChange={(event) => {
                                            props.setFieldValue('file', event.currentTarget.files[0])
                                        }}
                                    />
                                </fieldset>
                                <div>
                                    <button className="btn-outline-primary" type="submit"> Save </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
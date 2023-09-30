import React from 'react';
import { Formik, Field, Form } from 'formik';
import {apiClient} from "../uriRequest/apiClient";
import {useNavigate} from "react-router-dom";

export default function CreateCountry() {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({ name: values.name })], {
            type: "application/json"
        }));
        formData.append('file', values.file);
         apiClient.post('/country/create', formData)
            .then((response) => Success(response))
            .catch((error) => Error(error));
    };
   function Success(response){
       navigate('/countries')
   }
    function Error(error){
        console.log(error)
    }
    return (
        <div>
            <Formik
                initialValues={{ name: '', file: new Blob() }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <label>
                            Country Name:
                            <Field type="text" name="name" />
                        </label>
                        <br />
                        <label>
                            File:
                            <input type="file" onChange={(event) => setFieldValue('file', event.currentTarget.files[0])} />
                        </label>
                        <br />
                        <button type="submit">
                            Create Country
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
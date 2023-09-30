import './apiClient'
import {apiClient} from "./apiClient";
export const countryToDelete = (id) =>
    apiClient.delete("/country/delete", { params: { id: id } });
export const getCountryById = (id) =>
    apiClient.get("/country/getCountry", { params: { id: id } });

export const update =(formData) =>
    apiClient.put('/country/update', formData, {
    headers: {
        'Content-Type': "multipart/form-data"
    },
});

export const welcome = () =>
    apiClient.get("/welcome/hello-world", {
    });

export const successWelcome = () =>  apiClient.get("/welcome/success")
export const loginController = (data) => apiClient.post("/authorize/login", data);
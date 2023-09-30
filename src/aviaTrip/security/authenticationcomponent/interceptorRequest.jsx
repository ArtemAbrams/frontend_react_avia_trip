import {apiClient} from "../../uriRequest/apiClient";

export default function Interceptor(successToken) {
    apiClient.interceptors.request.use(
        (configuration) => {

            configuration.headers.Authorization = `Bearer ${successToken}`
            console.log(configuration.headers.Authorization)
            return configuration;
        }
    )
}
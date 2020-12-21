import axios from 'axios';
import { notification } from 'antd';


const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}

const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {

        request.headers['Content-Type'] = `application/json`;
        request.headers['Access-Control-Allow-Origin'] = '*';
        request.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE3MSwiZXhwIjoxNjM5NDY2NjE1fQ.9vE-glLQtV2NT3gNMkqeRkrWWZAhYCqX-_ibs7lC8GY'
    }
    return request
}

const instance = axios.create({
    mode: 'cors'
});

//Enable Request interceptor
instance.interceptors.request.use(
    request => requestHandler(request)
)
instance.interceptors.response.use((response) => response, (error) => {

    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {

        // Error notification
        notification['error']({
            message: 'System Error',
            description:
                'An unexpected error occurred.',
        });
    }

    return Promise.reject(error);
});


export default instance;

import axios from 'axios';
import { applogicUrl, authUrl, tradeUrl, withCredentials, } from './config';
const getAPI = () => ({
    barong: `${authUrl()}`,
    applogic: `${applogicUrl()}`,
    peatio: `${tradeUrl()}`,
});
const buildRequest = (request, configData) => {
    const { body, method, url } = request;
    const { apiVersion } = configData;
    const api = getAPI();
    const contentType = body instanceof FormData
        ? 'multipart/form-data'
        : 'application/json';
    const headers = {
        'content-type': contentType,
    };
    const apiUrl = api[apiVersion];
    const requestConfig = {
        baseURL: apiUrl,
        data: body,
        headers,
        method,
        url,
        withCredentials: withCredentials(),
    };
    return requestConfig;
};
export const defaultResponse = {
    status: 500,
    data: {
        error: 'Server error',
    },
};
export const formatError = (responseError) => {
    const response = responseError.response || defaultResponse;
    const errors = response.data && (response.data.errors || [response.data.error]);
    return {
        code: response.status,
        message: errors,
    };
};
export const makeRequest = async (request, configData) => {
    const requestConfig = buildRequest(request, configData);
    return new Promise((resolve, reject) => {
        const axiosRequest = axios(requestConfig);
        axiosRequest
            .then((response) => {
            if (configData.withHeaders) {
                resolve(response);
            }
            else {
                resolve(response.data);
            }
        })
            .catch((error) => {
            reject(formatError(error));
        });
    });
};
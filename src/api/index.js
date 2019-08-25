import { makeRequest } from './requestBuilder';
export * from './config';
export const API = {
    get: (config) => async (url) => makeRequest({
        method: 'get',
        url,
    }, config),
    post: (config) => async (url, body) => makeRequest({
        method: 'post',
        body,
        url,
    }, config),
    patch: (config) => async (url, body) => makeRequest({
        method: 'patch',
        body,
        url,
    }, config),
    put: (config) => async (url, body) => makeRequest({
        method: 'put',
        body,
        url,
    }, config),
    delete: (config) => async (url) => makeRequest({
        method: 'delete',
        url,
    }, config),
};
const conf = {
    apiVersion: 'barong',
};
export const changePassword = async (body) => API.post(conf)('/identity/users/password/confirm_code', body);
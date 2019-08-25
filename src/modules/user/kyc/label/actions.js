import { GET_LABEL_DATA, GET_LABEL_ERROR, GET_LABEL_FETCH, } from './constants';
export const labelFetch = () => ({
    type: GET_LABEL_FETCH,
});
export const labelData = (payload) => ({
    type: GET_LABEL_DATA,
    payload,
});
export const labelError = (payload) => ({
    type: GET_LABEL_ERROR,
    payload,
});
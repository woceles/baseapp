import { SEND_DOCUMENTS_DATA, SEND_DOCUMENTS_ERROR, SEND_DOCUMENTS_FETCH, } from './constants';
export const sendDocuments = (payload) => ({
    type: SEND_DOCUMENTS_FETCH,
    payload,
});
export const sendDocumentsData = (payload) => ({
    type: SEND_DOCUMENTS_DATA,
    payload,
});
export const sendDocumentsError = (payload) => ({
    type: SEND_DOCUMENTS_ERROR,
    payload,
});
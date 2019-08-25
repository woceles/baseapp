import { SEND_DOCUMENTS_DATA, SEND_DOCUMENTS_ERROR, SEND_DOCUMENTS_FETCH, } from './constants';
export const initialDocumentsState = { loading: false };
export const documentsReducer = (state = initialDocumentsState, action) => {
    switch (action.type) {
        case SEND_DOCUMENTS_FETCH:
            return {
                ...state,
                success: undefined,
                error: undefined,
                loading: true,
            };
        case SEND_DOCUMENTS_DATA:
            return {
                ...state,
                success: action.payload.message,
                error: undefined,
                loading: false,
            };
        case SEND_DOCUMENTS_ERROR:
            return {
                success: undefined,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
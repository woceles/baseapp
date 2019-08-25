import { GET_LABEL_DATA, GET_LABEL_ERROR, GET_LABEL_FETCH, } from './constants';
export const initialLabelState = {
    data: [],
    isFetching: false,
};
export const labelReducer = (state = initialLabelState, action) => {
    switch (action.type) {
        case GET_LABEL_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case GET_LABEL_DATA:
            return {
                ...state,
                data: action.payload,
                isFetching: false,
            };
        case GET_LABEL_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
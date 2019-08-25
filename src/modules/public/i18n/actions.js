import { CHANGE_LANGUAGE, } from './constants';
export const changeLanguage = (payload) => ({
    type: CHANGE_LANGUAGE,
    payload,
});
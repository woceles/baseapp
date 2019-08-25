import { CHANGE_LANGUAGE, } from './constants';
import { languageMap } from '../../../translations';
const defaultLanguage = {
    code: 'en',
};
const currentLang = localStorage.getItem('lang_code') || defaultLanguage.code;
export const initialChangeLanguageState = {
    lang: currentLang,
    messages: languageMap[currentLang],
};
export const changeLanguageReducer = (state = initialChangeLanguageState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            localStorage.setItem('lang_code', action.payload);
            return {
                lang: action.payload,
                messages: languageMap[action.payload],
            };
        default:
            return state;
    }
};
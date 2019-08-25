export * from './preciseNumber';
export * from './localeDate';
export * from './localeFullDate';
export * from './sliceString';
export * from './uppercase';
export * from './filterData';
export * from './emailValidation';
export * from './timezone';
export * from './localeDateSec';
export * from './historyTableUtils';
export * from './setTradeColor';
export * from './accumulateVolume';
export * from './calcMaxVolume';
export * from './sortByPrice';
export * from './getLanguageByCode';
export * from './checkDate';
export * from './sortByDate';
export * from './getUrlPart';
export * from './setDocumentTitle';
export * from './getTotalPrice';
export * from './capitalize';
export * from './timeConvert';
export const PASSWORD_REGEX=/^(?=(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*[0-9])(?=(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*[L_aceopr-tw\{\}])(?=(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*[LU_acepr-t\{\}])(?=(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){8,})/ ;
export const EMAIL_REGEX=/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
export const ERROR_INVALID_PASSWORD="Password must contain at least 8 symbols, at least one capital letter and a digit";
export const ERROR_INVALID_EMAIL="Email is invalid";
export const ERROR_PASSWORD_CONFIRMATION="Passwords don't match";
export const ERROR_EMPTY_PASSWORD="Password is invalid";
export const uppercase = (data) => {return data.toUpperCase()};
const makerTypeMap = {
    ask: 'sell',
    bid: 'buy',
};
export const kindToMakerType = (kind) => makerTypeMap[kind];
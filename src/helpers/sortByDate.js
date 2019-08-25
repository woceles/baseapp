import * as moment from 'moment';
import { localeDate } from './localeDate';
export const sortByDate = (prop, format) => {
    return (a, b) => {
        return moment(localeDate(a[prop]), format) > moment(localeDate(b[prop]), format) ? -1 : 1;
    };
};
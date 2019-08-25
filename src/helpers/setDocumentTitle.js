import { PG_TITLE_PREFIX } from '../constants';
export const setDocumentTitle = (title) => {
    document.title = [PG_TITLE_PREFIX, title].join(': ');
};
import { ALERT_DATA, ALERT_DELETE, ALERT_DELETE_BY_INDEX, ALERT_PUSH, } from './constants';
export const alertPush = (payload) => ({
    type: ALERT_PUSH,
    payload,
});
export const alertData = (payload) => ({
    type: ALERT_DATA,
    payload,
});
export const alertDelete = () => ({
    type: ALERT_DELETE,
});
export const alertDeleteByIndex = (index) => ({
    type: ALERT_DELETE_BY_INDEX,
    index,
});
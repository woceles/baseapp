export const getUrlPart = (index, url) => {
    const part = url.split(/[\/#?]/)[index];
    return part ? part : '';
};
export const PG_TITLE_PREFIX = 'Exchange';
export const pgRoutes = (isLoggedIn) => {
    const routes = [
        ['page.header.navbar.trade', '/trading/'],
        ['page.header.navbar.wallets', '/wallets'],
        ['page.header.navbar.openOrders', '/orders'],
        ['page.header.navbar.history', '/history'],
    ];
    const routesUnloggedIn = [
        ['page.header.navbar.signIn', '/signin'],
        ['page.header.navbar.trade', '/trading/'],
    ];
    return isLoggedIn ? routes : routesUnloggedIn;
};
export const STORAGE_DEFAULT_LIMIT = 50;

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';
import { rootSaga } from './modules';
import { rangerSagas } from './modules/public/ranger';
import { rangerMiddleware, sagaMiddleware, store } from './store';
import {en} from './translations/en';
import {zh} from './translations/zh';
import {ru} from './translations/ru';
const history = createBrowserHistory();


addLocaleData([...en, ...ru, ...zh]);
sagaMiddleware.run(rootSaga);
rangerMiddleware.run(rangerSagas);
const render = () => ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(App, { history: history })), document.getElementById('root'));
render();
import { createRoot } from 'solid-js';
import './index.css';
import "@material/mwc-button"
import "@material/mwc-icon"



import App from './App';
import * as serviceWorker from './serviceWorker';

// @ts-ignore
createRoot(() => (document.getElementById('root') as Node).appendChild(<App />));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

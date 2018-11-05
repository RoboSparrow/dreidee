import m from 'mithril';

import App from './app';
import './app.css';

document.addEventListener('DOMContentLoaded', () => {
    m.mount(document.getElementById('app'), App);
});

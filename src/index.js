import m from 'mithril';

import { State, defaults, init } from './main';
import App from './app';
import './app.css';

document.addEventListener('DOMContentLoaded', () => {
    init(document.getElementById('dreidee').appendChild(document.createElement('canvas')));
    m.mount(document.getElementById('app'), App(State, defaults()));
});

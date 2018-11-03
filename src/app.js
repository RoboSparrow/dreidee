/**
 * Shitty Mithril components
 */

import m from 'mithril';

let State;
let Defaults;

const Translate = {
    view: function() {
        return [
            m('', [
                m('input[type=number]', {
                    value: State.translate[0],
                    onchange: (e) => { State.translate[0] = e.target.value; },
                }),
                m('label', 'translateX'),
                m('input[type=number]', {
                    value: State.translate[1],
                    onchange: (e) => { State.translate[1] = e.target.value; },
                }),
                m('label', 'translateY'),
                m('input[type=number]', {
                    value: State.translate[2],
                    onchange: (e) => { State.translate[2] = e.target.value; },
                }),
                m('label', 'translateZ'),
            ]),
        ];
    },
};

const Rotate = {
    view: function() {
        return [
            m('', [
                m('input[type=number]', {
                    value: State.rotate[0],
                    onchange: (e) => { State.rotate[0] = e.target.value; },
                }),
                m('label', 'rotateX'),
                m('input[type=number]', {
                    value: State.rotate[1],
                    onchange: (e) => { State.rotate[1] = e.target.value; },
                }),
                m('label', 'rotateY'),
                m('input[type=number]', {
                    value: State.rotate[2],
                    onchange: (e) => { State.rotate[2] = e.target.value; },
                }),
                m('label', 'rotateZ'),
            ]),
        ];
    },
};

const Scale = {
    view: function() {
        return [
            m('', [
                m('input[type=number]', {
                    value: State.scale[0],
                    onchange: (e) => { State.scale[0] = e.target.value; },
                }),
                m('label', 'scaleX'),
                m('input[type=number]', {
                    value: State.scale[1],
                    onchange: (e) => { State.scale[1] = e.target.value; },
                }),
                m('label', 'scaleY'),
                m('input[type=number]', {
                    value: State.scale[2],
                    onchange: (e) => { State.scale[2] = e.target.value; },
                }),
                m('label', 'scaleZ'),
            ]),
        ];
    },
};

const AutoRotate = {
    view: function() {
        return [
            m('', [
                m('input[type=checkbox]', {
                    checked: State.autorotate.x,
                    onchange: (e) => { State.autorotate.x = e.target.checked; },
                }),
                m('label', 'auto rotateX'),
                m('input[type=checkbox]', {
                    checked: State.autorotate.y,
                    onchange: (e) => { State.autorotate.y = e.target.checked; },
                }),
                m('label', 'auto rotateY'),
                m('input[type=checkbox]', {
                    checked: State.autorotate.z,
                    onchange: (e) => { State.autorotate.z = e.target.checked; },
                }),
                m('label', 'auto rotateZ'),
            ]),
        ];
    },
};

const Reset = {
    view: function() {
        return [
            m('', [
                m('button', {
                    onclick: (e) => {
                        e.preventDefault();
                        Object.assign(State, Defaults);
                    }
                }, 'Reset')
            ]),
        ];
    },
};

const App = {
    view: function() {
        return [
            m('.pure-form.app--controls', [
                m(Translate),
                m(Rotate),
                m(Scale),
                m(AutoRotate),
                m(Reset),
                m('pre', JSON.stringify(State, null, 4)),
            ]),
        ];
    },
};

export default function(state, defaults) {
    State = state;
    Defaults = defaults;
    return App;
}

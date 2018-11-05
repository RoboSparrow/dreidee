/**
 * Shitty Mithril components
 */
import m from 'mithril';
import { getState, setState, resetState, setObject } from './main';
import models from './objects/models';

let State = {};

document.addEventListener('state:updated', () => {
    Object.assign(State, getState());
    m.redraw();
});

const Translate = {
    view: function() {
        return [
            m('', [
                m('input[type=number]', {
                    value: State.translate[0],
                    onchange: (e) => {
                        const { translate } = State;
                        translate[0] = e.target.value;
                        setState({ translate });
                    },
                }),
                m('label', 'translateX'),
                m('input[type=number]', {
                    value: State.translate[1],
                    onchange: (e) => {
                        const { translate } = State;
                        translate[1] = e.target.value;
                        setState({ translate });
                    },
                }),
                m('label', 'translateY'),
                m('input[type=number]', {
                    value: State.translate[2],
                    onchange: (e) => {
                        const { translate } = State;
                        translate[2] = e.target.value;
                        setState({ translate });
                    },
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
                    onchange: (e) => {
                        const { rotate } = State;
                        rotate[0] = e.target.value;
                        setState({ rotate });
                    },
                }),
                m('label', 'rotateX'),
                m('input[type=number]', {
                    value: State.rotate[1],
                    onchange: (e) => {
                        const { rotate } = State;
                        rotate[1] = e.target.value;
                        setState({ rotate });
                    },
                }),
                m('label', 'rotateY'),
                m('input[type=number]', {
                    value: State.rotate[2],
                    onchange: (e) => {
                        const { rotate } = State;
                        rotate[2] = e.target.value;
                        setState({ rotate });
                    },
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
                    onchange: (e) => {
                        const { scale } = State;
                        scale[0] = e.target.value;
                        setState({ scale });
                    },
                }),
                m('label', 'scaleX'),
                m('input[type=number]', {
                    value: State.scale[1],
                    onchange: (e) => {
                        const { scale } = State;
                        scale[1] = e.target.value;
                        setState({ scale });
                    },
                }),
                m('label', 'scaleY'),
                m('input[type=number]', {
                    value: State.scale[2],
                    onchange: (e) => {
                        const { scale } = State;
                        scale[2] = e.target.value;
                        setState({ scale });
                    },
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
                        Object.assign(State, resetState());
                    }
                }, 'Reset')
            ]),
        ];
    },
};

const SelectModel = {
    view: function() {
        return [
            m('nav.pure-button-group.xsmall', models.map((model) => {
                const className = (State.name === model.name) ? 'pure-button pure-button-primary' : 'pure-button';
                return m('a', {
                    className,
                    onclick: (e) => {
                        e.preventDefault();
                        setObject(model);
                    },
                }, model.name);
            })),
        ];
    },
};

const App = {
    oninit: function() {
        State = getState();
    },

    view: function() {
        return [
            m(SelectModel),
            m('.pure-form.app--controls.xsmall', [
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

export default App;

/**
 * Shitty Mithril components
 */
import m from 'mithril';
import { init, getState, setState, resetState, setObject, getObjContents } from './main';
import models from './objects/models';

let State = {};

document.addEventListener('state:updated', () => {
    Object.assign(State, getState());
    m.redraw();
});

const Translate = {
    view: function() {
        return [
            m('.section', [
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
            m('.section', [
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
            m('.section', [
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
            m('.section', [
                m('input[type=checkbox]', {
                    checked: State.autorotate.x,
                    onchange: (e) => {
                        const { autorotate } = State;
                        autorotate.x = e.target.checked;
                        setState({ autorotate });
                    },
                }),
                m('label', 'auto rotateX'),
                m('input[type=checkbox]', {
                    checked: State.autorotate.y,
                    onchange: (e) => {
                        const { autorotate } = State;
                        autorotate.y = e.target.checked;
                        setState({ autorotate });
                    },
                }),
                m('label', 'auto rotateY'),
                m('input[type=checkbox]', {
                    checked: State.autorotate.z,
                    onchange: (e) => {
                        const { autorotate } = State;
                        autorotate.z = e.target.checked;
                        setState({ autorotate });
                    },
                }),
                m('label', 'auto rotateZ'),
            ]),
        ];
    },
};

const Draw = {
    view: function() {

        const disabled = (State.drawingStyle !== 'geometry');

        return [
            m('.section', [
                m('input[type=checkbox]', {
                    checked: State.withPoints,
                    disabled,
                    onchange: e => setState({ withPoints: e.target.checked }),
                }),
                m('label', 'points'),
                m('input[type=checkbox]', {
                    checked: State.withLines,
                    disabled,
                    onchange: e => setState({ withLines: e.target.checked }),
                }),
                m('label', 'lines'),
                m('input[type=checkbox]', {
                    checked: State.withFill,
                    disabled,
                    onchange: e => setState({ withFill: e.target.checked }),
                }),
                m('label', 'fill'),
            ]),
        ];
    },
};

const Helpers = {
    view: function() {

        const disabled = (State.drawingStyle !== 'geometry');

        return [
            m('.section', [
                m('input[type=checkbox]', {
                    checked: State.withAxes,
                    disabled,
                    onchange: e => setState({ withAxes: e.target.checked }),
                }),
                m('label', 'world coordinates'),
                m('input[type=checkbox]', {
                    checked: State.withObjectInfo,
                    disabled,
                    onchange: e => setState({ withObjectInfo: e.target.checked }),
                }),
                m('label', 'object info'),
            ]),
        ];
    },
};

const Style = {
    view: function() {
        const { drawingStyle } = State;

        return [
            m('.section', [
                m('a.pure-button', {
                    className: (drawingStyle === 'geometry') ? 'pure-button-primary' : '',
                    onclick: (e) => {
                        e.preventDefault();
                        setState({ drawingStyle: 'geometry' });
                    }
                }, 'Draw Geometry'),
                m('a.pure-button', {
                    className: (drawingStyle === 'pixels') ? 'pure-button-primary' : '',
                    onclick: (e) => {
                        e.preventDefault();
                        setState({ drawingStyle: 'pixels' });
                    }
                }, 'Draw Pixels'),
            ]),
        ];
    },
};

const Reset = {
    view: function() {
        return [
            m('.section', [
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

const Models = {
    view: function() {
        return [
            m('nav.model', models.map((model) => {
                const className = (State.name === model.name) ? ' pure-button-primary' : '';
                return m('a.model-button.pure-button', {
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

const About = {
    view: function() {
        const { name, info, polygons, points } = getState();
        return [
            m('.section', [
                m('h3', name),
                m('', `${points} points, ${polygons} polygons`),
                m('', m.trust(info)),
            ]),
        ];
    },
};

const ObjFile = {
    view: function() {
        return [
            m('pre.obj-file', getObjContents()),
        ];
    },
};

const PrettyPrint = {
    view: function(vnode) {
        let str;
        const { data } = vnode.attrs;
        try {
            str = JSON.stringify(data, null, 4);
        } catch (e) {
            str = e.toString();
        }

        return [
            m('pre.pretty-json', str),
        ];
    },
};

const App = {
    oninit: function() {
        State = getState();
    },

    oncreate: function() {
        init(document.getElementById('dreidee').appendChild(document.createElement('canvas')));
    },

    view: function() {
        return [
            m('main.pure-g', [

                m('.pure-u-1-2.intro', ''),
                m('.pure-u-1-2.intro', 'A shitty 3 renderer for canvas 2D.'),

                m('#dreidee.pure-u-1-2'),
                m('.pure-u-1-2.pure-form.app--controls.xsmall', [
                    m(Models),
                    m(About),
                    m(Translate),
                    m(Rotate),
                    m(Scale),
                    m(AutoRotate),
                    m(Style),
                    m(Draw),
                    m(Helpers),
                    m(Reset),
                ]),

                m('.pure-u-1-2.xsmall', [
                    m(ObjFile),
                ]),
                m('.pure-u-1-2.xsmall', [
                    m(PrettyPrint, { data: State }),
                ]),

            ]),
        ];
    },
};

export default App;

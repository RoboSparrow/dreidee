/**
 * Shitty main functions
 */
import Stats from 'stats.js';

import M, { idendityMatrix } from './matrix';
import { P3, P2 } from './point';
import R from './renderer';

import models from './objects/models';
import ShittyParser from './objects/shitty-obj-file-parser';
import draw from './ctx2d';

const defaults = function(model) {

    // defaults
    return Object.assign({
        // parsing
        parsing: '',

        // info
        name: (model) ? model.name : '',
        info: (model) ? model.info : '',
        url: (model) ? model.url : '',

        //object stats
        polygons: 0,
        points: 0,

        // geometry
        translate: P3.p(),
        rotate: P3.p(),
        cameraFrom: P3.p(0, 0, 1000),
        scale: P3.p(1, 1, 1),

        //animation
        autorotate: {
            x: true,
            y: true,
            z: false,
        },

        // drawing
        withPoints: true,
        withLines: true,
        withFill: false,
        withAxes: true,
        withObjectInfo: true,

        lineWidth: 0.2,
        strokeStyle: 'black',
        fillStyle: 'grey',

        // drawing style
        drawingStyle: 'geometry',

    }, (model) ? model.defaults() : {});

};

let Model;
let Obj = null;
const State = defaults();
let polygons = [];
const stats = new Stats();
let animationId = 0;

//// state managment

const updateEvent = new Event('state:updated');

const getState = function() {
    return Object.assign({}, State);
};

const setState = function(updates, updateFlag = true) {
    Object.assign(State, updates);
    State.updated = updateFlag;
    document.dispatchEvent(updateEvent);
};

const resetState = function() {
    Object.assign(State, defaults(Model));
    State.updated = true;
    document.dispatchEvent(updateEvent);
};

//// object managment

const setObject = function(model) {

    ShittyParser.parseFromUrl(model.url, message => setState({ parsing: message }))
        .then((obj) => {
            Obj = obj;
            Model = model;
            setState(Object.assign(defaults(model), obj.stats));
            polygons = Obj.polygons();
            return true;
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            return err;
        });
};

const getObjContents = function() {
    return (Obj) ? Obj.contents : '';
};

//// update

const mw = idendityMatrix();
const delta = 0.015;

const update = function(ctx) {
    stats.begin();
    State.updated = true;//dev
    if (!Obj || !State.updated) {
        window.requestAnimationFrame(update.bind(null, ctx));
        return;
    }

    const { width, height } = ctx.canvas;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const origin = P2.p(
        width / 2,
        height / 2,
    );

    const { cameraFrom, rotate, translate, scale, autorotate, drawingStyle, withAxes, withObjectInfo } = State;
    const safeState = getState();

    //// state managment

    State.updated = false;
    if (autorotate.x) {
        State.updated = true;
        rotate[0] += delta;
    }
    if (autorotate.y) {
        State.updated = true;
        rotate[1] += delta;
    }
    if (autorotate.z) {
        State.updated = true;
        rotate[2] += delta;
    }

    //// calculate
    // @see http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/
    // TransformedVector = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalVector;
    // !!! BEWARE !!! This lines actually performs the scaling FIRST, and THEN the rotation, and THEN the translation. This is how matrix multiplication works.

    let m;
    const r = M.rotateXYZ(rotate[0], rotate[1], rotate[2]);
    const t = M.translateXYZ(translate[0], translate[1], translate[2]);
    const s = M.scaleXYZ(scale[0], scale[1], scale[2]);

    m = M.multiply(s, r);
    m = M.multiply(t, m);

    //TODO to state, decide what to to do with cameraFrom, autorotate to camera
    const fov = 1.0; //0.7;
    const aspect = 1.0; //width / height;
    const near = 0.1;
    const far = 1000.0;
    const ppm = R.perspectiveProjectionMatrix(fov, aspect, near, far);

    const distance = 4;
    const rot = performance.now() / 1000; //TODO!
    //const rot = 0;

    const from = P3.p(distance * rot, distance * rot, distance * rot);
    const to = P3.p(0, 0, 0);
    const up = P3.p(0, 1, 0);

    const lam = R.lookAtMatrix(from, to, up);

    m = M.multiply(m, lam);
    m = M.multiply(m, ppm);

    //// project and draw

    const paths = polygons.map(path => path.map(point => R.project(point, cameraFrom, m)));

    if (drawingStyle === 'pixels') {
        draw.pixels(ctx, paths, origin, safeState);
    } else {
        draw.paths(ctx, paths, origin, safeState);
    }

    if (withAxes) {
        const projectedCoordsX = [[0, 0, 0], [50, 0, 0]].map(point => R.project(point, cameraFrom, mw));
        draw.line(ctx, projectedCoordsX, origin, 'red', 'X');

        const projectedCoordsY = [[0, 0, 0], [0, 50, 0]].map(point => R.project(point, cameraFrom, mw));
        draw.line(ctx, projectedCoordsY, origin, 'green', 'Y');

        const projectedCoordsZ = [[0, 0, 0], [0, 0, 50]].map(point => R.project(point, cameraFrom, mw));
        draw.line(ctx, projectedCoordsZ, origin, 'blue', 'Z');
    }

    //// info

    if (withObjectInfo) {
        ctx.save();
        ctx.fillText(`${animationId}`, 5, 10);
        ctx.fillStyle = '#999999';
        ctx.fillText(`camera ${cameraFrom.toString()}`, 5, ctx.canvas.height - 5);
        ctx.fillText(`rotate ${rotate.toString()}`, 5, ctx.canvas.height - 15);
        ctx.fillText(`translate ${translate.toString()}`, 5, ctx.canvas.height - 25);
        ctx.fillText(`scale ${scale.toString()}`, 5, ctx.canvas.height - 35);
        ctx.restore();
    }

    //// recurse
    stats.end();
    animationId = window.requestAnimationFrame(update.bind(null, ctx));
};

const init = function(canvas) {
    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.border = '1px solid black';

    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    // start
    setObject(models[0]);
    update(ctx);
};

export { getState, setState, resetState, setObject, getObjContents, init };

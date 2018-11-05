/**
 * Shitty main functions
 */
import Stats from 'stats.js';

import M, { idendityMatrix } from './matrix';
import R from './renderer';

import models from './objects/models';
import ShittyParser from './objects/shitty-obj-file-parser';

const draw = function(ctx, points, center) {
    ctx.save();
    ctx.beginPath();
    points.forEach((point, index) => {
        const x = point[0] + center[0];
        const y = point[1] + center[1];
        if (index === 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
        ctx.fillStyle = 'red';
        ctx.restore();
        ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
    });

    ctx.closePath();
    ctx.stroke();
    // ctx.fill();
    ctx.restore();
};

const drawLine = function(ctx, points, center, color, txt = '') {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();

    points.forEach((point, index) => {
        const x = point[0] + center[0];
        const y = point[1] + center[1];
        if (index === 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    });

    if (txt) {
        ctx.fillStyle = color;
        const last = points[points.length - 1];
        ctx.fillText(txt, last[0] + center[0], last[1] + center[1]);
    }

    ctx.stroke();
    ctx.restore();
};

const defaults = function(model) {

    return Object.assign({
        name: (model) ? model.name : '',
        source: (model) ? model.source : '',
        url: (model) ? model.url : '',

        translate: M.p3(),
        rotate: M.p3(),
        cameraFrom: M.p3(0, 0, 1000),
        scale: M.p3(1, 1, 1),
        autorotate: {
            x: true,
            y: true,
            z: false,
        }
    }, (model) ? model.defaults() : {});
};

let Model;
let Obj = null;
const State = defaults();
let polygons = [];
const stats = new Stats();

//// state managment

const updateEvent = new Event('state:updated');

const getState = function() {
    return Object.assign({}, State);
};

const setState = function(updates) {
    Object.assign(State, updates);
    document.dispatchEvent(updateEvent);
};

const resetState = function() {
    Object.assign(State, defaults(Model));
    document.dispatchEvent(updateEvent);
};

//// object managment

const setObject = function(model) {
    ShittyParser.parseFromUrl(model.url)
        .then((obj) => {
            Obj = obj;
            Model = model;
            setState(defaults(model));
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

const update = function(ctx) {
    stats.begin();

    if (!Obj) {
        window.requestAnimationFrame(update.bind(null, ctx));
        return;
    }

    ctx.clearRect(0, 0, 400, 300);

    const origin = M.p2(
        ctx.canvas.width / 2,
        ctx.canvas.height / 2,
    );

    const delta = performance.now();
    const ang = delta / 500;

    const { cameraFrom, rotate, translate, scale, autorotate } = State;

    //// state managment

    if (autorotate.x) {
        rotate[0] = ang;
    }
    if (autorotate.y) {
        rotate[1] = ang;
    }
    if (autorotate.z) {
        rotate[2] = ang;
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

    //// project and draw

    const paths = polygons.map(path => path.map(point => R.project(point, cameraFrom, m)));
    paths.map(path => draw(ctx, path, origin));

    const projectedCoordsX = [[0, 0, 0], [50, 0, 0]].map(point => R.project(point, cameraFrom, mw));
    drawLine(ctx, projectedCoordsX, origin, 'red', 'X');

    const projectedCoordsY = [[0, 0, 0], [0, 50, 0]].map(point => R.project(point, cameraFrom, mw));
    drawLine(ctx, projectedCoordsY, origin, 'green', 'Y');

    const projectedCoordsZ = [[0, 0, 0], [0, 0, 50]].map(point => R.project(point, cameraFrom, mw));
    drawLine(ctx, projectedCoordsZ, origin, 'blue', 'Z');

    //// info

    ctx.fillText(`camera ${cameraFrom.toString()}`, 10, ctx.canvas.height - 10);
    ctx.fillText(`rotate ${rotate.toString()}`, 10, ctx.canvas.height - 20);
    ctx.fillText(`translate ${translate.toString()}`, 10, ctx.canvas.height - 30);
    ctx.fillText(`rotate ${rotate.toString()}`, 10, ctx.canvas.height - 40);

    //// recurse
    stats.end();
    window.requestAnimationFrame(update.bind(null, ctx));
};

const init = function(canvas) {
    const ctx = canvas.getContext('2d');
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

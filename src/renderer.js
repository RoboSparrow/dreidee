/**
 * Shitty renderer
 */

import M, { idendityMatrix, nullMatrix } from './matrix';
import { P3 } from './point';

/*
Projection of a 3D point:
(1) Transform point from world to camera coordinates using
     4x4 model-view matrix M in camera coordinates

               xc = M * xw

(2) Apply camera projection by 4x4 projection matrix C
     in camera coordinates

               xp = C * xc = C * M *xw

(3) Transform homogeneous (x,y,z,w) to real-coordinates (x/w,y/w,z/w)
*/

const R = {

    camera: function(cameraFrom, m) {
        // |1, 0, 0,   0|
        // |0, 1, 0,   0|
        // |0, 0, 1,   0|
        // |0, 0, 1-c, 1|
        const [x, y, z] = cameraFrom;
        m = m || idendityMatrix();

        m[12] = x;
        m[13] = y;
        m[14] = -1 / z; // camera-z (negative!) => 11 instead 14?
        return m;
    },

    retroProject: function(p4, cameraFrom) {
        const p3 = P3.p();
        const [x, y, z/*, w*/] = p4; // TODO see commented code. Below lines doesn't make really sense
        const r = 1 - z / cameraFrom[2];
        //const r = w;

        p3[0] = x / r;
        p3[1] = y / r;
        p3[2] = z / r;
        return p3;
    },

    // augment point
    // multiply with camera distance matrix
    project: function(point, cameraFrom, transM = null) {
        let point4 = M.augmentP(point);

        if (transM) {
            point4 = M.multiplyP(point4, transM);
        }
        const cameraM = R.camera(cameraFrom);
        const projectedP = M.multiplyP(point4, cameraM);
        const p = R.retroProject(projectedP, cameraFrom);
        return p;
    },

    // adapted from glmatrix.js m4.perspective()
    // @param {number} fovy Vertical field of view in radians
    // @param {number} aspect Aspect ratio. typically viewport width/height
    // @param {number} near Near bound of the frustum
    // @param {number} far Far bound of the frustum
    // @returns {Float32Array} m matrix4x4
    perspectiveProjectionMatrix: function(fovy, aspect, near, far) {
        const m = nullMatrix();
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);
        m[0] = f / aspect;
        m[5] = f;
        m[10] = (far + near) * nf;
        m[11] = -1;
        m[14] = 2 * far * near * nf;
        return m;
    },

    // adapted from glmatrix.js m4.lookAt()
    // @param {mat4} out mat4 frustum matrix will be written into
    // @param {vec3} eye Position of the viewer
    // @param {vec3} center Point the viewer is looking at
    // @param {vec3} up vec3 pointing up
    // @returns {Float32Array} m matrix4x4
    //lookAtMatrix: function(eye, center, up) {
    //    const EPSILON = 0.000001;
    //    const m = nullMatrix();
    //    let x0 = 0;
    //    let x1 = 0;
    //    let x2 = 0;
    //
    //    let y0 = 0;
    //    let y1 = 0;
    //    let y2 = 0;
    //
    //    let z0 = 0;
    //    let z1 = 0;
    //    let z2 = 0;
    //
    //    let len = 0;
    //    const eyex = eye[0];
    //    const eyey = eye[1];
    //    const eyez = eye[2];
    //    const upx = up[0];
    //    const upy = up[1];
    //    const upz = up[2];
    //    const centerx = center[0];
    //    const centery = center[1];
    //    const centerz = center[2];
    //
    //    if (Math.abs(eyex - centerx) < EPSILON
    //        && Math.abs(eyey - centery) < EPSILON
    //        && Math.abs(eyez - centerz) < EPSILON) {
    //        return idendityMatrix();
    //    }
    //
    //    z0 = eyex - centerx;
    //    z1 = eyey - centery;
    //    z2 = eyez - centerz;
    //
    //    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    //    z0 *= len;
    //    z1 *= len;
    //    z2 *= len;
    //
    //    x0 = upy * z2 - upz * z1;
    //    x1 = upz * z0 - upx * z2;
    //    x2 = upx * z1 - upy * z0;
    //    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    //    if (!len) {
    //        x0 = 0;
    //        x1 = 0;
    //        x2 = 0;
    //    } else {
    //        len = 1 / len;
    //        x0 *= len;
    //        x1 *= len;
    //        x2 *= len;
    //    }
    //
    //    y0 = z1 * x2 - z2 * x1;
    //    y1 = z2 * x0 - z0 * x2;
    //    y2 = z0 * x1 - z1 * x0;
    //
    //    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    //    if (!len) {
    //        y0 = 0;
    //        y1 = 0;
    //        y2 = 0;
    //    } else {
    //        len = 1 / len;
    //        y0 *= len;
    //        y1 *= len;
    //        y2 *= len;
    //    }
    //
    //    m[0] = x0;
    //    m[1] = y0;
    //    m[2] = z0;
    //    m[3] = 0;
    //    m[4] = x1;
    //    m[5] = y1;
    //    m[6] = z1;
    //    m[7] = 0;
    //    m[8] = x2;
    //    m[9] = y2;
    //    m[10] = z2;
    //    m[11] = 0;
    //    m[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    //    m[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    //    m[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    //    m[15] = 1;
    //
    //    return m;
    //}


    // adapted from glmatrix.js m4.lookAt()
    // @param {mat4} out mat4 frustum matrix will be written into
    // @param {vec3} eye Position of the viewer
    // @param {vec3} center Point the viewer is looking at
    // @param {vec3} up vec3 pointing up
    // @returns {Float32Array} m matrix4x4
    lookAtMatrix: function(from, to, up) {
        const EPSILON = 0.000001;
        const m = nullMatrix();
        let x0 = 0;
        let x1 = 0;
        let x2 = 0;

        let y0 = 0;
        let y1 = 0;
        let y2 = 0;

        let z0 = 0;
        let z1 = 0;
        let z2 = 0;

        let len = 0;

        if (Math.abs(from[0] - to[0]) < EPSILON
            && Math.abs(from[1] - to[1]) < EPSILON
            && Math.abs(from[2] - to[2]) < EPSILON) {
            return idendityMatrix();
        }

        z0 = from[0] - to[0];
        z1 = from[1] - to[1];
        z2 = from[2] - to[2];

        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = up[1] * z2 - up[2] * z1;
        x1 = up[2] * z0 - up[0] * z2;
        x2 = up[0] * z1 - up[1] * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        m[0] = x0;
        m[1] = y0;
        m[2] = z0;
        m[3] = 0;
        m[4] = x1;
        m[5] = y1;
        m[6] = z1;
        m[7] = 0;
        m[8] = x2;
        m[9] = y2;
        m[10] = z2;
        m[11] = 0;
        m[12] = -(x0 * from[0] + x1 * from[1] + x2 * from[2]);
        m[13] = -(y0 * from[0] + y1 * from[1] + y2 * from[2]);
        m[14] = -(z0 * from[0] + z1 * from[1] + z2 * from[2]);
        m[15] = 1;

        return m;
    }

};

export default R;

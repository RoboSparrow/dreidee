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
    lookAtMatrix: function(from, to, up) {
        const EPSILON = 0.000001;
        const m = nullMatrix();

        let x;
        let y;
        let z;

        // z

        if (Math.abs(from[0] - to[0]) < EPSILON
            && Math.abs(from[1] - to[1]) < EPSILON
            && Math.abs(from[2] - to[2]) < EPSILON) {
            return idendityMatrix();
        }

        z = P3.substract(from, to);
        const lenZ = P3.length(z); // eslint-disable-line prefer-const
        z = P3.scale(z, 1 / lenZ);

        // x

        x = P3.crossProduct(up, z);
        const lenX = P3.length(x);

        if (!lenX) {
            x = P3.p();
        } else {
            x = P3.scale(x, 1 / lenX);
        }

        // y

        y = P3.crossProduct(z, x);
        const lenY = P3.length(y);

        if (!lenY) {
            y = P3.p();
        } else {
            y = P3.scale(y, 1 / lenY);
        }

        /* eslint-disable prefer-destructuring */
        m[0] = x[0];
        m[1] = y[0];
        m[2] = z[0];
        m[3] = 0;
        m[4] = x[1];
        m[5] = y[1];
        m[6] = z[1];
        m[7] = 0;
        m[8] = x[2];
        m[9] = y[2];
        m[10] = z[2];
        m[11] = 0;
        m[12] = -(x[0] * from[0] + x[1] * from[1] + x[2] * from[2]);
        m[13] = -(y[0] * from[0] + y[1] * from[1] + y[2] * from[2]);
        m[14] = -(z[0] * from[0] + z[1] * from[1] + z[2] * from[2]);
        m[15] = 1;
        /* eslint-enable prefer-destructuring */

        return m;
    },

};

export default R;

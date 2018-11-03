/**
 * Shitty renderer
 */

import M, { idendityMatrix } from './matrix';

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
        const p3 = M.p3();
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

};

export default R;

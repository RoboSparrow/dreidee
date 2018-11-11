/**
 * Shitty Matrix and Vector operations
 *
 * @see http://www.opengl-tutorial.org/assets/faq_quaternions/index.html
 * @see https://github.com/ssloy/tinyrenderer/wiki/Lesson-4:-Perspective-projection
 */

/*
Q28. How do I generate a rotation matrix in the X-axis?
-------------------------------------------------------
  Use the 4x4 matrix:

         |  1  0       0       0 |
     M = |  0  cos(A) -sin(A)  0 |
         |  0  sin(A)  cos(A)  0 |
         |  0  0       0       1 |

Q29. How do I generate a rotation matrix in the Y-axis?
-------------------------------------------------------
  Use the 4x4 matrix:

         |  cos(A)  0   sin(A)  0 |
     M = |  0       1   0       0 |
         | -sin(A)  0   cos(A)  0 |
         |  0       0   0       1 |

Q30. How do I generate a rotation matrix in the Z-axis?
-------------------------------------------------------
  Use the 4x4 matrix:

         |  cos(A)  -sin(A)   0   0 |
     M = |  sin(A)   cos(A)   0   0 |
         |  0        0        1   0 |
         |  0        0        0   1 |

    A       = cos(angle_x);
    B       = sin(angle_x);
    C       = cos(angle_y);
    D       = sin(angle_y);
    E       = cos(angle_z);
    F       = sin(angle_z);
    AD      =   A * D;
    BD      =   B * D;
    mat[0]  =   C * E;
    mat[1]  =  -C * F;
    mat[2]  =   D;

    mat[4]  =  BD * E + A * F;
    mat[5]  = -BD * F + A * E;
    mat[6]  =  -B * C;
    mat[8]  = -AD * E + B * F;
    mat[9]  =  AD * F + B * E;
    mat[10] =   A * C;
    mat[3]  =  mat[7] = mat[11] = mat[12] = mat[13] = mat[14] = 0;
    mat[15] =  1;
*/

const idendityMatrix = function() {
    return new Float32Array([
        1, 0, 0, 0, // |  0  1  2  3 |
        0, 1, 0, 0, // |  4  5  6  7 |
        0, 0, 1, 0, // |  9  8 10 11 |
        0, 0, 0, 1, // | 12 13 14 15 |
    ]);
};

const nullMatrix = function() {
    return new Float32Array([
        0, 0, 0, 0, // |  0  1  2  3 |
        0, 0, 0, 0, // |  4  5  6  7 |
        0, 0, 0, 0, // |  9  8 10 11 |
        0, 0, 0, 0, // | 12 13 14 15 |
    ]);
};

const M = {
    augmentP: function(p) {
        // returns M1x4 point [x, y, z, 1]
        return new Float32Array([p[0], p[1], p[2], 1]);
    },

    multiplyP: function(p, m) {
        if (p.length === 3) {
            p = M.augmentP(p);
        }

        const [x, y, z, w] = p;
        m = m || idendityMatrix();
        return [
            x * m[0] + y * m[4] + z * m[8] + w * m[12],
            x * m[1] + y * m[5] + z * m[9] + w * m[13],
            x * m[2] + y * m[6] + z * m[10] + w * m[14],
            x * m[3] + y * m[7] + z * m[11] + w * m[15],
        ];
    },

    rotateXYZ: function(radX, radY, radZ, m) {
        const { sin, cos } = Math;
        m = m || idendityMatrix();

        const a = cos(radX);
        const b = sin(radX);
        const c = cos(radY);
        const d = sin(radY);
        const e = cos(radZ);
        const f = sin(radZ);
        const ad = a * d;
        const bd = b * d;

        m[0] = c * e;
        m[1] = -c * f;
        m[2] = d;

        m[4] = bd * e + a * f;
        m[5] = -bd * f + a * e;
        m[6] = -b * c;
        m[8] = -ad * e + b * f;
        m[9] = ad * f + b * e;
        m[10] = a * c;
        m[3] = 0;
        m[7] = 0;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return m;
    },

    // |  0  1  2  3 |
    // |  4  5  6  7 |
    // |  9  8 10 11 |
    // | 12 13 14 15 |

    translateXYZ: function(x, y, z, m) {
        m = m || idendityMatrix();

        m[12] = x;
        m[13] = y;
        m[14] = z;

        return m;
    },

    scaleXYZ: function(x, y, z, m) {
        m = m || idendityMatrix();

        m[0] = x;
        m[5] = y;
        m[10] = z;

        return m;
    },


    multiply: function(m1, m2) {

        const m = idendityMatrix();

        m[0] = m1[0] * m2[0] + m1[1] * m2[4] + m1[2] * m2[8];
        m[1] = m1[0] * m2[1] + m1[1] * m2[5] + m1[2] * m2[9];
        m[2] = m1[0] * m2[2] + m1[1] * m2[6] + m1[2] * m2[10];
        m[3] = m1[0] * m2[3] + m1[1] * m2[7] + m1[2] * m2[11] + m1[3];

        m[4] = m1[4] * m2[0] + m1[5] * m2[4] + m1[6] * m2[8];
        m[5] = m1[4] * m2[1] + m1[5] * m2[5] + m1[6] * m2[9];
        m[6] = m1[4] * m2[2] + m1[5] * m2[6] + m1[6] * m2[10];
        m[7] = m1[4] * m2[3] + m1[5] * m2[7] + m1[6] * m2[11] + m1[7];

        m[8] = m1[8] * m2[0] + m1[9] * m2[4] + m1[10] * m2[8];
        m[9] = m1[8] * m2[1] + m1[9] * m2[5] + m1[10] * m2[9];
        m[10] = m1[8] * m2[2] + m1[9] * m2[6] + m1[10] * m2[10];
        m[11] = m1[8] * m2[3] + m1[9] * m2[7] + m1[10] * m2[11] + m1[11];

        m[12] = m1[12] * m2[0] + m1[13] * m2[4] + m1[14] * m2[8];
        m[13] = m1[12] * m2[1] + m1[13] * m2[5] + m1[14] * m2[9];
        m[14] = m1[12] * m2[2] + m1[13] * m2[6] + m1[14] * m2[10];
        m[15] = m1[12] * m2[3] + m1[13] * m2[7] + m1[14] * m2[11] + m[15];

        return m;
    },

    pretty: function(m) {
        const { length } = m;
        let i;
        let r = '[\n';
        for (i = 0; i < length; i += 4) {
            r += ('    ' + m[i] + ', ' + m[i + 1] + ', ' + m[i + 2] + ', ' + m[i + 3] + ',\n');
        }
        r += ']';
        return r;
    },
};

export { M as default, idendityMatrix, nullMatrix };

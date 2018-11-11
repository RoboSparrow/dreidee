const P4 = {
    p: function(...args) {
        if (typeof args[0] === 'number') {
            const w = 1;
            return new Float32Array([args[0], args[1], args[2], w]);
        }
        return new Float32Array(4);
    },
};

const P3 = {

    p: function(...args) {
        if (typeof args[0] === 'number') {
            return new Float32Array(args);
        }
        return new Float32Array(3);
    },

    substract: function(p1, p2) {
        const x = p1[0] - p2[0];
        const y = p1[1] - p2[1];
        const z = p1[2] - p2[2];
        return P3.p(x, y, z);
    },

    scale: function(p, scale) {
        const x = p[0] * scale;
        const y = p[1] * scale;
        const z = p[2] * scale;
        return P3.p(x, y, z);
    },

    length: function(p) {
        const [x, y, z] = p;
        return Math.sqrt((x ** 2) + (y ** 2) + (z ** 2));
    },

    normalize: function(p) {
        const [x, y, z] = p;
        const length = P3.length(p);

        // the zero vector cannot be normalized. Its length will always remain 0
        if (length === 0) {
            return p;
        }

        const n = 1.0 / length;
        return P3.p(
            x * n,
            y * n,
            z * n,
        );
    },

    // The cross product between two normalised vectors is used to determine
    // the vector which perpendicular to both the vectors.
    // The Cross Product a × b of two vectors is another vector that is at right angles to both
    crossProduct: function(p1, p2) {
        const [xa, ya, za] = p1;
        const [xb, yb, zb] = p2;

        const x = ya * zb - za * yb;
        const y = za * xb - xa * zb;
        const z = xa * yb - ya * xb;

        return P3.p(x, y, z);
    },

    // The dot product is used to calculate the angle between two vectors.
    dotProduct: function(p1, p2) {
        return p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2];
    },
};

const P2 = {

    p: function(...args) {
        if (typeof args[0] === 'number') {
            return new Float32Array(args);
        }
        return new Float32Array(2);
    },

    substract: function(p1, p2) {
        const x = p1[0] - p2[0];
        const y = p1[1] - p2[1];
        return P2.p(x, y);
    },

    scale: function(p, scale) {
        const x = p[0] * scale;
        const y = p[1] * scale;
        return P3.p(x, y);
    },

    length: function(p) {
        const [x, y] = p;
        return Math.sqrt((x ** 2) + (y ** 2));
    },

    normalize: function(p) {
        const [x, y] = p;
        const length = P2.length(p);

        // the zero vector cannot be normalized. Its length will always remain 0
        if (length === 0) {
            return p;
        }

        const n = 1 / length;
        return P3.p(
            x * n,
            y * n,
        );
    },

    crossProduct: function() {
        throw new Error('No cross product does not exist in 2D space');
    },

    // The dot product is used to calculate the angle between two vectors.
    dotProduct: function(p1, p2) {
        return p1[0] * p2[0] + p1[1] * p2[1];
    },
};

export { P4, P3, P2 };

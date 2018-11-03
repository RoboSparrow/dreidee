//// Geometry of a Model
//
// 3 + + + + + + + 2
// +\              +\
// + \             + \
// +  0 + + + + + +++ 1
// +  +            +  +
// +  +            +  +
// +  +            +  +
// +  +            +  +
// 4 +++ + + + + + 5  +
//  \ +             \ +
//   \+              \+
//    7 + + + + + + + 6
////

const points = [
    /*0*/ [-50, -50, -50],
    /*1*/ [50, -50, -50],
    /*2*/ [50, -50, 50],
    /*3*/ [-50, -50, 50],
    /*4*/ [-50, 50, -50],
    /*5*/ [50, 50, -50],
    /*6*/ [50, 50, 50],
    /*7*/ [-50, 50, 50],
];

const vertices = [
    0, 1, 2,
    2, 3, 0,
    4, 5, 6,
    6, 7, 4,
    0, 1, 4,
    1, 4, 5,
    1, 2, 5,
    2, 5, 6,
    2, 3, 6,
    3, 6, 7,
    3, 0, 7,
    0, 7, 4
];

const getVertices = function() {
    const r = [];
    const { length } = vertices;
    let i;

    for (i = 0; i < length; i += 3) {
        r.push([
            points[vertices[i]],
            points[vertices[i + 1]],
            points[vertices[i + 2]],
        ]);
    }
    return r;
};

export default getVertices;

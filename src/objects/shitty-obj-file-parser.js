/**
 * @see https://www.cs.cmu.edu/~mbz/personal/graphics/obj.html
 * @see http://paulbourke.net/dataformats/obj/
 */

////
//
// const readFileNode = function(filePath) {
//     const { readFile } = require('fs');
//     const { promisify } = require('util');
//     const gets = promisify(readFile); // (A)
//     return gets(filePath, { encoding: 'utf8' });
// };
//
// readFileNode('./cessna.obj')
//     .then(contents => parse(contents))
//     .then(obj => console.log(obj))
//     .catch(err => console.log(err));
//
////
const { isNaN, isFinite } = Number;

const patterns = [
    /^v\s/, // v [x y z] vertex
    /^f\s/, // f [...vindex] polygon
    /^g(?:\s)/, // g [name]
];

const filterLines = function(lines) {
    const filtered = lines.filter((li) => {
        const line = li.trim();

        const first = line.charAt(0);
        if (!first || first === '#' || first === ' ') {
            return false;
        }

        let i;
        const { length } = patterns;

        for (i = 0; i < length; i += 1) {
            if (patterns[i].test(line)) {
                return true;
            }
        }

        return false;
    });

    return filtered;
};

const parseLine = function(line) {
    return line.trim().replace(/\s+/g, ' ').split(' ');
};

const parseVertexLine = function(line, lineIndex) {
    const parts = parseLine(line);
    const r = [];

    const { length } = parts;
    let i;
    let val;

    for (i = 1; i < length; i += 1) {
        val = parseFloat(parts[i].trim());
        if (isNaN(val) || !isFinite(val)) {
            return new Error(`Unable to parse vertex value to float: ${parts[i]} (${val}), v-line ${lineIndex}, part ${i}`);
        }
        r.push(val);
    }

    return r;
};

const parsePolygonLine = function(line, lineIndex) {
    const parts = parseLine(line);

    const r = [];

    const { length } = parts;
    let i;
    let val;

    for (i = 1; i < length; i += 1) {
        val = parts[i].split('/')[0].trim();
        val = parseInt(val, 10);
        if (isNaN(val) || !isFinite(val)) {
            return new Error(`Unable to parse polygon value to float: ${parts[i]} (${val}), f-line ${lineIndex}, part ${i}`);
        }
        r.push(val);
    }

    return r;
};

// in some obj files polygon("f") arrays might contain invalid referencing indexes to missing points
// thus we use old-fashoned for loops instead array.prototype.map etc..

const mapPolygons = function(points, polygons) {
    let i;
    let k;
    let point;
    let pts;
    let polygon;
    let pLength;

    const r = [];
    const { length } = polygons;

    for (i = 0; i < length; i += 1) {

        polygon = polygons[i];
        pLength = polygon.length;
        pts = [];

        for (k = 0; k < pLength; k += 1) {
            point = points[polygon[k] - 1] || null;
            if (point) {
                pts.push(point);
            }
        }

        r.push(pts);
    }
    return r;
};

const parse = function(txt) {

    return new Promise((resolve, reject) => {

        const lines = txt.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
        const filtered = filterLines(lines);

        const points = [];
        const polygons = [];

        const { length } = filtered;
        let i;
        let cmd;
        let val;

        for (i = 0; i < length; i += 1) {

            cmd = filtered[i].substring(0, 2);

            switch (cmd) {
                case 'v ':
                    val = parseVertexLine(filtered[i], i);
                    if (val instanceof Error) {
                        reject(val);
                        return;
                    }
                    points.push(val);
                    break;

                case 'f ':
                    val = parsePolygonLine(filtered[i], i);
                    if (val instanceof Error) {
                        reject(val);
                        return;
                    }
                    polygons.push(val);
                    break;

                case 'g':
                    // TODO, reserving groups for later
                    break;

                default:
                    // do nothing
            }

        }

        resolve({
            contents: txt,
            stats: {
                polygons: polygons.length,
                points: points.length,
            },
            polygons: function() {
                return mapPolygons(points, polygons);
            },
        });
    });

};

const parseFromUrl = function(url) {
    return fetch(url)
        .then(response => response.text())
        .then(contents => parse(contents));
};

export default {
    parse,
    parseFromUrl,
};

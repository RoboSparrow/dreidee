
const locatePixel2D = function(p2, width) {
    return p2[1] * (width * 4) + p2[0] * 4;
};

const locateCanvas2d = function(p2, center) {
    const x = Math.floor(p2[0]) + center[0];
    const y = center[1] - Math.floor(p2[1]);
    return [x, y];
};

const drawPixels = function(ctx, paths, center) {
    const { width, height } = ctx.canvas;

    ctx.save();
    ctx.fillStyle = '#101010';
    ctx.fillRect(0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);

    let red;
    let i;
    let k;
    let point;
    let p2;
    const lpaths = paths.length;
    let lpoints;

    for (i = 0; i < lpaths; i += 1) {
        lpoints = paths[i].length;
        for (k = 0; k < lpoints; k += 1) {
            point = paths[i][k];
            p2 = locateCanvas2d(point, center);

            red = locatePixel2D(p2, width);
            imageData.data[red] = 255;
            imageData.data[red + 1] = 255;
            imageData.data[red + 2] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
};

const drawPaths = function(ctx, paths, center, state) {
    const { lineWidth, fillStyle, withLines, withPoints, withFill } = state;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillStyle;// todo above can be applied in main above loop

    let i;
    let k;
    let point;
    const lpaths = paths.length;
    let lpoints;

    for (i = 0; i < lpaths; i += 1) {
        lpoints = paths[i].length;
        ctx.beginPath();

        for (k = 0; k < lpoints; k += 1) {
            point = paths[i][k];
            const [x, y] = locateCanvas2d(point, center);

            if (k === 0) {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);

            if (withPoints) {
                ctx.save();
                ctx.fillStyle = 'red';
                ctx.fillRect(x - 1, y - 1, 2, 2);
                ctx.restore();
            }
        }

        ctx.closePath();
        if (withFill) {
            ctx.fill();
        }
        if (withLines) {
            ctx.stroke();
        }
    }

    ctx.restore();
};

const drawLine = function(ctx, points, center, color = '', text = '') {
    ctx.save();
    if (color) {
        ctx.strokeStyle = color;
    }
    ctx.beginPath();
    let x;
    let y;

    points.forEach((point, index) => {
        ([x, y] = locateCanvas2d(point, center));
        if (index === 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    });

    if (text) {
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    ctx.stroke();
    ctx.restore();
};

const drawText = function(ctx, text, point, center, options = {}) {
    ctx.save();
    let prop;
    for (prop in options) { // eslint-disable-line guard-for-in
        ctx[prop] = options[prop];
    }
    const [x, y] = locateCanvas2d(point, center);
    ctx.fillText(text, x, y);
    ctx.restore();
};

export default {
    pixels: drawPixels,
    paths: drawPaths,
    line: drawLine,
    text: drawText,
};

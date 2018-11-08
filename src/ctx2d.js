
const locatePixel2D = function(x, y, width) {
    return y * (width * 4) + x * 4;
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
    const lpaths = paths.length;
    let lpoints;

    for (i = 0; i < lpaths; i += 1) {
        lpoints = paths[i].length;
        for (k = 0; k < lpoints; k += 1) {
            point = paths[i][k];
            const x = Math.floor(point[0] + center[0]);
            const y = Math.floor(point[1] + center[1]);

            red = locatePixel2D(x, y, width);
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

    ctx.beginPath();
    for (i = 0; i < lpaths; i += 1) {
        lpoints = paths[i].length;

        for (k = 0; k < lpoints; k += 1) {
            point = paths[i][k];
            const x = Math.floor(point[0]) + center[0];
            const y = Math.floor(point[1]) + center[1];
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
    }

    if (withLines) {
        ctx.stroke();
    }
    if (withFill) {
        ctx.fill();
    }
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

export default {
    pixels: drawPixels,
    paths: drawPaths,
    line: drawLine,
};

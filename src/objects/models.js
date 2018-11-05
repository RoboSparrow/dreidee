import M from '../matrix';

const Models = Object.freeze([
    {
        url: '../static/humanoid_tri.obj',
        name: 'Humanoid shape',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(10, 10, 10),
            };
        },
    }, {
        url: '../static/cube.obj',
        name: 'Cube',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(40, 40, 40),
            };
        },
    }, {
        url: '../static/al.obj',
        name: 'Al, a cartoonish mobster',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(40, 40, 40),
            };
        },
    }, {
        url: '../static/alfa147.obj',
        name: 'Mini-Cooper',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {};
        },
    }, {
        url: '../static/cessna.obj',
        name: 'Cessna airplane',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(10, 10, 10),
            };
        },
    }, {
        url: '../static/lamp.obj',
        name: 'Lamp',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(15, 15, 15),
            };
        },
    }, {
        url: '../static/octahedron.obj',
        name: 'Dodecahedron',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(50, 50, 50),
            };
        },
    }, {
        url: '../static/power_lines.obj',
        name: 'Power lines',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(2, 2, 2),
            };
        },
    }
]);

export default Models;

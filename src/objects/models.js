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
        url: '../static/magnolia.obj',
        name: 'Magnolia blossom',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {};
        },
    }, {
        url: '../static/shuttle.obj',
        name: 'Space Shuttle',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(20, 20, 20),
            };
        },
    }, {
        url: '../static/skyscraper.obj',
        name: 'Skyscraper',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(3.5, 3.5, 3.5),
            };
        },
    }, {
        url: '../static/violin_case.obj',
        name: 'Violin case',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(80, 80, 80),
            };
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
        url: '../static/sandal.obj',
        name: 'Sandal',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(30, 30, 30),
            };
        },
    }, {
        url: '../static/airboat.obj',
        name: 'Airboat',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(20, 20, 20),
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
    },
]);

export default Models;

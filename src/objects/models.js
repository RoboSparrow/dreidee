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
                withPoints: false,
            };
        },
    }, {
        url: '../static/magnolia.obj',
        name: 'Magnolia blossom',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                withPoints: false,
                withFill: true,
            };
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
                withPoints: false,
                withFill: true,
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
                withPoints: false,
            };
        },
    }, {
        url: '../static/lamp.obj',
        name: 'Lamp',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(15, 15, 15),
                withPoints: false,
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
                withPoints: false,
                withFill: true,
            };
        },
    }, {
        url: '../static/power_lines.obj',
        name: 'Power lines',
        source: 'https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html',
        defaults: function() {
            return {
                scale: M.p3(2, 2, 2),
                rotate: M.p3(0, 0, Math.PI),
                withPoints: false,
                autorotate: {
                    x: true,
                    y: 0,
                    z: 0,
                },
            };
        },
    }, {
        url: '../static/Bennu-Radar.obj',
        name: '101955 Bennu asteroid',
        source: 'https://nasa3d.arc.nasa.gov/detail/bennu',
        defaults: function() {
            return {
                scale: M.p3(200, 200, 200),
                withPoints: false,
            };
        },
    },
]);

export default Models;

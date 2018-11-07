import M from '../matrix';

const Models = Object.freeze([
    {
        url: '../static/humanoid_tri.obj',
        name: 'Humanoid shape',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(10, 10, 10),
            };
        },
    }, {
        url: '../static/cube.obj',
        name: 'Cube',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(40, 40, 40),
            };
        },
    }, {
        url: '../static/al.obj',
        name: 'Al, a cartoonish mobster',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(40, 40, 40),
                withPoints: false,
            };
        },
    }, {
        url: '../static/magnolia.obj',
        name: 'Magnolia blossom',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                withPoints: false,
                withFill: true,
            };
        },
    }, {
        url: '../static/shuttle.obj',
        name: 'Space Shuttle',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(20, 20, 20),
            };
        },
    }, {
        url: '../static/skyscraper.obj',
        name: 'Skyscraper',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
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
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(80, 80, 80),
            };
        },
    }, {
        url: '../static/cessna.obj',
        name: 'Cessna airplane',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(10, 10, 10),
                withPoints: false,
            };
        },
    }, {
        url: '../static/lamp.obj',
        name: 'Lamp',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(15, 15, 15),
                withPoints: false,
            };
        },
    }, {
        url: '../static/octahedron.obj',
        name: 'Dodecahedron',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(50, 50, 50),
            };
        },
    }, {
        url: '../static/sandal.obj',
        name: 'Sandal',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(30, 30, 30),
            };
        },
    }, {
        url: '../static/airboat.obj',
        name: 'Airboat',
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
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
        info: 'courtesy <a href="https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html" target="_blank">John Burkardt\'s obj file samples</a>',
        defaults: function() {
            return {
                scale: M.p3(2, 2, 2),
                rotate: M.p3(0, 0, Math.PI),
                withPoints: false,
                autorotate: {
                    x: true,
                    y: false,
                    z: false,
                },
            };
        },
    }, {
        url: '../static/Bennu-Radar.obj',
        name: '101955 Bennu asteroid',
        info: 'Authors: Michael C. Nolan/Arecibo Observatory/NASA/NSF,<br>courtesy <a href="https://nasa3d.arc.nasa.gov/detail/bennu" target="_blank">NASA 3D Resources</a>',
        defaults: function() {
            return {
                scale: M.p3(200, 200, 200),
                withPoints: false,
            };
        },
    }, {
        url: '../static/nefertiti.obj',
        name: 'Nefertiti Hack Reduced',
        info: 'courtesy <a href="http://nefertitihack.alloversky.com/" target="_blank">Nora Al-Badri and Jan Nikolai Nelles<a/>, decimated model by <a href="https://sketchfab.com/zafio" target="_blank">Zafio</a>',
        defaults: function() {
            return {
                scale: M.p3(0.7, 0.7, 0.7),
                withPoints: false,
                rotate: M.p3(106.5, 242.0, 242.0),
                autorotate: {
                    x: false,
                    y: true,
                    z: false,
                },
            };
        },
    },
]);

export default Models;

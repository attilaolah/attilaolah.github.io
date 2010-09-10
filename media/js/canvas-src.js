// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name canvas-min.js
// @externs function $(arg) {};
// ==/ClosureCompiler==

(function () {

    // Wait for jQuery to load
    var wait_for_jquery_tween = function (fn) {
        while ((typeof($) !== 'function') || (typeof(Tween) !== 'function') || !($() && $()['jquery'])) {
            setTimeout(function () { wait_for_jquery_tween(fn); }, 10);
            return;
        }
        fn();
    };

    var speed = 25; //200;

    var composite = function (elems) {
        var loop = function () {
            clear();
            for (var i in elems) {
                if (elems.hasOwnProperty(i)) {
                    elems[i] = elems[i]().draw();
                }
            }
        };
        setInterval(loop, speed);
    };

    // One step of the animation
    var draw = function (img, elem) {
        // Regenerate the animation element if the image is off-screen
        if ((elem.x > canvas_width + elem.width) || (elem.y > canvas_height + elem.height)) {
            return elem.regenerate();
        }

        if (elem.started) {
            // Save the state of the canvas
            ctx.save();

            ctx.translate(elem.x, elem.y);
            ctx.rotate(elem.r);
            ctx.scale(elem.z, elem.z);
            ctx.drawImage(img, 0, 0, elem.width, elem.height);

            // Restare the canvas
            ctx.restore();
        }
        if (elem.ready && elem.placeholder) {
            // Draw the image to the original position too
            ctx.drawImage(img, elem.orig.x, elem.orig.y, elem.width, elem.height);
        }

        // Return the local element reference
        return function () {
            return elem;
        };
    };

    // Draw image particle
    var animation = function (elem) {
        var img = new Image(),
            rz = Math.PI * 0.1 + (Math.random() * 0.5),
            zx = Math.random() * 0.5,
            ri = Math.pow(-1, Math.floor(Math.random() * 2)),
            rs = Math.pow(1.25 + zx, ri),
            tweens = {
                    x: new Tween(elem, '', Tween.regularEaseIn, elem.x, canvas_width * (1 + Math.random() * 10), speed * rs),
                    y: new Tween(elem, '', Tween.regularEaseIn, elem.y, canvas_height * Math.random(), speed * rs),
                    r: new Tween(elem, '', Tween.regularEaseInOut, 0, elem.r * rz, speed / (2.5 + Math.random() * 2.5))
                },
            started = false;

        elem.orig = {
            x: elem.x,
            y: elem.y
        };

        tweens.x.onMotionChanged = function (event) {
            elem.x = event.target._pos;
        };
        tweens.y.onMotionChanged = function (event) {
            elem.y = event.target._pos;
        };
        tweens.r.onMotionChanged = function (event) {
            elem.r = -event.target._pos;
            elem.z = 1 - event.target._pos * zx * ri / rz;
        };

        // Set ready state when the image is loaded
        img.onload = function () {
            elem.ready = true;
            setTimeout(function () {
                tweens.x.start();
                tweens.y.start();
                tweens.r.start();
                elem.started = true;
            }
            , Math.random() * elem.delay);
        };

        elem.draw = function () {
            return draw(img, elem);
        };

        // Set image path when callback is fired
        return function () {
            if (!started) {
                img.src = elem.path;
                started = true;
            };
            return elem;
        };
    };

    // Constants
    var canvas_width = 280,
        canvas_height = 245,
        canvas_clear = 1000;

    // A list of animations
    var animations = function () {
        var animation_factory = function (num, ph, h, w, x, y, r) {
            var fn = function () {
                return animation({
                    path: '/media/images/skin/flower-part-' + num + '.png',
                    placeholder: ph,
                    regenerate: fn,
                    delay: 20000,
                    height: h,
                    width: w,
                    x: x,
                    y: y,
                    r: r
                });
            };
            return fn;
        };
        var queue = [

            function (ph) { return animation_factory(1, ph, 11, 36, 70, 33, 1)(); },
            function (ph) { return animation_factory(2, ph, 16, 18, 75, 22, 0.4)(); },
            function (ph) { return animation_factory(3, ph, 15, 5, 68, 20, -1)(); },

            function (ph) { return animation_factory(1, ph, 11, 36, 155, 53, 1)(); },
            function (ph) { return animation_factory(2, ph, 16, 18, 165, 43, 0.4)(); },
            function (ph) { return animation_factory(3, ph, 15, 5, 155, 43, -1)(); },

            function (ph) { return animation_factory(1, ph, 11, 36, 28, 68, 1)(); },
            function (ph) { return animation_factory(2, ph, 16, 18, 40, 58, 0.4)(); },
            function (ph) { return animation_factory(3, ph, 15, 5, 32, 58, -1)(); }

        ];

        var ret = [];

        for (var i in queue) {
            if (queue.hasOwnProperty(i)) {
                ret.push(queue[i](true));
                for (var j = 2; j > 0; j--) {
                    ret.push(queue[i](false));
                }
            }
        }
        return ret;
    };

    // The global canvas context
    var ctx;

    // Clear the canvas
    var clear = function () {
        ctx.clearRect(0, 0, canvas_clear, canvas_clear);
    };

    // Draw the canvas
    var draw_canvas = function () {
        var canvas = $('<canvas/>', {
                'class': 'canvas',
                'width': canvas_width,
                'height': canvas_height
            });
        if (canvas[0].getContext) {
            ctx = canvas[0].getContext('2d');
            // Give the control to the composition loop
            composite(animations());
            // Insort the canvas to the DOM
            $('.j_canvas').replaceWith(canvas);
        }
    };

    // Draw the canvas when jQuery is ready
    wait_for_jquery_tween(function () {
        $(draw_canvas);
    });

}());

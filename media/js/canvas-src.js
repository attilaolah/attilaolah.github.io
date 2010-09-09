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

    var animate = function (settings) {
        settings = $.extend({
            from: 0,
            to: 100,
            speed: 1
    }, settings);
        var tween = new Tween({}, '', Tween.regularEaseIn, settings.from, settings.to, 1),
            mod = 0.75 + Math.random() / 2,
            list = [],
            pos = 0;
        tween.onMotionChanged = function (event) {
            list.push(event.target._pos * mod);
        };
        tween.start();
        var step = function () {
            return list[pos++];
        };
        return step;
    };

    var animatepi = function () {
        var tween = new Tween({}, '', Tween.backEaseInOut, 0, Math.PI, 1),
            mod = 0.75 + Math.random() / 2,
            list = [],
            pos = 0;
        tween.onMotionChanged = function (event) {
            list.push(event.target._pos * mod);
        };
        tween.start();
        var step = function () {
            return list[pos++];
        };
        return step;
    };

    var clear = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    var draw_canvas = function () {
        var canvas = $('<canvas/>', {
                'class': 'canvas',
                'width': 280,
                'height': 245
            }),
            ctx;
        if (canvas[0].getContext) {
            ctx = canvas[0].getContext('2d');
        } else {
            return;
        }

        // Draw image particle
        var animate_particle = function () {
            var img = new Image(),
                animx = animate({ from: 0, to: document.width * (1 + Math.random() * 2) }),
                animy = animate({ from: 0, to: 245 });
                animr = animatepi();
            var draw = function () {
                clear(ctx);
                ctx.save();

                x = animx();
                y = animy();
                r = animr();

                if (x !== null && y !== null) {
                    ctx.translate(x + 70 + 36, y + 33 + 5, 36, 11);
                    ctx.rotate(r);
                    ctx.drawImage(img, -36, -5);
                    if (x < document.width && y < 245) {
                        setTimeout(draw, 25);
                    }
                }
                ctx.restore();

                ctx.drawImage(img, 70, 33);

            };
            img.onload = draw;
            img.src = '/media/images/skin/flower-part-1.png';

            setTimeout(animate_particle, 2000 + Math.random() * 3000);
        };

        animate_particle();

        $('.j_canvas').replaceWith(canvas);
    };

    // Load archives when jQuery is ready
    wait_for_jquery_tween(function () {
        $(draw_canvas);
    });

}());

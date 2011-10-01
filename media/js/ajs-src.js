// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name ajs-min.js
// @js_externs FB.init = function (arg){};
// ==/ClosureCompiler==

// Asynchronous JavaScript loader & startup scripts for aatiis.me
(function () {

    // API KEYS
    var api_key_ga = 'UA-13035482-3';

    // Initialize and export Google Analytics queue
    var google_analitics_gaq = window['_gaq'] || [
        ['_setAccount', api_key_ga],
        ['_trackPageview']
    ];
    window['_gaq'] = google_analitics_gaq;

    // DOM ready event listener
    var ready = (function () {
        var ready_event_fired = false;
        var ready_event_listener = function (fn) {

            // Create an idempotent version of the 'fn' function
            var idempotent_fn = function () {
                if (ready_event_fired) {
                    return;
                }
                ready_event_fired = true;
                return fn();
            };

            // The DOM ready check for Internet Explorer
            var do_scroll_check = function () {
                if (ready_event_fired) {
                    return;
                }

                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                try {
                    document.documentElement.doScroll('left');
                } catch(e) {
                    setTimeout(do_scroll_check, 1);
                    return;
                }

                // Execute any waiting functions
                return idempotent_fn();
            }

            // If the browser ready event has already occured
            if (document.readyState === "complete") {
                return idempotent_fn();
            }

            // Mozilla, Opera and webkit nightlies currently support this event
            if (document.addEventListener) {

                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", idempotent_fn, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", idempotent_fn, false);

            // If IE event model is used
            } else if (document.attachEvent) {

                // ensure firing before onload; maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", idempotent_fn);
                
                // A fallback to window.onload, that will always work
                window.attachEvent("onload", idempotent_fn);

                // If IE and not a frame: continually check to see if the document is ready
                var toplevel = false;

                try {
                    toplevel = window.frameElement == null;
                } catch (e) {}

                if (document.documentElement.doScroll && toplevel) {
                    return do_scroll_check();
                }
            }
        };
        return ready_event_listener;
    }());

    // Set up ASYNC load
    var asynchronous_javascript_loader = (function () {
        // Private members
        var create = function (url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        // Public: export a Function object
        return function (url) {
            setTimeout(function () { create(url); }, 1);
        };
    }());

    // Set up CSS loader
    var css_loader = (function () {
        // Private members
        var create = function (url) {
            var script = document.createElement('link');
            script.rel = 'stylesheet';
            script.type = 'text/css';
            script.href = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        // Public: export a Function object
        return function (url) {
            setTimeout(function () { create(url); }, 1);
        };
    }());

    var load_external_js = function () {
        // Call the other script files from here
        asynchronous_javascript_loader('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
        asynchronous_javascript_loader('http://www.google-analytics.com/ga.js');
        asynchronous_javascript_loader('/media/js/jquery-treeview-src.js');
        asynchronous_javascript_loader('/media/js/data-src.js');
        asynchronous_javascript_loader('/media/js/tween-src.js');
        asynchronous_javascript_loader('/media/js/canvas-src.js');
    };
    //var load_external_css = function () {
    //    // XXX: load external css here
    //};


    var init_main = function () {
        // List init functions here
        load_external_js();
        //load_external_css();
    };
    ready(init_main);

}());

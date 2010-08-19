// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name jt-min.js
// ==/ClosureCompiler==


(function () {

    // This is the main JT object
    var jt = (function () {

        // Constants
        var NS = 'jt';

        var get_attributes = function (element) {
            // Quit ASAP
            if (!element.attributes || element.attributes.length === 0) {
                return;
            }
            var ret = {};
            for (var attr in element.attributes) {
                if (element.attributes.hasOwnProperty(attr) && element.attributes[attr]) {
                    var name = element.attributes[attr].name;
                    if (name && name.substr(0, NS.length + 1) === (NS + ':')) {
                        name = name.substr(NS.length + 1);
                        ret[name] = element.attributes[attr].value || true;
                    }
                }
            }
            return ret;
        };

        var is_empty = function (object) {
            var empty = true;
            for (var member in object) {
                if (object.hasOwnProperty(member)) {
                    empty = false;
                }
            }
            return empty;
        };

        // Process an element
        var process = function (element, prargs) {
            var args = prargs || {};  // args must be defined
            // Quit ASAP:
            if (!element.tagName) {
                // Do not process text nodes
                return;
            }
            var element_has_childnodes = element.hasChildNodes();
            if (!element_has_childnodes && !element.attributes.length) {
                // No childnodes and attributes
                return;
            }
            var attributes = get_attributes(element);
            if (!element_has_childnodes && is_empty(attributes)) {
                // No childnodes and attributes
                return;
            }

            if ((attributes && attributes.ignore === 'all') || (args && args.ignore)) {
                for (var attr in attributes) {
                    element.removeAttribute(NS + ':' + attr);
                }
            } else {
                for (var attr in attributes) {
                    element.removeAttribute(NS + ':' + attr);
                    switch (attr) {
                        case 'content':
                            var counter = args.counter;
                            element.innerHTML = eval('(' + attributes[attr] + ')');
                            break;
                        case 'attr':
                            var inner = eval('(' + attributes[attr] + ')');
                            for (a in inner) {
                                element[a] = inner[a];
                            }
                            break;
                        case 'css':
                            var inner = eval('(' + attributes[attr] + ')');
                            for (a in inner) {
                                element.style[a] = inner[a];
                            }
                            break;
                        case 'repeat':
                            // Make sure we don't process the contents again
                            attributes.ignore = 'contents';
                            var callback = function () {
                                var clone = element.cloneNode(true);
                                element.parentNode.insertBefore(clone, element);
                                process(clone, { counter: counter });
                            };
                            eval(attributes[attr] + 'callback();');
                            element.parentNode.removeChild(element);
                            break;
                    }
                }
            }

            if (attributes && attributes.ignore) {
                args = { ignore: true };
            }

            if (element.hasChildNodes()) {
                for (var child = 0; child < element.childNodes.length; child++) {
                    // Recursively process children
                    process(element.childNodes[child], args);
                }
            }
        };

        // Make the process function public
        return process;

    }());

    // Dummy DOM ready event listener, based on jQuery.fn.ready()
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
            };

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

    // Process the document on ready
    ready(function () {
        jt(document.getElementsByTagName('body')[0], {});
    });

    // Export JT to the global namespace
    //window['JT'] = jt;

}());

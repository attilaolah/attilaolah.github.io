// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name ajs-min.js
// @js_externs FB.init = function (arg){};
// ==/ClosureCompiler==

// Asynchronous JavaScript loader & startup scripts for aatiis.me
(function () {
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
    })();
    // Set up Facebook Async init
    var facebook_async_init = function () { 
        FB.init({
            'appId': '108684282519237',
            'status': true,
            'cookie': true,
            'xfbml': true
        });
    };
    // Export the Facebook async init loader
    window['fbAsyncInit'] = facebook_async_init;
    // Set up the window onload event listener
    var init_facebook_div = function () {
        var div = document.createElement('div');
        div.id = 'fb-root';
        document.getElementsByTagName('body')[0].appendChild(div);
    };
    var init_main = function () {
        // List init functions here
        init_facebook_div();
    };
    // Export the window onload event listener
    window['onload'] = init_main;
    // Call the other script files from here
    asynchronous_javascript_loader('http://connect.facebook.net/en_US/all.js');
})();

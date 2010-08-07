// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name ajs-min.js
// @js_externs FB.init = function (arg){};
// ==/ClosureCompiler==

// Asynchronous JavaScript loader & startup scripts for aatiis.me
(function () {
    // API KEYS
    var api_key_fb = '108684282519237',
        api_key_ga = 'UA-13035482-3';
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
            'appId': api_key_fb,
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
    var load_external_js = function () {
        // Call the other script files from here
        asynchronous_javascript_loader('http://connect.facebook.net/en_US/all.js');
        asynchronous_javascript_loader('http://www.google-analytics.com/ga.js');
    };
    var init_main = function () {
        // List init functions here
        init_facebook_div();
        load_external_js();
    };
    // Export the window onload event listener
    window['onload'] = init_main;
    // Initialize and export Google Analytics queue
    var google_analitics_gaq = window['_gaq'] || [
        ['_setAccount', api_key_ga],
        ['_trackPageview']
    ];
    window['_gaq'] = google_analitics_gaq;
})();

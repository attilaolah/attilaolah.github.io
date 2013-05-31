// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name data-min.js
// @externs function $(arg) {};
// ==/ClosureCompiler==

(function () {

    // Wait for jQuery to load
    var wait_for_jquery_treeview = function (fn) {
        while ((typeof($) !== 'function') || !($() && $()['jquery'] && $()['treeview'])) {
            return setTimeout(function () { wait_for_jquery_treeview(fn); }, 10);
        }
        fn();
    };

    var longmonth = function (abbr) {
        switch (abbr) {
            case 'Jan':
                return 'January';
            case 'Feb':
                return 'February';
            case 'Mar':
                return 'March';
            case 'Apr':
                return 'April';
            case 'May':
                return 'May';
            case 'Jun':
                return 'June';
            case 'Jul':
                return 'July';
            case 'Aug':
                return 'August';
            case 'Sep':
                return 'September';
            case 'Oct':
                return 'October';
            case 'Nov':
                return 'November';
            case 'Dec':
                return 'December';
        }
    };

    var load_json_data = function () {
        $.get('/data.html', process_json_data);
    }

    var process_json_data = function (data) {
        var data = eval('(' + data + ')'),
            ul = $('<ul/>', { 'class': 'j-archive-list treeview' });

        for (var i in data) if (data.hasOwnProperty(i)) {
            // Append each year to the list
            var year = data[i].date.slice(26, 30);
            if (!(ul.children('.j-year-' + year)[0])) {
                ul.append($('<li/>', { 'class': 'j-year-' + year })
                  .append($('<span/>', { 'class': 'folder' }).text(year))
                );
            }
            // Append each month to the list
            var month = longmonth(data[i].date.slice(4, 7));
            if (!(ul.children('.j-year-' + year).find('.j-month-' + month.toLowerCase())[0])) {
                if (!(ul.children('.j-year-' + year).find('.j-months')[0])) {
                    ul.children('.j-year-' + year).append($('<ul/>', { 'class': 'j-months' }));
                }
                ul.children('.j-year-' + year)
                  .find('.j-months')
                  .append($('<li/>', { 'class': 'j-month-' + month.toLowerCase() })
                    .append($('<span/>', { 'class': 'folder' }).text(month))
                    .append($('<ul/>', { 'class': 'j-posts' }))
                  );
            }
            // Append each post to the list
            ul.children('.j-year-' + year)
              .find('.j-months')
              .find('.j-month-' + month.toLowerCase())
              .find('.j-posts')
              .append($('<li/>', { 'class': 'post j-post' })
                .append($('<a/>', { href: data[i].url, 'class': 'file' }).text(data[i].title))
              );
        }
        // Set up the tree view
        $('.j-archives').append(ul).find('.j-loader').remove();
        ul.treeview({
            animated: 'fast',
            collapsed: true
        });
        // Expand the first month
        $('.j-archive-list span:first').click().parent().find('ul li:first span').click()
    };

    // Load the rest of the posts if needed
    var load_bottom_data_when_needed = function () {
        // If the marker div is not present, don'n do anything.
        if ($('#previews .j-loader')[0]) {
            // Set up the scroll event listener
            $(window).scroll(load_bottom_data_once);
            // Fire in case there is no scroll event
            load_bottom_data_once();
        }
    };

    // The scroll event listener
    var load_bottom_data_once = (function () {
        var loaded = false;
        return function () {
            if (!loaded) {
                if ($(window).scrollTop() + $(window).height() >= $('#previews .j-loader').offset().top) {
                    $.ajax({
                        url: '/all-posts.html?date=' + Date().slice(4, 15).replace(/ /g,"-").toUpperCase(),
                        success: function (data) {
                            $('#previews .j-loader').remove();
                            $('#previews').append($(data).splice(16));
                        }
                    });
                    loaded = true;
                }
            }
        };
    }());

    // Load archives when jQuery is ready
    wait_for_jquery_treeview(function () {
        $(load_json_data);
        $(load_bottom_data_when_needed);
    });

}());

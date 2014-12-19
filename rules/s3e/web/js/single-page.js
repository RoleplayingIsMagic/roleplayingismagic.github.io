$(document).ready(function() {

    /* Scrolling, sticky sidebar
    ** http://stackoverflow.com/questions/1216114 */

    // set our handler
    $(window).scroll(function() {
        // Do our vars up here, to minimise multiple lookups
        // Important because this is gonna be called a DAMN HEAP
        var window_scrolltop = window.pageYOffset;  // $(window).scrollTop();
        var col_r_top = document.getElementById("col-r").getBoundingClientRect().top + window_scrolltop;  // $('#col-r').offset().top;
        var col_r_nav = document.getElementById("col-r").children[0];  // $('#col-r > div');

        if (window_scrolltop > col_r_top) {
            $(col_r_nav).addClass('static');
        } else if (window_scrolltop <= col_r_top) {
            $(col_r_nav).removeClass('static');
        }
    });

    // call to initialise
    $(window).scroll();

});

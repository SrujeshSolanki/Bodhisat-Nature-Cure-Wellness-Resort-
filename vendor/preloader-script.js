jQuery(window).load(function () {

    jQuery('#wptime-plugin-preloader').delay(250).fadeOut("slow");

    setTimeout(wptime_plugin_remove_preloader, 2000);
    function wptime_plugin_remove_preloader() {
        jQuery('#wptime-plugin-preloader').remove();
    }

});
document.addEventListener( 'wpcf7submit', function( event ) {
    console.log('Contact Form 7 stop spinner');
    jQuery('head').append('<style type="text/css">.aw-no-spinner:before{display:none!important}</style>');
    jQuery('body').find('.processing').addClass('aw-no-spinner');
}, false );
jQuery('.wpcf7-submit').on('click', function( event ) {
    jQuery('body').find('.processing').removeClass('aw-no-spinner');
});
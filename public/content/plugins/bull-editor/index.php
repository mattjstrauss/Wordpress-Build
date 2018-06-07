<?php
/**
 * Plugin Name:       Custom TinyMCE Editor by Bull Interactive
 * Description:       A plugin that replaces the WordPress login flow with a custom page.
 * Version:           1.0.0
 * Author:            By Bull Interactive 
 * License:           GPL-2.0+
 * Text Domain:       personalize-login
 */

// =============================================================================
// Redirects to the login page if not logged in and not already on the page
// =============================================================================

add_action( 'init', 'bull_buttons' );
function bull_buttons() {
    add_filter( "mce_external_plugins", "add_bull_buttons" );
    add_filter( 'mce_buttons', 'register_bull_buttons' );
}
function add_bull_buttons( $plugin_array ) {
    $plugin_array['bull'] = plugins_url( 'bull-editor/js/scripts.js', dirname(__FILE__) );
    return $plugin_array;
}
function register_bull_buttons( $buttons ) {
    array_push( $buttons, 'dropcap', 'showrecent' ); // dropcap', 'recentposts
    return $buttons;
}
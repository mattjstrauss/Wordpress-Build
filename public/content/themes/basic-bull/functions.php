<?php
/**
 * basic-bull functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package basic-bull
 */

// Custom post types
// ==================================

require_once( __DIR__ . '/inc/custom-post-types.php');

// Custom post formats
// ==================================

require_once( __DIR__ . '/inc/custom-format-types.php');

// Custom images
// ==================================

require_once( __DIR__ . '/inc/custom-images.php');

// Custom shortcodes
// ==================================

require_once( __DIR__ . '/inc/custom-shortcodes.php');

// Styles and scripts
// ==================================

require_once( __DIR__ . '/inc/enqueue.php');

// General setup
// ==================================

require_once( __DIR__ . '/inc/general-setup.php');

// Navigation(s)
// ==================================

require_once( __DIR__ . '/inc/navigation.php');

// Custom admin abilities
// ==================================

require_once( __DIR__ . '/inc/custom-admin.php');

?>
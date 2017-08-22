<?php 

/*--------------------------------------------------------------
General theme setup
--------------------------------------------------------------*/

if ( ! function_exists( 'basic_bull_general_setup' ) ) {

	function basic_bull_general_setup() {

		// Remove excess from the head
		// ==================================

		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wp_generator');
		remove_action('wp_head', 'feed_links', 2);
		remove_action('wp_head', 'index_rel_link');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'feed_links_extra', 3);
		remove_action('wp_head', 'start_post_rel_link', 10, 0);
		remove_action('wp_head', 'parent_post_rel_link', 10, 0);
		remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);

		// Add support to the head
		// ==================================

		add_theme_support( 'title-tag' );
  		
 		// Register navigations
		// ==================================

		register_nav_menus( array(
			'primary' 		=> __( 'Primary Navigation' ),
			'secondary' 	=> __( 'Secondary Navigation' ),
			'sidebar' 		=> __( 'Sidebar Navigation'),
			'footer' 		=> __( 'Footer Navigation'),
		));

		// Add thumbnail support
		// ==================================

		add_theme_support( 'post-thumbnails' ); 

		// Removes default images sizes
		// ==================================

		function remove_default_image_sizes( $sizes) {
			/* Default WordPress */
			unset( $sizes[ 'thumbnail' ]);       // Remove Thumbnail (150 x 150 hard cropped)
			unset( $sizes[ 'medium' ]);          // Remove Medium resolution (300 x 300 max height 300px)
			unset( $sizes[ 'medium_large' ]);    // Remove Medium Large (added in WP 4.4) resolution (768 x 0 infinite height)
			unset( $sizes[ 'large' ]);           // Remove Large resolution (1024 x 1024 max height 1024px)
		     
		    return $sizes;
		}
		add_filter('intermediate_image_sizes_advanced', 'remove_default_image_sizes');

		// Custom image sizes
		// ==================================

		add_image_size( 'thumbnail-horizontal', 380, 270, true ); // 380 pixels wide by 270 pixels tall, soft proportional crop mode
		add_image_size( 'medium-square', 650, 650, true ); // 650 pixels wide by 650 pixels tall, hard proportional crop mode
		add_image_size( 'wide-strip', 1280, 475, true ); // 1280 pixels wide by 475 pixels tall, hard proportional crop mode

		// SVG Support for Wordpress
		// ==================================

		function cc_mime_types($mimes) {
			
			$mimes['svg'] = 'image/svg+xml';
			return $mimes;

		}

		add_filter('upload_mimes', 'cc_mime_types');

	}

	add_action( 'after_setup_theme', 'basic_bull_general_setup' );

}

?>
<?php 

// =============================================================================
// General theme setup
// =============================================================================

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

	}

	add_action( 'after_setup_theme', 'basic_bull_general_setup' );

	// Create the necessary "front" pages
	// and assign them to a front and blog page
	// ==================================

	function reading_setting_displays() {
		// Information needed for creating the plugin's pages
		$page_definitions = array(
			'home-page' => array(
				'title' => __( 'Home'),
			),
			'posts-page' => array(
				'title' => __( 'Blog' ),
			)
		);

		foreach ( $page_definitions as $slug => $page ) {
			
			// Check that the page doesn't exist already
			$query = new WP_Query( 'pagename=' . $slug );

			if ( ! $query->have_posts() ) {
				// Add the page using the data from the array above
				wp_insert_post(
					array(
						'post_name'      => $slug,
						'post_title'     => $page['title'],
						'post_status'    => 'publish',
						'post_type'      => 'page',
						'ping_status'    => 'closed',
						'comment_status' => 'closed',
					)
				);
				 
			} 

			$homePage = get_page_by_title( 'Home' );
			$blogPage   = get_page_by_title( 'Blog' );
			update_option( 'page_for_posts', $blogPage->ID );
			update_option( 'page_on_front', $homePage->ID );
			update_option( 'show_on_front', 'page' );

		}

	}

	add_action( 'after_switch_theme', 'reading_setting_displays' );

}

?>
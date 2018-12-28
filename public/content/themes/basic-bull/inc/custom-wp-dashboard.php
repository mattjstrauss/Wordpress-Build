<?php 

/*==============================================================
Custom admin acf field abilities
==============================================================*/

if ( ! function_exists( 'basic_bull_custom_wordpress_dashboard' ) ) {

	function basic_bull_custom_wordpress_dashboard() {
	
		// Remove dashboard widgets
		// ==================================

		function remove_dashboard_meta() {

			// if ( ! current_user_can( 'administrator' ) ) {

				remove_action('welcome_panel', 'wp_welcome_panel');
				remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
				remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
				remove_meta_box( 'dashboard_primary', 'dashboard', 'normal' );
				remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
				remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
				remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
				remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
				remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
				remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');

			// }

		}

		add_action( 'admin_init', 'remove_dashboard_meta' );

		// Removes metaboxes
		function remove_metaboxes(){

			remove_meta_box( 'categorydiv', 'post', 'side' );

			remove_meta_box( 'categorydiv', 'news', 'side' );

			remove_meta_box( 'event_categorydiv', 'event', 'side' );

			remove_meta_box( 'tagsdiv-post_tag', 'post', 'side' );

			remove_meta_box( 'tagsdiv-post_tag', 'news', 'side' );

			remove_meta_box( 'event_tagdiv', 'event', 'side' );

			remove_meta_box( 'postimagediv', 'news', 'side' );

			remove_meta_box( 'postimagediv', 'event', 'side' );

			remove_meta_box( 'postimagediv', 'page', 'side' );

			remove_meta_box( 'postimagediv', 'post', 'side' );

			remove_meta_box( 'nf_admin_metaboxes_appendaform', 'page', 'side' );

			remove_meta_box( 'nf_admin_metaboxes_appendaform', 'post', 'side' );

		}

		add_action( 'do_meta_boxes', 'remove_metaboxes' );

		// Setup custom widget
		// ==================================

		function custom_page_dashboard_widgets() {
			wp_add_dashboard_widget(
				'custom_page_dashboard_widget', // Widget slug.
				'Pages', // Title.
				'page_dashboard_widget_function' // Display function.
			);
		}
		add_action( 'wp_dashboard_setup', 'custom_page_dashboard_widgets' );

		// Create the function to output the contents of your Dashboard Widget.
		// ==================================

		function page_dashboard_widget_function() { ?>

			<div class="widget">

				<h1>This widget should offer insights on page content.</h1>
				<p>You can put whatever you want here and create all of the things.</p>

			</div>

		<?php }

		// Load dashboard styles and scripts
		// ==================================

		function dashboard_scripts( $hook ) {

			$screen = get_current_screen();

			if ( 'dashboard' === $screen->id ) {
				wp_enqueue_script( 'dashboard_script', get_template_directory_uri() . '/js/admin-scripts.js', array( 'jquery' ), false, true);
				wp_enqueue_style( 'dashboard_style', get_template_directory_uri() . '/css/admin-style.css', array(), '1.0' );
			}
		}

		add_action( 'admin_enqueue_scripts', 'dashboard_scripts' );

	}


	add_action( 'after_setup_theme', 'basic_bull_custom_wordpress_dashboard' );

}

?>
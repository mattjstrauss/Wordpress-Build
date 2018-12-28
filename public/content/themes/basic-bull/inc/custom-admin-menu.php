<?php 

if ( ! function_exists( 'basic_bull_custom_admin_menu' ) ) {

	function basic_bull_custom_admin_menu() {


		// Remove certain admin menu items with specific roles
		// ==================================

		function remove_menus(){
		  
			// remove_menu_page( 'index.php' ); //Dashboard

			// if ( !current_user_can('administrator') ) {
				
				global $submenu;

				remove_menu_page( 'edit.php' ); // Posts
				// remove_menu_page( 'themes.php'); // Appearance
				remove_submenu_page( 'themes.php', 'theme-editor.php'); // Appearance - Editor
				remove_submenu_page( 'themes.php', 'customize.php?return=%2Fsite%2Fwp-admin%2Fthemes.php' ); // Appearance - Customize
				remove_menu_page( 'upload.php'); // Media
				remove_menu_page( 'edit-comments.php' ); // Comments
				remove_menu_page( 'tools.php' ); // Tools

				// remove_submenu_page( 'index.php', 'update-core.php' ); // Updates
				// remove_menu_page( 'edit.php?post_type=acf-field-group' ); // ACF Page
				// remove_submenu_page( 'plugins.php', 'plugin-editor.php' ); // Plugin Editor
				// remove_menu_page( "options-general.php" ); // Options


				add_menu_page( 'Blog Posts', 'Blog Posts', 'manage_options', 'edit.php', '', 'dashicons-welcome-widgets-menus', 6  ); // Custom "Blog Posts" menu item		
				add_menu_page( 'Navigation', 'Navigation', 'manage_options', 'nav-menus.php', '', 'dashicons-networking', 6  ); // Custom "Navigation" menu item
				add_menu_page( 'Media', 'Media', 'manage_options', 'upload.php', '', 'dashicons-format-image', 6  ); // Custom "Media" menu item

			// }
		  
		}

		add_action( 'admin_menu', 'remove_menus', 9999 );

		// Custom menu order
		// ==================================

		function optimized_menu_order( $order ) {
		
			if ( !$order ) return true;

				return array(
				    'index.php', // Dashboard
				    'separator1', // Seperator 1
				    'nav-menus.php', // Custom Navigation
				    'edit.php?post_type=page', // Pages
				    'edit.php', // Posts
				    'edit.php?post_type=post_type_name', // Custom Post Type
				    'upload.php', // Media
				    'separator2', // Seperator 2
				    'edit-comments.php', // Comments
				    'themes.php', // Appearance
				    'plugins.php', // Plugins
				    'users.php', // Users
				    'tools.php', // Tools
				    'options-general.php', // Settings
				);

		}

		add_filter( 'custom_menu_order', 'optimized_menu_order', 10, 1 );
		add_filter( 'menu_order', 'optimized_menu_order', 10, 1 );

		// Disable support for comments and trackbacks in post types
		// ==================================

		function disable_comments_post_types_support() {

			$post_types = get_post_types();

			foreach ($post_types as $post_type) {

				if(post_type_supports($post_type, 'comments')) {

					remove_post_type_support($post_type, 'comments');

					remove_post_type_support($post_type, 'trackbacks');

				}

			}

		}

		add_action('admin_init', 'disable_comments_post_types_support');

		// Close comments on the front-end
		// ==================================

		function disable_comments_status() {
			return false;
		}
		add_filter('comments_open', 'disable_comments_status', 20, 2);

		add_filter('pings_open', 'disable_comments_status', 20, 2);

		// Hide existing comments
		// ==================================

		function disable_comments_hide_existing_comments($comments) {
			$comments = array();
			return $comments;
		}
		add_filter('comments_array', 'disable_comments_hide_existing_comments', 10, 2);
		
		// Redirect any user trying to access comments page
		// ==================================

		function disable_comments_admin_menu_redirect() {
			global $pagenow;
			if ($pagenow === 'edit-comments.php') {
				wp_redirect(admin_url()); exit;
			}
		}
		add_action('admin_init', 'disable_comments_admin_menu_redirect');

		// Remove comments metabox from dashboard
		// ==================================

		function disable_comments_dashboard() {
			remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
		}

		add_action('admin_init', 'disable_comments_dashboard');

		// Remove comments links from admin bar
		// ==================================

		function disable_comments_admin_bar() {
			if (is_admin_bar_showing()) {
				remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
			}
		}

		add_action('init', 'disable_comments_admin_bar');

	}

	add_action( 'after_setup_theme', 'basic_bull_custom_admin_menu' );

}

?>
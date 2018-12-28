<?php 

/*==============================================================
Custom admin acf field abilities
==============================================================*/

if ( ! function_exists( 'basic_bull_custom_user_roles' ) ) {

	function basic_bull_custom_user_roles() {

		// Add a custom user role
		// ==================================

		$user_role = add_role( 'internal_admin', __(

			'Bull Administrator' ),

			array(

				'create_sites' => true,
				'delete_sites' => true,
				'manage_network' => true,
				'manage_sites' => true,
				'manage_network_users' => true,
				'manage_network_plugins' => true,
				'manage_network_themes' => true,
				'manage_network_options' => true,
				'upgrade_network' => true,
				'setup_network' => true,
				'activate_plugins' => true,
				'delete_others_pages' => true,
				'delete_others_posts' => true,
				'delete_pages' => true,
				'delete_posts' => true,
				'delete_private_pages' => true,
				'delete_private_posts' => true,
				'delete_published_pages' => true,
				'delete_published_posts' => true,
				'edit_dashboard' => true,
				'edit_others_pages' => true,
				'edit_others_posts' => true,
				'edit_pages' => true,
				'edit_posts' => true,
				'edit_private_pages' => true,
				'edit_private_posts' => true,
				'edit_published_pages' => true,
				'edit_published_posts' => true,
				'edit_theme_options' => true,
				'export' => true,
				'import' => true,
				'list_users' => true,
				'manage_categories' => true,
				'manage_links' => true,
				'manage_options' => true,
				'moderate_comments' => true,
				'promote_users' => true,
				'publish_pages' => true,
				'publish_posts' => true,
				'read_private_pages' => true,
				'read_private_posts' => true,
				'read' => true,
				'remove_users' => true,
				'switch_themes' => true,
				'upload_files' => true,
				'customize' => true,
				'delete_site' => true,
				'update_core' => true,
				'update_plugins' => true,
				'update_themes' => true,
				'install_plugins' => true,
				'install_themes' => true,
				'upload_plugins' => true,
				'upload_themes' => true,
				'delete_themes' => true,
				'delete_plugins' => true,
				'edit_plugins' => true,
				'edit_themes' => true,
				'edit_files' => true,
				'edit_users' => true,
				'create_users' => true,
				'delete_users' => true,
				'unfiltered_html' => true,
				'delete_others_pages' => true,
				'delete_others_posts' => true,
				'delete_pages' => true,
				'delete_posts' => true,
				'delete_private_pages' => true,
				'delete_private_posts' => true,
				'delete_published_pages' => true,
				'delete_published_posts' => true,
				'edit_others_pages' => true,
				'edit_others_posts' => true,
				'edit_pages' => true,
				'edit_posts' => true,
				'edit_private_pages' => true,
				'edit_private_posts' => true,
				'edit_published_pages' => true,
				'edit_published_posts' => true,
				'manage_categories' => true,
				'manage_links' => true,
				'moderate_comments' => true,
				'publish_pages' => true,
				'publish_posts' => true,
				'read' => true,
				'read_private_pages' => true,
				'read_private_posts' => true,
				'upload_files' => true,
				'delete_posts' => true,
				'delete_published_posts' => true,
				'edit_posts' => true,
				'edit_published_posts' => true,
				'publish_posts' => true,
				'read' => true,
				'upload_files' => true,
				'delete_posts' => true,
				'edit_posts' => true,
				'read' => true

			)

		);

		
		// If current user is internal_admin don't allow them to create "super users"
		// ==================================

		function wdm_user_role_dropdown($user_roles) {

		    if( current_user_can('internal_admin') ) {
		        
		        unset($user_roles['administrator']);

		    }

		    return $user_roles;
		}

		add_action('editable_roles','wdm_user_role_dropdown');	

		// Hide Administrator from users list and user list count
		// ==================================
		if ( !current_user_can( 'administrator' ) ) { 
		
			function isa_pre_user_query( $user_search ) {
				global $wpdb;

				$user_search->query_where = str_replace(
					'WHERE 1=1', 
					"WHERE 1=1 AND {$wpdb->users}.ID IN (
					  SELECT {$wpdb->usermeta}.user_id FROM $wpdb->usermeta 
					  WHERE {$wpdb->usermeta}.meta_key = '{$wpdb->prefix}capabilities'
					  AND {$wpdb->usermeta}.meta_value NOT LIKE '%administrator%' )", 
					$user_search->query_where
				);
			}

			add_action( 'pre_user_query', 'isa_pre_user_query' );

			function hide_user_count(){ ?>
				
				<style>
					.wp-admin.users-php span.count,
					.wp-admin.users-php li.administrator {
						display: none;
					}
				</style>
			<?php }
		 
			add_action('admin_head','hide_user_count');

		}

	}

	add_action( 'after_setup_theme', 'basic_bull_custom_user_roles' );

}

?>
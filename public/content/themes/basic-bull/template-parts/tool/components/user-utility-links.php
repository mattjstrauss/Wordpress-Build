<?php if ( ( is_plugin_active( 'bull-login/index.php' ) && is_user_logged_in() ) ) : ?>

	<div class="site-utilities inactive-utilities" role="complementary">
	
		<?php wp_loginout( home_url() ); ?> 

		<a href="<?php echo get_edit_user_link(); ?>">Profile</a>

		<?php  

			$current_user = wp_get_current_user();

			if ( !empty( $current_user ) ) {

				if(current_user_can('create_users')) {

					echo '<a href="'.wp_registration_url().'">Register User</a>';
				
				}

			}

		?>

		<a href="#" class="settings-button">
		
			<i class="icon icon-ui settings-icon">

				<svg><use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-ui-settings"></use><svg>

            </i>

		</a>

	</div>

<?php endif; ?>
<div id="masthead" class="section section-header site-header" role="banner">

	<div class="site-header-container">
				
		<div class="site-branding">

			<a href="<?php echo get_bloginfo('url'); ?>" class="logo">

				<?php get_template_part( 'template-parts/components/logos/company', 'logo' ); ?>

			</a>

			<a href="#" class="menu-button">
				
				<span class="bars"></span>

			</a>

		</div><!-- .site-branding -->

		<?php
		
			// Detect if login plugin is activated then show only if logged in
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

			if ( ( is_plugin_active( 'bull-login/index.php' ) && is_user_logged_in() ) || !is_plugin_active( 'bull-login/index.php' ) ) : 

		?>

			<div class="site-search" role="search">

				<?php get_template_part( 'template-parts/forms/site', 'search' ); ?>

			</div><!-- .site-search -->

		<?php endif; ?>

		<div class="site-navigation" role="navigation">
			
			<?php get_template_part( 'template-parts/navigation/main', 'navigation' ); ?>

		</div><!-- .site-navigation -->

		<div class="site-social-links" role="complementary">
			
			<?php get_template_part( 'template-parts/social-media/social', 'links' ); ?>

		</div><!-- .site-social-links -->

		<?php get_template_part( 'template-parts/tool/components/user-utility', 'links' ); ?>		

	</div><!-- .site-header-container -->

</div><!-- #masthead -->

<?php if ( ( is_plugin_active( 'bull-login/index.php' ) && is_user_logged_in() ) || !is_plugin_active( 'bull-login/index.php' ) ) :  ?>

	<div class="site-search header-search" role="search">

		<?php get_template_part( 'template-parts/forms/site', 'search' ); ?>

	</div><!-- .site-search -->

<?php endif; ?>
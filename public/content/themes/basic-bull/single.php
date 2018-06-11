<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package settlementmusic
 */

get_header(); ?>

<div id="primary" class="content-area">

	<div id="main" class="main-container" role="main">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'template-parts/content', get_post_type() ); ?>
			
		<?php endwhile; ?>

	</div><!-- #main -->

</div><!-- #primary -->

<?php get_footer(); ?>
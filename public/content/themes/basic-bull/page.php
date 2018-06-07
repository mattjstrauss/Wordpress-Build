<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package cohere-foundation
 */

	get_header();
 ?>

<div id="primary" class="content-area">

	<div id="main" class="section section-main" role="main">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'template-parts/tool/page/page', 'title' ); ?>

			<?php get_template_part( 'template-parts/tool/page/page', 'content' ); ?>

			<?php get_template_part( 'template-parts/tool/page/page', 'sidebar' ); ?>

			<?php get_template_part( 'template-parts/page/page', 'components' ); ?>

			<?php get_template_part( 'template-parts/tool/page/page', 'footer' ); ?>				
		<?php endwhile; ?>

	</div><!-- #main -->

	<?php edit_post_link('Edit', '', '','','admin-link button edit-button'); ?>

	<?php get_template_part( 'template-parts/tool/components/view', 'counter' );  ?>

</div><!-- #primary -->

<?php get_footer(); ?>

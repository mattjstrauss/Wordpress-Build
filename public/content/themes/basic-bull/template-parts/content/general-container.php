<?php 

	if ( get_sub_field( 'general_content' ) ) :

?>

	<div class="component general-component">

		<?php the_sub_field( 'general_content' );  ?>

	</div>

	<?php get_template_part( 'template-parts/components/backgrounds/component', 'background' ); ?>

<?php endif; ?>
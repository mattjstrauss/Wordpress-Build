<?php if( have_rows('tabs_panel') ): ?>

	<div class="component tabs-component" role="presentation">

		<div class="tab-list" role="tablist">

			<?php while ( have_rows('tabs_panel') ) : the_row(); ?>

				<button class="tab" aria-selected="false" role="tab">

					<?php get_template_part( 'template-parts/components/tabs/tab', 'label' );  ?>

				</button>

			<?php endwhile; ?>

		</div>

		<?php while ( have_rows('tabs_panel') ) : the_row(); ?>

			<?php get_template_part( 'template-parts/components/tabs/tab', 'panel' );  ?>

		<?php endwhile; ?>

	</div>

<?php endif; ?>
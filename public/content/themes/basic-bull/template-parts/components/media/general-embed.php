<?php
	
	// General embed
	$generalEmbed = get_sub_field('embed_code');

	// Media caption
	$mediaCaption = get_sub_field('media_caption');

?>

<?php if( $generalEmbed ): ?>

	<figure>

		<div class="media-container">

			<div class="responsive-embed">

				<div class="embed-object">
				
					<?php echo $generalEmbed; ?>

				</div>

			</div>

		</div>

		<?php if ( $mediaCaption ) : ?>

			<figcaption>

				<?php get_template_part( 'template-parts/components/media/media', 'caption' ); ?>

			</figcaption>

		<?php endif; ?>

	</figure>

<?php endif; ?>
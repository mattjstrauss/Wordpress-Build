<?php
	
	// Audio embed
	$audioEmbed = get_sub_field('audio_embed');

	// Media caption
	$mediaCaption = get_sub_field('media_caption');

?>

<?php if( $audioEmbed ): ?>

	<figure>

		<div class="media-container">

			<div class="responsive-embed responsive-audio">

				<div class="audio-object">
				
					<?php echo $audioEmbed; ?>

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
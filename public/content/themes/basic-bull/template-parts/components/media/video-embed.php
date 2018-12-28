<?php
	
	// Video embed
	$videoEmbed = get_sub_field('video_embed');

	// Media caption
	$mediaCaption = get_sub_field('media_caption');

?>

<?php if( $videoEmbed ): ?>

	<figure>

		<div class="media-container">

			<div class="responsive-embed">

				<div class="video-object">
				
					<?php echo $videoEmbed; ?>

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
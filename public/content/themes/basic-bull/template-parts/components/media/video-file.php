<?php
	
	// Video embed
	$videoFile = get_sub_field('video_file');

	// Media caption
	$mediaCaption = get_sub_field('media_caption');

	// Image object
	$imageObject = get_sub_field('image');
	$posterUrl = "";

	if( !empty($imageObject) ) {

		$posterUrl = 'poster="'.$imageObject['url'].'"';

	}

?>

<?php if( $videoFile ): ?>

	<figure>

		<div class="media-container">

			<div class="responsive-embed responsive-video">
				
				<video <?php echo $posterUrl; ?> playsinline controls class="video-object">
				    
				    <source src="<?php echo $videoFile; ?>" type="video/mp4">

				</video>

			</div>

		</div>

		<?php if ( $mediaCaption ) : ?>

			<figcaption>

				<?php get_template_part( 'template-parts/components/media/media', 'caption' ); ?>

			</figcaption>

		<?php endif; ?>

	</figure>

<?php endif; ?>
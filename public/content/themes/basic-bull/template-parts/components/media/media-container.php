<?php

	// Media types
	$mediaType = get_sub_field('media_type');

	// Video fields
	$videoSource = get_sub_field('video_source');
	$videoEmbed = get_sub_field('video_embed');
	$videoFile = get_sub_field('video_file');

	// Audio fields
	$audioSource = get_sub_field('audio_source');
	$audioEmbed = get_sub_field('audio_embed');
	$audioFile = get_sub_field('audio_file');

	// Image object
	$imageObject = get_sub_field('image');

	// Embed fields
	$embedCode = get_sub_field('embed_code');

	// Media caption
	$mediaCaption = get_sub_field('media_caption');

	$mediaContent = false;

	if ( !empty($imageObject) || !empty($videoFile) || !empty($videoEmbed) || !empty($audioFile) || !empty($audioEmbed) || !empty($embedCode) ):

?>

	<div class="component media-component <?php echo $mediaType; ?>-component">

		<?php if ( $mediaType == "image" && !empty( $imageObject ) ) : ?>

			<?php $mediaContent = true; ?>

				<?php get_template_part( 'template-parts/components/media/image', 'object' );  ?>

		<?php elseif ( $mediaType == "video" ) : ?>

			<?php if ( $videoSource == "upload" && !empty( $videoFile ) ) : ?>

				<?php $mediaContent = true; ?>

				<?php get_template_part( 'template-parts/components/media/video', 'file' );  ?>

			<?php elseif ( $videoSource !== "upload" && !empty( $videoEmbed ) ) : ?>

				<?php $mediaContent = true; ?>

				<?php get_template_part( 'template-parts/components/media/video', 'embed' );  ?>

			<?php endif; ?>

		<?php elseif ( $mediaType == "audio" ) : ?>

			<?php if ( $audioSource == "service" ) : ?>

				<?php get_template_part( 'template-parts/components/media/audio', 'embed' );  ?>

			<?php elseif ( $audioSource == "upload" ) : ?>

				<?php get_template_part( 'template-parts/components/media/audio', 'file' );  ?>

			<?php endif; ?>

		<?php elseif ( $mediaType == "embed" ) : ?>	

			<?php get_template_part( 'template-parts/components/media/general', 'embed' );  ?>

		<?php endif; ?>

	</div>

<?php endif; ?>

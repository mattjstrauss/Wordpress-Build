<?php

	// Audio object
	$audioObject = get_sub_field('audio_file');
	$audioTitle = "";
	$audioCaption = "";
	$audioArtist = "";
	$audioAlbum = "";
	$albumCover = "";
	$mediaIcon = "";
	$audioLink = "";

	if( !empty($audioObject) ): 

		// vars
		$url = $audioObject['url'];
		$audioTitle = $audioObject['title'];
		$audioCaption = $audioObject['caption'];
		$metaInfo = wp_get_attachment_metadata( $audioObject['ID'], true );
		$audioArtist = $metaInfo['artist'];
		$audioAlbum = $metaInfo['album'];
		$albumCover = get_field('album_cover', $audioObject['ID']);
		$mediaIcon = $audioObject['icon'];

		// Media caption (override)
		$mediaCaption = get_sub_field('media_caption');

?>

	<figure>

		<div class="media-container audio-container">

			<div class="audio-player loading">
				
				<div class="track-info"><!-- .track-info -->

					<?php 

					if( !empty($albumCover) ): 

						// vars
						$coverUrl = $albumCover['url'];
						$coverTitle = $albumCover['title'];
						$coverAlt = $albumCover['alt'];

						// thumbnail
						// $size = '';
						// $full = $imageObject['sizes'][ $size ];

						if ( !empty($coverAlt) ) {
							$coverAlt = 'alt="'.$coverAlt.'"';
						}

						if ( !empty($alt) ) {
							$coverTitle = 'title="'.$coverTitle.'"';
						} 

					?>
					
						<div class="track-thumbnail" style="background-image: url('<?php echo $coverUrl; ?>');">

							<img src="<?php echo $coverUrl; ?>" <?php echo $coverAlt; ?> <?php echo $coverTitle; ?> class="srt-only"/>
							
						</div>

					<?php endif; ?>

					<div class="track-details">

						<?php if( !empty($audioArtist) ): ?>

							<div class="track-artist">

								<span><?php echo $audioArtist; ?></span>
						
							</div>

						<?php endif; ?>

						<?php if( !empty($audioTitle) ): ?>

								<div class="track-title">

									<h5><?php echo $audioTitle; ?></h5>
							
								</div>

							<?php endif; ?>

						<?php if( !empty($audioAlbum) ): ?>

							<div class="track-album">

								<span><?php echo $audioAlbum; ?></span>
						
							</div>

						<?php endif; ?>

					</div>

				</div><!-- .track-info -->

				<div class="track-controls">
					
					<a href="#" class="track-play-pause">
						
						<i class="icon ui-icon play-pause-icon"></i>

					</a>

					<div class="track-time current-time">
						
						<span>0:00</span>

					</div>

					<div class="track-time track-progress">

						<div class="range-slider">
						  
						  <input type="range" min="0" max="1" val="1" step="1">

						</div>

					</div>

					<div class="track-time total-time">
						
						<span>0:00</span>

					</div>

					<div class="track-volume">
						
						<div class="volumn-button">

							<i class="icon ui-icon volume-icon">

								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<g class="speaker">
										<path fill="currentColor" d="M0,7.7v8h5.3l6.7,6.7V1L5.3,7.7H0z"/>
									</g>
									<g class="sound">
										<path fill="currentColor" d="M14.7,0v2.7c3.9,1.1,6.7,4.7,6.7,8.9c0,4.2-2.8,7.8-6.7,8.9v2.8c5.3-1.2,9.3-6,9.3-11.7C24,6,20,1.2,14.7,0z"/>
										<path fill="currentColor" d="M18,11.7c0-2.4-1.3-4.4-3.3-5.4V17C16.7,16.1,18,14,18,11.7z"/>
									</g>
								</svg>

							</i>
							
						</div>

						<div class="range-slider">
						  
						  <input type="range" min="0" max="1" val="1" step=".1">

						</div>

					</div>

				</div>

				<audio controls preload="auto" class="srt-only">
					<source src="<?php echo $url; ?>" type="audio/mpeg">
				</audio>

			</div>

		</div>

		<?php if( $audioCaption || $mediaCaption ): ?>
	
			<figcaption>

				<?php if ( $mediaCaption ) {

					get_template_part( 'template-parts/components/media/media', 'caption' );

				} else {

					echo '<p>'.$audioCaption.'</p>';

				} ?>

				<?php if( $audioLink ): ?>

					<a href="<?php echo $audioLink['url']; ?>" target="<?php echo $audioLink['target']; ?>" class="media-source"><?php echo $audioLink['title']; ?></a>

				<?php endif; ?>

			</figcaption>		
							
		<?php endif; ?>

	</figure>

<?php endif; ?>
<?php if (get_sub_field('map')): ?>

	<div class="map-container">

		<?php $location = get_sub_field('map'); ?>

		<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>">
			
			<?php 

				$locationInfo = "";
				$locationName = "";
				$locationStreetAddress = "";
				$locationCity = "";
				$locationState = "";
				$locationZip = "";
				$locationAddress = "";

				if ( get_sub_field('location_info') ):

					$locationInfo = get_sub_field('location_info');
					$locationName = $locationInfo['name'];
					$locationStreetAddress = $locationInfo['street_address'];
					$locationCity = $locationInfo['city'];
					$locationState = $locationInfo['state'];
					$locationZip = $locationInfo['zip_code'];

			?>

				<span class="info-window">

					<?php if ( !empty($locationName) ) : ?>
						
						<h5><?php echo $locationName; ?></h5>

					<?php endif; ?>

					<?php 

						if ( !empty($locationStreetAddress) ) {

							$locationAddress .= $locationStreetAddress; 
							$locationAddress .= '<br>';

						}

						if ( !empty($locationCity) ) {
					
							$locationAddress .= $locationCity;
							$locationAddress .= ', ';

						}

						if ( !empty($locationState) ) {
					
							$locationAddress .= $locationState;

						}

						if ( !empty($locationZip) ) {
					
							$locationAddress .= ' '.$locationZip;

						}

						if ( !empty($locationAddress) ) :

					?>

						<p class="location-address">

							<?php echo $locationAddress; ?>

						</p>

					<?php endif; ?>

				</span>

			<?php endif ?>

		</div>

	</div>

<?php endif; ?>
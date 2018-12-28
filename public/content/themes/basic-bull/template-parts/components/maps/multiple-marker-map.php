<div class="section section-property-map multiple-markers">

		<div class="acf-map">

			<?php while ( $propertyDirectoryMap->have_posts() ) : $propertyDirectoryMap->the_post(); ?>

					<?php if (get_field('location_map')): ?>

						<?php $location = get_field('location_map'); ?>

						<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>">
							
							<span class="info-window">

								<h2>

									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>

								</h2>

								<p class="property-address">

									<span class="property-city-state-zip">
										<?php echo the_field('property_location_city'); ?>, <?php echo the_field('property_location_state'); ?>
									</span>
								</p>
								<a href="<?php the_permalink(); ?>" class="button button-black">View Property</a>

							</span>

						</div>

					<?php endif; ?>

			<?php endwhile; ?>

			<?php wp_reset_query(); ?>

		</div>
	
	</div>
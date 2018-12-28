function audioPlayers() {

    if ( $('.audio-player').length ) {

        $('.audio-player').each(function(){
     
            var $audioPlayer = $(this);
            var $audioObject = $audioPlayer.find('audio')[0];
            var $currentTimeDisplay = $audioPlayer.find('.current-time span');
            var $totalTimeDisplay = $audioPlayer.find('.total-time span');
            var $currentTime = $audioObject.currentTime;
            var $playPauseButton = $audioPlayer.find('.track-play-pause');
            var $progressRange = $audioPlayer.find('.track-progress input[type="range"]');
            var $volumeRange = $audioPlayer.find('.track-volume input[type="range"]');
            var $volumeButton = $audioPlayer.find('.volumn-button');

            // Onces the audio is loaded
            if( $audioObject.readyState >= 1 ) {

                // Remove loading state once 100% loaded
                $audioPlayer.removeClass('loading');

                // Determine initial the audio track times
                var $audioLength = $audioObject.duration,
                    $minutes = parseInt($audioLength / 60, 10),
                    $seconds = parseInt($audioLength % 60),
                    $totalTime = $minutes + ":" + ($seconds < 10 ? "0" + $seconds : $seconds);
               
                // Update the time to show the audio tracks total duration
                $totalTimeDisplay.html($totalTime);

                // Set input max to be the audio duration value
                $progressRange.attr('max', Math.floor($audioLength));

                // Update the track time and input
                $progressRange.on('input', function(e){

                   var $min = e.target.min,
                      $max = e.target.max,
                      $val = e.target.value,
                      $inputPercentage = $val * 100 / $max;

                   // Update the value to be relative to the max which is the duration of the audio
                   $progressRange.attr('val', e.target.value);

                   // Update the fill of the input
                   $(this).css({
                      'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                   });

                   // Change the audio track to play based on the value of the input
                   $audioObject.currentTime = $val;

                });

                 // Update the track volumn and input
                $volumeRange.on('input', function(e){

                    var $min = e.target.min,
                        $max = e.target.max,
                        $val = e.target.value,
                        $inputPercentage = $val * 100 / $max;

                    // Update the value to be relative to the max which is the duration of the audio
                    $volumeRange.attr('val', e.target.value);

                    // Update the fill of the input
                    $(this).css({
                        'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                    });

                    // Change the audio track to play based on the value of the input
                    $audioObject.volume = $val;

                    if ( $val == 0 ) {

                        $audioPlayer.addClass('muted');

                    } else {

                        $audioPlayer.removeClass('muted');

                    }

                });

            } else {
                
                $audioObject.addEventListener('loadedmetadata', function (){

                    // Remove loading state once 100% loaded
                    $audioPlayer.removeClass('loading');

                    // Determine initial the audio track times
                    var $audioLength = $audioObject.duration,
                        $minutes = parseInt($audioLength / 60, 10),
                        $seconds = parseInt($audioLength % 60),
                        $totalTime = $minutes + ":" + ($seconds < 10 ? "0" + $seconds : $seconds);
                   
                    // Update the time to show the audio tracks total duration
                    $totalTimeDisplay.html($totalTime);

                    // Set input max to be the audio duration value
                    $progressRange.attr('max', Math.floor($audioLength));

                    // Update the track time and input
                    $progressRange.on('input', function(e){

                       var $min = e.target.min,
                          $max = e.target.max,
                          $val = e.target.value,
                          $inputPercentage = $val * 100 / $max;

                       // Update the value to be relative to the max which is the duration of the audio
                       $progressRange.attr('val', e.target.value);

                       // Update the fill of the input
                       $(this).css({
                          'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                       });

                       // Change the audio track to play based on the value of the input
                       $audioObject.currentTime = $val;

                    });

                     // Update the track volumn and input
                    $volumeRange.on('input', function(e){

                        var $min = e.target.min,
                            $max = e.target.max,
                            $val = e.target.value,
                            $inputPercentage = $val * 100 / $max;

                        // Update the value to be relative to the max which is the duration of the audio
                        $volumeRange.attr('val', e.target.value);

                        // Update the fill of the input
                        $(this).css({
                            'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                        });

                        // Change the audio track to play based on the value of the input
                        $audioObject.volume = $val;

                        if ( $val == 0 ) {

                            $audioPlayer.addClass('muted');

                        } else {

                            $audioPlayer.removeClass('muted');

                        }

                    });

                });

            }

             // Update values when the track time changes
             $audioObject.addEventListener('timeupdate', function (){

                var $currentTime = $audioObject.currentTime,
                    $audioLength = $audioObject.duration,
                    $playPercent = 100 * ($currentTime / $audioLength),
                    $currentHour = parseInt($currentTime / 3600) % 24,
                    $currentMinute = parseInt($currentTime / 60) % 60,
                    $currentSecondsLong = $currentTime % 60,
                    $currentSeconds = $currentSecondsLong.toFixed(),
                    $currentTimeFormat = ($currentMinute < 10 ? "" + $currentMinute : $currentMinute) + ":" + ($currentSeconds < 10 ? "0" + $currentSeconds : $currentSeconds);

                // Update the display of current play time
                $currentTimeDisplay.html($currentTimeFormat);

                // Update the range slider value to match (rounding down)
                $progressRange.attr('val', Math.floor($currentTime));

                 // If its not being played then do so, else pause
                if ( !$audioPlayer.hasClass('playing') ) {

                    // Update the appearance of the range slider to show progress
                    $progressRange.css({
                        'backgroundSize': Math.ceil($playPercent) + '% 100%'
                    });

                } else {

                    // Update the appearance of the range slider to show progress
                    $progressRange.css({
                        'backgroundSize': $playPercent + '% 100%'
                   });


                }  

            });

            // Update values when the track volume changes
            $audioObject.addEventListener('volumechange', function (){

                $volumeRange.attr('val', $audioObject.volume);

                $volumeRange.css({
                    'backgroundSize': Math.ceil($audioObject.volume * 100) + '% 100%'
                });

                if ( $audioObject.volume == 0 ) {

                    $audioPlayer.addClass('muted');

                } else {

                    $audioPlayer.removeClass('muted');

                }

            });

            $volumeButton.on('click', function(e){

                if( $audioObject.volume > 0) {

                    // Store current volumn to reset on unmute
                    $resetVolume = $audioObject.volume;
                    $audioObject.volume = 0;

                } else {

                    $audioObject.volume = $resetVolume;

                }

            });

             // When audio is paused remove class playing
             $audioObject.addEventListener('pause', function() {

                $audioPlayer.removeClass('playing');

             });

             // When audio is playing add class playing
             $audioObject.addEventListener('playing', function(e) {

                $audioPlayer.addClass('playing');

                // Pause all "other" audio tracks
                $.each($('audio'), function () {

                      if(this != e.target){
                      this.pause();
                   }

                });

             });

             // When audio has finished playing reset
             $audioObject.addEventListener('ended', function() {

                $audioPlayer.removeClass('playing');

                $audioObject.currentTime = 0;

             });

             // When play/pause UI has been clicked
             $playPauseButton.on('click', function(e){

                e.preventDefault();

                // Pause all "other" audio tracks
                $.each($('audio'), function () {
                      this.pause();
                });

                // If its not being played then do so, else pause
                if ( !$audioPlayer.hasClass('playing') ) {

                   $audioObject.play();

                } else {

                   $audioObject.pause();

                }  

             });

        });

    }

};
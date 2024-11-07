 var video = document.getElementById('video');
        var videoUrl = 'https://cors-anywhere.herokuapp.com/https://s06.nm-cdn.top/files/80991034/a/2/2.m3u8';  // Your m3u8 link

        // Check if HLS.js is supported
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                console.log('Manifest loaded');
                video.play();
            });

            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    console.error('Error occurred: ', data);
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
            video.addEventListener('canplay', function() {
                video.play();
            });
        } else {
            console.error('HLS is not supported in your browser.');
        }

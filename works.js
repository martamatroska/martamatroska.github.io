document.getElementById('lavalamp').addEventListener('click', function(e) {
    e.preventDefault();

    let lava = document.getElementById('lava');
    let isDark = document.body.classList.contains("dark");

    if (isDark) {
        document.body.classList.remove("dark");
        lava.style.display = "none";
    } else {
        document.body.classList.add("dark");
        lava.style.display = "block";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.filter-link');
    const videoBlocks = document.querySelectorAll('.video-block');
    const videosToControl = document.querySelectorAll('.lazy-video');

    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterType = this.getAttribute('data-type');

            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            videoBlocks.forEach(block => {
                if (filterType === 'all' || block.classList.contains(filterType)) {
                    block.classList.remove('hidden');
                } else {
                    block.classList.add('hidden');
                }
            });
        });
    });

    const playVideo = (videoElement) => {
        if (!videoElement.src && videoElement.dataset.src) {
            loadVideo(videoElement, () => videoElement.play().catch(() => {}));
        } else {
            videoElement.play().catch(() => {});
        }
    };

    const pauseVideo = (videoElement) => {
        videoElement.pause();
    };

    const hidePlayMessage = (videoElement) => {
        const message = videoElement.parentNode.querySelector('.play-message');
        if (message) {
            message.classList.add('hidden');
        }
    };

    const loadVideo = (videoElement, callback) => {
        if (videoElement.dataset.src && !videoElement.src) {
            videoElement.src = videoElement.dataset.src;
            videoElement.preload = 'metadata';
            if (callback) {
                videoElement.addEventListener('loadeddata', function onLoaded() {
                    videoElement.removeEventListener('loadeddata', onLoaded);
                    callback();
                });
                videoElement.load();
            } else {
                videoElement.load();
            }
        } else if (callback && videoElement.readyState >= 2) {
            callback();
        } else if (callback) {
            videoElement.addEventListener('loadeddata', function onLoaded() {
                videoElement.removeEventListener('loadeddata', onLoaded);
                callback();
            });
        }
    };

    const displayFirstFrame = (videoElement) => {
        videoElement.play().then(() => {
            videoElement.pause();
            videoElement.currentTime = 0;
            hidePlayMessage(videoElement);
        }).catch(() => {});
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src && !video.src) {
                    video.src = video.dataset.src;
                    video.preload = 'metadata';
                    video.load();
                    video.addEventListener('loadeddata', function onFirstLoad() {
                        video.removeEventListener('loadeddata', onFirstLoad);
                        displayFirstFrame(video);
                    });
                }
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '300px 0px',
        threshold: 0
    });

    videosToControl.forEach(video => {

        videoObserver.observe(video);

        video.addEventListener('mouseover', function() {
            if (!this.src && this.dataset.src) {
                loadVideo(this, () => {
                    playVideo(this);
                    hidePlayMessage(this);
                });
            } else {
                playVideo(this);
                hidePlayMessage(this);
            }
        });

        video.addEventListener('mouseout', function() {
            pauseVideo(this);
        });

        video.addEventListener('touchstart', function() {
            if (!this.src && this.dataset.src) {
                loadVideo(this, () => {
                    playVideo(this);
                    hidePlayMessage(this);
                });
            } else {
                playVideo(this);
                hidePlayMessage(this);
            }
        });

        video.addEventListener('touchend', function() {
            pauseVideo(this);
        });

        video.addEventListener('touchcancel', function() {
            pauseVideo(this);
        });
    });
});

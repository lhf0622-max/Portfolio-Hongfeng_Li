document.addEventListener('DOMContentLoaded', () => {

    const video = document.getElementById('animationVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    if (video) {
        // The video's initial state is paused.
        video.pause();
        if (playPauseBtn) playPauseBtn.innerText = "PLAY";

        // Play/Pause Logic
        const togglePlay = (e) => {
            if (e) e.stopPropagation();
            if (video.paused) {
                video.play();
                if (playPauseBtn) playPauseBtn.innerText = "PAUSE";
            } else {
                video.pause();
                if (playPauseBtn) playPauseBtn.innerText = "PLAY";
            }
        };

        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);

        // Click on the video: Double-click to zoom in (full screen), single-click to play/pause.
        let clickTimer = null;
        video.addEventListener('click', (e) => {
            if (clickTimer == null) {
                clickTimer = setTimeout(() => {
                    clickTimer = null;
                    togglePlay(e);
                }, 300);
            } else {
                clearTimeout(clickTimer);
                clickTimer = null;
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            }
        });

        // Click on the progress bar to jump to a specific video time.
        progressContainer.addEventListener('click', (e) => {
            e.stopPropagation();

            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const clamped = Math.max(0, Math.min(1, pos));

            video.currentTime = clamped * video.duration;
        });


        // Update progress bar display
        video.addEventListener('timeupdate', () => {

            const percentage = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percentage + '%';

        });

        // Mute control
        if (muteBtn) {
            muteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                muteBtn.innerText = video.muted ? "SOUND: OFF" : "SOUND: ON";
            });
        }
    }

    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
        const swiperConfigs = {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            // Add Configuration
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            effect: 'fade',
            fadeEffect: { crossFade: true },
        };

        ['.mySwiper', '.mySwiper2', '.mySwiper3'].forEach(selector => {
            if (document.querySelector(selector)) {
                new Swiper(selector, swiperConfigs);
            }
        });
    }

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".reveal").forEach(elem => {
            gsap.to(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 2.2,
                ease: "power4.out"
            });
        });
    }

    /// Swiper Image Click for Fullscreen
    // Swiper Image Single Click to Enter/Exit Fullscreen
    document.querySelectorAll('.swiper-slide img').forEach(img => {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', (e) => {
            e.stopPropagation();

            if (document.fullscreenElement === img) {
                document.exitFullscreen();
                img.style.cursor = 'zoom-in';
                return;
            }

            if (!document.fullscreenElement) {
                if (img.requestFullscreen) {
                    img.requestFullscreen();
                } else if (img.webkitRequestFullscreen) {
                    img.webkitRequestFullscreen();
                } else if (img.msRequestFullscreen) {
                    img.msRequestFullscreen();
                }
                img.style.cursor = 'zoom-out';
            }
        });
    });

    // Fix bug
    document.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });

    // 恢复鼠标样式
    document.addEventListener('fullscreenchange', () => {
        document.querySelectorAll('.swiper-slide img').forEach(img => {
            img.style.cursor = document.fullscreenElement === img ? 'zoom-out' : 'zoom-in';
        });
    });

});
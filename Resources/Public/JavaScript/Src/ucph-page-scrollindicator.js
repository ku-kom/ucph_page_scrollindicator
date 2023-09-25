/**
 * Class to add and update progress bar on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const runScrollIndicator = () => {

        /**
         * Check if global debounce() and reducedMotion() exits
         */
        if (typeof debounce !== 'function' && typeof reduceMotion !== 'function' && reduceMotion() === true) {
            return;
        }

        /**
         * Progress element - check if it exists.
         */
        const progress = document.querySelectorAll('.progress');

        class Progress {
            constructor(progress) {
                this.progress = progress;
                this.progressbar = this.progress.querySelector('.progress-bar');
                const root = document.querySelector(':root');
                root.style.setProperty('--ucph-scrollindicator-height', '.5rem');
                this.updateProgress();
                this.addEventListeners();
            }

            scrollProgress() {
                /**
                 * Update progress bar with current scroll distance.
                 */
                let winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                let scrolled = (winScroll / height) * 100;
                scrolled = isNaN(Number(scrolled)) ? 0 : Math.round(scrolled);
                this.progress.setAttribute('aria-valuenow', scrolled);
                this.progress.setAttribute('aria-label', 'Scroll progress: ' + scrolled + '%');
                this.progressbar.style.setProperty('--scrollPercentage', scrolled + '%');
            }

            updateProgress() {
                /**
                 * Add/remove class depending on scroll distance from top of window.
                 */
                if (this.progress) {
                    this.scrollProgress();
                    let scollPosition = window.pageYOffset || document.documentElement.scrollTop;
                    this.progress.classList.toggle('in-view', scollPosition > 60);
                }
            }

            addEventListeners() {
                /**
                 * Passive:true can be used instead of throttle(). Debounce events for optimal performance.
                 */
                document.addEventListener('scroll', () => {
                    this.updateProgress();
                }, {
                    capture: false,
                    passive: true
                });

                window.addEventListener('resize', debounce(() => {
                    this.updateProgress();
                }, 150));

                window.addEventListener('orientationchange', debounce(() => {
                    this.updateProgress();
                }, 150));
            }
        }

        /**
         * Assign scroll indicator to elements.
         */
        if (progress) {
            progress.forEach((progress) => {
                const progressEl = new Progress(progress);
            });
        }
    }
    runScrollIndicator();

    document.addEventListener('resize', debounce(function () {
        runScrollIndicator();
    }, 150));

    document.addEventListener('orientationchange', debounce(function () {
        runScrollIndicator();
    }, 150));
});

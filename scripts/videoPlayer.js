import { volumeInit } from './volume.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullScreen = document.querySelector('.video-fullscreen');
    const videoVolumeDown = document.querySelector('#video-volume-down');
    const videoVolumeUp = document.querySelector('#video-volume-up');
    let latestVolume = 0.5;

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.replace('fa-pause', 'fa-play');
        } else {
            videoButtonPlay.classList.replace('fa-play', 'fa-pause');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const addZero = (num) => (num < 10) ? '0' + num : num;

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100; // for ex. 5 / 63 * 100 == 7,93% and input value = 7.9

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minutesTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100; // for ex. 7.9 * 63 / 100 = 4.977 and running 'timeupdate' EL
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    volumeInit(videoVolume, videoPlayer, videoVolumeDown, videoVolumeUp, latestVolume);
};

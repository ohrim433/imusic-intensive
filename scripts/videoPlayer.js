import {timeProgressBar} from './timeProgressBar.js';
import {volumeInit} from './volume.js';

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

    const audioProgressTiming = document.querySelector('.audio-progress__timing');

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

    videoPlayerInit.pause = () => {
        if (!videoPlayer.paused) {
            stopPlay();
            toggleIcon();
        }
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        timeProgressBar(videoPlayer, videoProgress, videoTimePassed, videoTimeTotal);
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100; // for ex. 7.9 * 63 / 100 = 4.977 and running 'timeupdate' EL
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    volumeInit(videoVolume, videoPlayer, videoVolumeDown, videoVolumeUp, null);
};

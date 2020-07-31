import {timeProgressBar} from './timeProgressBar.js';
import {volumeInit} from './volume.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioHeader = document.querySelector('.audio-header');
    const audioImg = document.querySelector('.audio-img');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioPlayer = document.querySelector('.audio-player');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');
    const audioVolumeDown = document.querySelector('#audio-volume-down');
    const audioVolumeUp = document.querySelector('#audio-volume-up');
    let latestVolume = 0.5;

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioPlayer.src = `audio/${track}.mp3`;
        audioImg.src = `audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }

        audioPlayer.addEventListener('canplay', () => {
            timeProgressBar(audioPlayer, audioProgress, audioTimePassed, audioTimeTotal, audioProgressTiming);
        });

    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const prevTrack = () => {
        if (trackIndex) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    musicPlayerInit.pause = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.replace('fa-pause', 'fa-play');
        }
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        const track = playlist[trackIndex];

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        timeProgressBar(audioPlayer, audioProgress, audioTimePassed, audioTimeTotal, audioProgressTiming);
    });

    audioProgress.addEventListener('click', event => {
        const duration = audioPlayer.duration;
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        audioPlayer.currentTime = (x / allWidth) * duration;
    });

    loadTrack();
    volumeInit(audioVolume, audioPlayer, audioVolumeDown, audioVolumeUp, latestVolume);

}

import { volumeInit } from './volume.js';

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioVolumeDown = document.querySelector('#radio-volume-down');
    const radioVolumeUp = document.querySelector('#radio-volume-up');
    let latestVolume = 0.5;

    const audio = new Audio();

    audio.type = 'audio/aac';

    const toggleIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.replace('fa-stop', 'fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.replace('fa-play', 'fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioPlayerInit.stop = () => {
        audio.pause();
        toggleIconPlay();
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        const title = parent.querySelector('.radio-name').textContent;
        const urlImg = parent.querySelector('.radio-img').src;

        selectItem(parent);
        radioHeaderBig.textContent = title;
        radioCoverImg.src = urlImg;

        audio.src = target.dataset.radioStantion;
        audio.play();
        toggleIconPlay();
        radioStop.disabled = false;
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        toggleIconPlay();
    });

    volumeInit(radioVolume, audio, radioVolumeDown, radioVolumeUp, latestVolume);
}

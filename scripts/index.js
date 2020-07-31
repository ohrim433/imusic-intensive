import {musicPlayerInit} from "./musicPlayer.js";
import {radioPlayerInit} from "./radioPlayer.js";
import {videoPlayerInit} from "./videoPlayer.js";

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationButton = () => {
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
    temp.style.display = 'none';
    musicPlayerInit.pause();
    videoPlayerInit.pause();
    radioPlayerInit.stop();
}

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        deactivationButton();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    })
);

musicPlayerInit();
radioPlayerInit();
videoPlayerInit();

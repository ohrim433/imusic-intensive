export const volumeInit = (volumeType, player, volumeDown, volumeUp, latestVolume) => {
    volumeType.addEventListener('input', () => {
        player.volume = volumeType.value / 100;
        if (player.volume === 0) {
            volumeDown.classList.replace('fa-volume-down', 'fa-volume-off');
        } else {
            if (volumeDown.classList.contains('fa-volume-off')) {
                volumeDown.classList.replace('fa-volume-off', 'fa-volume-down');
            }
        }
    });

    volumeDown.addEventListener('click', () => {
        if (player.volume > 0) {
            latestVolume = player.volume;
            setVolume(0, volumeType, player);
            volumeDown.classList.replace('fa-volume-down', 'fa-volume-off');
        } else {
            setVolume(latestVolume, volumeType, player);
            volumeDown.classList.replace('fa-volume-off', 'fa-volume-down');
        }
    });

    volumeUp.addEventListener('click', () => {
        if (player.volume < 1) {
            latestVolume = player.volume;
            setVolume(1, volumeType, player);
        } else {
            setVolume(latestVolume, volumeType, player);
        }
    });
};

const setVolume = (volume, volumeType, player) => {
    player.volume = volume;
    volumeType.value = player.volume * 100;
};

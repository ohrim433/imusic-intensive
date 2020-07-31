export const timeProgressBar = (playerType, progressType, timePassedType, timeTotalType, progressTiming) => {

    const currentTime = playerType.currentTime;
    const duration = playerType.duration;
    const addZero = (num) => (num < 10) ? '0' + num : num;

    progressType.value = (currentTime / duration) * 100; // for ex. 5 / 63 * 100 == 7,93% and input value = 7.9
    if (progressTiming) {
        progressTiming.style.width = `${progressType.value}%`;
    }

    let minutesPassed = Math.floor(currentTime / 60) || '0';
    let secondsPassed = Math.floor(currentTime % 60) || '0';

    let minutesTotal = Math.floor(duration / 60) || '0';
    let secondsTotal = Math.floor(duration % 60) || '0';

    timePassedType.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    timeTotalType.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

}

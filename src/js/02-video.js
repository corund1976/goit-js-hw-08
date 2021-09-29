import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

player.on('timeupdate', function (eventTime) {
    const { duration, percent, seconds } = eventTime;

    localStorage.setItem("videoplayer-current-time", seconds);
});

const timeToResume = localStorage.getItem("videoplayer-current-time");

console.log("Продолжаю воспроизведение с ", Math.round(timeToResume), "секунды....");

player.setCurrentTime(timeToResume);


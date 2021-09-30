import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// ========== Запись текущей секунды воспроизведения в локальное хранилище

player.on('timeupdate', throttle(data => {
    localStorage.setItem("videoplayer-current-time", data.seconds)
}, 1000));

// ---------- Предыдущие этапы решения ---------
// player.on('timeupdate', throttle(({ duration, percent, seconds }) => {
//     localStorage.setItem("videoplayer-current-time", seconds);
//     }, 1000));
// player.on('timeupdate', throttle((function ({ duration, percent, seconds }) {
//     localStorage.setItem("videoplayer-current-time", seconds);
//     }), 1000));

// ========== Вызов плеера с текущей секунды воспроизведения (из локального хранилища)

let timeToResume = localStorage.getItem("videoplayer-current-time");

if (!timeToResume) {
    timeToResume = 0;
};

// console.log("Продолжаю воспроизведение с ", Math.round(timeToResume), "секунды....");
player.setCurrentTime(timeToResume);

// localStorage.removeItem("videoplayer-current-time");
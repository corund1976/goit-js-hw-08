import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// ========= Лишние фуекции : Приветственное сообщение и Заголовок видео

// player.on('play', function () {
//     console.log('played the video!');
// });

// player.getVideoTitle().then(function(title) {
//     console.log('title:', title);
// });

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

player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));

// ---------- Предыдущие этапы решения ---------
// const timeToResume = localStorage.getItem("videoplayer-current-time");
// console.log("Продолжаю воспроизведение с ", Math.round(timeToResume), "секунды....");
// player.setCurrentTime(timeToResume);


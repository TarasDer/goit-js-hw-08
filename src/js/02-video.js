import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(playerTimeUpdate, 1000));

function playerTimeUpdate(data) {
  const currentTime = data.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
}
player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

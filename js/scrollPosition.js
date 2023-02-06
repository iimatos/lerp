export default function scrollPosition() {
  function throttle(fn, delay) {
    let timer;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        fn();
        timer = false;
      }, delay);
    };
  }
  const track = document.querySelector('.track');
  const trackList = document.querySelector('.track_list');
  const container = document.querySelector('.container');

  const overflowingSize = trackList.scrollWidth - trackList.offsetWidth;
  container.style.height = `${container.offsetHeight + overflowingSize}px`;

  let currentPos = trackList.getBoundingClientRect().left;

  function translateX() {
    trackList.style.left = `${-window.scrollY}px`;
  }

  function skewDiv() {
    let newPos = Math.ceil(trackList.getBoundingClientRect().left);
    let diff = newPos - currentPos;
    let speed = diff * 0.2;
    currentPos = newPos;
    trackList.style.transform = `skewX(${speed}deg)`;
    requestAnimationFrame(skewDiv);
  }

  skewDiv();
  window.addEventListener('scroll', throttle(translateX, 1));
}

export default function Panning() {
  const container = document.querySelector('.container');
  const track = document.querySelector('.slides');
  const images = [...document.querySelectorAll('.item img')];

  for (let i = 0; i < images.length; i++) {
    images[i].setAttribute('draggable', 'false');
  }

  let mouseClick = 0;

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function lerp(start, end, t) {
    let result = start * (1 - t) + end * t;
    // result = clamp(result, start, end);
    return result;
  }

  // function lerp(start, end, t) {
  //   return start * (1 - t) + end * t;
  // }

  // slide
  let start = 0;
  let end = 0;
  let t = 0.04;
  let transformAnimate = 0;

  //  panning
  let rangeStart = 0;
  let rangeEnd = 0;
  let tRange = 0.02;
  const maxRange = 500;

  function mouseDown({ clientX }) {
    mouseClick = 1;
    track.dataset.start = clientX;
  }

  function mouseMove({ clientX }) {
    if (mouseClick === 0) return;
    const maxValue = window.innerWidth / 2;
    const offset = parseFloat(track.dataset.start) - clientX;
    const percentage = (offset / maxValue) * -100;
    let transform = Math.max(
      Math.min(percentage + parseFloat(track.dataset.prevPercentage), 0),
      -100
    );
    transform = parseFloat(transform.toFixed(3));
    track.dataset.percentage = transform;
    end = transform;
    rangeEnd = +(maxRange * (end / 100)).toFixed(0);
  }

  function mouseUp() {
    mouseClick = 0;
    track.dataset.start = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
    transformAnimate = track.dataset.percentage;
    end = parseFloat(transformAnimate);
  }

  function animate() {
    start = parseFloat(lerp(start, end, t));
    track.style.transform = `translate3d(${start}%, -50%,0)`;
    rangeStart = +lerp(rangeStart, rangeEnd, tRange).toFixed(1);
    images.forEach((i) => {
      i.style.objectPosition = `${rangeStart}px center`;
    });

    console.log(end);

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('mousedown', mouseDown);
  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseup', mouseUp);

  // endpoint = constrainedNext
  // startpoint = prevPercentage

  // const pos = {
  //   posInit: 0,
  //   posEnd: 0,
  // };

  // function pointUpdate({ clientX }) {
  //   if (track.dataset.mouseStart === '0') return;
  //   pos.posEnd = clientX;

  //   // se essa função estiver dando update toda hora em show, ela vai somar
  //   //  o anterior com o próximo assim que soltar e não apenas quando
  //   // estiver movimentando o slide

  //   const maxValue = window.innerWidth / 2;
  //   const percentage = ((pos.posInit - pos.posEnd) / maxValue) * -100;
  //   const nextPercentage =
  //     parseFloat(track.dataset.prevPercentage) + percentage;

  //   const constrained = Math.max(Math.min(nextPercentage, 0), -100);
  //   track.dataset.percentage = constrained;
  // }

  // function show() {
  //   let xStart = parseFloat(track.dataset.prevPercentage);
  //   let xEnd = parseFloat(track.dataset.percentage);
  //   track.dataset.prevPercentage = track.dataset.percentage;
  //   let lerped = lerp(xStart, xEnd, 0.00001);
  //   console.log(xStart, xEnd);

  //   track.style.transform = `translate3d(${lerped}%,-50%,0)`;
  //   requestAnimationFrame(show);
  // }

  // show();

  // function pointInit({ clientX }) {
  //   pos.posInit = clientX;
  //   track.dataset.mouseStart = clientX;
  // }

  // function mouseUp({ clientX }) {
  //   pos.posEnd = clientX;
  //   track.dataset.mouseStart = 0;
  // }

  // window.addEventListener('mousedown', pointInit);
  // window.addEventListener('mousemove', pointUpdate);
  // window.addEventListener('mouseup', mouseUp);

  // function startMove({ clientX }) {
  //   track.dataset.mouseStart = clientX;
  // }

  // function onMove({ clientX }) {
  //   if (track.dataset.mouseStart === '0') return;
  //   const diff = track.dataset.mouseStart - clientX;
  //   const maxDelta = window.innerWidth / 2;
  //   const percentage = ((diff / maxDelta) * -100).toFixed(2);

  //   const nextPercentage =
  //     parseFloat(track.dataset.prevPercentage) + +percentage;

  //   const constrainedNext = Math.max(Math.min(nextPercentage, 0), -100);

  //   track.dataset.percentage = constrainedNext;

  //   transform(constrainedNext);
  // }

  // function endMove() {
  //   track.dataset.mouseStart = 0;
  //   track.dataset.prevPercentage = track.dataset.percentage;
  //   document.body.style.cursor = 'initial';
  // }

  // window.addEventListener('mousedown', startMove);
  // window.addEventListener('mousemove', updatePoints);
  // window.addEventListener('mouseup', endMove);
}

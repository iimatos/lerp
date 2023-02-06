export default function Canvas() {
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let x = width / 2;
  let ballX = x;
  let y = height / 2;
  let ballY = y;

  function mouseMove(e) {
    x = e.clientX;
    y = e.clientY;
  }

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function moveBall() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'navy';
    ballX = lerp(ballX, x, 0.1);
    ballY = lerp(ballY, y, 0.1);
    ctx.beginPath();
    ctx.arc(ballX, ballY, 30, 0, 2 * Math.PI);
    ctx.fill();

    requestAnimationFrame(moveBall);
  }

  window.addEventListener('mousemove', mouseMove);

  moveBall();
}

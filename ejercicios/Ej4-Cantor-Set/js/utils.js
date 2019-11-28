const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;
let timeouts = [];

const resetCanvas = () => {
  for (let to of timeouts) {clearTimeout(to)}
  timeouts = [];
  let cw = document.documentElement.clientWidth;
  let ch = document.documentElement.clientHeight
  let s = cw > ch ? ch : cw;
  width = canvas.width = s * 0.7;
  height = canvas.height = s * 0.7;
  ctx.clearRect(0, 0, width, height);
}
resetCanvas();

window.addEventListener('resize', function() {
  resetCanvas();
  cantor(0, width, 10, 10);
});

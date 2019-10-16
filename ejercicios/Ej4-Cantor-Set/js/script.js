const drawLine = (x1, x2, y) => {
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.lineTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
}

const cantor = (x1, x2, y, counter) => {
  if (counter > 0) {
    setTimeout(function() {
      drawLine(x1, x2, y);
      let ax = x1 + ((x2 - x1) * 1 / 3);
      let bx = x1 + ((x2 - x1) * 2 / 3);
      let y2 = y + 35;
      cantor(x1, ax, y2, counter - 1);
      cantor(bx, x2, y2, counter - 1);
    }, 1000);
  }
}

cantor(0, width, 10, 10);

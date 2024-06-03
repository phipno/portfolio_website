function initCosmos() {
  const cnv = document.getElementById("cnv");
  const ctx = cnv.getContext("2d");
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Set Canvas and Background Color
  cnv.width = W;
  cnv.height = H;
  ctx.fillStyle = "#112";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "yellow";
  // Start animation
  animate(ctx, W, H);
}

function animate(ctx, W, H) {
  // Random position and size of stars
  let x = W * Math.random();
  let y = H * Math.random();
  let r = 2.5 * Math.random();
  let alpha = Math.random();
  // Draw the stars
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Using setTimeout instead of window.requestAnimationFrame for slower speed
  setTimeout(() => animate(ctx, W, H), 100);
}

// Call initCosmos when the content is loaded
document.addEventListener('DOMContentLoaded', initCosmos);
/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* journey.js                                /     (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/06/05 13:59 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

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
  ctx.shadowColor = "grey";
  // Start animation
  calcScrollDistance()
  animate(ctx, W, H);
}

function animate(ctx, W, H) {
  // Random position and size of stars
  for (let i = 0; i < 4000; i++) {

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
  }

  // Using setTimeout instead of window.requestAnimationFrame for slower speed
  // setTimeout(() => animate(ctx, W, H), 100);
}

function calcScrollDistance () {
  const crawlElement = document.getElementById('sw-crawl');
  const crawlHeight = crawlElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const totalScrollDistance = (crawlHeight + viewportHeight) / viewportHeight * 100 - 190;
  
  // Set CSS variable
  document.documentElement.style.setProperty('--total-scroll-distance', (totalScrollDistance) + 'vh');
  crawlElement.addEventListener('animationend', function () {
    console.log("eyooo")
  });
}

let animationProgress = 0;

window.addEventListener('wheel', function (event) {
  animationProgress += event.deltaY

  console.log("animationProgress " + animationProgress)
  var crawlElement = document.getElementById('sw-crawl');
  crawlElement.style.animationDuration = (animationProgress) + 's';
});

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */

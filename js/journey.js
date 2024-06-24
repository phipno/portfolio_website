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

export function initCosmos() {
  const cnv = document.getElementById("cnv");
  const ctx = cnv.getContext("2d");

  const W = window.innerWidth;
  const H = window.innerHeight;
  console.log(W, H);
  cnv.width = W;
  cnv.height = H;
  // Set Canvas and Background Color
  ctx.fillStyle = "#112";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "grey";
  // Start animation
  calcScrollDistance()
  handleWheelEvent();
  drawStars(ctx, W, H);
}

function drawStars(ctx, W, H) {
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
  const totalScrollDistance = (crawlHeight + viewportHeight) / viewportHeight * 100;
  
  // Set CSS variable
  document.documentElement.style.setProperty('--total-scroll-distance', (totalScrollDistance) + 'vh');
}

function handleWheelEvent() {
  const crawl = document.getElementById('sw-crawl');

  // Initialize the animation
  const totalScrollDistance = '-' + document.documentElement.style.getPropertyValue('--total-scroll-distance');
  const animation = crawl.animate(
    [{ top: '100%' }, { top: totalScrollDistance }],
    { duration: 100, fill: 'forwards' }
  );

  // Pause the animation initially
  animation.pause();

  // Function to update animation progress
  const updateAnimation = (delta) => {
    let newTime = animation.currentTime + delta * 1; // Adjust the factor as needed
    // Ensure newTime stays within the duration limits
    newTime = Math.max(0, Math.min(animation.effect.getTiming().duration, newTime));
    animation.currentTime = newTime;
  };

  // Handle mouse wheel event
  document.addEventListener('wheel', function (event) {
    // event.preventDefault();
    const delta = Math.sign(event.deltaY);
    console.log(delta);
    updateAnimation(delta);
  });

  // Handle touch events
  let touchStartY = 0;

  document.addEventListener('touchstart', function (event) {
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener('touchmove', function (event) {
    const touchMoveY = event.touches[0].clientY;
    const delta = touchStartY - touchMoveY; // Positive for upward swipe, negative for downward swipe
    touchStartY = touchMoveY;
    console.log(delta);
    updateAnimation(delta / 10); // Adjust the factor as needed
  });

  document.addEventListener('touchend', function (event) {
    touchStartY = 0;
  });
}

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */

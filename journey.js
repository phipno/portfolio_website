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
  // Set Canvas and Background Color
  console.log(cnv.offsetHeight)
  ctx.fillStyle = "#112";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "grey";
  // Start animation
  calcScrollDistance()
  handleWheelEvent();
  animate(ctx, cnv.offsetHeight, cnv.offsetWidth);
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
  // Update animation progress based on scroll
  document.addEventListener('wheel', function (event) {
    // event.preventDefault();
  // Adjust the playbackRate according to the scroll delta
    const delta = Math.sign(event.deltaY);
    let newTime = animation.currentTime + delta * 1; // Adjust the factor as needed
  // Ensure newTime stays within the duration limits
    newTime = Math.max(0, Math.min(animation.effect.getTiming().duration, newTime));
    console.log(newTime)
    animation.currentTime = newTime;
  });
}
/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */

const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');
const dateDisplay = document.querySelector('.date');
const ticksContainer = document.querySelector('.ticks');
const toggleBtn = document.getElementById('toggle-theme');
/*
const tickSound = document.getElementById('tick-sound');
let smoothAnimation = true; // Toggle smooth animation or ticking sound
*/

// Create tick marks - 60 ticks for minutes/seconds
function createTicks() {
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    tick.style.transform = `rotate(${i * 6}deg) translateX(-50%)`;
    // Make hour marks thicker and longer
    if (i % 5 === 0) {
      tick.style.height = '15px';
      tick.style.width = '3px';
      tick.style.background = 'rgba(255,255,255,0.9)';
    }
    ticksContainer.appendChild(tick);
  }
}

// Update clock hands and date
function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Degrees
  const secondDeg = seconds * 6; // 360/60
  const minuteDeg = minutes * 6 + seconds * 0.1; // smooth minute hand
  const hourDeg = ((hours % 12) + minutes / 60) * 30;

  // Rotate hands
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
  minHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;

  // Date format: e.g., Wed, 27 Jun 2025
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  dateDisplay.textContent = now.toLocaleDateString(undefined, options);

  /* Play ticking sound if smooth animation off and seconds changed
  if (!smoothAnimation && seconds !== lastSecond) {
    tickSound.currentTime = 0;
  }
  lastSecond = seconds;
  */
}

let lastSecond = null;
createTicks();
updateClock();
setInterval(updateClock, 1000);

// Dark/light mode toggle
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
});


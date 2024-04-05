<script>
  import { onMount, onDestroy } from 'svelte';

  let startTime;
  let elapsedSeconds = 0;
  let timerInterval;
  let isPaused = true;

  // Start the timer when the component mounts
  onMount(() => {
    startTime = Date.now();
    startTimer();
  });

  // Stop the timer when the component is destroyed
  onDestroy(() => {
    clearInterval(timerInterval);
  });

  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      if (!isPaused) {
        elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      }
    }, 1000);
  }

  // Function to resume the timer
  function playPauseTimer() {
    if (isPaused) {
      isPaused = false;
      startTime = Date.now() - (elapsedSeconds * 1000);
      startTimer();
    } else {
      isPaused = true;
      clearInterval(timerInterval);
    }
  }

  // Function to format elapsed time into hh:mm:ss format
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
</script>

<div class="timer-container">
  <div class="timer">
    {formatTime(elapsedSeconds)}
  </div>
  <button class="play-pause" on:click={playPauseTimer}>
    <img src='/icons/play.png' class="play-btn" width=15 alt="start workout timer" style={!isPaused ? "display: none" : ""}>
    <img src='/icons/pause.png' class="pause-btn" width=15 alt="pause workout timer" style={isPaused ? "display: none" : ""}>
  </button>
</div>

<style>
  .timer-container {
    display: flex;
    justify-content: center;
    margin-left: 5%;
  }

  button {
    background-color: #595959ff;
    border: none;
  }

  .play-pause {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .timer {
    font-size: 17px;
  }
</style>
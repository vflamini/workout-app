<script>
  import { createEventDispatcher } from 'svelte';

  export let greyOut;
  export let selectedWorkout = 0;
  export let workouts;
  
  const dispatch = createEventDispatcher();

  function closeModal() {
    greyOut = false;
  }

  function submitInfo() {
    console.log(workouts);
    greyOut = false;
  }
</script>

<div class="grey-out" style="{greyOut ? 'display: block' : 'display: none'}">
  <div class="modal-window">
    <div class="title-wrapper">
      <img src="icons/info.png" width=25 class="info-icon" alt="workout info window logo">
      <h3>{workouts.length > 0 ? workouts[selectedWorkout].name : ""}</h3>
      <button on:click={closeModal} class="circle-btn">X</button>
    </div>
    <div class="checkbox-wrapper">
      <label for="weight-check">WEIGHT</label>
      <input type="checkbox" id="weight-check" bind:checked={workouts[selectedWorkout].weighted}>
      <label for="timed-check">TIMED</label>
      <input type="checkbox" id="timed-check" bind:checked={workouts[selectedWorkout].timed}>
    </div>
    <div class="form-wrapper">
      <div class="input-wrapper">
        <label class="modal-input-label" for="another-input">Accessory</label>
        <input type="text" id="another-input" bind:value={workouts[selectedWorkout].accessory}>
      </div>
      <div class="input-wrapper">
        <label class="modal-input-label acc-weight-label" for="accessory-weight">Accessory<br>Weight</label>
        <input type="number" id="accessory-weight" step="1" bind:value={workouts[selectedWorkout].accWeight}>
        <span>lbs</span>
      </div>
    </div>
    <button class="circle-btn done-btn" on:click={submitInfo}><img src="icons/check.png" width=25 class="check-icon" alt="submit info"></button>
  </div>
</div>

<style>
  .grey-out {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgb(89, 89, 89, 0.65);
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
    width: 100%;
    height: 70%;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 100%; /* Ensure input wrappers take full width */
    margin-top: 10%;
    margin-left: 5%;
  }

  .modal-input-label {
    font-size: 20px;
    white-space: nowrap;
    margin-right: 10px; /* Adjust the spacing between label and input */
  }

  input[type=number],
  input[type=text] {
    background-color: white;
    height: 100%;
    font-size: 20px;
    padding: 2px;
  }

  span {
    font-size: 20px;
  }

  input[type=text] {
    width: 50%;
    height: 150%;
  }

  input[type=number] {
    width: 40%;
    margin-right: 5px;
  }

  input[type=checkbox] {
    margin-right: 10%;
  }

  .modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    background-color: #fff9e6ff;
    height: 50%;
    width: 90%;
    border-radius: 20px;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-left: 5%;
    width: 90%;
  }

  .info-icon {
    margin-right: 10px;
  }

  .checkbox-wrapper {
    margin-left: 5%;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .circle-btn {
    font-family: inherit;
    display: flex;
    margin-left: 18%;
    height: 8vw;
    width: 8vw;
    border: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 0;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: #434343ff;
    border-radius: 50%;
  }

  .done-btn {
    background-color: #565ea7;
    height: 12vw;
    width: 12vw;
    margin-left: 42%;
    margin-top: -15%;
  }
</style>
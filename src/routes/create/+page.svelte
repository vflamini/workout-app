<script>
  import {createRoutine} from '../../sql/CreateRoutine';
  import Layout from '../../components/Layout.svelte';
  import WorkoutInfoModal from '../../components/WorkoutInfoModal.svelte';
  import {addWorkoutRoutine, removeWorkoutRoutine, updateProperty, workoutRoutines} from '../../stores/stores';

  let numWorkouts = 0;
  let routineName = '';
  let modification = '';
  let activeTab = "create";
  let greyOut = false;
  let selectedWorkout;
  let workouts = [];

  let routines;
  workoutRoutines.subscribe(value => {
    routines = value;
  })

  function addWorkout(e) {
    numWorkouts++;
    workouts.push({name: '', weighted: false, timed: false, accessory: '', accWeight: null});
  }

  function removeWorkout(e) {
    numWorkouts--;
    workouts.pop();
  }

  async function callCreateRoutine(e) {
    await addWorkoutRoutine(modification === '' ? routineName : routineName + "-mod-" + modification, {workouts});
  }

  function updateRoutineName(e) {
    routineName = e.target.value.toUpperCase();
  }

  function updateModName(e) {
    modification = e.target.value;
  }

  function updateWorkout(e) {
    workouts[parseInt(e.target.id.split('-')[1])].name = e.target.value;
  }

  function showInfoModal(workoutNum) {
    greyOut = true;
    selectedWorkout = workoutNum;
  }
</script>

<Layout {activeTab}>
  <div class="create-routine page-body">
    <label for="routine-name">Workout Name</label>
    <div class="input-settings-wrapper">
      <input on:input={updateRoutineName} type="text" id="routine-name" bind:value={routineName}>
      <img src="icons/gear.png" width=50 class="settings-icon" alt="settings">
    </div>
    <label for="modification">Modification</label>
    <input on:input={updateModName} type="text" id="modification" bind:value={modification}>
    {#each [...Array(numWorkouts).keys()] as workoutNum}
      <label for="workout-{workoutNum}">Workout #{workoutNum + 1}</label>
      <div class="wkout-info-wrapper">
        <input on:change={updateWorkout} type="text" id="workout-{workoutNum}" class="workout-input" bind:value={workouts[workoutNum].name}>
        <button on:click={() => showInfoModal(workoutNum)}><img src="icons/info.png" width=30 class="info-icon" alt="workout {workoutNum} info"></button>
        <div class="acc-attr">
          <span>{workouts[workoutNum].accessory ? workouts[workoutNum].accessory : ''}</span>
          <br>
          <span>{workouts[workoutNum].accWeight ? workouts[workoutNum].accWeight + ' lbs' : ''}</span>
        </div>
      </div>
    {/each}
    <div class=add-remove-wrapper>
      <button class="circle-btn bottom-btn" on:click={addWorkout}>+</button>
      <button class="circle-btn bottom-btn" on:click={removeWorkout}>-</button>
    </div>
    <button class="create-btn bottom-btn" on:click={callCreateRoutine}>CREATE</button>
  </div>
</Layout>
<WorkoutInfoModal 
  bind:greyOut={greyOut}
  selectedWorkout={selectedWorkout}
  bind:workouts={workouts}
>
</WorkoutInfoModal>

<style>
  input[type=text]#routine-name {
    height: 35px;
    font-size: 16px;
    width: 60%;
    margin-bottom: 20px;
    font-family: 'Roboto', monospace;
  }

  input[type=text]#modification {
    height: 20px;
    font-size: 14px;
    width: 95%;
    margin-bottom: 20px;
    font-family: 'Roboto', monospace;
  }

  input[type=text].workout-input {
    height: 20px;
    font-size: 14px;
    width: 60%;
    margin-bottom: 20px;
    font-family: 'Roboto', monospace;
  }

  .input-settings-wrapper {
    display: flex;
    align-items: center;
    width: 90vw;
  }

  .wkout-info-wrapper {
    display: flex;
    align-items: center;
    width: 90vw;
  }

  .info-icon {
    margin-left: 5%;
    margin-bottom: 20px;
  }

  .acc-attr {
    margin-left: 5%;
    margin-bottom: 20px;
  }

  .settings-icon {
    margin-left: 15%;
    margin-bottom: 20px;
  }

  label {
    font-size: 15px;
    padding-right: 20px;
    color: #d9d9d9;
    font-family: 'Roboto Black', monospace;
    font-weight: bold;
  }

  .create-routine {
    display: flex;
    flex-direction: column;
  }

  .add-remove-wrapper {
    display: flex;

  }

  button {
    background: none;
    border: none;
  }

  .bottom-btn {
    font-family: inherit;
    display: flex;
    margin-top: 25px;
    margin-right: 10px;
    height: 12vw;
    border: 2px solid #595959;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 0;
    color: black;
  }

  .circle-btn {
    width: 12vw;
    font-size: 35px;
    background-color: #999999ff;
    border-radius: 50%;
    
  }

  .create-btn {
    font-family: inherit;
    border-radius: 10px;
    width: 50%;
    background-color: green;
    color: lightgray;
    font-size: 30px;
  }

  button:active {
    scale: 0.9;
    transition: scale;
  }
</style>
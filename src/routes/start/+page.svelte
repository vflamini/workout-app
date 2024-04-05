<script>
  import {workoutRoutines} from '../../stores/stores';
  import Layout from '../../components/Layout.svelte';
  import Timer from '../../components/Timer.svelte';
  import {onMount, onDestroy} from 'svelte';

  let activeTab = 'start';
  let routines;
  let routineName;
  // let activeRoutine = {name: '', workouts: ''};
  let activeRoutine = {name: "CHEST", workouts: [{name: "Flat Bench", accessory: "Barbell", accWeight: 45, weighted: true, timed: false, reps: [null], weights: [null]}, {name: "Incline Bench", accessory: "Barbell", accWeight: 45, weighted: true, timed: false, reps: [null], weights: [null]}]}
  let modification = '';
  let seconds = 0;
  let today = new Date();
  let date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  let isPaused = true;
  
  function addRep(workoutNum) {
    activeRoutine.workouts[workoutNum].reps.push(null);
    activeRoutine.workouts[workoutNum].weights.push(null);
    console.log(activeRoutine.workouts);
  }

  function removeRep(workoutNum) {
    activeRoutine.workouts[workoutNum].reps.pop();
    activeRoutine.workouts[workoutNum].weights.pop();
  }

  function updateRoutineName(e) {
    if (modification === '') {
      activeRoutine = routines[routineName];
    } else {
      activeRoutine = routines[routineName + '-mod-' + modification];
      console.log(activeRoutine);
    }
    if (!activeRoutine) {
      activeRoutine = {name: '', workouts: ''};
    }
  }

  workoutRoutines.subscribe(value => {
    routines = value;
  })
</script>

<Layout activeTab={activeTab}>
  <div class="top-bar">
    <input type="date" id="workout-date" bind:value={date}>
    <Timer></Timer>
    <button class="settings">
      <img src='/icons/gear.png' width=30 alt="settings"> 
    </button>
  </div>
  <div class="start-workout">
    <div class="name-inputs">
      <input on:change={updateRoutineName} on:input={(e) => routineName = e.target.value.toUpperCase()} type="text" id="routine-name" bind:value={routineName}>
      <input on:change={updateRoutineName} type="text" id="modification" bind:value={modification}>
    </div>
  </div>
  <div class="exercises">
    {#each [...Array(activeRoutine.workouts.length).keys()] as workoutNum}
      <div>
        <input type="text" id="workout-{workoutNum}" class="exercise-input" value={activeRoutine.workouts[workoutNum].name}>
        <div>
          {#each [...Array(activeRoutine.workouts[workoutNum].reps.length).keys()] as repNum}
            <input type="number" id="workout-{workoutNum}-weight-{repNum}" class="weight-input" step=1 value={activeRoutine.workouts[workoutNum].weights[repNum]}> LB
            <input type="number" id="workout-{workoutNum}-rep-{repNum}" class="rep-input" step=1 value={activeRoutine.workouts[workoutNum].reps[repNum]}> REPS
            <div class=add-remove-wrapper>
              <button class="circle-btn bottom-btn" on:click={() => addRep(workoutNum)}>+</button>
              <button class="circle-btn bottom-btn" on:click={() => removeRep(workoutNum)}>-</button>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Layout>

<style>
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
    height: 5vw;
    border: 2px solid #595959;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 0;
    color: black;
    margin-left: 5%;
    margin-bottom: 5%;
  }

  .circle-btn {
    width: 5vw;
    font-size: 12px;
    background-color: #999999ff;
    border-radius: 50%;
  }

  .rep-input {
    width: 10%;
    font-size: 20px !important;
    margin-left: 5%;
  }

  .weight-input {
    width: 10%;
    font-size: 20px !important;
    margin-left: 5%;
    margin-bottom: 2%;
  }

  .exercise-input {
    width: 50%;
    font-size: 20px !important;
    margin-left: 5%;
    margin-bottom: 2%;
    margin-top: 2%;
  }

  .exercises {
    margin-top: 5%
  }

  .start-workout {
    display: flex;
    justify-content: center;
  }

  .top-bar {
    display: flex;
    align-items: center;
    padding-bottom: 2%;
  }

  .name-inputs {
    text-align: center;
    padding: 2%;
  }

  input[type=text] {
    height: 50%;
    font-size: 25px;
  }

  input[type=text]#modification {
    height: 20%;
    font-size: 15px;
    width: 90%;
    margin-top: 3%;
  }

  input[type=date] {
    font-size: 17px;
    margin-right: 1%;
    color: black;
  }

  button {
    background-color: #595959ff;
    border: none;
  }

  .settings {
    margin-left: 5%;
  }
</style>
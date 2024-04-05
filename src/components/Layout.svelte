<script>
  import WorkoutInfoModal from "./WorkoutInfoModal.svelte";
  let mainColor = "#565ea7";
  let secColor = "gray";
  export let activeTab;

</script>

<main>
  <header>
    <div class="inner-box">
      <h1><h1 style="color: {secColor}">&lt</h1>WORK<h1 style="color: {secColor}">.</h1>OUT<h1 style="color: {secColor}">/&gt</h1></h1>
    </div>
  </header>

  <div class="container">
    <slot></slot>
  </div>

  <footer>
    <button class:selected-btn={activeTab === "home"} on:click={() => (activeTab = "home")}><a href="/"><img src="/icons/home.png" alt="return to home" width=45></a></button>
    <button class:selected-btn={activeTab === "start"} on:click={() => (activeTab = "start")}><a href="/start"><img src="/icons/start.png" alt="start workout" width=45></a></button>
    <button class:selected-btn={activeTab === "create"} on:click={() => (activeTab = "create")}><a href="/create"><img src="/icons/create.png" alt="create routine" width=40></a></button>
    <button class:selected-btn={activeTab === "people"} on:click={() => (activeTab = "people")}><a href="/"><img src="/icons/people.png" alt="alter user profile" width=25></a></button>
    <button class:selected-btn={activeTab === "metric"} on:click={() => (activeTab = "metric")}><a href="/"><img src="/icons/metric.png" alt="view workout stats" width=35></a></button>
  </footer>
</main>

<style>
  h1 {
    display: inline-block;
    font-family: Consolas, monaco, monospace;
    color: #565ea7;
    font-size: 55px;
  }

  /* header {
    display: flex;
    position: fixed;
    background-color: rgb(53, 53, 53);
    width: 100%;
    top: 0;
    left: 0;
    margin: 0;
    height: 10%;
    justify-content: center;
    align-items: center;
  } */

  header {
    display: flex;
    position: fixed;
    background-color: rgb(53, 53, 53);
    width: 100%;
    top: 0;
    left: 0;
    margin: 0;
    height: 10%;
    justify-content: center;
    align-items: center;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 75%;
    width: 90%;
    border: 2px solid #595959ff;
    background-color: #595959ff;
    border-radius: 25px;
    padding: 10px;
    overflow-y: scroll;
  }

  .inner-box {
    position: relative;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 95%;
    width: 999%;
  }

  footer {
    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: #434343ff;
    height: 10%;
    padding: 0 5px;
    align-items: center;
    box-sizing: border-box;
  }

  button {
    color: black !important;
    height: 50px;
    display: inline;
    margin: 5px 0;
    width: 60px;
    border-radius: 10px;
    border: none;
    background: none;
  }

  .selected-btn {
    background-color: #ccccccff;
  }

  a {
    color: black;
  }
</style>


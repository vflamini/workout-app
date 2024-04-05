<script>
  let name, height, weight, gender;

  function handleInputChange(e) {
    
  }
</script>
<div class="header">
  <a class="header" href="/">
    <div class="inner-box">
      <h1><h1 style="color: gray">&lt</h1>WORK<h1 style="color: gray">.</h1>OUT<h1 style="color: gray">/&gt</h1></h1>
    </div>
  </a>
</div>
<div class="manage-people page-body">
  <label for="person-name">NAME</label>
  <input type="text" id="person-name">
  <div class="height-inputs">
    <label for="person-height-feet">HEIGHT</label>
    <input type="number" id="person-height-feet">
    <p>ft</p>
    <input type="number" id="person-height-in">
    <p>in</p>
  </div>
  <div class="height-inputs">
    <label for="person-weight">WEIGHT</label>
    <input type="number" id="person-weight">
    <p>lbs</p>
  </div>
  <label for="person-gender">GENDER</label>
  <select name="gender" id="person-gender">
    <option value="none"></option>
    <option value="m">MALE</option>
    <option value="f">FEMALE</option>
  </select>
  <button>+</button>
  <button>EDIT</button>
</div>

<style>
  input, select {
    height: 35px;
    border-radius: 5px;
    border: 2px solid white;
    font-size: 16px;
    width: 60%;
    margin-bottom: 20px;
  }

  .height-inputs {
    display: flex;
  }

  .height-inputs > p {
    padding-left: 10px;
    padding-right: 20px;
  }

  label {
    font-size: 20px;
    padding-right: 20px;
  }

  .manage-people {
    margin-top: 20vh;
    display: inline-block;
  }

  button {
    font-family: inherit;
    display: block;
    margin-top: 25px;
    height: 50px;
    min-width: 50px;
    font-size: 35px;
    border: 1px solid gray;
    background-color: lightgray;
    border-radius: 10px;
  }
</style>
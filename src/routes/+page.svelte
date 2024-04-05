<script>
  import Layout from '../components/Layout.svelte';
  let activeTab = "home";
</script>
<style>
  .buttons {
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    margin-top: 45vh;
  }

  button {
    display: block;
    width: 100%;
    height: 65px;
    margin-top: 10px;
    border: 2px solid gray;
    border-radius: 5px;
    background-color: #565ea7;
    font-family: inherit;
    font-size: 20px;
    color: white;
  }
</style>
<Layout {activeTab}>
  <div class="page-body buttons">
    <button>START ROUTINE</button>
    <button><a href="/create">CREATE ROUTINE</a></button>
    <button><a href="/people">MANAGE PEOPLE</a></button>
    <button>VIEW METRICS</button>
  </div>
</Layout>


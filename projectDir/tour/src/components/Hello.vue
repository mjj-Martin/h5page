<template>
  <div class="hello">

    <span class="a1">sd aasdfasdfasdfsdfadfsdf </span>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: '1 s sdfsadfdsf!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.a1{
  font-size: 20px;
  color: #f00;
}
</style>

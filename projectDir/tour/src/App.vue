<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <!-- <img src="./assets/test_03.jpg" height="772" width="925" alt="">
    <img src="./assets/test2.png" height="772" width="925" alt=""> -->
    <div class="bb"></div>
    <div class="cc"></div>
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <p>
      To get a better understanding of how this boilerplate works, check out
      <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
      It is also recommended to go through the docs for
      <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
      <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
      If you have any issues with the setup, please file an issue at this boilerplate's
      <a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.
    </p>
    <p>
      You may also want to checkout
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
      <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.
    </p>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style lang='less'>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
.less{
  .a1{
    color: #fff;
  }
  .b2{
    color: #f00;
  }
}
.bb{
  width: 40px;
  height: 40px;
  background: url(assets/bt-lf.png?_spriter) no-repeat;
}
.cc{
  width: 40px;
  height: 40px;
  background: url(assets/bt-lf2.png?_spriter) no-repeat;
}
</style>

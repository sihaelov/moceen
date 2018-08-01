<template>
  <div id="app">

    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->

    <router-view/>
  </div>
</template>

<style>

body{
  margin: 0;

  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.87);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #fafafa;
}

a{
  color: #039be5;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

</style>

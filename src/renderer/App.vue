<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'quick-json',
};
</script>

<style lang="scss">
html,
body {
  font-family: sans-serif;
  font-size: 14px;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  height: 100%;
}

label {
  color: #606266;
}
</style>

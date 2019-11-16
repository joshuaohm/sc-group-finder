<template>
  <div id="app">
    <navigation></navigation>    
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

html, body{
  height: 100%;
  width: 100%;
}

body {
  background-color: #000;
  margin: 0;
  font-size: 2rem;
  font-family: 'Orbitron', sans-serif;
}

h1, h2, h3{
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
}

h1{
  font-size: 3rem;
}

label{
  text-align:center;
}

p{
  font-family: 'Roboto Mono', monospace;
  font-size: 1.4rem;
}

#app{
  width: 100%;
  height: 100%;
}

@keyframes fadeInGrowVert {
  0%{
    overflow: hidden;
    max-height: 0;
  }
  100%{
    overflow: hidden;
    max-height: 400px;
  }
}

@keyframes slideRight{
  0%{
    transform: translateX(-100%);
  }
  60%{
    transform: translateX(0px);
  }
  80%{
    transform: translateX(-4px);
  }
  100%{
    transform: translateX(0%);
  }
}
</style>
<script>
import Navigation from 'components/Navigation'

export default {
  components: {
    Navigation
  },
  methods: {
    appLoaded(){
      this.$store.commit("APPLOADED");
    }
  }
}
</script>

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

p{
  font-family: 'Robo Mono', monospace;
}

#app{
  width: 100%;
  height: 100%;
}

@keyframes fadeInGrowVert {
  0%{
    opacity: 0;
    transform: scale(0);
  }
  100%{
    opacity: 1;
    transform: scale(1);
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

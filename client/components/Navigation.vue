<template>
  <div class="navigation">
    <transition appear
      appear-active-class="nav-animation-active">
      <div class="nav-wrapper">
        <div class="logo-wrapper"></div>
        <ul class="nav-list">
          <li class="nav-item" id="nav-item-1"><router-link :to="{ name: links[0] }">{{links[0]}}</router-link></li>
          <li class="nav-item" id="nav-item-2"><router-link :to="{ name: links[1] }">{{links[1]}}</router-link></li>
          <li class="nav-item" id="nav-item-3"><router-link :to="{ name: links[2] }">{{links[2]}}</router-link></li>
        </ul>
      </div>
    </transition>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      links: [
        "home",
        "about",
        "login"
        ]
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    hello () {
      console.log(this.msg)
    }
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.navigation{
  width: 100%;
  position: relative;
  background-color: $page-color;
  border: 2px solid $page-border;
  

  .nav-wrapper{
    position: relative;
    height: 80px;
    padding-right: 80px;
    background-color: #000;
    

    &:before {
      content: '';
      position: absolute;
      top: 0; 
      right: 0;
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
      height: 100%;
      width: 80px;
    }

    .nav-list{
      display: flex;
      flex: row nowrap;
      justify-content: space-around;
      padding: 0;
      width: 50%;
      float: right;
      list-style: none;

      .nav-item, .nav-item a:link, .nav-item a:visited {
        text-decoration: none;
        text-transform: capitalize;
        color: $ice-blue;
      }
    }
  }
}

.nav-animation-active{
  animation: slideRight .5s ease;
}
</style>

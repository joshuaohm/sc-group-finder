<template>
<div class="page-wrapper">
  <transition appear
        appear-to-class="page-appear"
        appear-active-class="page-appeared"
        v-on:after-appear="pageLoaded()">
    <div class="page">
      
    </div>
  </transition>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Vetur means "Winter" in icelandic.',
      show: false,
    }
  },
  created() {

  },
  computed: {
    count () {
      return this.$store.state.count
    },
  },
  methods: {
    hello () {
      console.log(this.msg)
    },
    isLoggedIn() {
      return true;
    },
    pageLoaded(){
      console.log("page loaded 1");
      this.$store.commit("PAGELOADED");
    }
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.page {
  margin-top: 48px;
  text-align: center;
  min-height: 25vh;
  opacity: 1;
  background-color: $page-color;
  border: 2px solid;
  border-color: $page-border;
  color: $ice-blue;
  width: 100%;
}
.page code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}

.page-appear{
  animation: fadeInGrowVert .5s ease;
  animation-delay: .5s;
}

.page-appeared{
  opacity: 0;
}

</style>

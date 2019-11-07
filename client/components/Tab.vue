<template>
    <div class="tab-wrapper">
      <transition name="tab-transition">
        <div v-if="show" class="tab">
          testing
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
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        console.log("page loaded 2");
        this.show = true;
      }
        
    });
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
    }
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.tab{
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 72px;
  position: relative;
  background-color: #000;
  height: 40px;

  &:before {
      content: '';
      position: absolute;
      top: 0; 
      right: 0;
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
      height: 100%;
      width: 72px;
    }
}

.tab-transition-enter, .tab-transition-leave-to{
  transform: translateX(-100%);
}

.tab-transition-enter-to{
  transform: translateX(0);
}

.tab-transition-enter-active, .tab-transition-leave-active{
  transition: transform .5s ease;
}
</style>

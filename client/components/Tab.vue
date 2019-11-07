<template>
    <div class="tab-wrapper">
      <transition name="tab-transition">
        <div v-if="show">
          <div v-for="item in content.content" v-bind:key="item.value" class="tab">
            <span v-if="item.title && item.title.length > 0">{{item.title}} : </span>
            <span v-if="item.value && item.value.length > 0">{{item.value}}</span>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  props: {
    content: Object,
  },
  data () {
    return {
      show: false,
    }
  },
  created() {

    console.log(this.content);
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
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

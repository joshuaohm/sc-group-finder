<template>
    <div class="tab-wrapper">
      <transition name="tab-transition">
        <div v-if="show" @click="tabClicked">
          <div v-for="item in content.text" v-bind:key="item.value" v-bind:class="{'tab':true, 'light':(content.lightTheme)}">
            <span v-if="item.title && item.title.length > 0">{{item.title}} : </span>
            <span v-if="item.value && item.value.length > 0">{{item.value}}</span>
          </div>
        </div>
      </transition>
      <div @v-if="show && show2 && content.subPanel">
        <SubPanel ref="subPanel" :content="content.subPanel"></SubPanel>
      </div>
      <div v-if="show && !show2">
        <div class="blue-line"></div>
      </div>
      <div v-else-if="!show && !show2">
        <div class="blue-line added-height"></div>
      </div>
    </div>
</template>

<script>
export default {
  components : {
    SubPanel: () => import('components/Sub-Panel')
  },
  props: {
    content: Object,
  },
  data () {
    return {
      show: false,
      show2: false
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        this.show = true;
      } 
    });
  },
  methods : {
    tabClicked(){

      console.log(this.content.subPanel);
      
      if(this.content.subPanel){
        this.show2 = !this.show2;
        this.$refs.subPanel.togglePanel();
      } 
    }
  },
  watch: {
    show(showValue){
          
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
  margin-bottom: 4px;
  margin-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 72px;
  position: relative;
  background-color: #000;
  height: 40px;
  z-index: 10;

  &.light{
    background-color: $page-border;
    color: white;

    &:before{
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
    }
  }

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

.blue-line{
  margin-right: 94px;
  margin-left: 2px;
  height: 2px;
  background-color: $ice-blue;
  opacity: .5;
}

span{
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
}

.added-height {
  margin-top: 88px;
}

.tab-transition-enter, .tab-transition-leave-to{
  transform: translateX(-100%);
}

.tab-transition-enter-to{
  transform: translateX(0);
}

.tab-transition-enter-active, .tab-transition-leave-active{
  transition: transform .25s ease;
}
</style>

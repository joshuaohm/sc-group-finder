<template>
  <div class="panel-wrapper"> 
    <transition name="subpanel-transition">  
        <div v-if="show"  v-bind:class="{'sub-panel':true, 'light':(content.lightTheme)}">
          <div v-for="component in content.content" :key="component.id">
            <div v-if="component.type.toLowerCase().includes('tab')">
              <component :is="component.type" :content="component"></component>
            </div>
            <div v-else-if="component.type.toLowerCase() === 'p'">
              <p>{{component.value}}</p>
            </div>
            <div v-else-if="component.type.toLowerCase() === 'h3'">
              <h3>{{component.value}}</h3>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab') ,
    TabInput: () => import('components/Tab-Input') 
  },
  props: {
    content: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      lightTheme: false,
    }
  },
  created() {

    this.lightTheme = this.props.content.lightTheme;

    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        console.log("sub panel created");
       
      } 
    });
  },
  methods: {
    togglePanel(){
      this.show = !this.show;
    }
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.panel-wrapper{
  overflow: hidden;
}

.sub-panel{
  position: relative;
  border: 2px solid $ice-blue;
  padding: 12px;
  background-color: black;
  margin-right: 94px;
  z-index:1;
  min-height: 150px;
  color: $ice-blue;

  &.light{
    background-color: transparent;
    border: 2px solid $page-border;
  }
}

/** Styling for Tabs inside of Panels **/

/deep/ .tab{
  height: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 1.4rem;
  line-height: 20px;

  &:before {
      width: 36px;
    }
}

.subpanel-transition-enter, .subpanel-transition-leave-to{
  transform: translateY(-100%);
  opacity: 0;
}

.subpanel-transition-enter-to{
  transform: translateY(0);
  opacity: 1;
}

.subpanel-transition-enter-active, .subpanel-transition-leave-active{
  transition: transform .25s ease, opacity .25s ease;
}
</style>

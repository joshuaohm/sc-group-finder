<template>
  <div class="panel-wrapper"> 
    <transition name="subpanel-transition"
       v-on:after-enter="subPanelLoaded()">  
        <div v-if="show"  v-bind:class="{'sub-panel':true, 'light':(content.lightTheme), 'onLight':(parentColorTheme), 'onDark':(!parentColorTheme)}">
          <div v-for="component in content.content" :key="component.name">
            <div v-if="component.type.toLowerCase().includes('tab')">
              <component :name="component.name" :is="component.type" :content="component"></component>
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
    name: String,
    content: Object
  },
  computed: {
    parentColorTheme () {
      return this.$parent.content.lightTheme;
    }
  },
  data () {
    return {
      show: false,
      lightTheme: false,
    }
  },
  created() {
  
  },
  methods: {
    togglePanel(){
      this.show = !this.show;
    },
    subPanelLoaded(){
      this.$store.commit('SUBPANELLOADED');
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
  padding: 8px;
  background-color: black;
  margin-right: 50px;
  z-index:1;
  color: $ice-blue;

  &.light{
    background-color: $page-color;
    border: 2px solid $page-border;
  }
}

/** Styling for Tabs inside of Panels **/

/deep/ .tab-transition-enter-active, /deep/ .tab-transition-leave-active{
  transition-delay: .2s;
}

.subpanel-transition-enter, .subpanel-transition-leave-to{
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.subpanel-transition-enter-to{
  max-height: 400px;
  opacity: 1;
  overflow: hidden;
}

.subpanel-transition-leave{
  max-height: 400px;
  opacity: 0;
  overflow: hidden;
}

.subpanel-transition-enter-active{
  transition: all .2s ease-in;
} 
.subpanel-transition-leave-active{
  transition: all .2s cubic-bezier(0, 1, 0.5, 1);
}

@media screen and (max-width: 780px){
  .sub-panel{
    font-size: 1rem;
    margin-right: 32px;
  }

}
@media screen and (max-width: 480px){
  .sub-panel{
    font-size: .8rem;
  }
}
</style>

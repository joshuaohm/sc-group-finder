<template>
  <div class="panel-wrapper"> 
    <transition name="subpanel-transition">  
        <div v-if="show"  v-bind:class="{'sub-panel':true, 'light':(content.lightTheme)}">
          <div v-for="item in content.text" v-bind:key="item.value">
            <p>{{item.value}}</p>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
import Tab from 'components/Tab'
import TabInput from 'components/Tab-Input'

export default {
  components: {
    Tab, TabInput
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

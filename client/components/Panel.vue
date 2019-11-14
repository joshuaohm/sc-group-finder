<template>
    <div class="panel-wrapper">
      <div v-bind:class="{'panel':true, 'light':(content.lightTheme), 'onLight':(parentColorTheme), 'onDark':(!parentColorTheme)}">
        <div v-for="component in content.content" :key="component.name">
          <div v-if="component.type.toLowerCase().includes('tab')">
            <component :name="component.name" :is="component.type" :content="component"></component>
          </div>
          <div v-else-if="component.type.toLowerCase().includes('subpanel')">
            <component :name="component.name" :is="component.type" :content="component"></component>
          </div>
          <div v-else-if="component.type.toLowerCase() === 'p'">
            <p>{{component.content}}</p>
          </div>
          <div v-else-if="component.type.toLowerCase() === 'h3'">
            <h3>{{component.content}}</h3>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  components: {
    Tab: () => import('components/Tab') ,
    TabInput: () => import('components/Tab-Input'),
    SubPanel: () => import('components/Sub-Panel')
  },
  props: {
    name : String,
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
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        this.show = true;
      } 
    });
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.panel{
  border: 2px solid $page-border;
  padding: 8px;
  margin: 12px;
  background-color: black;
  color: $ice-blue;

  &.light{
    background-color: $page-color;
  }
}

/** Styling for Tabs inside of Panels **/


/deep/ .tab-transition-enter-active, /deep/ .tab-transition-leave-active{
  transition-delay: .5s;
}


</style>

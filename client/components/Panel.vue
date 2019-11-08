<template>
    <div class="panel-wrapper">
      <div class="panel">
        <div v-for="component in content.content" :key="component.type">
          <div v-if="component.type.toLowerCase().includes('tab')">
            <component :is="component.type" :content="component"></component>
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
import Tab from 'components/Tab'
import TabInput from 'components/Tab-Input'

export default {
  components: {
    Tab, TabInput
  },
  props: {
    content: {
      type: Array
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
  padding: 12px;
  margin: 12px;
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

/deep/ .tab-transition-enter-active, /deep/ .tab-transition-leave-active{
  transition-delay: .5s;
}

/deep/ .blue-line{
  margin-right: 58px;
}

/deep/ .added-height{
  margin-top: 44px;
}
</style>

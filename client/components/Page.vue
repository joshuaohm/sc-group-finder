<template>
  <div class="page-wrapper">
    <transition appear
          appear-to-class="page-appear"
          appear-active-class="page-appeared"
          v-on:after-appear="pageLoaded()">
      <div class="page">
        <div v-for="component in content" :key="component.type">
          <div v-if="component.type.toLowerCase().includes('tab')">
            <component :is="component.type" :content="component"></component>
          </div>
          <div v-else-if="component.type.toLowerCase().includes('panel')">
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
    </transition>
  </div>
</template>

<script>
import Tab from 'components/Tab'
import TabInput from 'components/Tab-Input'
import TabSelect from 'components/Tab-Select'
import Panel from 'components/Panel'

export default {
  components: {
    Tab, TabInput, TabSelect, Panel
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
  methods: {
    isLoggedIn() {
      return true;
    },
    pageLoaded(){
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
  animation: fadeInGrowVert .3s ease;
  animation-delay: .5s;
}

.page-appeared{
  opacity: 0;
}

</style>

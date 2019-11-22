<template>
  <div class="page-wrapper">
    <transition appear
          appear-active-class="page-appear-active"
          v-on:after-appear="pageLoaded()">
      <div v-bind:class="{'page':true, 'light':(content.lightTheme)}">
        <slot v-for="(component, index) in content.content">
          <TypeEvaluator  :component="component" :id="'Page-TypeEvaluator-'+index"></TypeEvaluator>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>

import TypeEvaluator from 'components/TypeEvaluator'

export default {
  components: {
    TypeEvaluator
  },
  props: {
    name : String,
    content: Object,
    lightTheme: Boolean
  },
  created () {

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
@import "../assets/scss/_variables.scss";

.page {
  margin-top: 48px;
  text-align: center;
  background-color: $page-color;
  border: 2px solid;
  border-color: $page-border;
  color: $ice-blue;
  width: calc(100% - 4px);
  padding-bottom: 8px;
  overflow: hidden;
}
.page code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}

.page-appear{
  max-height: 0;
}

.page-appear-active{
  animation: fadeInGrowVert .3s ease-in;
}

.page-appear-to{
  max-height: 500px;
}

@keyframes fadeInGrowVert {
  0%{

    max-height: 0;
  }
  100%{

    max-height: 500px;
  }
}
</style>

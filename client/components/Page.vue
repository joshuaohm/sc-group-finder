<!--
- Page
- Used to contain all view content, basically a window that open below the nav in the app.
-
-->
<template>
  <div class="page-wrapper">
    <transition
      :transitionType="'transition'"
      appear
      appear-active-class="page-appear-active"
      v-on:after-appear="pageLoaded()"
    >
      <div v-bind:class="{'page':true, 'light':(content.lightTheme)}">
        <slot v-for="(component, index) in content.content">
          <slot v-if="Array.isArray(component)">
            <slot v-for="(subcomponent, index2) in component">
              <TypeEvaluator
                :component="subcomponent"
                :id="'Page-TypeEvaluator-'+index+'-sub-'+index2"
              ></TypeEvaluator>
            </slot>
          </slot>
          <slot v-else>
            <TypeEvaluator :component="component" :id="'Page-TypeEvaluator-'+index"></TypeEvaluator>
          </slot>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import TypeEvaluator from 'components/TypeEvaluator';

export default {
  components: {
    TypeEvaluator
  },
  props: {
    content: Object,
    lightTheme: Boolean
  },
  created() {},
  data() {
    return {
      show: false
    };
  },
  methods: {
    isLoggedIn() {
      return true;
    },
    pageLoaded() {
      this.$store.commit('PAGELOADED');
      this.$store.commit('SHOWTABS');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.page {
  margin-top: 48px;
  text-align: center;
  background-color: $page-color;
  border: 2px solid;
  border-color: $page-border;
  color: $ice-blue;
  box-sizing: border-box;
  width: 100%;
  padding-bottom: 8px;
  overflow: hidden;
}
.page code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}

.page-appear {
  max-height: 0;
}

.page-appear-active {
  animation: fadeInGrowVert 0.3s ease-in;
}

.page-appear-to {
  max-height: 500px;
}

@keyframes fadeInGrowVert {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 500px;
  }
}
</style>

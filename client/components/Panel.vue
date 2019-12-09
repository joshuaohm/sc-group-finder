<!--
- Panel
- Used to contain rendered objects in a Page within a bordered square.
-
-->
<template>
  <div class="panel-wrapper">
    <div
      v-bind:class="{'panel':true, 'light':(content.lightTheme), 'onLight':(parentColorTheme), 'onDark':(!parentColorTheme)}"
    >
      <slot v-for="(component, index) in content.content">
        <TypeEvaluator :component="component" :name="'Panel-TypeEvaluator-'+index"></TypeEvaluator>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    SubPanel: () => import('components/Sub-Panel'),
    Row: () => import('components/Row'),
    TypeEvaluator: () => import('components/TypeEvaluator'),
    ShipCrewPostDisplayer: () => import('components/ShipCrewPostDisplayer')
  },
  props: {
    name: String,
    content: Object
  },
  computed: {
    parentColorTheme() {
      if (this.$parent.content) return this.$parent.content.lightTheme;
      else if (this.$parent.lightTheme) return this.$parent.lightTheme;
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'PAGELOADED') {
        this.show = true;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.panel {
  border: 2px solid $page-border;
  padding: 8px;
  margin: 12px;
  background-color: black;
  color: $ice-blue;
  box-sizing: border-box;

  &.light {
    background-color: $page-color;
  }
}
</style>

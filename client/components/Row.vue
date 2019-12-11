<!--
- Row
- Used to contain html elements and components somewhat like bootstrap's row class, uses flex, so can display as row or columns.
-
-->
<template>
  <div
    @click="rowClicked"
    :class="['row', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
  >
    <div v-for="(component, index) in content.content" :key="index">
      <TypeEvaluator :component="component"></TypeEvaluator>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    TabSelect: () => import('components/Tab-Select'),
    TypeEvaluator: () => import('components/TypeEvaluator')
  },
  props: {
    content: Object
  },
  data() {
    return {
      contentType: 'Row'
    };
  },
  computed: {
    parentColorTheme() {
      if (this.$parent.content) return this.$parent.content.lightTheme;
      else if (this.$parent.lightTheme) return this.$parent.lightTheme;
    }
  },
  created() {
    this.content.lightTheme = this.parentColorTheme;
  },
  updated() {
    this.$store.commit('SHOWTABS');
  },
  methods: {
    rowClicked(e) {
      e.stopPropagation();
    }
  }
};
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';

.row {
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 0;
}

.row > div {
  flex: 1 1 100%;
}

@media screen and (max-width: 480px) {
  .row {
    flex-flow: row wrap;
  }
  .row > div {
    flex: 1 0 100%;
    width: 100%;
  }
}
</style>

<template>
  <div :class="[component.contentWidth, 'component-wrapper']" :align="component.contentAlign">
    <div
      v-if="isHtml"
      :is="componentType"
      :id="component.id"
      :name="component.name"
    >{{component.value}}</div>
    <div
      v-else
      :name="component.name"
      :is="component.contentType"
      :id="component.id"
      :content="component"
      v-model="inputVal"
    ></div>
  </div>
</template>
<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    TabSelect: () => import('components/Tab-Select'),
    Panel: () => import('components/Panel'),
    Row: () => import('components/Row'),
    Form: () => import('components/Form'),
    ShipCrewPostDisplayer: () => import('components/ShipCrewPostDisplayer'),
    ShipCrewPositionsDisplayer: () => import('components/ShipCrewPositionsDisplayer'),
    ShipCrewPostCreator: () => import('components/ShipCrewPostCreator')
  },
  data() {
    return {
      contentType: 'TypeEvaluator',
      lightTheme: true,
      inputVal: this.value,
      isHtml:
        this.component.contentType === 'span' ||
        this.component.contentType === 'p' ||
        this.component.contentType === 'h1' ||
        this.component.contentType === 'h3' ||
        this.component.contentType === 'label'
    };
  },
  props: {
    name: String,
    component: Object
  },
  computed: {
    parentColorTheme() {
      if (this.$parent.content) return this.$parent.content.lightTheme;
      else if (this.$parent.lightTheme) return this.$parent.lightTheme;
    },
    componentType() {
      if (this.component && this.component.contentType) {
        return this.component.contentType;
      } else {
        return null;
      }
    }
  },
  created() {
    this.lightTheme = this.parentColorTheme;
  },
  watch: {
    inputVal(val) {
      //this.$emit('input', val);
    }
  }
};
</script>
<style lang="scss">
</style>

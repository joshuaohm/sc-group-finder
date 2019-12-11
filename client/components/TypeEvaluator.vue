<!--
- TypeEvalaluator
- Used to determine HTML elements from components in JSON prop data and render them correctly
-
--->
<template>
  <div :class="['full-width']">
    <div
      v-if="isElementHTML(component) && component.value && component.value.length > 0"
      :is="component.contentType"
      :name="elementName(component)"
      :id="elementId(component)"
      :class="[component.class, component.contentWidth, component.contentAlign]"
    >{{component.value}}</div>
    <div
      v-else-if="isElementHTML(component) && component.content && component.content.length > 0"
      :is="component.contentType"
      :name="elementName(component)"
      :id="elementId(component)"
      :class="[component.class, component.contentWidth, component.contentAlign]"
    >
      <slot v-for="content in component.content">
        <div
          v-if="isElementHTML(content) && content.value && content.value.length > 0"
          :is="content.contentType"
          :name="elementName(content)"
          :id="elementId(content)"
          content
          :align="content.contentAlign"
          :class="[content.class, content.contentWidth, content.contentAlign]"
        >{{content.value}}</div>
        <div
          v-else
          :is="content.contentType"
          :name="elementName(content)"
          :id="elementId(content)"
          :content="content"
          :class="[content.class, content.contentWidth, content.contentAlign]"
        ></div>
      </slot>
    </div>
    <div
      v-else
      :name="elementName(component)"
      :id="elementId(component)"
      :is="component.contentType"
      :content="component"
      :class="[component.class, component.contentWidth, component.contentAlign]"
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
    ShipCrewPostCreator: () => import('components/ShipCrewPostCreator'),
    ShipCrewPositionsSelector: () => import('components/ShipCrewPositionsSelector')
  },
  data() {
    return {
      contentType: 'TypeEvaluator',
      id: 'TypeEvaluator-' + this._uid,
      lightTheme: true,
      isHtml:
        this.component.contentType === 'span' ||
        this.component.contentType === 'p' ||
        this.component.contentType === 'h1' ||
        this.component.contentType === 'h3' ||
        this.component.contentType === 'label' ||
        this.component.contentType === 'div' ||
        this.component.contentType === 'textarea'
    };
  },
  props: {
    name: String,
    component: Object,
    test: String
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
  methods: {
    isElementHTML(obj) {
      var ret =
        obj.contentType === 'span' ||
        obj.contentType === 'p' ||
        obj.contentType === 'h1' ||
        obj.contentType === 'h3' ||
        obj.contentType === 'label' ||
        obj.contentType === 'div' ||
        obj.contentType === 'textarea';

      return ret;
    },
    elementName(component) {
      return this.id + '-' + this.component.contentType;
    },
    elementId(component) {
      return this.id + '-' + this.component.contentType;
    }
  },
  created() {
    this.lightTheme = this.parentColorTheme;
  }
};
</script>
<style lang="scss" scoped>
</style>

<!--
- Form
- Pretty much just a form object that can be used with TypeEvaluator to make sure components/nested objects still submit
- Iterates through supplied content and checks children for input values, see methods' parseChildren()
-
--->
<template>
  <form
    :action="content.action"
    :method="content.method"
    :id="content.formId"
    @submit.prevent="stopSubmit"
    :style="'align-items: '+content.alignType+';'"
    :class="['form', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
  >
    <slot v-if="content.formType === 'reveal'">
      <slot v-for="(component, index) in content.content">
        <TypeEvaluator
          v-show="stepIds[index]"
          :component="component"
          :class="[content.formId+'-formStep'+index, 'container']"
          :key="content.formId+'-formStep'+index"
          v-model="component.inputVal"
        ></TypeEvaluator>
      </slot>
    </slot>
    <slot v-else>
      <slot v-for="(component, index) in content.content">
        <TypeEvaluator
          :component="component"
          :class="[content.formId+'-formStep'+index, 'container']"
          :key="content.formId+'-formStep'+index"
          v-model="component.inputVal"
        ></TypeEvaluator>
      </slot>
    </slot>
  </form>
</template>
<script>
export default {
  components: {
    TypeEvaluator: () => import('components/TypeEvaluator')
  },
  props: {
    name: String,
    content: Object
  },
  computed: {
    getStepIds() {
      return this.stepIds;
    },
    rowClass() {
      return 'row-' + this.content.content.length;
    },
    parentColorTheme() {
      if (this.$parent.content) return this.$parent.content.lightTheme;
      else if (this.$parent.lightTheme) return this.$parent.lightTheme;
    }
  },
  data() {
    return {
      formStep: 0,
      stepIds: []
    };
  },
  methods: {
    parseChildren(data, tree) {
      for (var child of tree) {
        if (child.inputVal && child.$attrs.name) {
          data[child.$attrs.name] = child.inputVal;
        } else if (child.selected && child.$attrs.name) {
          data[child.$attrs.name] = child.selected;
        } else if (child.textAreaName && child.inputVal) {
          data[child.textAreaName] = child.inputVal;
        }
        if (child.$children.length > 0) data = this.parseChildren(data, child.$children);
      }

      return data;
    },
    stopSubmit(e) {
      e.stopPropagation();
      e.preventDefault();

      var formData = new Object();

      formData = this.parseChildren(formData, this.$children);

      this.content.onSubmit(formData, this);
    }
  },
  mounted() {
    this.$root.$on('form-step-completed', el => {
      this.formStep = el.formStep + 1;
      this.$set(this.stepIds, el.formStep + 1, true);
      if (el.callBack) el.callBack();
    });
  },
  created() {
    for (var i = 0; i < this.content.content.length; i++) {
      if (i == 0) this.stepIds[0] = true;
      else this.stepIds[i] = false;
    }
  }
};
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';

.form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  label {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>

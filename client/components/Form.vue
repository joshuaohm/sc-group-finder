<template>
  <form :action="content.action" :method="content.method" :id="content.formId" @submit.prevent="stopSubmit" :style="'align-items: '+content.alignType+';'" :class="['form', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
    <slot v-for="(component, index) in content.content">
      <TypeEvaluator  :component="component" :name="component.name" :id="'Form-TypeEvaluator-'+index" @key="index" v-model="component.inputVal"></TypeEvaluator>
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
    rowClass() {
      return "row-"+this.content.content.length;
    },
    parentColorTheme () {
      if(this.$parent.content)
        return this.$parent.content.lightTheme;
      else if(this.$parent.lightTheme)
        return this.$parent.lightTheme;
    }
  },
  data () {
    return {
    }
  },
  methods : {
    stopSubmit(e){
      e.stopPropagation();
      e.preventDefault();;

      var formData = new Object();

      for(var child of this.$children){
        if(child.inputVal && child.name){
          formData[child.name] = child.inputVal;
        }
      }

      this.content.onSubmit(formData, this.$store, this.$router);
    }
  },
}
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.form{
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;

  label{
    padding-left: 8px;
    padding-right: 8px;
  }
}

</style>

<template>
  <form @click="formClicked" :class="['form', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
    <div v-for="(component, index) in content.content" :key="index">
      <TypeEvaluator  :component="component" :name="'Form-TypeEvaluator-'+index"></TypeEvaluator>
    </div>
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
    },
  },
  data () {
    return {
    }
  },
  methods : {
    formClicked (e){
      e.stopPropagation();
    }
  }
}
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";


</style>
<template v-if="component.contentType.toLowerCase() == 'p' || 
                component.contentType.toLowerCase() == 'h1' ||
                component.contentType.toLowerCase() == 'h3' ||
                component.contentType.toLowerCase() == 'label' ">
  <this.componentType>
    {{component.value}}
  </this.componentType>
</template>
<template v-else>
    <this.componentType :name="component.name" :is="component.contentType" :content="component"></this.componentType>
</template>
<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    TabSelect: () => import('components/Tab-Select'),
    Panel: () => import('components/Panel'),
    Row: () => import('components/Row'),
    Form: () => import('components/Form')
  },
  data () {
    return {
      contentType: "TypeEvaluator",
      lightTheme : true,
    }
  },
  props: {
    name: String,
    component: Object,
  },
  computed: {
    rowClass() {
      return "row-"+this.content.length;
    },
    parentColorTheme () {
      if(this.$parent.content)
        return this.$parent.content.lightTheme;
      else if(this.$parent.lightTheme)
        return this.$parent.lightTheme;
    },
    componentType () {
      if(this.component && this.component.contentType){
        return this.component.contentType;
      }
      else{
        return null;
      }
    }

  },
  created () {
    this.lightTheme = this.parentColorTheme;

    var truthy = this.component.contentType.toLowerCase() == 'p' || 
                this.component.contentType.toLowerCase() == 'h1' ||
                this.component.contentType.toLowerCase() == 'h3' ||
                this.component.contentType.toLowerCase() == 'label';

    console.log(this.component.contentType.toLowerCase());
    console.log(truthy);
  }
}
</script>
<style lang="scss">


</style>
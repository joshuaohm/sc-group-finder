<template>
  <div :class="component.contentWidth" :align="component.contentAlign">
    <div v-if="isHtml" :is="componentType"  :class="'test-a'">
      {{component.value}}
    </div>
    <div v-else :class="'test-b'" :name="component.name" :is="component.contentType" :content="component" >
    </div>
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
    Form: () => import('components/Form')
  },
  data () {
    return {
      contentType: "TypeEvaluator",
      lightTheme : true,
      isHtml : (this.component.contentType === 'p' || this.component.contentType  === 'h1' || this.component.contentType === 'h3' || this.component.contentType === 'label' )
    }
  },
  props: {
    name: String,
    component: Object,
  },
  computed: {
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
  }
}
</script>
<style lang="scss">


</style>
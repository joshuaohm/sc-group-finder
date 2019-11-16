<template>
  <div @click="rowClicked" :class="['row', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
    <div  v-for="(component, index) in content.content" :key="index">
      <TypeEvaluator  :component="component" :name="'Row-TypeEvaluator-'+index"></TypeEvaluator>
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
    name: String,
    content: Object
  },
  data () {
    return {
    }
  },
  computed: {
    parentColorTheme () {
      if(this.$parent.content)
        return this.$parent.content.lightTheme;
      else if(this.$parent.lightTheme)
        return this.$parent.lightTheme;
    },
  },
  created () {
    this.content.lightTheme = this.parentColorTheme;
  },
  methods : {
    rowClicked (e){
      e.stopPropagation();
    }
  }
}
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.row{
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 0;
}

</style>
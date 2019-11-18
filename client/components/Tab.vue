<template>
    <div class="tab-wrapper" :class="[mobileAlignOverride()]">
      <transition name="tab-transition"
         v-on:after-enter="tabLoaded()">
        <div v-if="showTab" @click="tabClicked">
          <div v-for="(item, index) in content.text" :key="index" :class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
            <slot v-if="item.value && item.value.length > 0">{{item.value}}</slot>
          </div>
        </div>
      </transition>
      <div @v-show="showSubPanel">
        <component :is="content.subPanel.contentType" ref="subPanel" :name="content.subPanel.name" :content="content.subPanel"></component>
      </div>
      <div v-if="showBlue && !addedHeight && !showSubPanel">
        <div :class="['blue-line', alignment]"></div>
      </div>
      <div v-else-if="showBlue && addedHeight">
        <div v-bind:class="['blue-line', 'added-height', alignment]"></div>
      </div>
    </div>
</template>

<script>
export default {
  components : {
    SubPanel: () => import('components/Sub-Panel')
  },
  props: {
    name : String,
    content: Object,
  },
  computed: {
    parentColorTheme () {
      if(this.$parent.content)
        return this.$parent.content.lightTheme;
      else if(this.$parent.lightTheme)
        return this.$parent.lightTheme;
    },
    alignment () {
      return this.content.alignType;
    }
  },
  data () {
    return {
      showTab: false,
      showBlue: true,
      showSubPanel : false,
      addedHeight: true,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        this.showTab = true;
        this.addedHeight = false;
      }
      else if(mutation.type === 'TABLOADED' && this.showTab){
        this.showBlue = true;
        this.addedHeight = false;
      }
      else if(mutation.type === 'SUBPANELEXPANDED' && this.isSubPanel(this.$parent) && (this.$parent.expanded || this.$parent.$parent.expanded)){
        this.showTab = true;
        this.addedHeight = false;
      }
      else if(mutation.type === 'SUBPANELCOLLAPSED' &&  this.HasSubPanel(this.$children, "collapsed") && this.showTab){
        this.showBlue = true;
      }
    });
  },
  methods : {
    tabClicked(){
      
      if(this.content.subPanel){

        this.showSubPanel = !this.showSubPanel;

        if(this.showTab && this.showSubPanel)
        {
          
          this.$refs.subPanel.togglePanel();
          this.showBlue = false;
          this.addedHeight = false;
        }
        else if(this.showTab && !this.showSubPanel){
          
          this.$refs.subPanel.togglePanel();
          this.showBlue = true;
          this.addedHeight = false;
        }
      }
    },
    HasSubPanel(elements, state){
      if(!elements)
        return false;

      for(var element in elements){
        switch(state){
          case "":
          case typeof(undefined):
            {
              if(this.isSubPanel(element)){
                return true;
              }
              else{
                return false;
              }
              break;
            }
            case "collapsed": {
              if(this.isSubPanel(element) && !element.expanded){
                return true;
              }
              else{
                return false;
              }
              break;
            }
            case "expanded": {
              if(this.isSubPanel(element) && element.expanded){
                return true;
              }
              else{
                return false;
              }
              break;
            } 
        }
      }

      return false;
    },
    isSubPanel(element){
      if(element && element.content && element.content.contentType && element.content.contentType.toLowerCase().includes("row")){
        element = element.$parent;
      }
      if(element && element.content && element.content.contentType && element.content.contentType.toLowerCase().includes('subpanel')){
        return true;
      }
      else{
        return false;
      }
    },
    tabLoaded(){
      this.$store.commit("TABLOADED");
    },
    mobileAlignOverride(){
      if(screen.width > 480)
        return this.alignment;
      //Tab is in a row that has been split into multiple rows for mobile; make them all the same alignType
      else if( this.$parent.contentType && this.$parent.contentType.toLowerCase() === "typeevaluator" && this.$parent.$parent &&      this.$parent.$parent.contentType && this.$parent.$parent.contentType.toLowerCase() === "row" ){
        console.log(this);
        this.content.alignType = "center";
        return "center";
      }
        

    }
  },
  watch: {
    show(showValue){
          
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
@import "../assets/scss/tabs.scss";
</style>

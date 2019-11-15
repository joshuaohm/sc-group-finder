<template>
    <div class="tab-wrapper" :class="[alignment]">
      <transition name="tab-transition"
         v-on:after-enter="tabLoaded()">
        <div v-if="showTab" @click="tabClicked">
          <div v-for="item in content.text" v-bind:key="item.value" :class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
            <div v-if="item.value && item.value.length > 0">{{item.value}}</div>
          </div>
        </div>
      </transition>
      <div @v-show="showSubPanel">
        <component :is="content.subPanel.type" ref="subPanel" :name="content.subPanel.name" :content="content.subPanel"></component>
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
      return this.$parent.content.lightTheme;
    },
    alignment () {
      return this.content.align;
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
      else if(mutation.type === 'SUBPANELEXPANDED' &&  this.isSubPanel(this.$parent) && this.$parent.expanded){
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
      if(element && element.content && element.content.type && element.content.type.toLowerCase().includes('subpanel')){
        return true;
      }
      else{
        return false;
      }
    },
    tabLoaded(){
      this.$store.commit("TABLOADED");
    }
  },
  watch: {
    show(showValue){
          
    }
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.tab-wrapper{

  &.addedBottom{
    margin-bottom: 6px;
  }
}

.tab{
  margin-top: 8px;
  margin-bottom: 4px;
  position: relative;
  background-color: #000;
  height: 40px;
  z-index: 10;


  &.left{
    margin-right: 8px;
    padding-right: 40px;

    /deep/ .sub-panel{
      margin-right: 50px;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0; 
      right: 0;
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
      height: 100%;
      width: 40px;
    }

    &.light{
      background-color: $page-border;
      color: white;

      &.onLight{

        &:before{
          background: linear-gradient(to top left, $page-color 50%, transparent 50%);
        }
      }

      &.onDark{

        &:before{
          background: linear-gradient(to top left, black 50%, transparent 50%);
        }
      }
    }
  }

  &.mid{
    margin-right: 8px;
    padding-left: 40px;
    padding-right: 40px;

    & /deep/ .sub-panel{
      margin-right: 50px;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(to bottom right, $page-color 50%, transparent 50%);
      height: 100%;
      width: 40px;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0; 
      right: 0;
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
      height: 100%;
      width: 40px;
    }

    &.light{
      background-color: $page-border;
      color: white;

      &.onLight{

        &:before{
          background: linear-gradient(to bottom right, $page-color 50%, transparent 50%);
        }
      }

      &.onDark{

        &:before{
          background: linear-gradient(to bottom right, black 50%, transparent 50%);
        }

        &:after{
          background: linear-gradient(to top left, black 50%, transparent 50%);
        }
      }
    }
  }

  &.center{
    margin-left: 8px;
    margin-right: 8px;
    padding-left: 40px;
    padding-right: 40px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(to top right, $page-color 50%, transparent 50%);
      height: 100%;
      width: 40px;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0; 
      right: 0;
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
      height: 100%;
      width: 40px;
    }

    &.light{
      background-color: $page-border;
      color: white;

      &.onLight{

        &:before{
          background: linear-gradient(to top right, $page-color 50%, transparent 50%);
        }
      }

      &.onDark{

        &:before{
          background: linear-gradient(to top right, black 50%, transparent 50%);
        }

        &:after{
          background: linear-gradient(to top left, black 50%, transparent 50%);
        }
      }
    }
  }

  &.right{
    margin-left: 8px;
    padding-left: 40px;

    &:before {
      content: '';
      position: absolute;
      top: 0; 
      left: 0;
      background: linear-gradient(to top right, $page-color 50%, transparent 50%);
      height: 100%;
      width: 40px;
    }

    &.light{
      background-color: $page-border;
      color: white;

      &.onLight{

        &:before{
          background: linear-gradient(to top right, $page-color 50%, transparent 50%);
        }
      }

      &.onDark{

        &:before{
          background: linear-gradient(to top right, black 50%, transparent 50%);
        }
      }
    }
  }
}

.blue-line{
  height: 2px;
  background-color: $ice-blue;
  opacity: .5;
  position: relative;

  &.added-height {
    margin-top: 52px;
  }

  &.left, &.mid{
    margin-right: 50px;
  }
  &.center{
    margin-left: 50px;
    margin-right: 50px;
  }
  &.right{
    margin-left: 50px;
  }
}

span{
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
}

.tab-transition-enter, .tab-transition-leave-to{
  transform: translateX(-150%);
}

.tab-transition-enter-to{
  transform: translateX(0);
}

.tab-transition-enter-active, .tab-transition-leave-active{
  transition: transform .25s ease;
}

@media screen and (max-width: 780px){
  .tab{
    font-size: 1rem;
    margin-right: 10px;
    padding-right: 20px;
    height: 20px;
    line-height: 20px;

    &:before{
      width: 20px;
    }
  }

  .blue-line {
    margin-right: 32px;
  }

  .added-height {
    margin-top: 32px;
  }
}
@media screen and (max-width: 480px){
  .tab{
    font-size: .8rem;
  }
}
</style>

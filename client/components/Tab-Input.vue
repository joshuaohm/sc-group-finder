<template>
    <div class="tab-input-wrapper" :class="[alignment]">
      <transition name="tab-transition">
        <div v-if="show">
          <div v-bind:class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
            <input type="text" :placeholder="content.placeholder" :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"/>
          </div>
        </div>
      </transition>
      <div v-if="show">
        <div :class="['blue-line', alignment]"></div>
      </div>
      <div v-else>
        <div :class="['blue-line', 'added-height', alignment]"></div>
      </div>
    </div>
</template>

<script>
export default {
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
      show: false,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        this.show = true;
      } 
    });
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.tab-input{
  position: relative;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  top: 4px;
  margin: 0;
  margin-left: 4px;
  margin-right: 4px;
  border: none;
  box-sizing: border-box;
  background-color: black;
  color: $ice-blue;
  font-family: 'Orbitron', sans-serif;
  text-align: center;

  &.light{
    background-color: $page-border;
    color: white;
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
    padding-right: 40px;
    padding-left: 40px;

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

.added-height {
  margin-top: 52px;
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

    &:before{
      width: 20px;
    }
  }

  .tab-input{
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    top: 2px;
    font-size: .8rem;
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

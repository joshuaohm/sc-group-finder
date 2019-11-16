<template>
    <div class="tab-input-wrapper" :class="[alignment]">
      <transition name="tab-transition">
        <div v-if="show">
          <div :class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
            <select v-model="selected" :class="['tab-input', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}]">
              <option v-for="option in content.options" :key="option.value" > 
                {{option.value}}
              </option>
            </select>
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
      if(this.$parent.content)
        return this.$parent.content.lightTheme;
      else if(this.$parent.lightTheme)
        return this.$parent.lightTheme;
    },
    alignment () {
      return this.content.align;
    }
  },
  data () {
    return {
      show: false,
      selected: '',
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
@import "../assets/scss/_variables.scss";
@import "../assets/scss/tabs.scss";

.tab-input{
  display: block;
  position: relative;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  top: 4px;
  padding: 0;
  margin: 0;
  margin-left: 4px;
  margin-right: 4px;
  border: none;
  box-sizing: border-box;
  background-color: black;
  color: $ice-blue;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  cursor: pointer;

  &.light{
    background-color: $page-border;
    color: white;
  }
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

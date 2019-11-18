<template>
    <div class="tab-input-wrapper" :class="[alignment]">
      <transition name="tab-transition">
        <slot v-if="show">
          <div v-bind:class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]">
            <slot v-if="content.inputType.toLowerCase() === 'text'">
              <input type="text" :placeholder="content.placeholder" :name="content.name" :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"/>
            </slot>
            <slot v-else-if="content.inputType.toLowerCase() === 'email'">
              <input type="email" :placeholder="content.placeholder" :name="content.name" :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"/>
            </slot>
            <slot v-else-if="content.inputType.toLowerCase() === 'password'">
              <input type="password" :placeholder="content.placeholder" :name="content.name" :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"/>
            </slot>
            <slot v-else-if="content.inputType.toLowerCase() === 'submit'">
              <input type="submit" :value="content.placeholder" :name="content.name" :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}" /> 
            </slot>
          </div>
        </slot>
      </transition>
      <slot v-if="show">
        <div :class="['blue-line', alignment]"></div>
      </slot>
      <slot v-else>
        <div :class="['blue-line', 'added-height', alignment]"></div>
      </slot>
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
      return this.content.alignType;
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
@import "../assets/scss/_variables.scss";
@import "../assets/scss/tabs.scss";

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

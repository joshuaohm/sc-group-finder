<!--
- Tab Select
- Variation on Tab used as a select dropdown.
-
-->
<template>
  <div class="tab-input-wrapper" :class="[alignment]">
    <transition :transitionType="'transition'" name="tab-transition" v-on:after-enter="tabLoaded()">
      <slot v-if="showTab">
        <div
          :class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
        >
          <select
            v-model="selected"
            :name="this.$attrs.name"
            :id="this.$attrs.id"
            @change="onChange($event)"
            :class="['tab-input', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}]"
          >
            <option
              v-for="option in content.options"
              :value="option.value"
              :key="option.value"
            >{{option.displayValue}}</option>
          </select>
        </div>
      </slot>
    </transition>
    <slot v-if="showBlue && !addedHeight">
      <div :class="['blue-line', alignment]"></div>
    </slot>
    <slot v-else-if="showBlue && addedHeight">
      <div :class="['blue-line', 'added-height', alignment]"></div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    content: Object
  },
  computed: {
    parentColorTheme() {
      if (this.$parent.content) return this.$parent.content.lightTheme;
      else if (this.$parent.lightTheme) return this.$parent.lightTheme;
    },
    alignment() {
      return this.content.alignType;
    }
  },
  data() {
    return {
      showTab: false,
      showBlue: true,
      showSubPanel: false,
      addedHeight: true,
      selected: ''
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'SHOWTABS' &&
        ((!mutation.payload && !this.showTab && this.content.delayedReveal) ||
          (mutation.payload && this.content.id && mutation.payload.id === this.$attrs.id))
      ) {
        this.showTab = true;
        this.addedHeight = false;

        if (!this.options) {
          switch (this.content.optionType) {
            case 'allManus': {
              this.content.options = this.$store.state.allManus;
              break;
            }
          }
        }
      } else if (
        mutation.type === 'HIDETABS' &&
        ((!mutation.payload && !this.showTab && this.content.delayedReveal) ||
          (mutation.payload && this.content.id && mutation.payload.id === this.$attrs.id))
      ) {
        this.showTab = false;
        this.addedHeight = true;
        this.showBlue = true;
      }
      //Watch for state lists that Tab Selects use to be updated and push the changes to the select's options
      //forceUpdate() seems to be necessary, this.$set on all values did not work.
      else if (mutation.type === 'SHIPOPTIONSFILTERED') {
        switch (this.content.optionType) {
          case 'allShips': {
            this.content.options = this.$store.state.filteredShips;
            this.$forceUpdate();
            break;
          }
          case 'allManus': {
            this.content.options = this.$store.state.allManus;
            this.$forceUpdate();
            break;
          }
        }
      } else if (
        mutation.type === 'LOCATIONLANDINGZONESLOADED' ||
        (mutation.type === 'LOCATIONLANDINGZONESFILTERED' && mutation.payload.id === this.content.id)
      ) {
        switch (this.content.optionType) {
          case 'allLandingZones': {
            this.content.options = this.$store.state.locationLandingZones;
            this.$forceUpdate();
            break;
          }
          case 'filteredLandingZones': {
            this.content.options = mutation.payload.data;
            this.$forceUpdate();
            break;
          }
        }
      } else if (mutation.type === 'LOCATIONBODIESLOADED') {
        switch (this.content.optionType) {
          case 'allLocationBodies': {
            this.content.options = this.$store.state.locationBodies;
            this.$forceUpdate();
            break;
          }
        }
      }
    });
  },
  mounted() {},
  methods: {
    onChange(e) {
      this.$root.$emit('option-selected', { id: e.target.id, value: e.target.value });
      this.$root.$emit('form-step-completed', {
        formStep: this.content.formStep,
        form: this.content.formId,
        id: this.content.id,
        callBack: this.content.formStepCallBack ? this.content.formStepCallBack(e) : null
      });
    },
    tabLoaded() {
      this.$store.commit('TABLOADED', this.content.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import '../assets/scss/tabs.scss';
</style>

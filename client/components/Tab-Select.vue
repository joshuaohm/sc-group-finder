<template>
  <div class="tab-input-wrapper" :class="[alignment]">
    <transition name="tab-transition" v-on:after-enter="tabLoaded()">
      <slot v-if="showTab">
        <div
          :class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
        >
          <select
            v-model="selected"
            @change="onChange($event)"
            :id="content.id"
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
    name: String,
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
      show: false,
      showTab: false,
      showBlue: true,
      showSubPanel: false,
      addedHeight: true,
      selected: ''
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'PAGELOADED' && !this.content.delayedReveal) {
        this.showTab = true;
        this.addedHeight = false;

        if (!this.options) {
          switch (this.content.optionType) {
            case 'allManus': {
              this.content.options = this.$store.state.allManus;
              break;
            }
            case 'allShips': {
              this.content.options = this.$store.state.allShips;
              break;
            }
          }
        }
      } else if (
        mutation.type === 'TABLOADED' &&
        this.showTab &&
        mutation.payload === this.content.id &&
        !this.content.delayedReveal
      ) {
        this.showBlue = true;
        this.addedHeight = false;
      }
      //Watch for state lists that Tab Selects use to be updated and push the changes to the select's options
      //forceUpdate() seems to be necessary, this.$set on all values did not work.
      if (mutation.type === 'SHIPOPTIONSFILTERED') {
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
      }
    });
  },
  mounted() {
    this.$root.$on('reveal-next-tab', tab => {
      if (tab.id === this.content.id) {
        this.showTab = true;
        this.showBlue = true;
        this.addedHeight = false;
      }
    });
  },
  methods: {
    onChange(e) {
      this.$root.$emit('option-selected', { id: e.target.id, value: e.target.value });
      this.$root.$emit('form-step-completed', {
        formStep: this.content.formStep,
        form: this.content.formId,
        id: this.content.id
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

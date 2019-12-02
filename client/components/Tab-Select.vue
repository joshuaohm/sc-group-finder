<template>
  <div class="tab-input-wrapper" :class="[alignment]">
    <transition name="tab-transition">
      <slot v-if="show">
        <div
          :class="['tab', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
        >
          <select
            v-model="selected"
            @change="onChange($event)"
            :id="content.id"
            :class="['tab-input', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}]"
          >
            <option v-for="option in content.options" :value="option.id">{{option.displayValue}}</option>
          </select>
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
      selected: ''
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'PAGELOADED') {
        this.show = true;

        if (!this.options) {
          switch (this.content.optionType) {
            case 'allShips': {
              this.content.options = this.$store.state.allShips;
              break;
            }
            case 'allManus': {
              this.content.options = this.$store.state.allShips;
              break;
            }
          }
        }
      }
    });
  },
  mounted() {},
  methods: {
    onChange(e) {
      this.$root.$emit('option-selected', { id: e.target.id, value: e.target.value });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import '../assets/scss/tabs.scss';
</style>

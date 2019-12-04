<template>
  <div class="tab-input-wrapper" :class="[alignment]">
    <transition name="tab-transition">
      <slot v-if="show">
        <div
          v-bind:class="['tab', content.inputType, alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
        >
          <slot v-if="content.inputType.toLowerCase() === 'text'">
            <input
              type="text"
              v-model="inputVal"
              @focus="tabFocused()"
              @blur="tabBlurred()"
              :placeholder="content.placeholder"
              :name="content.name"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'email'">
            <input
              type="email"
              v-model="inputVal"
              @focus="tabFocused()"
              @blur="tabBlurred()"
              :placeholder="content.placeholder"
              :name="content.name"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'password'">
            <input
              type="password"
              v-model="inputVal"
              @focus="tabFocused()"
              @blur="tabBlurred()"
              :placeholder="content.placeholder"
              :name="content.name"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'submit'">
            <input
              type="submit"
              @focus="tabFocused()"
              @blur="tabBlurred()"
              :value="content.placeholder"
              :name="content.name"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'number'">
            <input
              type="number"
              v-model="inputVal"
              min="0"
              max="50"
              @focus="tabFocused()"
              @blur="tabBlurred()"
              :placeholder="content.placeholder"
              :name="content.name"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
        </div>
      </slot>
    </transition>
    <slot v-if="show">
      <div :class="['blue-line', alignment, {'active':focused}]"></div>
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
      focused: false,
      inputVal: this.value
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'PAGELOADED') {
        this.show = true;
      }
    });
  },
  methods: {
    tabBlurred() {
      this.focused = false;
    },
    tabFocused() {
      this.focused = true;
    }
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import '../assets/scss/tabs.scss';
</style>

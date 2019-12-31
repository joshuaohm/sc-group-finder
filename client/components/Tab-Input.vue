<!--
- Tab Input
- Variation on Tab used as a text input field or a form submit button.
-
-->
<template>
  <div class="tab-input-wrapper" :class="[alignment]">
    <transition :transitionType="'transition'" name="tab-transition">
      <slot v-if="showTab">
        <div
          v-bind:class="['tab', content.inputType, alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
        >
          <slot v-if="content.inputType.toLowerCase() === 'text'">
            <input
              type="text"
              v-model="inputVal"
              @focus="tabFocused($event)"
              @blur="tabBlurred($event)"
              :placeholder="content.placeholder"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'email'">
            <input
              type="email"
              v-model="inputVal"
              @focus="tabFocused($event)"
              @blur="tabBlurred($event)"
              :placeholder="content.placeholder"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'password'">
            <input
              type="password"
              v-model="inputVal"
              @focus="tabFocused($event)"
              @blur="tabBlurred($event)"
              :placeholder="content.placeholder"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'submit'">
            <input
              type="submit"
              @click="tabSubmitted($event)"
              @focus="tabFocused($event)"
              @blur="tabBlurred($event)"
              :value="content.placeholder"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
          <slot v-else-if="content.inputType.toLowerCase() === 'number'">
            <input
              type="number"
              v-model="inputVal"
              min="0"
              max="50"
              @focus="tabFocused($event)"
              @blur="tabBlurred($event)"
              :placeholder="content.placeholder"
              :class="{'tab-input':true, 'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}"
            />
          </slot>
        </div>
      </slot>
    </transition>
    <slot v-if="showBlue && !addedHeight">
      <div :class="['blue-line', alignment, {'active':focused}]"></div>
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
      addedHeight: true,
      focused: false,
      inputVal: this.value
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'SHOWTABS' &&
        ((!mutation.payload && !this.showTab && this.content.delayedReveal) ||
          (mutation.payload &&
            this.content.id &&
            (mutation.payload.id === this.$attrs.id || mutation.payload.id === this.content.id)))
      ) {
        this.showTab = true;
        this.showBlue = true;
        this.addedHeight = false;
      }
      if (
        mutation.type === 'HIDETABS' &&
        ((!mutation.payload && !this.showTab && this.content.delayedReveal) ||
          (mutation.payload &&
            this.content.id &&
            (mutation.payload.id === this.$attrs.id || mutation.payload.id === this.content.id)))
      ) {
        this.showTab = false;
        this.addedHeight = true;
        this.showBlue = true;
      }
    });
  },
  methods: {
    tabBlurred(e) {
      this.focused = false;
      this.inputVal = e.target.value;
    },
    tabFocused(e) {
      this.focused = true;
    },
    tabSubmitted(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.content && this.content.onSubmit) this.content.onSubmit();
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

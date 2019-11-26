<template>
  <div class="panel-wrapper">
    <transition
      name="subpanel-transition"
      v-on:after-enter="subPanelLoaded()"
      v-on:after-leave="subPanelCollapsed()"
    >
      <div
        v-if="expanded"
        v-bind:class="['sub-panel', parentAlignment, {'light':(content.lightTheme)}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
      >
        <slot v-for="(component, index) in content.content">
          <slot v-if="component.contentType.toLowerCase() === 'p'">
            <p>{{component.value}}</p>
          </slot>
          <slot v-else-if="component.contentType.toLowerCase() === 'h3'">
            <h3>{{component.value}}</h3>
          </slot>
          <slot v-else-if="component.contentType">
            <TypeEvaluator :component="component" :name="'SubPanel-TypeEvaluator-'+index"></TypeEvaluator>
          </slot>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    Row: () => import('components/Row'),
    TypeEvaluator: () => import('components/TypeEvaluator')
  },
  props: {
    name: String,
    content: Object
  },
  computed: {
    parentColorTheme() {
      if (this.$parent.content) return this.$parent.content.lightTheme;
      else if (this.$parent.lightTheme) return this.$parent.lightTheme;
    },
    parentAlignment() {
      return this.$parent.content.align;
    }
  },
  data() {
    return {
      expanded: false,
      lightTheme: false
    };
  },
  created() {},
  methods: {
    togglePanel() {
      this.expanded = !this.expanded;
    },
    subPanelLoaded() {
      this.$store.commit('SUBPANELEXPANDED');
    },
    subPanelCollapsed() {
      this.$store.commit('SUBPANELCOLLAPSED');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

.panel-wrapper {
  overflow: hidden;

  &.left {
    margin-right: 50px;
  }
}

.sub-panel {
  position: relative;
  border: 2px solid $ice-blue;
  padding: 8px;
  background-color: black;
  z-index: 1;
  color: $ice-blue;

  &.left,
  &.mid {
    margin-right: 50px;
  }
  &.center {
    margin-left: 50px;
    margin-right: 50px;
  }
  &.right {
    margin-left: 50px;
  }

  &.light {
    background-color: $page-color;
    border: 2px solid $page-border;
  }
}

.subpanel-transition-enter,
.subpanel-transition-leave-to {
  max-height: 0px;
  opacity: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.subpanel-transition-enter-to {
  max-height: 400px;
  opacity: 1;
  overflow: hidden;
}

.subpanel-transition-leave {
  max-height: 400px;
  opacity: 0;
  overflow: hidden;
}

.subpanel-transition-enter-active {
  transition: all 0.25s ease-in;
}
.subpanel-transition-leave-active {
  transition: all 0.25s cubic-bezier(0, 1, 0.5, 1);
}

@media screen and (max-width: 780px) {
  .sub-panel {
    font-size: 1rem;
    margin-right: 32px;
  }
}
@media screen and (max-width: 480px) {
  .sub-panel {
    font-size: 0.8rem;
  }
}
</style>

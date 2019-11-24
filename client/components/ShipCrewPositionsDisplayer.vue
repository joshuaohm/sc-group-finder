<template>
  <div class="SCPositionsDisplayer-wrapper">
    <div v-for="(position, index) in content.members" :key="index" class="crewPositions">
      <div :class="['crewPosition', position.type]"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    Row: () => import('components/Row'),
    Panel: () => import('components/Panel')
  },
  props: {
    content: Object
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
</style>

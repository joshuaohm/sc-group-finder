<template>
  <div class="shipCrewPositionsDisplayer-wrapper">
    <label>Crew Positions:</label>
    <div :class="['members-wrapper']">
      <slot v-for="(position, index) in content.content.members">
        <div
          v-if="position.enabled"
          :class="['crewPosition', position.type, , {'filled' : (position.member > 0)}, {'disabled' : (position.enabled === false)}]"
        >
          <div class>{{position.member ? "&nbsp;": "&nbsp;"}}</div>
          <div>{{position.type}}</div>
          <div>{{position.position ? position.position : "&nbsp;"}}</div>
        </div>
      </slot>
    </div>
    <label>Misc Positions:</label>
    <div :class="['miscCrew-wrapper']">
      <slot v-for="(position, index) in content.content.miscCrew">
        <div
          :class="['crewPosition', position.type, {'filled' : (position.member > 0)}, {'disabled' : (position.enabled === false)}]"
        >
          <div class>{{position.member ? "&nbsp;": "&nbsp;"}}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
@import '../assets/scss/_variables.scss';

.members-wrapper,
.miscCrew-wrapper {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.crewPosition {
  border: 1px solid $ice-blue;
  font-size: 1rem;
  padding: 4px;
  min-width: 60px;
  min-height: 60px;

  &.disabled {
    background-color: red;
  }

  &.filled {
    background-color: green;
  }
}
</style>

<!--  
- Ship Crew Positions Displayer
- Used to show filled/unfilled available positions in an SCPost
- Users should be able to click positions and request to join the party in that position.
-
--->

<template>
  <div class="shipCrewPositionsDisplayer-wrapper">
    <div class="row three-quarter-width align-center">
      <div class="row-item">
        <label class="post-text">Creator:</label>
        <div class="post-text">{{content.content.creator}}</div>
      </div>
      <div class="row-item">
        <label class="post-text">Ship:</label>
        <div
          class="post-text"
        >{{content.content.ship.manufacturer + " " + content.content.ship.name}}</div>
      </div>
    </div>
    <slot v-if="content.content.startLocation && content.content.targetLocation">
      <div class="row three-quarter-width align-center">
        <div class="row-item">
          <label class="post-text">Start Location:</label>
          <div class="post-text">{{content.content.startLocation}}</div>
        </div>

        <div class="row-item">
          <label class="post-text">Target Location:</label>
          <div class="post-text">{{content.content.targetLocation}}</div>
        </div>
      </div>
    </slot>
    <slot v-else-if="content.content.startLocation && !content.content.targetLocation">
      <div class="row row-center full-width align-center">
        <div class="row-item">
          <label class="post-text">Start Location:</label>
          <div class="post-text">{{content.content.startLocation}}</div>
        </div>
      </div>
    </slot>
    <slot v-else-if="!content.content.startLocation && content.content.targetLocation">
      <div class="row row-center full-width align-center">
        <div class="row-item">
          <label class="post-text">Target Location:</label>
          <div class="post-text">{{content.content.targetLocation}}</div>
        </div>
      </div>
    </slot>

    <label>Description:</label>
    <textarea :class="['three-quarter-width', 'align-center']">{{content.content.description}}</textarea>
    <label>Crew Positions:</label>
    <div :class="['members-wrapper']">
      <slot v-for="(position, index) in content.content.members">
        <div
          v-if="position.enabled"
          :class="['crewPosition', position.type, , {'filled' : (position.member.id > 0)}, {'disabled' : (position.enabled === false)}]"
        >
          <div class>{{position.member && position.member.name ? position.member.name : "&nbsp;"}}</div>
          <div>{{position.type}}</div>
          <div>{{position.position ? position.position : "&nbsp;"}}</div>
        </div>
      </slot>
    </div>
    <label>Misc Positions:</label>
    <div :class="['miscCrew-wrapper']">
      <slot v-for="(position, index) in content.content.miscCrew">
        <div
          :class="['crewPosition', position.type, {'filled' : (position.member.id > 0)}, {'disabled' : (position.enabled === false)}]"
        >
          <div class>{{position.member && position.member.name ? position.member.name : "&nbsp;"}}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    Row: () => import('components/Row')
  },
  props: {
    content: Object
  },
  data() {
    return {
      row: {
        lightTheme: true,
        contentType: 'Row',
        contentAlign: 'align-center',
        contentWidth: 'full-width',
        content: [
          {
            subPanel: false,
            lightTheme: true,
            text: [{ value: 'Start Location: ' + this.content.content.startLocation }],
            contentType: 'Tab',
            alignType: 'left',
            contentAlign: 'align-center',
            contentWidth: 'three-quarter-width'
          },
          {
            subPanel: false,
            lightTheme: true,
            text: [{ value: 'Target Location: ' + this.content.content.targetLocation }],
            contentType: 'Tab',
            alignType: 'row-right',
            contentAlign: 'align-center',
            contentWidth: 'three-quarter-width'
          }
        ]
      }
    };
  },
  updated() {
    this.$store.commit('SHOWTABS');
  }
};
</script>

<style lang="scss" scoped>
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

.row {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 2rem;
}

.row-center {
  justify-content: center;
}

.row-around {
  justify-content: space-around;
}

.post-text {
  font-size: 1.4rem;
  text-align: left;
}

div.post-text {
  text-decoration: underline;
  white-space: pre-line;
}

label {
  color: $teal;
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

@media screen and (max-width: 768px) {
  .post-text {
    font-size: 1rem;
  }
}
</style>

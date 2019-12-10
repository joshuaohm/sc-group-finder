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
        <label class="post-text align-left">Creator:</label>
        <div class="post-text align-left">{{content.content.creator}}</div>
      </div>
      <div class="row-item">
        <label class="post-text align-right">Ship:</label>
        <div
          class="post-text align-right"
        >{{content.content.ship.manufacturer + " " + content.content.ship.name}}</div>
      </div>
    </div>
    <slot v-if="content.content.startLocation && content.content.targetLocation">
      <div class="row three-quarter-width align-center">
        <div class="row-item">
          <label class="post-text align-left">Start Location:</label>
          <div class="post-text align-left">{{content.content.startLocation.name}}</div>
        </div>
        <div class="row-item">
          <label class="post-text align-right">Target Location:</label>
          <div class="post-text align-right">{{content.content.targetLocation.name}}</div>
        </div>
      </div>
    </slot>
    <slot v-else-if="content.content.startLocation && !content.content.targetLocation">
      <div class="row row-center full-width align-center">
        <div class="row-item">
          <label class="post-text align-center">Start Location:</label>
          <div class="post-text align-center">{{content.content.startLocation.name}}</div>
        </div>
      </div>
    </slot>
    <slot v-else-if="!content.content.startLocation && content.content.targetLocation">
      <div class="row row-center full-width align-center">
        <div class="row-item">
          <label class="post-text align-center">Target Location:</label>
          <div class="post-text align-center">{{content.content.targetLocation.name}}</div>
        </div>
      </div>
    </slot>

    <label class="post-text">Description:</label>
    <textarea disabled :class="['three-quarter-width', 'align-center']">{{content.content.description}}</textarea>

    <label class="post-text">Crew Positions:</label>
    <div :class="['members-wrapper']">
      <slot v-for="(position, index) in content.content.members">
        <div
          v-if="position.enabled"
          :class="['crewPosition', position.type, , {'filled' : (position.member.id > 0)}, {'disabled' : (position.enabled === false)}]"
        >
          <div>{{position.member && position.member.name ? position.member.name : "&nbsp;"}}</div>
          <div>{{position.type}}</div>
          <div>{{position.position ? position.position : "&nbsp;"}}</div>
        </div>
      </slot>
    </div>
    <slot v-if="content.content.miscCrew">
      <label class="post-text">Misc Positions:</label>
      <div :class="['miscCrew-wrapper']">
        <slot v-for="(position, index) in content.content.miscCrew">
          <div
            :class="['crewPosition', position.type, {'filled' : (position.member.id > 0)}, {'disabled' : (position.enabled === false)}]"
          >
            <div>{{position.member && position.member.name ? position.member.name : "&nbsp;"}}</div>
          </div>
        </slot>
      </div>
    </slot>
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
            text: [
              {
                value:
                  'Start Location: ' +
                  (this.content.content.targetLocation ? this.content.content.startLocation.name : null)
              }
            ],
            contentType: 'Tab',
            alignType: 'left',
            contentAlign: 'align-center',
            contentWidth: 'three-quarter-width'
          },
          {
            subPanel: false,
            lightTheme: true,
            text: [
              {
                value:
                  'Target Location: ' +
                  (this.content.content.targetLocation ? this.content.content.targetLocation.name : null)
              }
            ],
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
  margin-top: 1rem;
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
  text-align: center;

  &.align-left {
    text-align: left;
  }

  &.align-right {
    text-align: right;
  }
}

div.post-text {
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
    opacity: 0.8;
  }

  &.filled {
    background-color: green;
    opacity: 0.8;
  }
}

@media screen and (max-width: 768px) {
  .post-text {
    font-size: 1rem;
  }
}
</style>

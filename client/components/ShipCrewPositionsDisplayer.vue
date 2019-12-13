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
          @click="positionClicked(position, index, true)"
          v-if="position.enabled"
          :class="['crewPosition', position.type, , {'filled' : (!position.requested && position.member && position.member.id > 0)}, {'requested' : (position.requested === true)}]"
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
    <TypeEvaluator v-show="this.requestedPosition !== null" :component="submitBtn"></TypeEvaluator>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    Row: () => import('components/Row'),
    TypeEvaluator: () => import('components/TypeEvaluator')
  },
  props: {
    content: Object
  },
  data() {
    return {
      requestedPosition: null,
      submitBtn: {
        contentType: 'Tab-Input',
        alignType: 'center',
        lightTheme: true,
        contentAlign: 'align-center',
        contentWidth: 'btn-width',
        placeholder: 'Submit',
        inputType: 'submit',
        id: this.content.parentId + '-' + this.$uuid + '-submit'
      },
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
  methods: {
    clearRequestedPositions(positions) {
      if (!positions || positions.length === 0) return false;

      for (var i = 0; i < positions.length; i++) {
        if (positions[i].requested === true) {
          positions[i].member = null;
          positions[i].requested = false;
          this.$set(positions, positions[i].requested, false);
          this.$set(positions, positions[i].member, null);
        }
      }
    },
    positionClicked(position, index, isCrew) {
      if (!position.requested && position.member && position.member.id > 0) return;

      var positions = null;
      if (isCrew) {
        positions = this.content.content.members;
      } else positions = this.content.content.miscCrew;

      //Position clicked has already been requested by current user
      if (
        position.requested &&
        position.member &&
        this.requestedPosition !== null &&
        this.requestedPosition.type === position.type &&
        this.requestedPosition.position === position.position &&
        position.member.id === this.$store.state.currentUser.id
      ) {
        this.requestedPosition = null;
        positions[index].requested = false;
        positions[index].member = null;
      }
      //Position clicked has been requested by someone else
      else if (position.requested && position.member && position.member.id === this.$store.state.currentUser.id) {
        return;
      } else {
        this.clearRequestedPositions(positions);
        this.requestedPosition = position;

        position.member = { id: this.$store.state.currentUser.id, name: this.$store.state.currentUser.name };
        position.requested = !position.requested;
      }

      if (this.requestedPosition !== null)
        this.$store.commit('SHOWTABS', { id: this.content.parentId + '-' + this.$uuid + '-submit' });
      else this.$store.commit('HIDETABS', { id: this.content.parentId + '-' + this.$uuid + '-submit' });

      this.$forceUpdate();
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'SHOWTABS' &&
        (!this.content.delayedReveal || (mutation.payload.id && mutation.payload.id === this.content.id))
      ) {
        this.showTab = true;
        this.addedHeight = false;
      } else if (mutation.type === 'HIDETABS' && (mutation.payload && mutation.payload.id === this.content.id)) {
        this.showTab = false;
        this.addedHeight = true;
        this.showBlue = true;
      } else if (mutation.type === 'TABLOADED' && this.showTab) {
        this.showBlue = true;
        this.addedHeight = false;
      } else if (
        mutation.type === 'SUBPANELEXPANDED' &&
        mutation.payload &&
        (mutation.payload.id === this.$attrs.parentId ||
          (mutation.payload.parentId && this.content && mutation.payload.parentId === this.content.parentId))
      ) {
      } else if (
        mutation.type === 'SUBPANELCOLLAPSED' &&
        mutation.payload &&
        (mutation.payload.id === this.$attrs.parentId ||
          (this.content && mutation.payload.id === this.content.parentId))
      ) {
        this.requestedPosition = null;
        this.clearRequestedPositions(this.content.content.members);
        this.clearRequestedPositions(this.content.content.miscCrew);
        this.$forceUpdate();
      }
    });
  },
  updated() {}
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
  font-size: 1rem;
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
  font-size: 1.4rem !important;
  font-family: 'Orbitron', sans-serif;
}

.crewPosition {
  border: 1px solid $ice-blue;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px;
  margin: 1px;
  min-width: 60px;
  min-height: 60px;
  cursor: pointer;

  &.requested {
    border-color: $orange;
    background-color: $page-border;
    color: $orange;
    opacity: 0.8;
  }

  &.filled {
    border-color: $page-border;
    background-color: $page-color;
    color: green;
    opacity: 0.8;
  }
}

@media screen and (max-width: 768px) {
  .row-item {
    width: 100%;
    margin-bottom: 1rem;
  }
  .post-text {
    font-size: 1rem;
    text-align: center;

    &.align-left {
      text-align: center;
    }
    &.align-right {
      text-align: center;
    }
  }
}
</style>

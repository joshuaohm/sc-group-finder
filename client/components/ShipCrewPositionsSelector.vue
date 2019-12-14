<!--
- Ship Crew Positions Selector
- Used to enable/disable crew positions, or assign yourself to a position, when creating a new SCPost.
-
--->
<template>
  <div
    v-if="show"
    :class="['shipCrewPositionsDisplayer-wrapper', 'container', alignment, {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)} ]"
  >
    <label class="align-center">Description:</label>
    <textarea
      name="description"
      id="description"
      class="align-center three-quarter-width"
      v-model="inputVal"
      @blur="textAreaBlurred()"
    ></textarea>
    <label class="align-center">Crew Positions:</label>
    <div :class="['members-wrapper']">
      <slot v-for="(position, index) in content.members">
        <div
          @click="positionClicked(position)"
          :key="'position-'+index"
          :class="['crewPosition', position.type, , {'filled' : (position.user.id > 0 || position.user.id === 'this')}, {'disabled' : (position.enabled === false)}]"
        >
          <div class>{{position.user && position.user.name ? position.user.name : "&nbsp;"}}</div>
          <div>{{position.type}}</div>
          <div>{{position.position ? position.position : "&nbsp;"}}</div>
        </div>
      </slot>
    </div>
    <label class="align-center">Misc Positions:</label>
    <div :class="['miscCrew-wrapper']">
      <TypeEvaluator :component="miscCrewTab"></TypeEvaluator>
    </div>
    <TypeEvaluator :component="submitBtn"></TypeEvaluator>
    <span id="errorContainer"></span>
  </div>
</template>

<script>
export default {
  components: {
    TypeEvaluator: () => import('components/TypeEvaluator'),
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    TabSelect: () => import('components/Tab-Select')
  },
  props: {
    content: Object
  },
  data() {
    return {
      inputVal: this.value,
      textAreaName: 'description',
      textAreaValue: this.value,
      show: false,
      userPosition: null,
      textArea: {
        name: 'description',
        id: 'description',
        contentAlign: 'align-center',
        contentWidth: 'three-quarter-width',
        contentType: 'textarea',
        lightTheme: false
      },
      miscCrewTab: {
        contentType: 'TabInput',
        alignType: 'center',
        lightTheme: true,
        contentAlign: 'align-center',
        contentWidth: 'half-width',
        placeholder: 'Enter Quantity',
        inputType: 'number',
        name: 'miscCrew',
        delayedReveal: true
      },
      submitBtn: {
        contentType: 'Tab-Input',
        alignType: 'center',
        lightTheme: true,
        contentAlign: 'align-center',
        contentWidth: 'quarter-width',
        placeholder: 'Submit',
        inputType: 'submit',
        name: 'submit',
        delayedReveal: true
      }
    };
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
  methods: {
    positionClicked(position) {
      if (this.userPosition === null && position.enabled) {
        this.userPosition = position;
        position.user.id = 'this';
      } else if (this.userPosition === null && !position.enabled) {
        position.enabled = true;
        this.userPosition = position;
        position.user.id = 'this';
      } else if (this.userPosition === position) {
        position.user.id = 0;
        this.userPosition = null;
      } else if (position.enabled) {
        position.enabled = false;
      } else if (!position.enabled) {
        position.enabled = true;
      }

      this.$store.commit('UPDATESHIPMEMBERS', this.content.members);
      this.$forceUpdate();
    },
    //Mobile devices weren't updating correctly when input was entered, this somewhat forces it.
    textAreaBlurred() {
      var test = document.getElementById('description').value;
      this.inputVal = test;
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHIPSELECTED') {
        this.content.members = mutation.payload.crewPositions;

        for (var position of this.content.members) {
          position.enabled = true;
          position.user = new Object();
          position.user.id = 0;
        }
        this.$forceUpdate();
      }
    });

    if (this.delayedReveal) {
      this.$root.$on('reveal-positions-selector', data => {
        if (data.id === this.content.id) {
          this.show = true;
        }
      });
    } else {
      this.show = true;
    }
  },
  watch: {
    inputVal(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

#errorContainer {
  font-size: 0.8rem;
  color: red;
  text-transform: uppercase;
  font-family: 'Roboto Mono', monospace;
}

.shipCrewPositionsDisplayer-wrapper {
  position: relative;
  display: block;
  border: 2px solid $ice-blue;
  background-color: black;
  margin-top: 16px;
  padding: 16px 0px;

  &.light {
    background-color: $page-color;
    border-color: $page-border;
  }
}

.members-wrapper {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.crewPosition {
  border: 1px solid $ice-blue;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px;
  min-width: 60px;
  min-height: 60px;
  margin: 1px;
  background-color: black;

  &.disabled {
    border-color: red;
    background-color: black;
    color: red;
    opacity: 0.8;
  }

  &.filled {
    border-color: $page-border;
    background-color: black;
    color: green;
    opacity: 0.8;
  }
}
</style>

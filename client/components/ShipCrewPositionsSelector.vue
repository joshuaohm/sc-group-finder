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
    ></textarea>
    <label class="align-center">Crew Positions:</label>
    <div :class="['members-wrapper']">
      <slot v-for="(position, index) in content.members">
        <div
          @click="positionClicked(position)"
          :key="'position-'+index"
          :class="['crewPosition', position.type, , {'filled' : (position.member.id > 0 || position.member.id === 'this')}, {'disabled' : (position.enabled === false)}]"
        >
          <div class>{{position.member && position.member.name ? position.member.name : "&nbsp;"}}</div>
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
        position.member.id = 'this';
      } else if (this.userPosition === null && !position.enabled) {
        position.enabled = true;
        this.userPosition = position;
        position.member.id = 'this';
      } else if (this.userPosition === position) {
        position.member.id = 0;
        this.userPosition = null;
      } else if (position.enabled) {
        position.enabled = false;
      } else if (!position.enabled) {
        position.enabled = true;
      }

      this.$store.commit('UPDATESHIPMEMBERS', this.content.members);
      this.$forceUpdate();
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHIPSELECTED') {
        this.content.members = JSON.parse(mutation.payload.crewPositions);

        for (var position of this.content.members) {
          position.enabled = true;
          position.member = new Object();
          position.member.id = 0;
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

.crewPosition {
  border: 1px solid $ice-blue;
  font-size: 1rem;
  padding: 4px;
  min-width: 60px;
  min-height: 60px;
  margin: 1px;

  &.disabled {
    background-color: red;
    color: white;
  }

  &.filled {
    background-color: green;
    color: white;
  }
}
</style>

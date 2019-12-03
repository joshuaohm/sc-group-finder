<template>
  <div
    :class="['shipCrewPostCreator-wrapper', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
  >
    <Form :content="shipCrew"></Form>
  </div>
</template>

<script>
import TypeEvaluator from 'components/TypeEvaluator';
import Form from 'components/Form';
import { RepositoryFactory } from './../repository/RepositoryFactory';

export default {
  components: {
    TypeEvaluator,
    Form
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
    alignment() {
      return this.content.alignType;
    }
  },
  data() {
    return {
      selectedShip: 0,
      manuOptions: null,
      shipOptions: null,
      manufacturerOptions: null,
      shipCrew: {
        action: '',
        method: 'post',
        formId: 'newShipCrewForm',
        formType: 'reveal',
        lightTheme: true,
        content: [
          {
            contentType: 'div',
            class: 'container',
            id: 'newShipCrewFormStep1',
            contentWidth: 'three-quarter-width',
            contentAlign: 'align-center',
            content: [
              {
                contentType: 'label',
                value: 'Select Manufacturer:',
                contentWidth: 'half-width',
                contentAlign: 'align-left'
              },
              {
                contentType: 'Tab-Select',
                alignType: 'left',
                lightTheme: false,
                placeholder: 'Ship',
                contentWidth: 'full-width',
                contentAlign: 'align-center',
                formStep: 0,
                formId: 'newShipCrewForm',
                name: 'manufacturer',
                id: 'manufacturer-selector',
                optionType: 'allManus'
              }
            ]
          },
          {
            contentType: 'div',
            class: 'container',
            id: 'newShipCrewFormStep2',
            contentAlign: 'align-center',
            contentWidth: 'three-quarter-width',
            content: [
              {
                contentType: 'label',
                value: 'Select Ship:',
                contentWidth: 'half-width',
                contentAlign: 'align-left'
              },
              {
                contentType: 'Tab-Select',
                delayedReveal: true,
                alignType: 'left',
                lightTheme: false,
                placeholder: 'Ship',
                contentWidth: 'full-width',
                contentAlign: 'align-center',
                formStep: 1,
                formId: 'newShipCrewForm',
                name: 'ship',
                id: 'ship-selector',
                optionType: 'allShips'
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    getAllShips() {
      var successCallBack1 = shipData => {
        this.$store.commit('SHIPSLOADED', shipData.data.data);
      };

      var errorCallBack1 = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      repo.get(this.$store.state.currentUser.token, successCallBack1, errorCallBack1);
    },
    getAllManus() {
      var successCallBack2 = manuData => {
        this.$store.commit('MANUSLOADED', manuData.data.data);
      };

      var errorCallBack2 = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      repo.getAllManus(this.$store.state.currentUser.token, successCallBack2, errorCallBack2);
    },
    createOptions(type) {
      if (type === 'ships' && !this.$store.state.allShips) return false;
      else if (type === 'manus' && !this.$store.state.allManus) return false;

      if (type === 'ships') {
        for (var option of this.$store.state.allShips) {
          option.displayValue = option.name;
          option.value = option.id;
        }
      } else if (type === 'manus') {
        for (var option of this.$store.state.allManus) {
          option.displayValue = option.manufacturer;
          option.value = option.manufacturer;
        }
      }
    }
  },
  mounted() {
    this.getAllManus();
    this.getAllShips();

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHIPSLOADED') {
        this.createOptions('ships');
      } else if (mutation.type === 'MANUSLOADED') {
        this.createOptions('manus');
      }
    });
    this.$root.$on('option-selected', el => {
      if (el.id === 'manufacturer-selector' && el.value !== '') {
        this.shipOptions = this.$store.state.allShips.filter(x => x.manufacturer === el.value);
        this.$store.commit('SHIPOPTIONSFILTERED', this.shipOptions);
        this.$root.$emit('reveal-next-tab', { id: 'ship-selector' });
      }
    });
  }
};
</script>

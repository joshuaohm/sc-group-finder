<!--
- Ship Crew Post Creator
- Used to create new SCPosts.
-
-->
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
        contentType: 'Form',
        lightTheme: true,
        onSubmit(data, self) {
          console.log(data);
          console.log(self.$store.state.currentShip.members);

          data.members = JSON.stringify(self.$store.state.currentShip.members);

          var successCallBack = postData => {
            //this.$store.commit('SCPOSTSUCCESS', shipData.data.data);
            self.$router.push({ name: 'Ship Crew Posts' });
          };

          var errorCallBack = error => {
            console.log(error);
          };

          const repo = RepositoryFactory.get('scPosts');
          repo.createPost(self.$store.state.currentUser.token, data, successCallBack, errorCallBack);
        },
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
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-left',
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
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-left',
                formId: 'newShipCrewForm',
                formStep: 1,
                formStepCallBack: e => {
                  this.$store.commit('SHIPSELECTED', this.$store.state.filteredShips.find(x => x.id == e.target.value));
                  this.$root.$emit('reveal-positions-selector', { id: 'shipCrewSelector' });
                },
                name: 'ship_id',
                id: 'ship-selector',
                optionType: 'allShips'
              }
            ]
          },
          {
            contentType: 'div',
            class: 'container',
            id: 'newShipCrewFormStep3',
            contentAlign: 'align-center',
            contentWidth: 'three-quarter-width',
            content: [
              {
                contentType: 'label',
                value: 'Select Crew:',
                contentWidth: 'half-width',
                contentAlign: 'align-left'
              },
              {
                contentType: 'ShipCrewPositionsSelector',
                delayedReveal: true,
                lightTheme: true,
                contentWidth: 'full-width',
                contentAlign: 'align-center',
                members: null,
                formStep: 3,
                formId: 'newShipCrewForm',
                name: 'shipCrewSelector',
                id: 'ship-crew-selector'
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    getAllShips() {
      var successCallBack = shipData => {
        this.$store.commit('SHIPSLOADED', shipData.data.data);
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      repo.get(this.$store.state.currentUser.token, successCallBack, errorCallBack);
    },
    getAllManus() {
      var successCallBack = manuData => {
        this.$store.commit('MANUSLOADED', manuData.data.data);
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      repo.getAllManus(this.$store.state.currentUser.token, successCallBack, errorCallBack);
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

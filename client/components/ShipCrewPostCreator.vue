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
      shipsLoaded: false,
      manusLoaded: false,
      bodiesLoaded: false,
      manufacturerOptions: null,
      shipCrew: {
        action: '',
        method: 'post',
        formId: 'newShipCrewForm',
        formType: 'reveal',
        contentType: 'Form',
        lightTheme: true,
        onSubmit(data, self) {
          data.members = JSON.stringify(self.$store.state.currentShip.members);

          if (!data.miscCrew) data.miscCrew = 0;

          var successCallBack = postData => {
            //this.$store.commit('SCPOSTSUCCESS', shipData.data.data);
            self.$router.push({ name: 'dashboard' });
          };

          var errorCallBack = error => {
            console.log(error.response);

            var msg = '';

            if (typeof error.response.data.data === 'string') msg += error.response.data.data + '<br/>';
            else
              for (var err in error.response.data.data) {
                if (err === 'description') msg += error.response.data.data[err] + '<br/>';
                else if (err === 'members') msg += 'You must select / disable a Crew Position. <br />';
                else if (err === 'ship_id') msg += 'You must select a Ship. <br />';
                else if (err === 'startBody') msg += 'You must select a landing zone to meetup at. <br />';
                else msg += error.response.data.data[err] + '<br/>';
              }

            document.getElementById('errorContainer').innerHTML = msg;
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
                value: 'Select Manufacturer :',
                contentWidth: 'half-width',
                contentAlign: 'align-left'
              },
              {
                contentType: 'Tab-Select',
                alignType: 'left',
                lightTheme: false,
                placeholder: 'Manufacturer',
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-left',
                delayedReveal: true,
                formStep: 0,
                formStepCallBack: e => {
                  this.shipOptions = this.$store.state.allShips.filter(x => x.manufacturer === e.target.value);
                  this.$store.commit('SHIPOPTIONSFILTERED', this.shipOptions);
                  this.$store.commit('SHOWTABS', { id: 'ship-selector' });
                },
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
                value: 'Select Ship :',
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
                formId: 'newShipCrewForm',
                formStep: 1,
                formStepCallBack: e => {
                  this.$store.commit('SHIPSELECTED', this.$store.state.filteredShips.find(x => x.id == e.target.value));
                  this.$store.commit('SHOWTABS', { id: 'startBody' });
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
                value: 'Meetup Parent :',
                contentWidth: 'half-width',
                contentAlign: 'align-left'
              },
              {
                contentType: 'Tab-Select',
                alignType: 'left',
                lightTheme: false,
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-left',
                formStep: 2,
                formStepCallBack: e => {
                  this.$store.commit('LOCATIONBODYSELECTED', e.target.value);
                  this.getChildrenLandingZones(e.target.value, 'startZone');
                  this.$store.commit('SHOWTABS', { id: 'startZone' });
                },
                formId: 'newShipCrewForm',
                name: 'startBody',
                id: 'startBody',
                optionType: 'allLocationBodies'
              },
              {
                contentType: 'label',
                value: 'Meetup Landing Zone :',
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
                formStep: 2,
                formStepCallBack: e => {
                  this.$store.commit('SHOWTABS', { id: 'targetBody' });
                  this.$root.$emit('reveal-positions-selector', { id: 'shipCrewSelector' });
                },
                formId: 'newShipCrewForm',
                name: 'startZone',
                id: 'startZone',
                optionType: 'filteredLandingZones'
              }
            ]
          },
          {
            contentType: 'div',
            class: 'container',
            id: 'newShipCrewFormStep4',
            contentAlign: 'align-center',
            contentWidth: 'three-quarter-width',
            content: [
              {
                contentType: 'label',
                value: '(Optional) Target Location Parent :',
                contentWidth: 'half-width',
                contentAlign: 'align-left'
              },
              {
                contentType: 'Tab-Select',
                alignType: 'left',
                lightTheme: false,
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-left',
                formStep: 3,
                formStepCallBack: e => {
                  this.$store.commit('LOCATIONBODYSELECTED', e.target.value);
                  this.getChildrenLandingZones(e.target.value, 'targetZone');
                  this.$store.commit('SHOWTABS', { id: 'targetZone' });
                },
                formId: 'newShipCrewForm',
                name: 'targetBody',
                id: 'targetBody',
                optionType: 'allLocationBodies'
              },
              {
                contentType: 'label',
                value: '(Optional) Target Location Landing Zone :',
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
                formStep: 3,
                formStepCallBack: e => {},
                formId: 'newShipCrewForm',
                name: 'targetZone',
                id: 'targetZone',
                optionType: 'filteredLandingZones'
              },
              {
                contentType: 'label',
                value: 'Select Crew :',
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
    async getAllShips() {
      var successCallBack = shipData => {
        this.$store.commit('SHIPSLOADED', shipData.data.data);
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      await repo.get(this.$store.state.currentUser.token, successCallBack, errorCallBack);
    },
    async getAllManus() {
      var successCallBack = manuData => {
        this.$store.commit('MANUSLOADED', manuData.data.data);
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      await repo.getAllManus(this.$store.state.currentUser.token, successCallBack, errorCallBack);
    },
    async getAllLocationBodies() {
      var successCallBack = locationData => {
        this.$store.commit('LOCATIONBODIESLOADED', locationData.data.data);
        this.$store.commit('SHOWTABS');
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('locations');
      await repo.getType(this.$store.state.currentUser.token, 3, successCallBack, errorCallBack);
    },
    async getAllLandingZones() {
      var successCallBack = locationData => {
        this.$store.commit('LOCATIONLANDINGZONESLOADED', locationData.data.data);
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('locations');
      await repo.getType(this.$store.state.currentUser.token, 4, successCallBack, errorCallBack);
    },
    async getChildrenLandingZones(parentId, tabSelectId) {
      var successCallBack = locationData => {
        this.$store.commit('LOCATIONLANDINGZONESFILTERED', { data: locationData.data.data, id: tabSelectId });
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('locations');
      await repo.getChildrenOfType(this.$store.state.currentUser.token, parentId, 4, successCallBack, errorCallBack);
    },
    createOptions(type) {
      if (type === 'ships' && !this.$store.state.allShips) return false;
      else if (type === 'manus' && !this.$store.state.allManus) return false;

      switch (type) {
        case 'ships': {
          for (var option of this.$store.state.allShips) {
            option.displayValue = option.name;
            option.value = option.id;
          }
          break;
        }
        case 'manus': {
          for (var option of this.$store.state.allManus) {
            option.displayValue = option.manufacturer;
            option.value = option.manufacturer;
          }
          break;
        }
        case 'allLandingZones': {
          for (var option of this.$store.state.locationLandingZones) {
            option.displayValue = option.name;
            option.value = option.id;
          }
          break;
        }
        case 'filteredLandingZones': {
          for (var option of this.$store.state.filteredLandingZones) {
            option.displayValue = option.name;
            option.value = option.id;
          }
          break;
        }
        case 'allLocationBodies': {
          for (var option of this.$store.state.locationBodies) {
            option.displayValue = option.name;
            option.value = option.id;
          }
          break;
        }
      }
    }
  },
  mounted() {
    this.getAllManus().then(() => {
      this.getAllShips();
      this.getAllLocationBodies();
    });

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHIPSLOADED') {
        this.createOptions('ships');
      } else if (mutation.type === 'MANUSLOADED') {
        this.createOptions('manus');
      } else if (mutation.type === 'LOCATIONLANDINGZONESLOADED') {
        this.createOptions('allLandingZones');
      } else if (mutation.type === 'LOCATIONBODIESLOADED') {
        this.createOptions('allLocationBodies');
      } else if (mutation.type === 'LOCATIONLANDINGZONESFILTERED') {
        this.createOptions('filteredLandingZones');
      }
    });
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

label {
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
}

.shipCrewPostCreator-wrapper .tab-input-wrapper {
  margin-bottom: 1rem;
}
</style>

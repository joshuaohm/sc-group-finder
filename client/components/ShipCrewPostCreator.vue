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
  created() {
    document.title = 'About';
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
      allOptions: null,
      shipOptions: null,
      manufacturerOptions: null,
      shipCrew: {
        action: '',
        method: '',
        lightTheme: true,
        content: [
          {
            contentType: 'label',
            value: 'Select Manufacturer:',
            contentWidth: 'half-width',
            contentAlign: 'center'
          },
          {
            contentType: 'Tab-Select',
            alignType: 'right',
            lightTheme: false,
            placeholder: 'Ship',
            contentWidth: 'three-quarter-width',
            contentAlign: 'right',
            name: 'manufacturer',
            id: 'manufacturer-selector',
            options: this.allOptions
          },
          {
            contentType: 'label',
            value: 'Select Ship:',
            contentWidth: 'half-width',
            contentAlign: 'center'
          },
          {
            contentType: 'Tab-Select',
            alignType: 'right',
            lightTheme: false,
            placeholder: 'Ship',
            contentWidth: 'three-quarter-width',
            contentAlign: 'right',
            name: 'ship',
            id: 'ship-selector',
            options: this.allOptions
          }
        ]
      }
    };
  },
  methods: {
    getAllShips() {
      var successCallBack = retData => {
        this.$store.commit('SHIPSLOADED', retData.data.data);
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const repo = RepositoryFactory.get('ships');
      repo.get(this.$store.state.currentUser.token, successCallBack, errorCallBack);
    },
    createOptions() {
      if (!this.$store.state.allShips) return false;

      for (var option of this.$store.state.allShips) {
        option.displayValue = option.manufacturer + ' ' + option.name;
      }

      this.allOptions = this.$store.state.allShips;
    }
  },
  beforeMount() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHIPSLOADED') {
        this.createOptions();
      }
    });

    this.getAllShips();
  },
  mounted() {
    this.$root.$on('option-selected', el => {
      if (el.id === 'ship-selector' && el.value > 0) {
        this.selectedShip = el.value;
        this.showStep2 = true;
      }
    });
  }
};
</script>

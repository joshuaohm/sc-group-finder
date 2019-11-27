<template>
  <div
    :class="['shipCrewPostCreator-wrapper', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
  >
    <div v-for="(component, index) in shipCrew" :key="index">
      <TypeEvaluator :component="component" :name="'ShipCrewPostCreator-TypeEvaluator-'+index"></TypeEvaluator>
    </div>
  </div>
</template>

<script>
import TypeEvaluator from 'components/TypeEvaluator';
import { RepositoryFactory } from './../repository/RepositoryFactory';

export default {
  components: {
    TypeEvaluator
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
      showStep2: false,
      allOptions: null,
      shipCrew: [
        {
          contentType: 'Form',
          lightTheme: true,
          content: [
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
      ]
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

      this.shipCrew[0].content[1].options = this.$store.state.allShips;
    }
  },
  beforeMount() {
    this.getAllShips();

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHIPSLOADED') {
        this.createOptions();
      }
    });
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

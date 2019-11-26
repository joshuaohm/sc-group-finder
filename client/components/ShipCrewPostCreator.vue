<template>
  <div
    :class="['shipCrewPostCreator-wrapper', {'light':( ( (!content.lightTheme && !parentColorTheme ) || content.lightTheme ) ? true : false  )}, {'onLight':(parentColorTheme)}, {'onDark':(!parentColorTheme)}]"
  >
    <div v-for="(component, index) in shipCrew" :key="index">
      <TypeEvaluator :component="component" :name="'Row-TypeEvaluator-'+index"></TypeEvaluator>
    </div>
  </div>
</template>

<script>
import TypeEvaluator from 'components/TypeEvaluator';

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
      shipCrew: [
        {
          contentType: 'Panel',
          lightTheme: true,
          content: [
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
                  name: 'ship'
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

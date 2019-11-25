<template>
  <div class="SCPostDisplayer-wrapper">
    <slot>
      <Tab v-for="(post, index) in this.content.content" :content="this.content.content[index]" :id="'post-'+post.id+'-('+post.ship.id+')'" :key="index"></Tab>
    </slot>
  </div>
</template>

<script>
export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    Row: () => import('components/Row'),
    Panel: () => import('components/Panel')
  },
  props: {
    content: Object
  },
  data() {
    return {
      tab1data: {
        contentType: 'Tab',
        alignType: 'left',
        lightTheme: false,
        text: [{ value: "post.slotsAvailable" }, { value: "post.ship.manufacturer + ' ' + post.ship.name" }, {value: "post.description.substring(0, 20)"}],
        subPanel: {
          contentType: 'SubPanel',
          lightTheme: false,
          content: [
            {
              contentType: 'ShipCrewPositionsDisplayer',
              content: { members: 'post.members', miscCrew: 'post.miscCrew' }
            }
          ]
        }
      }
    };
  },
  beforeMount (){

    for(var i = 0; i < this.content.content.length; i++){
      console.log(i);
      var data = this.content.content[i];
      console.log(data);
      this.content.content[i] = this.createContent(this.tab1data, data, i);
    }


  },
  methods: {
    createContent(orig, post, index) {

      var template = [...orig];
      if(index > 1)
        console.log('here');

      Object.keys(template).forEach(key => {
        if (typeof(template[key]) === 'string' && template[key].includes('post.')) {
          console.log(typeof(template[key]))
          template[key] = eval(template[key]);
          console.log(template[key]);
        } if (typeof template[key] === 'object') {
          this.createContent(template[key], post, index);
        }
      });

      return template;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

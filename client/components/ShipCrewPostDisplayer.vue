<template>
<div class="SCPostDisplayer-wrapper">
  <slot v-for="post in this.content.content">
    <Tab :content="createContent(tab1data, post)" ></Tab>
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
  props : {
    content: Object,
  },
  data () {
    return {

      tab1data: {
        contentType: "Tab",
        alignType: "left",
        lightTheme: false,
        text: [{value: "post.ship.manufacturer + ' ' + post.ship.name"}],
        subPanel : {
          contentType: "SubPanel",
          lightTheme: false,
          content: [

          ],
        }
      }
      
    };
  },
  methods: {

    createContent (template, post){

      Object.keys(template).forEach( key => {

        if(typeof(template[key]) === "string" && template[key].includes("post.")){

          console.log(post);
          template[key] = eval(template[key]);
        }
        else if(typeof(template[key]) === "object"){
          this.createContent(template[key], post);
        }
      });

      return template;
    }

  }
}
</script>

<style lang="scss">
</style>
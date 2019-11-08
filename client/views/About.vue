<template>
  <div class="about-page">
    <Page :content="[tabProp, tabProp2, title, panelProp]"></Page>
  </div>
</template>

<script>
import Page from 'components/Page'

export default {
  components: {
    Page
  },
  created () {
    document.title = "About"
  },
  data () {
    return {
      tabProp: {
          type : "Tab",
          content : [
            { value: "About" }
          ]
      },
      tabProp2: {
        type: "Tab-Select",
        content: [
          { 
            options : [
              {value: "Aurora"},
              {value: "Mustang"},
              {value: "Cutlass Black"},
              {value: "Prospector"},
            ]
          }
        ]
      },
      panelProp: {
        type : "Panel",
        content : [
          {
            type: "Tab",
            content: [
              { value : "Example" }
            ]
          },
          {
            type: "Tab-Input",
            content: [
              { placeholder : "Example" }
            ]
          },
          { 
            type: "p",  
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel incidunt saepe omnis voluptatem culpa nesciunt rem suscipit, ad repudiandae enim non quas voluptates, quod quae. Facere architecto aut necessitatibus deleniti?"
          }
        ]
      },
      title: {
        content: "Use this website to {INSERT ACTIVITY}",
        type: "h3"
      }
    }
  }
}
</script>

<template>
  <div class="about-page">
    <Page :content="[tabProp, tabProp2, tabProp3, title, panelProp]"></Page>
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
          text : [
            { value: "About" }
          ],
          subPanel : {
            lightTheme : true,
            text : [
              {value : "About Text."}
            ]
          }
      },
      tabProp2: {
        type: "Tab-Select",
        lightTheme: true,
        options : [
          {value: "Aurora"},
          {value: "Mustang"},
          {value: "Cutlass Black"},
          {value: "Prospector"},
        ]
      },
      tabProp3: {
        type: "Tab-Select",
        options : [
          {value: "Aurora"},
          {value: "Mustang"},
          {value: "Cutlass Black"},
          {value: "Prospector"},
        ]
      },
      panelProp: {
        type : "Panel",
        lightTheme: true,
        content : [
          {
            type: "Tab",
            lightTheme: true,
            text: [
              { value : "Example" }
            ],
            subPanel : {
              type: "SubPanel",
              lightTheme : false,
              content : [
                {
                  type: "Tab",
                  text: [
                    { value : "Example" }
                  ],
                  subPanel : false
                },
                { 
                  type : "p",
                  value : "Example Text."
                }
              ]
            }
          },
          {
            type: "Tab-Input",
            lightTheme: true,
            placeholder : "" 
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

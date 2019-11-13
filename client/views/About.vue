<template>
  <div class="about-page">
    <Page :content="{content:[tabProp, tabProp2, tabProp3, title, panelProp], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Page from 'components/Page'

export default {
  components: {
    Page
  },
  props: {
    name : String,
    content: Object
  },
  created () {
    document.title = "About"
  },
  data () {
    return {
      tabProp: {
        name : "tabProp",
        type : "Tab",
        text : [
          { value: "About" }
        ],
        subPanel : {
          name : "subPanel",
          type: "SubPanel",
          lightTheme : true,
          content : [
            {
              type : "h3",
              value : "About Header."
            },
            {
              type : "p",
              value : "About Paragraph."
            }
          ]
        }
      },
      tabProp2: {
        name : "tabProp2",
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
        name : "tabProp3",
        type: "Tab-Select",
        options : [
          {value: "Aurora"},
          {value: "Mustang"},
          {value: "Cutlass Black"},
          {value: "Prospector"},
        ]
      },
      panelProp: {
        name : "panelProp",
        type : "Panel",
        lightTheme: true,
        content : [
          {
            name : "panelTab1",
            type: "Tab",
            lightTheme: true,
            text: [
              { value : "Example" }
            ],
            subPanel : {
              name : "subPanel2",
              type: "SubPanel",
              lightTheme : false,
              content : [
                {
                  name : "subPanel2Tab1",
                  type: "Tab",
                  lightTheme : true,
                  text: [
                    { value : "Example" }
                  ],
                  subPanel : {
                    name : "subPanel3",
                    type: "SubPanel",
                    lightTheme : false,
                    content : [ 
                      {
                        name : "subPanel3Tab1",
                        type: "Tab",
                        lightTheme : true,
                        text: [
                          { value : "Example" }
                        ],
                        subPanel : {
                          name : "subPanel4",
                          type: "SubPanel",
                          lightTheme : true,
                          content : [ 
                            {
                              name : "subPanel4Tab1",
                              type: "Tab",
                              lightTheme : true,
                              text: [
                                { value : "Example" }
                              ],
                              subPanel : {
                                name : "subPanel5",
                                type: "SubPanel",
                                lightTheme : false,
                                content : [ ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { 
                  type : "p",
                  value : "Example Text."
                }
              ]
            }
          },
          {
            name : "panelTabInput1",
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

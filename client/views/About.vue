<template>
  <div class="about-page">
    <Page :content="{content:[tab1, panel1], lightTheme:true}"></Page>
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

      tab1 : {
        contentType: "Tab",
        alignType: "center",
        lightTheme: false,
        subPanel: false,
        text: [
          { value : "About This Site" }
        ],
      },

      panel1 : {
        contentType: "Panel",
        lightTheme: false,
        content : [
          {
            contentType : "h4",
            value : "Find Groups In The Verse" 
          },
          {
            contentType : "p",
            value : "You can search through listings and make postings for:" 
          },
          {
            contentType: "Row",
            lightTheme: false,
            content: [
              {
                contentType: "Tab",
                alignType: "left",
                subPanel: false,
                lightTheme: true,
                text: [
                  { value : "Ship Crews" }
                ],
              },
              {
                contentType: "Tab",
                alignType: "center",
                subPanel: false,
                lightTheme: true,
                text: [
                  { value : "Ship Fleets" }
                ],
              },
              {
                contentType: "Tab",
                alignType: "right",
                lightTheme: true,
                subPanel: false,
                text: [
                  { value : "People On Foot" }
                ],
              },
            ]
          }
        ]
      }


    }
  }
}
</script>

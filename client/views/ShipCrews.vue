<template>
  <div class="ship-crews-page">
    <Page :content="{content:[], lightTheme:true}"></Page>
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

     shipCrews: [
       {
         contentType: "Tab",
         alignType: "center",
         lightTheme: false,
         text: [{ value: "Active Ship Crews:"}],
         subPanel: false,
       },
       {
         contentType: "Panel",
         lightTheme: true,
         content: [
           
         ]
       }
     ]

    }
  }
}
</script>

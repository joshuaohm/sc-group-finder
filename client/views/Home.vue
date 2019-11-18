<template>
  <div class="home-page">
    <Page :content="{content:[tabProp, msg], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Page from 'components/Page'

export default {
  components: {
    Page
  },
  created () {
    document.title = "Home"
  },
  data () {
    return {
      msg: {
        contentType: "p",
        value: "You are not logged in, please log in."
      },
      tabProp: {
        name : "tabProp",
        contentType : "Tab",
        alignType : "center",
        lightTheme: false,
        subPanel : false,
        text : [
          { value: "Home" }
        ]
      },
    }
  }
}
</script>

<style lang="scss">
</style>
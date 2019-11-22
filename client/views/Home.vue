<template>
  <div class="home-page">
    <Page v-if="this.$store.state.isLoggedIn" :content="{content:[loggedIn], lightTheme:true}"></Page>
    <Page v-else :content="{content:[loggedOut], lightTheme:true}"></Page>
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
      loggedOut: [
        {
          name : "tabProp",
          contentType : "Tab",
          alignType : "center",
          lightTheme: false,
          subPanel : false,
          text : [
            { value: "Home" }
          ]
        },
        {
          contentType: "p",
          value: "You are not logged in, please log in."
        }
      ],
      loggedIn: [
        {
          name : "tabProp",
          contentType : "Tab",
          alignType : "center",
          lightTheme: false,
          subPanel : false,
          text : [
            { value: "Welcome" }
          ]
        },
        {
          contentType: "p",
          value: "Hello."
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>

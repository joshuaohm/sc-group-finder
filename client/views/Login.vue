<template>
  <div class="login-page">
    <Page :content="{content:[panel], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Page from 'components/Page'

export default {
  components: {
    Page
  },
  created () {
    document.title = "Login"
  },
  data () {
    return {
      panel: {
        contentType: "Panel",
        lightTheme: true,
        content: [
          {
            contentType: "Form",
            lightTheme: true,
            content : [
              {
                contentType: "h1",
                value: "Sign in."
              },
              {
                contentType: "label",
                value: "Email"
              },
              {
                contentType: "Tab-Input",
                inputType: "email",
                align: "right",
                lightTheme: false,
                placeholder : "Email" 
              },
              {
                contentType: "label",
                value: "Email"
              },
              {
                contentType: "Tab-Input",
                inputType: "password",
                align: "right",
                lightTheme: false,
                placeholder : "Password" 
              },
              {
                contentType: "Tab-Input",
                lightTheme: true,
                alighn: "right",
                inputType: "submit",
                placeholder : "Submit"
              }
            ]
          },
        ]
      }
    }
  }
}
</script>

<style lang="scss">

</style>
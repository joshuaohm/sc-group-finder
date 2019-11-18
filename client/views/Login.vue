<template>
  <div class="login-page half-width">
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
            alignType: "flex-end",
            action: "/login",
            method: "post",
            content : [
              {
                contentType: "h1",
                value: "Log In",
                contentWidth: "full-width"
              },
              {
                contentType: "label",
                value: "Email",
                contentWidth: "half-width",
                contentAlign: "right"
              },
              {
                contentType: "Tab-Input",
                inputType: "email",
                alignType: "right",
                lightTheme: false,
                placeholder : "Email",
                contentWidth: "three-quarter-width",
                contentAlign: "right",
                name:"loginEmail"
              },
              {
                contentType: "label",
                value: "Password",
                contentWidth: "half-width",
                contentAlign: "right"
              },
              {
                contentType: "Tab-Input",
                inputType: "password",
                alignType: "right",
                lightTheme: false,
                placeholder : "Password",
                contentWidth: "three-quarter-width",
                contentAlign: "right",
                name:"loginPassword"
              },
              {
                contentType: "Tab-Input",
                inputType: "submit",
                alignType: "right",
                lightTheme: true,
                placeholder : "Log in",
                contentAlign: "right",
                name: "formSubmit"
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
.login-page{
  margin:auto;
}

@media screen and (max-width: 768px){
  .login-page.half-width{
    width: 100%;
  }
}
</style>
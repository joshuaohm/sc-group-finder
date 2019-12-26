<template>
  <div class="login-page half-width">
    <Page :content="{content:[panel], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Page from 'components/Page';
import { RepositoryFactory } from './../repository/RepositoryFactory';
import LoginCheck from './../mixins/LoginCheck';

export default {
  mixins: [LoginCheck],
  components: {
    Page
  },
  created() {
    document.title = 'Login';
  },
  methods: {
    afterLoggedIn() {
      if (LoginCheck.localLoginCheck(this.$store)) this.$router.push({ name: 'home' });
    },
    loginError() {
      document.getElementById('loginError').innerHTML = 'Error: Username or Password incorrect!';
    }
  },
  mounted() {
    this.$root.$on('loginError', () => {
      this.loginError();
    });
  },
  data() {
    return {
      panel: {
        contentType: 'Panel',
        lightTheme: true,
        content: [
          {
            contentType: 'Form',
            lightTheme: true,
            alignType: 'flex-end',
            justifyType: 'center',
            action: '/login',
            method: 'post',
            formId: '#loginForm',
            class: 'container',
            onSubmit(data, self) {
              var successCallBack = retData => {
                self.$store.commit('LOGGEDIN', retData.data.data);
                self.$router.push({ name: 'home' });
              };

              var errorCallBack = error => {
                self.$root.$emit('loginError');
              };

              const LoginRepository = RepositoryFactory.get('login');
              LoginRepository.login(data, successCallBack, errorCallBack);
            },
            content: [
              {
                contentType: 'h1',
                value: 'Log In',
                contentWidth: 'full-width'
              },
              {
                contentType: 'span',
                id: 'loginError',
                contentWidth: 'full-width',
                value: ''
              },
              {
                contentType: 'label',
                value: 'Email',
                contentWidth: 'half-width',
                contentAlign: 'align-right'
              },
              {
                contentType: 'Tab-Input',
                inputType: 'email',
                alignType: 'right',
                delayedReveal: true,
                lightTheme: false,
                placeholder: 'Email',
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-right',
                name: 'email'
              },
              {
                contentType: 'label',
                value: 'Password',
                contentWidth: 'half-width',
                contentAlign: 'align-right'
              },
              {
                contentType: 'Tab-Input',
                inputType: 'password',
                alignType: 'right',
                delayedReveal: true,
                lightTheme: false,
                placeholder: 'Password',
                contentWidth: 'three-quarter-width',
                contentAlign: 'align-right',
                name: 'password'
              },
              {
                contentType: 'Tab-Input',
                inputType: 'submit',
                alignType: 'right',
                delayedReveal: true,
                lightTheme: true,
                placeholder: 'Log in',
                contentAlign: 'align-right',
                name: 'formSubmit'
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.login-page {
  margin: auto;

  & label {
    font-family: 'Orbitron', sans-serif;
  }

  & .tab-input-wrapper {
    margin-bottom: 1rem;
  }
}

#loginError {
  color: red;
  font-size: 1rem;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .login-page.half-width {
    width: 100%;
  }
}
</style>

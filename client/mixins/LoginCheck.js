/*
 *  Used as a mixin to properly handle authentication within the app.
 *
 */
import { RepositoryFactory } from './../repository/RepositoryFactory';


function checkSavedInformation(self) {

  if (!self.$store.state.currentUser.token)
    self.$store.state.currentUser.token = window.localStorage.getItem('scgf-token');

  if (!self.$store.state.currentUser.id)
    self.$store.state.currentUser.id = window.localStorage.getItem('scgf-id');

  if (!self.$store.state.currentUser.name)
    self.$store.state.currentUser.name = window.localStorage.getItem('scgf-name');

  if (!self.$store.state.currentUser.token)
    return false;
  else
    return true;
}

var loginCheck = function (store, router) {

  if (store.state.isLoggedIn) {

    var onSuccess = (retData) => {
      store.commit("LOGGEDIN", retData.data.data);
    };

    var onError = () => {
      store.commit("LOGGEDOUT");
      if (router.currentRoute.name !== "log in")
        router.push({ name: 'log in' });

    };

    const LoginRepository = RepositoryFactory.get('login');
    LoginRepository.loginCheck(store.state.currentUser.token, onSuccess, onError);
  }

  return false;
};

var beforeMount = function () {

  if (!this.$store.state.IsLoggedIn) {

    if (checkSavedInformation(this)) {

      this.$store.commit("LOGGEDIN", { token: this.$store.state.currentUser.token, id: this.$store.state.currentUser.id, name: this.$store.state.currentUser.name });
      var self = this;

      setTimeout(function () {
        loginCheck(self.$store, self.$router);
      }, 10);
    }
    else {
      this.$store.commit("LOGGEDOUT");

      if (this.$router.currentRoute.name !== "log in")
        this.$router.push({ name: "log in" });
    }
  }
};

var mounted = function () {

  if (this.afterLoggedIn)
    this.afterLoggedIn();
};

var localLoginCheck = function (store) {

  if (store.state.isLoggedIn && store.state.currentUser.token)
    return true;

  return false;
};

export default {

  loginCheck: loginCheck,
  beforeMount: beforeMount,
  mounted: mounted,
  localLoginCheck: localLoginCheck

};

import { RepositoryFactory } from './../repository/RepositoryFactory';

var loginCheck = async function(store, router){

  if(store.state.isLoggedIn){

    const LoginRepository = RepositoryFactory.get('login');
    const retData = await LoginRepository.loginCheck(store.state.currentUser.token,
      function() {
        console.log("loginCheckSuccess callback");
        console.log(retData);
        store.commit("LOGGEDIN", retData.data.data.token);
        return true;
      },
      function() {
        console.log("loginCheckError callback");
        console.log(retData);
        store.commit("LOGGEDOUT");
        if(router.currentRoute.name !== "log in")
        router.push({name: 'log in'});
      }
    );
  }

  return false;
};

var beforeMount = function (){

  if(!this.$store.state.IsLoggedIn){

    var token = "";

    if(this.$store.state.currentUser.token)
      token = this.$store.state.currentUser.token;
    else
      token = window.localStorage.getItem('scgf-token');

    if(token != null && token != ""){

      this.$store.commit("LOGGEDIN", token);
      var self = this;

      setTimeout(function(){
        loginCheck(self.$store, self.$router);
      }, 10);
    }
    else{
      this.$store.commit("LOGGEDOUT");

      if(this.$router.currentRoute.name !== "log in")
        this.$router.push({name: "log in"});
    }
  }
};

var mounted = function(){

  console.log("mounted");

  if(this.afterLoggedIn)
      this.afterLoggedIn();
};

var localLoginCheck = function(store){

  if(store.state.isLoggedIn && store.state.currentUser.token)
    return true;

  return false;
};

export default {

  loginCheck : loginCheck,
  beforeMount: beforeMount,
  mounted: mounted,
  localLoginCheck : localLoginCheck

};

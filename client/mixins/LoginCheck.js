export default {
  beforeMount : function (){

    if(!this.$store.state.IsLoggedIn){
      var token = window.localStorage.getItem('scgf-token');
      if(token)
        this.$store.commit("LOGGEDIN", token);
    }
  },

  mounted: function(){

    if(this.afterLoggedIn)
        this.afterLoggedIn();
  },

  loginCheck: function(store){

    if(store.state.isLoggedIn)
      return true;

    return false;
  }

};

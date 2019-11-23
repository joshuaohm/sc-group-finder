import Vue from 'vue'
import Vuex from 'vuex'
//@ts-check

Vue.use(Vuex)

const state = {
  count: 0,
  isLoggedIn: false,
  initialLoad: false,
  currentUser: {
    token: "",
  },
  currentPage: {
    name: "",
    isLoaded: false,
    currentTab : {
      isLoaded : false,
      currentSubPanel : {
        isExpanded : false,
      }
    }
  },
  currentPosts: null
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  PAGELOADED (state){
    state.currentPage.isLoaded = true;
  },
  TABLOADED (state){
    state.currentPage.currentTab.isLoaded = true;
  },
  SUBPANELEXPANDED (state){
    state.currentPage.currentTab.currentSubPanel.isExpanded = true;
  },
  SUBPANELCOLLAPSED(state){
    state.currentPage.currentTab.currentSubPanel.isExpanded = false;
  },
  LOGGEDIN(state, token){
    console.log("logged in mutation "+token );
    state.currentUser.token = token;
    state.isLoggedIn = true;
    window.localStorage.setItem('scgf-token', token);
  },
  LOGGEDOUT(state){
    state.currentUser.token = "";
    state.isLoggedIn = false;
    window.localStorage.setItem('scgf-token', "");
  },
  POSTSLOADED(state, data){
    state.currentPosts = data;
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store

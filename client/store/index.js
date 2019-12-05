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
    id: 0,
    name: null,
  },
  currentPage: {
    name: "",
    isLoaded: false,
    currentTab: {
      isLoaded: false,
      currentSubPanel: {
        isExpanded: false,
      }
    }
  },
  allShips: null,
  allManus: null,
  filteredShips: null,
  currentShip: null,

  selectedManu: null,
  currentPosts: null,
  filteredPosts: null,

}

const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  },
  PAGELOADED(state) {
    state.currentPage.isLoaded = true;
  },
  TABLOADED(state) {
    state.currentPage.currentTab.isLoaded = true;
  },
  SUBPANELEXPANDED(state) {
    state.currentPage.currentTab.currentSubPanel.isExpanded = true;
  },
  SUBPANELCOLLAPSED(state) {
    state.currentPage.currentTab.currentSubPanel.isExpanded = false;
  },
  LOGGEDIN(state, token) {
    state.currentUser.token = token;
    state.isLoggedIn = true;
    window.localStorage.setItem('scgf-token', token);
  },
  LOGGEDOUT(state) {
    state.currentUser.token = "";
    state.isLoggedIn = false;
    window.localStorage.setItem('scgf-token', "");
  },
  POSTSLOADED(state, data) {
    state.currentPosts = data;
  },
  SHIPSLOADED(state, data) {
    state.allShips = data;
  },
  MANUSLOADED(state, data) {
    state.allManus = data;
  },
  SHIPOPTIONSFILTERED(state, data) {
    state.filteredShips = data;
  },
  SHIPSELECTED(state, data) {
    state.currentShip = data;
  },
  UPDATESHIPMEMBERS(state, data) {
    if (state.currentShip)
      state.currentShip.members = data;
  }
}

const actions = {
  incrementAsync({ commit }) {
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

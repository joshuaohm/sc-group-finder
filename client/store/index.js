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
    name: "",
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
  filteredShips: null,

  currentShip: null,
  allManus: null,

  locationBodies: null,
  locationLandingZones: null,

  selectedLocationBody: null,
  filteredLandingZones: null,

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
  LOCATIONBODIESLOADED(state, data) {
    state.locationBodies = data;
  },
  LOCATIONBODYSELECTED(state, data) {
    state.selectedLocationBody = data;
  },
  LOCATIONLANDINGZONESLOADED(state, data) {
    state.locationLandingZones = data;
  },
  LOCATIONLANDINGZONESFILTERED(state, data) {
    state.filteredLandingZones = data.data;
  },
  LOGGEDIN(state, data) {
    state.currentUser.token = data.token;
    state.currentUser.id = data.id;
    state.currentUser.name = data.name;
    state.isLoggedIn = true;
    window.localStorage.setItem('scgf-token', data.token);
  },
  LOGGEDOUT(state) {
    state.currentUser.token = "";
    state.currentUser.id = 0;
    state.currentUser.name = "";
    state.isLoggedIn = false;
    window.localStorage.setItem('scgf-token', "");
  },
  MANUSLOADED(state, data) {
    state.allManus = data;
  },
  PAGELOADED(state) {
    state.currentPage.isLoaded = true;
  },
  POSTSLOADED(state, data) {
    state.currentPosts = data;
  },
  SHIPSLOADED(state, data) {
    state.allShips = data;
  },
  SHIPOPTIONSFILTERED(state, data) {
    state.filteredShips = data;
  },
  SHIPSELECTED(state, data) {
    state.currentShip = data;
  },
  SHOWTABS(state, data) {

  },
  SUBPANELEXPANDED(state) {
    state.currentPage.currentTab.currentSubPanel.isExpanded = true;
  },
  SUBPANELCOLLAPSED(state) {
    state.currentPage.currentTab.currentSubPanel.isExpanded = false;
  },
  TABLOADED(state) {
    state.currentPage.currentTab.isLoaded = true;
  },
  UPDATESHIPMEMBERS(state, data) {
    if (state.currentShip)
      state.currentShip.members = data;
  },
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

<template>
  <div class="navigation">
    <transition-group appear
      appear-active-class="nav-animation-active">
      <div class="mobile-nav-wrapper" :key="0" @click="toggleMobileNav()">
        <div class="logo-wrapper"></div>
        <ul class="nav-list">
          <li> Menu <span>&#9660;</span> </li>
        </ul>
      </div>
      <div class="nav-wrapper" :key="1">
        <div class="logo-wrapper"></div>
        <ul class="nav-list">
          <li class="nav-item" id="nav-item-1"><router-link :to="{ name: links[0] }">{{links[0]}}</router-link></li>
          <li class="nav-item" id="nav-item-2"><router-link :to="{ name: links[1] }">{{links[1]}}</router-link></li>
          <li v-if="!this.$store.state.isLoggedIn" class="nav-item" id="nav-item-3"><router-link :to="{ name: links[2] }">{{links[2]}}</router-link></li>
          <li v-else @click="logOut()" class="nav-item" id="nav-item-3">Log Out</li>
        </ul>
      </div>
    </transition-group>

    <transition name="mobile-nav-transition">
      <div v-if="mobileShow" class="mobile-nav-menu">
        <ul class="nav-list">
          <li class="nav-item" id="nav-item-1"><router-link :to="{ name: links[0] }">{{links[0]}}</router-link></li>
          <li class="nav-item" id="nav-item-2"><router-link :to="{ name: links[1] }">{{links[1]}}</router-link></li>
          <li v-if="!this.$store.state.isLoggedIn" class="nav-item" id="nav-item-3"><router-link :to="{ name: links[2] }">{{links[2]}}</router-link></li>
          <li v-else  @click="logOut()" class="nav-item" id="nav-item-3">Log Out</li>
        </ul>
      </div>
    </transition>
  </div>

</template>

<script>
import { RepositoryFactory } from './../repository/RepositoryFactory';

export default {
  data () {
    return {
      links: [
        "home",
        "about",
        "log in"
        ],
      mobileShow : false
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    hello () {
      console.log(this.msg)
    },
    toggleMobileNav(){
      this.mobileShow = !this.mobileShow;
    },
    logOut() {

      var onSuccess = () => {
        this.$store.commit("LOGGEDOUT");
        if(this.$router.currentRoute.name !== "log in")
          this.$router.push({name: 'log in'});
      };

      var onError = () => {
        console.log("logout error callback");
        this.$store.commit("LOGGEDOUT");
        if(this.$router.currentRoute.name !== "log in")
          this.$router.push({name: 'log in'});
      };

      const LoginRepository = RepositoryFactory.get('login');
      LoginRepository.logOut(this.$store.state.currentUser.token, onSuccess, onError);
    }
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.navigation{
  width: calc(100% - 4px);
  position: relative;
  background-color: $page-color;
  border: 2px solid $page-border;
  color: $ice-blue;
}

.nav-item, .nav-item a:link, .nav-item a:visited {
  position: relative;
  text-decoration: none;
  text-transform: capitalize;
  color: $ice-blue;
  cursor: pointer;
}

.nav-list{
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  float: right;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
  padding: 0;
  width: 50%;
  height: 100%;
  list-style: none;
  margin: 0;
}

.nav-wrapper, .mobile-nav-wrapper{
  position: relative;
  height: 80px;
  padding-right: 80px;
  background-color: #000;


  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(to top left, $page-color 50%, transparent 50%);
    height: 100%;
    width: 80px;
  }
}

.mobile-nav-wrapper{
  display: none;

  .nav-list{
    justify-content: flex-end;
  }
}

.nav-animation-active{
  animation: slideRight .5s ease;
}

.mobile-nav-menu{
  position: relative;
  display: block;
  background-color: $page-color;
  padding-left: 8px;
  padding-right: 80px;
  padding-top: 8px;
  padding-bottom: 8px;


  .nav-list{
    width: 100%;
    height: 100%;
    flex-flow: row wrap;
    text-align: center;
    float: none;

    .nav-item{
      flex: 1 0 25%;
    }
  }
}

.mobile-nav-transition-enter, .mobile-nav-transition-leave-to{
  max-height: 0px;
  opacity: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.mobile-nav-transition-enter-to{
  max-height: 100px;
  opacity: 1;
  overflow: hidden;
}

.mobile-nav-transition-leave{
  max-height: 100px;
  opacity: 1;
  overflow: hidden;
}

.mobile-nav-transition-enter-active{
  transition: all .25s ease-in;
}
.mobile-nav-transition-leave-active{
  transition: all .25s cubic-bezier(0, 1, 0.5, 1);
}

@media screen and (max-width: 780px){
  .nav-wrapper{
    display: none;
  }
  .mobile-nav-wrapper{
    display: block;
  }
  .nav-list{
    font-size: 1rem;
  }
}
@media screen and (max-width: 480px){
  .nav-list{
    font-size: .8rem;
  }
}
</style>

<template>
  <div class="home-page">
    <Page v-if="this.$store.state.isLoggedIn" :content="{content:[loggedIn], lightTheme:true}"></Page>
    <Page v-else :content="{content:[loggedOut], lightTheme:true}"></Page>
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
    document.title = 'Home';
  },
  data() {
    return {
      loggedOut: [
        {
          name: 'tabProp',
          contentType: 'Tab',
          alignType: 'center',
          lightTheme: false,
          subPanel: false,
          text: [{ value: 'Home' }]
        },
        {
          contentType: 'p',
          value: 'You are not logged in, please log in.'
        }
      ],
      loggedIn: [
        {
          name: 'tabProp',
          contentType: 'Tab',
          alignType: 'center',
          lightTheme: false,
          subPanel: false,
          text: [{ value: 'Select an Option' }]
        },
        {
          contentType: 'Panel',
          lightTheme: true,
          content: [
            {
              contentType: 'Row',
              lightTheme: true,
              content: [
                {
                  name: 'tabProp',
                  contentType: 'Tab',
                  alignType: 'left',
                  lightTheme: true,
                  subPanel: false,
                  onClick(self) {
                    var successCallBack = retData => {
                      self.$store.commit('POSTSLOADED', retData.data.data);
                      self.$router.push({ name: 'Ship Crew Posts' });
                    };

                    var errorCallBack = () => {
                      console.log(error);
                    };

                    const ShipCrewPostsRepository = RepositoryFactory.get('scPosts');
                    ShipCrewPostsRepository.get(self.$store.state.currentUser.token, successCallBack, errorCallBack);
                  },
                  text: [{ value: 'View Ship Crews' }]
                },
                {
                  name: 'tabProp',
                  contentType: 'Tab',
                  alignType: 'mid',
                  lightTheme: true,
                  subPanel: false,
                  onClick() {},
                  text: [{ value: 'View Ship Fleets' }]
                },
                {
                  name: 'tabProp',
                  contentType: 'Tab',
                  alignType: 'row-right',
                  lightTheme: true,
                  subPanel: false,
                  onClick() {},
                  text: [{ value: 'View Misc./On Foot Groups' }]
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>

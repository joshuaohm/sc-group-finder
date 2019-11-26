<template>
  <div class="ship-crews-page">
    <Page :content="{content:[shipCrews], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Page from 'components/Page';
import LoginCheck from './../mixins/LoginCheck';

export default {
  mixins: [LoginCheck],
  components: {
    Page
  },
  props: {
    name: String,
    content: Object
  },
  created() {
    document.title = 'About';
  },
  data() {
    return {
      shipCrews: [
        {
          contentType: 'Panel',
          lightTheme: true,
          content: [
            {
              contentType: 'Tab',
              alignType: 'center',
              lightTheme: true,
              text: [{ value: 'List Your Ship' }],
              contentWidth: 'quarter-width grow',
              subPanel: false,
              onClick(self) {
                self.$router.push({ name: 'New Ship Crew Post' });
              }
            }
          ]
        },
        {
          contentType: 'Tab',
          alignType: 'center',
          lightTheme: false,
          text: [{ value: 'View Ship Crews:' }],
          subPanel: false
        },
        {
          contentType: 'Panel',
          lightTheme: true,
          content: [
            {
              contentType: 'ShipCrewPostDisplayer',
              content: this.$store.state.currentPosts,
              lightTheme: true
            }
          ]
        }
      ]
    };
  }
};
</script>

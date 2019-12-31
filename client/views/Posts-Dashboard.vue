<template>
  <div class="new-ship-crew-page">
    <Page :content="{content:[Dashboard], lightTheme:true}"></Page>
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
    content: Object
  },
  created() {
    document.title = 'Posts Dashboard';
  },
  data() {
    return {
      Dashboard: [
        {
          contentType: 'Tab',
          alignType: 'center',
          lightTheme: false,
          delayedReveal: true,
          text: [{ value: 'Your Posts:' }],
          subPanel: false
        },
        {
          contentType: 'Panel',
          lightTheme: true,
          content: [
            {
              contentType: 'ShipCrewPostDisplayer',
              lightTheme: true,
              postsType: 'user'
            }
          ]
        }
      ]
    };
  }
};
</script>

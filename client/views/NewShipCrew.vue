<template>
  <div class="new-ship-crew-page">
    <Page :content="{content:[shipCrew], lightTheme:true}"></Page>
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
    document.title = 'About';
  },
  data() {
    return {
      shipCrew: [
        {
          contentType: 'Tab',
          alignType: 'center',
          lightTheme: false,
          delayedReveal: true,
          text: [{ value: 'New Ship Crew Post:' }],
          subPanel: false
        },
        {
          contentType: 'Panel',
          lightTheme: true,
          content: [
            {
              contentType: 'ShipCrewPostCreator',
              lightTheme: true
            }
          ]
        }
      ]
    };
  }
};
</script>

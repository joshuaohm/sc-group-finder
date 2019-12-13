<template>
  <div class="about-page">
    <Page :content="{content:[tab1, panel1], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Page from 'components/Page';

export default {
  components: {
    Page
  },
  props: {},
  created() {
    document.title = 'About';
  },
  data() {
    return {
      tab1: {
        contentType: 'Tab',
        alignType: 'center',
        lightTheme: false,
        delayedReveal: true,
        subPanel: false,
        text: [{ value: 'About This Site' }]
      },

      panel1: {
        contentType: 'Panel',
        lightTheme: false,
        content: [
          {
            contentType: 'h4',
            value: 'Find Groups In The Verse'
          },
          {
            contentType: 'p',
            value: 'You can search through listings and make postings for:'
          },
          {
            contentType: 'Row',
            lightTheme: false,
            content: [
              {
                contentType: 'Tab',
                alignType: 'left',
                subPanel: false,
                delayedReveal: true,
                lightTheme: true,
                text: [{ value: 'Ship Crews' }]
              },
              {
                contentType: 'Tab',
                alignType: 'center',
                subPanel: false,
                delayedReveal: true,
                lightTheme: true,
                text: [{ value: 'Ship Fleets' }]
              },
              {
                contentType: 'Tab',
                alignType: 'right',
                lightTheme: true,
                delayedReveal: true,
                subPanel: false,
                text: [{ value: 'People On Foot' }]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

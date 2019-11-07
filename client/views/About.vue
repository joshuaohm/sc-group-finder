<template>
  <div class="about-page">
    <Page :content="[tabProp, title, msg]"></Page>
  </div>
</template>

<script>
import Page from 'components/Page'

export default {
  components: {
    Page
  },
  created () {
    document.title = "About"
  },
  data () {
    return {
      msg: {
        type: "p",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel incidunt saepe omnis voluptatem culpa nesciunt rem suscipit, ad repudiandae enim non quas voluptates, quod quae. Facere architecto aut necessitatibus deleniti?"
      },
      tabProp: {
          type : "Tab",
          content : [
            { value: "About" }
          ]
      },
      title: {
        content: "Use this website to {INSERT ACTIVITY}",
        type: "h3"
      }
    }
  }
}
</script>

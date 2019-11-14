<template>
  <div class="home-page">
    <Page :content="{content:[tabProp, msg], lightTheme:true}"></Page>
  </div>
</template>

<script>
import Tab from 'components/Tab'
import Page from 'components/Page'

export default {
  components: {
    Tab, Page
  },
  created () {
    document.title = "Home"
  },
  data () {
    return {
      msg: {
        type: "p",
        content: "You are not logged in, please log in."
      },
      tabProp: {
        name : "tabProp",
        type : "Tab",
        subPanel : false,
        text : [
          { value: "Home" }
        ]
      }
    }
  }
}
</script>

<style lang="scss">

.home-page-appear{
  animation: fadeInGrowVert .5s ease;
  animation-delay: .5s;
}

@keyframes fadeInGrowVert {
  0%{
    opacity: 0;
    transform: scale(0);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideRight{
  0%{
    transform: translateX(-100%);
  }
  60%{
    transform: translateX(0px);
  }
  80%{
    transform: translateX(-4px);
  }
  100%{
    transform: translateX(0%);
  }
}
</style>
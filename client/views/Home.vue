<template>
  <Page>
    <Tab>
    </Tab>
  </Page>
</template>

<script>
import Tab from 'components/Tab'
import Page from 'components/Page'

export default {
  components: {
    Tab, Page
  },
  created () {
    document.title = "Testing"
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
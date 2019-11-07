<template>
  <div class="page">
    <AboutPage></AboutPage>
  </div>
</template>

<script>
import AboutPage from 'components/AboutPage'

export default {
  components: {
    AboutPage
  },
  created () {
    document.title = "About"
  }
}
</script>

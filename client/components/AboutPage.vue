<template>
  <div class="about-page">
    <Page>
      <Tab></Tab>
    </Page>
  </div>
</template>

<script>
import Page from 'components/Page'
import Tab from 'components/Tab'

export default {
  data () {
    return {
      title: "Welcome To BLANK", 
      msg: "Use this website to {INSERT ACTIVITY}"
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
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper{
  width: 100%;
  position: relative;
  height: 120px;

  .nav-list{
    display: flex;
    flex: row nowrap;
    justify-content: space-around;
    padding: 0;
    width: 50%;
    float: right;
    list-style: none;

    .nav-item{
      text-decoration: none;
    }
  }
}
</style>

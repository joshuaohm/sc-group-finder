<template>
    <div class="tab-input-wrapper">
      <transition name="tab-transition">
        <div v-if="show">
          <div class="tab">
            <select class="tab-input">
              <option v-for="option in content.options" :key="option.value"> 
                {{option.value}}
              </option>
            </select>
          </div>
        </div>
      </transition>
      <div v-if="show">
        <div class="blue-line"></div>
      </div>
      <div v-else>
        <div class="blue-line added-height"></div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    content: Array,
  },
  data () {
    return {
      show: false,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'PAGELOADED'){
        this.show = true;
      } 
    });
  }
}
</script>

<style lang="scss" scoped>
$ice-blue: #00bac4;
$page-border: #014736;
$page-color: #012e23;

.tab{
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 72px;
  position: relative;
  background-color: #000;
  height: 40px;

  &:before {
      content: '';
      position: absolute;
      top: 0; 
      right: 0;
      background: linear-gradient(to top left, $page-color 50%, transparent 50%);
      height: 100%;
      width: 72px;
    }
}

.tab-input{
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  margin-left: 4px;
  margin-right: 4px;
  border: none;
  box-sizing: border-box;
  background-color: black;
  color: $ice-blue;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
}

.blue-line{
  margin-right: 94px;
  margin-left: 2px;
  height: 2px;
  background-color: $ice-blue;
  opacity: .5;
}

span{
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
}

.added-height {
  margin-top: 88px;
}

.tab-transition-enter, .tab-transition-leave-to{
  transform: translateX(-100%);
}

.tab-transition-enter-to{
  transform: translateX(0);
}

.tab-transition-enter-active, .tab-transition-leave-active{
  transition: transform .25s ease;
}
</style>

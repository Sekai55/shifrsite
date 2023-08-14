<template>
    <div id="app">
      <div class="head">
      <SiteHeader />
      </div>
      <div class="bodyApp">
      <Transition name = "router-anim" enter-active-class="animated fadeIn" >
      <RouterView/>
      </Transition>
      <!-- <TestMark/> -->
      </div>
      <div class = "foot">
      <SiteFooter />
      </div>
    </div>
    <div class = "test">
      
    </div>
</template>

<script>
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
// import TestMark from "./components/TestMark.vue";

export default {
  name: "App",
  components: {
    SiteHeader,
    // TestMark,
    SiteFooter
    
},

}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@font-face{
font-family: "Galiver Sans";
src: local("Galiver Sans"), url(@/assets/galiver-sans.bold.ttf) format("truetype");
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
html {
  min-height: 100%;
}
.test{
  background-color: blueviolet;
}
.head {
margin-bottom: 72px;
}

.bodyApp{
min-height: 582px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.page {
    position: fixed;
    width: inherit;
  }
</style>
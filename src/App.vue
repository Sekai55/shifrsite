<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | Shifrus.ru` : `Shifrus.ru` }} </template>
  </metainfo>
      <SiteHeader />
      <div class="content">
        <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
      <!-- <TestMark/> -->
      </div>
      <SiteFooter />
</template>

<script>
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
// import TestMark from "./components/TestMark.vue";
import { useMeta } from 'vue-meta'

export default {
  setup () {
    useMeta({
      title: 'Shifrus.ru',
      description:'Всё о методах шифрования и дешифрования информации. Погрузитесь в мир криптографии',
      htmlAttrs: { lang: 'ru', amp: true },
    })
  },
  name: "App",
  components: {
    SiteHeader,
    // TestMark,
    SiteFooter
    
},

}
</script>

<style>
@font-face {   
font-family: "Galiver Sans";   
src: url(@/assets/galiver-sans.bold.ttf) format('woff'),        
url(@/assets/galiver-sans.bold.ttf) format('eot');   
font-weight: 400;   
font-style: normal;   
font-display: block; }

::-webkit-scrollbar {
  width: 0;
  height: 0;
}
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.test{
  background-color: blueviolet;
}
.head {
margin-bottom: 72px;
}

.content {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  flex: 1; /* Занимает всю доступную высоту */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page {
    position: fixed;
    width: inherit;
  }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
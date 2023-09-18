<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HomePage.vue'
import { useMeta } from 'vue-meta'

export default {
  setup () {
    useMeta({ title: 'Главная страница' , description: 'Всё о методах шифрования и дешифрования информации. Погрузитесь в мир криптографии'})
  },
  components: {
    HelloWorld
  }
}
</script>

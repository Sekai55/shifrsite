<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HomePage.vue'

export default {
  name: 'HomeView',
  metaInfo: {
    title: 'Всё о методах шифрования', // Заголовок страницы
    meta: [
      {
        name: 'description',
        content: 'На этом сайте вы сможете ознакомится с различными методами шифрования информации и погрузится в мир криптографии' // Мета-описание
      },

    ]
  },
  components: {
    HelloWorld
  }
}
</script>

<template>
    <div>
      <h1>Ошибка</h1>
      <p>{{ errorMessage }}</p>
      <p>Тип Ошибки: {{ errorType }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      errorMessage: {
        type: String,
        default: 'Простите, но страница не найдена :('
      },
      errorType: {
        type: String,
        default: 'Unknown'
      }
    },
    methods: {
      redirectToAnotherErrorPage() {
        // Выполнение перенаправления на другую страницу ошибки
        this.$router.push({
          path: '/error-page',
          query: { errorType: this.errorType }
        });
      }
    }
  }
  </script>
  
  <style scoped>

  </style>
  
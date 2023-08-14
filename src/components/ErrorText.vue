<template>
    <div>
      <h1>Error</h1>
      <p>{{ errorMessage }}</p>
      <p>Error type: {{ errorType }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      errorMessage: {
        type: String,
        default: 'An error occurred.'
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
  
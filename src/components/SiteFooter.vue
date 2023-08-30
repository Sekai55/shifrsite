<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Ваш контент для footer здесь -->
      <p>&copy; {{ currentYear }}</p>
    </div>
    <div class="footer-version">
      Версия сайта: 1.1.0
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 0px 20px; /* Уменьшенные верхний и нижний отступы */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-content {
  flex: 1;
}

.footer-version {
  font-size: 14px;
  color: #999;
}
</style>
<template>
  <div>
  <div class="navigation-bar">
    <div class="navigation-bar-item" @click="redirectToTheory" :class="{ active: activeTab === 'theory' }">
      Теория
    </div>
    <div class="navigation-bar-item" @click="redirectToCalculator" :class="{ active: activeTab === 'calculator' }">
      Калькулятор
    </div>
    <div class="active-tab-indicator" :style="{ left: `${indicatorOffset}%` }"></div>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: null,
      indicatorOffset: 0
    };
  },
  methods: {
    redirectToTheory() {
      this.activeTab = 'theory';
      this.indicatorOffset = 0;
      const currentPath = this.$route.path; // Получаем текущий путь
      if (!currentPath.endsWith('-theory')){
        if (currentPath.endsWith('-calculator')) {
          const redirectTo = currentPath.slice(0, -11) + '-theory';
          this.$router.push(redirectTo);
        }
        else {const redirectTo = currentPath + '-theory';
        this.$router.push(redirectTo);
        }
      }
    },
    redirectToCalculator() {
      this.activeTab = 'calculator';
      this.indicatorOffset = 50;
      const currentPath = this.$route.path; // Получаем текущий путь
      if (!currentPath.endsWith('-calculator')){
        if (currentPath.endsWith('-theory')) { 
          const redirectTo = currentPath.slice(0, -7) + '-calculator';
          this.$router.push(redirectTo);
        }
        else {const redirectTo = currentPath + '-calculator';
        this.$router.push(redirectTo);
        }
      }
    }
  }
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Galiver+Sans:wght@400;700&display=swap'); */
.navigation-bar { 
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  height: 50px;
  position: relative;
}


.navigation-bar-item {
  font-family: "Galiver Sans", sans-serif;
  font-size: 22px;
  color: #eaeaea;
  cursor: pointer;
  transition: color 0.3s ease;
  flex-grow: 1;
  text-align: center;
}

.navigation-bar-item:hover {
  color: #00eaff;
}

.active {
  color: #00eaff;
}

.active-tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #00eaff;
  transition: left 0.3s ease;
  left: 25%; /*начальная позиция индикатора на середину первой кнопки */
  width: 50%;
}

</style>

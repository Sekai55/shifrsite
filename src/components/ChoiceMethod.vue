<template>
  <div class="navigation-bar">
    <div class="navigation-bar-item" @click="redirectToTheory" :class="{ active: activeTab === 'theory' }">
      Теория
    </div>
    <div class="navigation-bar-item" @click="redirectToCalculator" :class="{ active: activeTab === 'calculator' }">
      Калькулятор
    </div>
    <div class="active-tab-indicator" :style="{ left: `${indicatorOffset}%` }"></div>
  </div>
  <Transition name = "router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
  <RouterView/>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      activeTab: null,
      indicatorOffset: 0
    };
  },
  // mounted() {
  //     // Создаем элемент для отображения пользовательского курсора
  //     const customCursor = document.createElement('div');
  //     customCursor.className = 'custom-cursor';
  
  //     // Функция обработчика события движения мыши
  //     const handleMouseMove = (e) => {
  //       // Получаем текущие координаты курсора
  //       const mouseX = e.clientX;
  //       const mouseY = e.clientY;
  
  //       // Устанавливаем стили для элемента, на котором отображается пользовательский курсор
  //       customCursor.style.position = 'fixed';
  //       customCursor.style.left = `${mouseX - 44}px`; // Центрируем относительно курсора по горизонтали и увеличиваем размер на 10px
  //       customCursor.style.top = `${mouseY - 44}px`; // Центрируем относительно курсора по вертикали и увеличиваем размер на 10px
  //       customCursor.style.width = '100px'; // Задаем ширину и высоту в 50px, чтобы создать круг с радиусом 25px
  //       customCursor.style.height = '100px';
  //       customCursor.style.borderRadius = '50%'; // Задаем радиус границы, чтобы создать круглую форму
  //       customCursor.style.background = 'grey'; // Градиент от более непрозрачного к менее непрозрачному цвету
  //       customCursor.style.pointerEvents = 'none'; // Устанавливаем pointer-events в none, чтобы не мешать взаимодействию с элементами под курсором
  //       customCursor.style.zIndex = '5'; // Устанавливаем z-index, чтобы элемент был поверх остальных элементов на странице
  
  //       // Добавляем элемент на страницу
  //       document.body.appendChild(customCursor);
  //     };
  
  //     // Добавляем слушатель события движения мыши
  //     this.$el.addEventListener('mousemove', handleMouseMove);
  
  //     // Функция обработчика события ухода курсора за пределы элемента
  //     const handleMouseLeave = () => {
  //       // Удаляем элемент, на котором отображается пользовательский курсор
  //       customCursor.remove();
  //     };
  
  //     // Добавляем слушатель события ухода курсора за пределы элемента
  //     this.$el.addEventListener('mouseleave', handleMouseLeave);
  //   },
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
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
  font-family: "Galiver Sans";
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

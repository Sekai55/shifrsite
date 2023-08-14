<template>
  <header>
    <img src="../assets/icomenu.png" @click="showMenu = !showMenu" style="position: absolute; z-index: 9999;height: 50px;" class="icomenu">
    <div class="menu" :class="{ active: showMenu }" @click="showMenu = !showMenu">
      <li><router-link to="/"> На главную </router-link></li>
      <li><router-link to="/about"> О Нас </router-link></li>
      <li><router-link to="/shifr"> Выбор шифра </router-link></li>
    </div>

    <div class="logo-container">
      <img src="../assets/logo.png" alt="Logo" class="logo">
      <h1 class="site-title"> ᕲᘉᘿᐺᘉᓰᖽᐸ SᕼᓰᖴᖇᓍᐺᗩᒪSᕼᑢᕼᓰᖽᐸᗩ </h1>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        showMenu: false
      }
    }
  }
  </script>
  
  <style scoped>
  .icomenu {
  cursor: pointer;
  float: left;
  margin-left: 20px;
  height: 50px;
  max-width: 100%;
  }

 .menu {
  list-style: none;
  margin-top: 72px;
  width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  left: -300px;
  background-color: #f5f5f5;
  transition: all 0.3s ease-in-out;
}


.menu.active {
  left: 0;
}
.menu li {
  margin-bottom: 3px;
}

.menu li:last-child {
  margin-bottom: 0;
}

.menu li a {
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  padding: 10px 15px;
}

.menu li a:hover {
  color: #fff;
  background-color: #333;
}
.logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  margin-right: 10px;
  }

@media (max-width: 600px) {
.logo {
  opacity: 0;
  }
  .site-title {
  margin-left:60px
  }
}
.site-title {
  font-size: 24px;
  margin: 0;
}

header {
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  z-index: 9999;
}
  
  </style>
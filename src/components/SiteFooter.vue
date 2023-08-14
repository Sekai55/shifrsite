<template>
    <footer>
    <div class="footer-content">
      <div class="contact-icons">
      <a href="https://VK.com">
        <img src="../assets/vk.png" alt="VK">
      </a>
      <a href="https://twitter.com">
        <img src="../assets/twitter.png" alt="Email">
      </a>
      <a href="https://facebook.com">
        <img src="../assets/facebook.png" alt="Facebook">
      </a>
      </div>
        <div class="contact-details">
          <p>Phone: 89999999999</p>
          <p>Email: info@example.com</p>
        </div>
      </div>
    </footer> 

</template>
  

  
  <style scoped>
  footer {
    height: 50px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-left: -8px;
    margin-right: -8px;
    background-color: #333;
  }


.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.contact-icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-icons a {
  margin-right: 20px;
}

.contact-icons img {
  width: 30px;
  height: 30px;
}

.contact-details {
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
}
  </style>
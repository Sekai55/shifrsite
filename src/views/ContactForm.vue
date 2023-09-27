<template>
  <div>
    <div class="contact-form-container">
      <h2 class="form-title">Напишите нам</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Имя:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="message">Сообщение:</label>
          <textarea id="message" v-model="formData.message" required></textarea>
        </div>
        <div class="form-group">
          <label for="captcha">Введите текст:</label>
          <div class="captcha-hint">
          <span>{{ captchaText }}</span>
          </div>
          <input type="text" id="captcha" v-model="userInput" required />
        </div>
        
        <button type="submit" class="submit-button">Отправить</button>
        <div v-if="messageSent" class="message-sent">Сообщение отправлено!</div>
      </form>
      <div v-if="isCaptchaSolved" class="captcha-solved">CAPTCHA solved!</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
      userInput: '',
      messageSent: false,
      captchaText: this.generateCaptchaText(),
      isCaptchaSolved: false,
    };
  },
  methods: {
    generateCaptchaText() {
      // Генерация случайного текста CAPTCHA
      const words = [
  "автомобиль",
  "кофе",
  "котенок",
  "радуга",
  "балерина",
  "солнце",
  "робот",
  "пианино",
  "мороженое",
  "бутылка",
  "зонтик",
  "гитара",
  "океан",
  "пальто",
  "яблоко",
  "птица",
  "чемодан",
  "карандаш",
  "дракон",
  "цветок"
];
      return words[Math.floor(Math.random() * words.length)];
    },
    async submitForm() {
      if (this.userInput.toLowerCase() !== this.captchaText.toLowerCase()) {
        console.error('CAPTCHA verification failed.');
        return;
      }

      try {
            const response = await fetch("https://formspree.io/f/xoqopaqy", {
              method: "POST",
              body: JSON.stringify(this.formData),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              // Успешно отправлено
              console.error("Форма успешно отправлена!");
            } else {
              // Ошибка при отправке
              throw("Произошла ошибка при отправке формы.");
            }

        // Очистка данных после успешной отправки
        this.formData = {
          name: '',
          email: '',
          message: '',
        };

         // Показать надпись о успешной отправке
         this.messageSent = true;

        // Скрыть надпись через некоторое время (например, 3 секунды)
        setTimeout(() => {
          this.messageSent = false;
        }, 3000);

        // Очистка CAPTCHA и сброс решения
        this.captchaText = this.generateCaptchaText();
        this.isCaptchaSolved = false;
        this.userInput = '';
      } catch (error) {
        console.error('Error submitting form:', error);
        // Здесь вы можете добавить обработку ошибок при отправке
      }
    },
  },
};
</script>

<style scoped>
.contact-form-container {
  width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.form-title {
  font-size: 24px;
  margin-bottom: 1rem;
  color: #333;
}

.contact-form {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="email"],
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.captcha-hint {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  user-select: none;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.captcha-solved {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin-top: 1rem;
}
</style>

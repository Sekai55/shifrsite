<template>
  <div class="home">
    <div class = "warning">
    <h1>Обращаем Ваше внимание, что сайт находится в разработке</h1>
    <p>Материалы на этом сайте не являются на 100% достоверными.</p>
    </div>
    <h1>Добро пожаловать на наш сайт!</h1>
    <p>
      Здесь вы найдете информацию о различных методах шифрования и дешифрования. Мы стремимся предоставить вам полезные
      знания и инструменты, чтобы вы могли лучше понять и применять криптографию в своих проектах а также чтобы повысить
      интерес людей к такой науке как криптография.
    </p>
    <div class = "shifrgo">
    <router-link to="/shifr"> Перейти к выбору шифра</router-link>
    </div>
    
    <h2>Описание методов шифрования</h2>
    <p>
      На нашем сайте мы предоставляем подробные объяснения различных методов шифрования, начиная от классических методов
      до современных алгоритмов. Вы сможете узнать о шифрах подстановки, перестановки, асимметричного и симметричного
      шифрования, а также других тематических методах.
    </p>

    <h2>Калькулятор для решения шифра</h2>
    <p>
      Для каждого шифра на нашем сайте существует калькулятор, который поможет вам шифровать или дешифровать текст.
      Просто выберите шифр, зайдите на вкладку с калькулятором, введите текст и выберите нужный вам метод обработки,
      чтобы увидеть конечное сообщение.
    </p>

    <h2>Ресурсы и статьи</h2>
    <p>
      Мы также предоставляем полезные ресурсы и статьи, связанные с криптографией. Здесь вы найдете информацию о
      применении криптографии в реальном мире, советы по безопасности, анализ различных алгоритмов и многое другое.
      Постоянно обновляющийся контент поможет вам быть в курсе последних трендов и новостей в области криптографии.
    </p>

    <h2>Присоединяйтесь к нам</h2>
    <p>
      Мы приглашаем вас стать частью нашего сообщества. Если у вас есть вопросы, комментарии или предложения, не стесняйтесь
      обращаться к нам через нашу контактную форму. Мы ценим вашу активность и с нетерпением ждем ваших вкладов и обратной
      связи.
    </p>
    <h2>Список файлов</h2>
    <div class="container">
    <div class="icon" @click="downloadFile('/files/Дориченко С_25 этюдов о шифрах.pdf')">
      <img src="/files/pdfimg.svg" alt="Icon 1" />
      <span>Просто о криптографии</span>
    </div>
    <div class="icon" @click="downloadFile('/files/к истории криптографии.pdf')">
      <img src="/files/pdfimg.svg" alt="Icon 2" />
      <span>К истории криптографии</span>
    </div>
    <div class="icon" @click="downloadFile('/files/Матем основы  криптографии.pdf')">
      <img src="/files/pdfimg.svg" alt="Icon 3" />
      <span>Матем основы криптографии</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Всё о методах шифрования', // Заголовок страницы
    meta: [
      {
        name: 'description',
        content: 'На этом сайте вы сможете ознакомится с различными методами шифрования информации и погрузится в мир криптографии' // Мета-описание
      },

    ]
  },
  methods: {
    downloadFile(fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
      link.click();
    }
  },
  name: 'HomePage',
};
</script>

<style scoped>

.shifrgo{
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  padding: 10px 15px;
}
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}


.container {
  max-width: 300px;
  margin: 0 auto;
}

.icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.icon img {
  width: 50px;
  margin-right: 8px;
}

.icon span {
  flex-grow: 1;
  text-align: center;
}
.warning h1 {
  color: red;
}

.warning p {
  color: orange;
}
</style>

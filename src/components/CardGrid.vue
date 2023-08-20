<template>
    <div class="card-grid">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :imageSrc="card.imageSrc"
        :description="card.description"
        :newPageRoute="card.newPageRoute"
      />
    </div>
</template>
  
<script>
  import Card from '@/components/CardBlock.vue';
  
  export default {
    name: 'CardGrid',
    components: {
      Card
    },
    data() {
      return {
        cards: [
          {
            title: 'Азбука Морзе',
            imageSrc: require("../assets/ShifrAssets/icomorze.jpg"),
            description: 'Комбинации длинных и коротких сигналов известных как точки и тире',
            newPageRoute: '/shifr/morze-theory' 
          },
          {
            title: 'Групповой Код',
            imageSrc: require("../assets/ShifrAssets/group.png"),
            description: 'Мат. структура группы позволяет разбить инф-ю на группы с помощью теоремы Лагранжа.',
            newPageRoute: '/shifr/group-theory'
          },
          {
            title: 'Криптосистема Хилла',
            imageSrc: require("../assets/ShifrAssets/hill.png"),
            description: 'Использование квадратной матрицы ключа для шифрования и дешифрования текста',
            newPageRoute: '/shifr/hill-theory'
          },
          {  
            title: 'Ранцевая криптосистема Меркла — Хеллмана',
            imageSrc: require("../assets/ShifrAssets/MercHel.jpg"),
            description: 'Это асимметричный метод шифрования основанный на задаче о рюкзаке',
            newPageRoute: '/shifr/merc-helman-theory'
          },
          {
            title: 'Криптосистема Месси — Омуры',
            imageSrc: require("../assets/ShifrAssets/messiomur.jpg"),
            description: 'Передачи информации с помощью запираемых на один или два замка "ящиков"',
            newPageRoute: '/shifr/messi-omur-theory'
          },
          {
            title: 'Криптосистема RSA',
            imageSrc: require("../assets/ShifrAssets/RSA.png"),
            description: 'Асимметричного шифрованияе с использованием функции Эйлера для создания цифровых подписей',
            newPageRoute: '/shifr/RSA-theory'
          },
          {
            title: 'Криптосистема на конечных полях',
            imageSrc: require("../assets/ShifrAssets/KPole.png"),
            description: 'Двоичное поле с n битами для арифметических операций',
            newPageRoute: '/shifr/KPole-theory'
          },
          {
            title: 'Генератор псевдослучайных чисел',
            imageSrc: require("../assets/ShifrAssets/MercHel.jpg"),
            description: '',
            newPageRoute: '/shifr/randomgen-theory'
          },
        ]
      };
    }
  }
</script>
  
<style scoped>
.card-grid {
display: grid;
 grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /*ширина карточки */
 gap: 20px; /* Расстояние между карточками */
}
</style>
  
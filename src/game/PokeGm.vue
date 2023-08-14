<template>
    <div id="app">
      <div
        :class="{'poke-classic': classic}"
        class="container"
      >
        <transition name="animate-section">
          <section
            v-if="!isPlaying && !isDone"
            class="poke-section"
          >
            <h2>What type of trainer are you?</h2>
            <div class="poke-intro-trainer">
              <div class="poke-ball"></div>
              <img
                :class="{active: trainerHovered === 'classic'}"
                class="poke-trainer-img poke-trainer-img-classic"
                src="https://raw.githubusercontent.com/tiffachoo/pokesprites/master/trainers/red-rb.png"
                alt="Trainer red"
              />
              <img
                :class="{active: trainerHovered === 'master'}"
                class="poke-trainer-img poke-trainer-img-master"
                src="https://raw.githubusercontent.com/tiffachoo/pokesprites/master/trainers/red-sm.png"
                alt="Trainer red again"
              />
            </div>
            <button
              class="button spacer"
              @click="startGame(151)"
              @mouseover="trainerHover('classic')"
              @mouseout="trainerHover(null)"
            >
              Classic
            </button>
            <button
              class="button"
              @click="startGame(0)"
              @mouseover="trainerHover('master')"
              @mouseout="trainerHover(null)"
            >
              Master
            </button>
          </section>
        </transition>
        <transition name="animate-section">
      <section v-if="isPlaying" class="poke-section">
        <h1 class="poke-title">Who's that pokemon?</h1>
        <div class="poke-question-wrapper">
          <span class="poke-question">
            <span class="poke-question-number">{{ question }}</span>
            <span class="poke-question-amount">/ {{ questionAmount }}</span>
          </span>
          <span class="poke-score">
            {{ score }}
            <small>pts</small>
          </span>
          <div
            class="poke-image"
            :class="{'poke-image-success': isChecked && selected.name === answer.name, 'poke-image-error': isChecked && selected.name !== answer.name}"
          >
            <img :src="image" alt="No cheating" class="poke-image-img" />
          </div>
          <transition-group
            tag="div"
            name="animate-options"
            :class="{'poke-options-answers': isChecked}"
            class="poke-options"
          >
            <button
              v-for="(pokemon, index) in options"
              :key="pokemon.name"
              :data-index="index"
              :class="{'selected': selected.index === index, 'success': isChecked && pokemon.name === answer.name , 'error': isChecked && selected.index === index && selected.name !== answer.name}"
              class="poke-options-button"
              @click="selectAnswer(pokemon.name, index)"
            >{{ prettifyName(pokemon.name) }}</button>
          </transition-group>
          <footer class="poke-buttons">
            <button
              :disabled="isChecked || Object.keys(selected).length < 1"
              class="button"
              @click="checkAnswer"
            >Submit</button>
            <button
              :disabled="!isChecked"
              class="button"
              @click="getNextQuestion"
            >Next</button>
          </footer>
        </div>
      </section>
    </transition>
  
    <transition name="animate-section">
      <section v-if="isDone" class="poke-final">
        <h2>Final score</h2>
        <span class="poke-final-score">
          <span class="poke-final-score-number">{{ score }}</span>
          pts
        </span>
        <button class="button" @click="restartGame">Play again</button>
      </section>
    </transition>
  </div>
  </div>
  </template>
  <script>
  console.clear();
  const pkmnTotal = 802;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pkmnTotal}`;
  const optionAmount = 4;
  let pokemonData = [];
  
  const prettyNames = {
    'nidoran-f': 'nidoran♀',
    'nidoran-m': 'nidoran♂',
    'mr-mime': 'mr. mime',
    'deoxys-normal': 'deoxys',
    'wormadam-plant': 'wormadam',
    'mime-jr': 'mime jr.',
    'giratina-altered': 'giratina',
    'shaymin-land': 'shaymin',
    'basculin-red-striped': 'basculin',
    'darmanitan-standard': 'darmanitan',
    'tornadus-incarnate': 'tornadus',
    'thundurus-incarnate': 'thundurus',
    'landorus-incarnate': 'landorus',
    'keldeo-ordinary': 'keldeo',
    'meloetta-aria': 'meloetta',
    'meowstic-male': 'meowstic',
    'aegislash-shield': 'aegislash',
    'pumpkaboo-average': 'pumpkaboo',
    'gourgeist-average': 'gourgeist',
    'oricorio-baile': 'oricorio',
    'lycanroc-midday': 'lycanroc',
    'wishiwashi-solo': 'wishiwashi',
    'type-null': 'type: null',
    'minior-red-meteor': 'minior',
    'mimikyu-disguised': 'mimikyu',
    'tapu-koko': 'tapu koko',
    'tapu-lele': 'tapu lele',
    'tapu-bulu': 'tapu bulu',
    'tapu-fini': 'tapu fini',
  };
  
  export default {
    el: '#app',
    data() {
      return {
        pokemon: [],
        pkmnAmount: null,
        score: 0,
        question: 0,
        questionAmount: 10,
        answer: {},
        selected: {},
        options: [],
        isPlaying: false,
        isDone: false,
        isChecked: false,
        trainerHovered: null,
      };
    },
    computed: {
      image() {
        if (this.answer.url) {
          const url = 'https://raw.githubusercontent.com/tiffachoo/pokesprites/master/pokemon/';
          const imageUrl = `${url}${this.classic ? 'redblue' : 'sunmoon'}/`;
          const number = this.answer.url.match(/\/(\d+)/)[1];
          return `${imageUrl}${number}.png`;
        }
        return '';
      },
      classic() {
        return this.pkmnAmount <= 151;
      },
      prettifyName() {
        return function (name) {
          return prettyNames[name] || name;
        };
      },
    },
    mounted() {
      let pokeList = localStorage.getItem('pokeList');
          
          if (pokeList) {
              pokemonData = JSON.parse(pokeList);
          } else {
              this.getData()
                  .then(res => {
                      pokemonData = res.results
                      localStorage.setItem('pokeList', JSON.stringify(res.results));
              });
          }
      },
    methods: {
      async getData() {
        try {
          const res = await fetch(url);
          return res.json();
        } catch (err) {
          console.log('Error:', err);
        }
      },
      startGame(val) {
        this.question = 0;
        this.score = 0;
        this.isPlaying = true;
        this.pokemon = [...pokemonData];
        this.pkmnAmount = val || pkmnTotal;
        this.getNextQuestion();
      },
      getNextQuestion() {
        this.question += 1;
        this.resetAnswer();
  
        if (this.question <= this.questionAmount) {
          for (let i = 1; i <= optionAmount; i++) {
            const removed = this.pokemon.splice(this.getRandomPokemon(i), 1)[0];
            if (i === 1) {
              this.answer = removed;
            } else {
              this.options.push(removed);
            }
          }
  
          const pos = Math.floor(Math.random() * optionAmount);
          this.options.splice(pos, 0, this.answer);
        } else {
          this.isPlaying = false;
          this.isDone = true;
          this.resetAnswer();
        }
      },
      selectAnswer(ans, index) {
        if (!this.isChecked) {
          this.selected.name = ans;
          this.selected.index = index;
        }
      },
      checkAnswer() {
        this.isChecked = true;
        if (this.selected.name === this.answer.name) {
          this.score += 10;
        }
      },
      getRandomPokemon(index) {
        const diff = (this.question - 1) * 4 + index;
        return Math.floor(Math.random() * (this.pkmnAmount + 1 - diff));
      },
      resetAnswer() {
        this.options = [];
        this.selected = {};
        this.answer = {};
        this.isChecked = false;
      },
      restartGame() {
        this.isDone = false;
      },
      trainerHover(val) {
        this.trainerHovered = val;
      },
    },
  };
  </script>
  <style scoped>
  @import 'https://fonts.googleapis.com/css?family=VT323';
  * {
    box-sizing: border-box;
  }
  
  body {
    background-color: #f65a52;
    font-family: "VT323", monospace;
    font-size: 16px;
    line-height: 1.875em;
    color: #333;
  }
  
  .container {
    width: 100%;
    max-width: 400px;
    position: relative;
    margin: 50px auto;
  }
  
  h2 {
    font-size: 1.25rem;
    white-space: nowrap;
  }
  
  .spacer {
    margin-bottom: 0.5rem;
  }
  
  .button {
    padding: 0.5em 1.5em;
    border-radius: 1rem;
    border: solid 1px transparent;
    font-family: "VT323", monospace;
    font-size: 1.5rem;
    background-color: #f32c22;
    color: #333;
    cursor: pointer;
    transition: 0.35s;
  }
  .button:focus {
    outline: none;
    border: 1px dotted #f87f79;
  }
  .button:not([disabled]):hover {
    background-color: #333;
    color: #f65a52;
  }
  
  .poke-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-width: 500px;
    margin: auto;
  }
  
  .poke-intro-trainer {
    position: relative;
    margin-bottom: 1rem;
    height: 200px;
    width: 200px;
  }
  .poke-intro-trainer .poke-trainer-img {
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 200px;
    opacity: 0;
    transition: 0.4s cubic-bezier(0.22, 0.75, 0.53, 0.99);
  }
  @media (max-width: 479px) {
    .poke-intro-trainer .poke-trainer-img {
      display: none;
    }
  }
  .poke-intro-trainer .poke-trainer-img.active {
    transform: translateX(-50%);
    opacity: 1;
  }
  .poke-intro-trainer .poke-trainer-img-classic {
    bottom: 5px;
    height: 180px;
    -ms-interpolation-mode: nearest-neighbor;
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;
    transform: translateX(-80%);
  }
  .poke-intro-trainer .poke-trainer-img-master {
    transform: translateX(-20%);
  }
  
  .poke-ball {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background-color: #f32c22;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
  .poke-ball::before, .poke-ball::after {
    content: "";
    position: absolute;
  }
  .poke-ball::before {
    z-index: 2;
    top: 50%;
    left: 50%;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: solid 6px #f65a52;
    background-color: #fa9f9b;
    transform: translate(-50%, -50%);
  }
  .poke-ball::after {
    z-index: 1;
    top: 50%;
    height: 50%;
    width: 100%;
    border-top: solid 6px #f65a52;
    background-color: #fa9f9b;
  }
  
  .poke-title {
    position: absolute;
    top: -2rem;
    margin-top: 40px;
  }
  
  .poke-question {
    position: absolute;
    right: calc(100% + 0.5rem);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .poke-question-wrapper {
    position: relative;
    width: 250px;
    margin-top: 40px;
  }
  .poke-question-number {
    font-size: 8rem;
    line-height: 0.4;
    color: #fa9f9b;
  }
  
  .poke-score {
    position: absolute;
    top: 6rem;
    right: calc(100% + 0.5rem);
    padding-top: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
    color: #333;
  }
  .poke-score::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 6px;
    background-color: #333;
  }
  
  .poke-image {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    border-radius: 1rem;
    border: solid 6px #333;
    background-color: #fff;
    overflow: hidden;
  }
  .poke-image::before, .poke-image::after {
    content: "";
    position: absolute;
    z-index: -1;
    border-radius: 50%;
  }
  .poke-image::before {
    width: 100px;
    height: 100px;
    background-color: #c5d5ee;
    opacity: 1;
    transition: 0.65s ease-in-out;
  }
  .poke-image::after {
    width: 100px;
    height: 100px;
    border: solid 12px #c5d5ee;
    transform: scale(0);
    transition: 0.4s ease-in-out;
  }
  .poke-image-img {
    width: auto;
    height: 150px;
  }
  .poke-image-success::before, .poke-image-error::before {
    transform: scale(4);
    opacity: 0.5;
  }
  .poke-image-success::after, .poke-image-error::after {
    transform: scale(1);
  }
  .poke-image-success::before {
    background-color: #7bd55a;
  }
  .poke-image-success::after {
    border-color: #7bd55a;
  }
  .poke-image-error::before {
    background-color: #ff8b62;
  }
  .poke-image-error::after {
    border-color: #ff8b62;
    width: 10px;
    border-radius: 1rem;
    transform: rotate(45deg);
  }
  
  .poke-options {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    top: -30px;
    padding: 0 20px;
    margin: 0 auto;
    width: 170px;
    border-radius: 1rem;
    background-color: #333;
  }
  .poke-options:not(.poke-options-answers) .poke-options-button:not(.selected):hover {
    background-color: #a9c1e6;
    transform: translateY(-3px);
  }
  .poke-options:not(.poke-options-answers) .poke-options-button:not(.selected):active::before {
    transform: translate(-50%, -50%) scale(1);
  }
  .poke-options.poke-options-answers .poke-options-button {
    cursor: default;
  }
  .poke-options.poke-options-answers .poke-options-button:not(.error):not(.success) {
    color: #94acbd;
  }
  .poke-options-button {
    position: relative;
    width: 100%;
    padding: 0.5em;
    min-width: 200px;
    max-height: 48px;
    border: solid 6px #333;
    border-radius: 1rem;
    background-color: #c5d5ee;
    font-family: "VT323", monospace;
    font-size: 1.125rem;
    transition: 0.45s;
    cursor: pointer;
    overflow: hidden;
  }
  .poke-options-button:focus {
    outline: none;
  }
  .poke-options-button::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 50%;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-color: #94acbd;
    transform: translate(-50%, -50%) scale(0);
    transition: 0.2s ease-in-out;
  }
  .poke-options-button:not(:last-child) {
    margin-bottom: 3px;
  }
  .poke-options-button.selected {
    background-color: #94acbd;
  }
  .poke-options-button.error {
    background-color: #ff8b62;
  }
  .poke-options-button.success {
    background-color: #7bd55a;
  }
  
  .poke-buttons {
    text-align: center;
  }
  @media (min-width: 480px) {
    .poke-buttons {
      position: absolute;
      top: 20px;
      left: 100%;
    }
    .poke-buttons .button {
      padding-left: calc(1em + 10px);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transform: translateX(-10px);
    }
  }
  .poke-buttons .button {
    padding: 1em;
    width: 110px;
    height: 100px;
    color: #fff;
  }
  .poke-buttons .button[disabled] {
    color: #fa9f9b;
    opacity: 0.7;
    cursor: default;
  }
  .poke-buttons .button:not([disabled]):hover {
    transform: translateX(0);
  }
  .poke-buttons .button:not(:last-child) {
    margin-bottom: 6px;
  }
  
  .poke-final {
    text-align: center;
  }
  .poke-final-score {
    display: block;
    position: relative;
    margin-bottom: 1rem;
  }
  .poke-final-score::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: solid 12px #f32c22;
    transform: translate(-50%, -50%);
    opacity: 0.3;
    -webkit-animation: grow 2s infinite ease-in-out;
            animation: grow 2s infinite ease-in-out;
  }
  .poke-final-score-number {
    font-size: 8rem;
    line-height: 0.4;
    color: #fa9f9b;
  }
  
  .poke-classic .poke-image-img {
    -ms-interpolation-mode: nearest-neighbor;
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;
  }
  
  .animate-section-enter-active, .animate-section-leave-active {
    transition: 0.4s ease-in-out;
  }
  .animate-section-enter, .animate-section-leave-to {
    opacity: 0;
  }
  .animate-section-enter .poke-final-score-number {
    transform: translateY(-30px);
  }
  .animate-section-leave-active {
    transform: translateX(-30%);
  }
  .animate-section-enter-active {
    transition-delay: 0.1s;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .animate-options-enter-active {
    transition: 0.4s ease-in-out;
  }
  .animate-options-enter-active:nth-child(4) {
    transition-delay: 0s;
  }
  .animate-options-enter-active:nth-child(5) {
    transition-delay: 0.2s;
  }
  .animate-options-enter-active:nth-child(6) {
    transition-delay: 0.4s;
  }
  .animate-options-enter-active:nth-child(7) {
    transition-delay: 0.6s;
  }
  .animate-options-enter-active:nth-child(8) {
    transition-delay: 0.8s;
  }
  .animate-options-enter {
    transform: rotateX(-45deg);
    transform-origin: top center;
    opacity: 0;
  }
  .animate-options-leave-active {
    position: absolute;
    z-index: -1;
    transition: 0.8s ease-in-out;
  }
  .animate-options-leave-active[data-index="0"] {
    top: 0;
  }
  .animate-options-leave-active[data-index="1"] {
    top: 51px;
  }
  .animate-options-leave-active[data-index="2"] {
    top: 102px;
  }
  .animate-options-leave-active[data-index="3"] {
    top: 153px;
  }
  .animate-options-leave-to {
    opacity: 0;
  }
  
  @-webkit-keyframes grow {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(0.6);
    }
  }
  
  @keyframes grow {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(0.6);
    }
  }
  </style>
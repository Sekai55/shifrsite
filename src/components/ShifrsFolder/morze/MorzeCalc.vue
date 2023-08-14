<template>
  <div class="morse-converter">
    <div class="input-container">
      <h2 class="converter-title">Азбука Морзе</h2>
      <textarea class="morse-input" placeholder="Введите шифр здесь" v-model="morseInput" @input="convertToText"></textarea>
    </div>
    <div class="input-container">
      <h2 class="converter-title">Текст</h2>
      <textarea class="text-input" placeholder="Введите текст здесь" v-model="textInput" @input="convertToMorse"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      morseInput: "",
      textInput: "",
      morseAlphabet: {
      ".-": "А",
      "-...": "Б",
      ".--": "В",
      "--.": "Г",
      "-..": "Д",
      ".": "Е",
      "...-": "Ж",
      "--..": "З",
      "..": "И",
      ".---": "Й",
      "-.-": "К",
      ".-..": "Л",
      "--": "М",
      "-.": "Н",
      "---": "О",
      ".--.": "П",
      ".-.": "Р",
      "...": "С",
      "-": "Т",
      "..-": "У",
      "..-.": "Ф",
      "....": "Х",
      "-.-.": "Ц",
      "---.": "Ч",
      "----": "Ш",
      "--.-": "Щ",
      "--.--": "Ъ",
      "-.--": "Ы",
      "-..-": "Ь",
      "..-..": "Э",
      "..--": "Ю",
      ".-.-": "Я",
      "-----": "0",
      ".----": "1",
      "..---": "2",
      "...--": "3",
      "....-": "4",
      ".....": "5",
      "-....": "6",
      "--...": "7",
      "---.." :"8",
      "----." :"9",
      ".-.-.-" :".",
      "--..--" :",",	
      "..--.." :"?",
      ".----." :"'",
      "-.-.--" :"!",
      "-..-." :"/",
      "-.--." :"(",
      "-.--.-" :")",
      ".-..." :"&",
      "---..." :":",
      "-.-.-." :";",
      "-...-" :"=",
      ".-.-." :"+",
      "-....-" :"-",
      "..--.-" :"_",
      ".-..-." :"\"",
      "...-..-" :"$",
      ".--.-." :"@",
      }
    };
  },
  methods: {
    convertToText() {
      // Логика перевода из азбуки Морзе в текст
      const morseInput = this.morseInput;
      let textOutput = "";
      const morseWords = morseInput.split(" / ");
      for (let i = 0; i < morseWords.length; i++) {
        const morseLetters = morseWords[i].split(" ");
        for (let j = 0; j < morseLetters.length; j++) {
          if (this.morseAlphabet[morseLetters[j]]) {
            textOutput += this.morseAlphabet[morseLetters[j]];
          }
        }
        if (i < morseWords.length - 1) {
          textOutput += " ";
        }
      }
      this.textInput = textOutput;
    },
    convertToMorse() {
      // Логика перевода из текста в азбуку Морзе
      const textInput = this.textInput.toUpperCase();
      let morseOutput = "";
      for (let i = 0; i < textInput.length; i++) {
        if (this.textToMorseAlphabet[textInput[i]]) {
          morseOutput += this.textToMorseAlphabet[textInput[i]];
        }
        if (i < textInput.length - 1 && textInput[i] !== " ") {
          morseOutput += " ";
        }
      }
      this.morseInput = morseOutput;
    }
  },
  computed: {
    textToMorseAlphabet() {
      // Создаем обратный словарь для перевода текста в азбуку Морзе
      const textToMorse = {};
      for (const key in this.morseAlphabet) {
textToMorse[this.morseAlphabet[key]] = key;
}
return textToMorse;
}
}
};
</script>

<style scoped>
  .morse-converter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .converter-title {
    margin-top: 20px;
  }

  .input-container {
    margin: 10px;
    flex: 1;
    width: 300px;
    height: 300px;
    background-color: #ebebeb60;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    overflow-y: hidden;
  }

  .input-container textarea {
    width: 90%;
    height: 90%;
    font-size: 1.2rem;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    outline: none;
    resize: none;
    text-align: left;
    overflow-y: hidden;
  }
</style>

//       ".-": "а",
//       "-...": "Б",
//       ".--": "В",
//       "--.": "Г",
//       "-..": "Д",
//       ".": "Е",
//       "...-": "Ж",
//       "--..": "З",
//       "..": "И",
//       ".---": "Й",
//       "-.-": "К",
//       ".-..": "Л",
//       "--": "М",
//       "-.": "Н",
//       "---": "О",
//       ".--.": "П",
//       ".-.": "Р",
//       "...": "С",
//       "-": "Т",
//       "..-": "У",
//       "..-.": "Ф",
//       "....": "Х",
//       "-.-.": "Ц",
//       "---.": "Ч",
//       "----": "Ш",
//       "--.-": "Щ",
//       "--.--": "Ъ",
//       "-.--": "Ы",
//       "-..-": "Ь",
//       "..-..": "Э",
//       "..--": "Ю",
//       ".-.-": "Я",
//       "-----": "0",
//       ".----": "1",
//       "..---": "2",
//       "...--": "3",
//       "....-": "4",
//       ".....": "5",
//       "-....": "6",
//       "--...": "7",
//       "---.." :"8",
//       "----." :"9",
//       ".-.-.-" :".",
//       "--..--" :",",	
//       "..--.." :"?",
//       ".----." :"'",
//       "-.-.--" :"!",
//       "-..-." :"/",
//       "-.--." :"(",
//       "-.--.-" :")",
//       ".-..." :"&",
//       "---..." :":",
//       "-.-.-." :";",
//       "-...-" :"=",
//       ".-.-." :"+",
//       "-....-" :"-",
//       "..--.-" :"_",
//       ".-..-." :"\"",
//       "...-..-" :"$",
//       ".--.-." :"@",


//     "А": ".-",
//     "Б": "-...",
//     "В": ".--",
//     "Г": "--.",
//     "Д": "-..",
//     "Е": ".",
//     "Ж": "...-",
//     "З": "--..",
// 		"И": "..",
//     "Й": ".---",
//     "К": "-.-",
//     "Л": ".-..",
//     "М": "--",
//     "Н": "-.",
//     "О": "---",
//     "П": ".--.",
//     "Р": ".-.",
//     "С": "...",
//     "Т": "-",
//     "У": "..-",
//     "Ф": "..-.",
//     "Х": "....",
//     "Ц": "-.-.",
//     "Ч": "---.",
//     "Ш": "----",
//     "Щ": "--.-",
//     "Ъ": "--.--",
//     "Ы": "-.--",
//     "Ь": "-..-",
//     "Э": "..-..",
//     "Ю": "..--",
//     "Я": ".-.-",
//     "0": "-----",
//     "1": ".----",
//     "2": "..---",
//     "3": "...--",	
//     "4": "....-",
//     "5": ".....",
//     "6": "-....",
//     "7": "--...",
//     "8": "---..",
//     "9": "----.",
//     ".": ".-.-.-",
//     ",": "--..--",	
//     "?": "..--..",
//     "'": ".----.",
//     "!": "-.-.--",
//     "/": "-..-.",
//     "(": "-.--.",
//     ")": "-.--.-",
//     "&": ".-...",
//     ":": "---...",
//     ";": "-.-.-.",
//     "=": "-...-",
//     "+": ".-.-.",
//     "-": "-....-",
//     "_": "..--.-",
//     "\"": ".-..-.",
//     "$": "...-..-",
//     "@": ".--.-.",

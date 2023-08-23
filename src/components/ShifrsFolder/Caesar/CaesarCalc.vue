<template>
    <div class="container">
        <div class="section">
        <label class="label">Шифротекст:</label>
        <input class="input" v-model="encryptedText" id="encryptedText" type="text" placeholder="Введите текст" />
        </div>
        <div class="section">
        <label class="label">Сдвиг:</label>
        <input class="input" v-model.number="shift" id="shift" type="number" />
        </div>
        
      <button @click="decrypt" class="button">Обработать</button>
      <div class="output">
        <p>Вывод:</p>
        <p>{{ decryptedText }}</p>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      encryptedText: "",
      shift: 0,
      decryptedText: ""
    };
  },
  methods: {
    caesarDecrypt(ciphertext, shift) {
      let plaintext = '';

      for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        let baseCharCode, alphabetSize;

        if (char.match(/[a-z]/i)) {
          baseCharCode = char.toUpperCase() === char ? 65 : 97; // ASCII code for 'A' or 'a'
          alphabetSize = 26;
        } else if (char.match(/[а-я]/i)) {
          baseCharCode = char.toUpperCase() === char ? 1040 : 1072; // ASCII code for 'А' or 'а'
          alphabetSize = 32;
        } else {
          plaintext += char;
          continue;
        }

        const decryptedCharCode = (char.charCodeAt(0) - baseCharCode - shift + alphabetSize) % alphabetSize + baseCharCode;
        const decryptedChar = String.fromCharCode(decryptedCharCode);

        plaintext += char.toUpperCase() === char ? decryptedChar.toUpperCase() : decryptedChar;
      }

      return plaintext;
    },
    decrypt() {
      this.decryptedText = this.caesarDecrypt(this.encryptedText, this.shift);
    }
  }
};
</script>
  
  <style scoped>
  .container {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.section {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
  
  .button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #0056b3;
  }

  </style>
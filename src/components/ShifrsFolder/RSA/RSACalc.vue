<template>
    <div class="container">
      <div class="section">
        <label class="label">Модуль (p*q)</label>
        <input class="input" type="number" v-model="modulus" />
      </div>
      <div class="section">
        <label class="label">Открытый ключ (e)</label>
        <input class="input" type="number" v-model="Key" />
      </div>
    <div class="section">
        <label class="label">Шифротекст</label>
        <input class="input" type="number" v-model="cipherCount" @input="updateCiphers" />
      </div>
      <div class="fields-container">
        <div v-for="(cipher, index) in ciphertext" :key="index" class="field">
          <input class="input" type="number" v-model="cipher.value" />
        </div>
      </div>
      <button @click="apply" class="button">Обработать</button>
      <div class="output">
        <p>Вывод:</p>
        <p>{{ result }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cipherCount: 5,
        ciphertext: Array.from({ length: 5 }, () => ({ value: 0 })),
        Key: 0,
        result:'',
        modulus: 0,
        d: 0,
        DecryptedAr:[],
      };
    },
    methods: { 
    apply(){
        this.decrypt();
        this.result = this.DecryptedAr.join(' ') + " или " + this.IntToLetter(this.DecryptedAr);
        },
        updateCiphers() {
            this.ciphertext = Array.from({ length: this.cipherCount }, () => ({ value: 0 }));
        },
    decrypt() {
        this.d = this.modInverse(this.Key, this.eulerPhi(this.modulus));
        for (let i = 0; i < this.ciphertext.length; i++) {
          this.DecryptedAr[i] = this.powerMod(this.ciphertext[i].value, this.d , this.modulus);
        }
        

    },
    eulerPhi(n) {
        let result = n; // Изначально считаем, что все числа взаимно простые с n
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) {
                // i является простым делителем n
                while (n % i === 0) {
                    n /= i; // Убираем все множители i из n
                }
                result -= result / i; // Уменьшаем результат на результат деления на i
            }
        }
        
        if (n > 1) {
            result -= result / n; // Учет последнего простого делителя n
        }
        
        return result;
    },
    powerMod(base, exponent, modulus) {
        let result = 1;
        let baseValue = base % modulus;
        
        let exp = exponent;
        while (exp > 0) {
            if (exp % 2 === 1) {
                result = (result * baseValue) % modulus;
            }
            baseValue = (baseValue * baseValue) % modulus;
            exp = Math.floor(exp / 2);
        }
        
        return result;
    },
    modInverse(a, m) {
        for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
        }
        return 1;
    },
    IntToLetter(intArray) {
        let word = ''
    for(let n = 0; n < intArray.length; n ++){
        if (intArray[n] === 0) {
        word += '_';
        } else {
        word += String.fromCharCode(96 + intArray[n]); 
        }
    }
    return word
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
  
    .fields-container {
    display: flex;
    flex-wrap: wrap;
    }
  
    .field {
    margin-right: 10px;
    margin-bottom: 10px;
    }
  
    .input {
    width: 40px;
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
  
    .show-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    }
  
    .show-button:hover {
    background-color: #2980b9;
    }
  
  </style>
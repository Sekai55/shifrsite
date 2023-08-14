<template>
  <div class="container">
    <div class="section">
      <label class="label">шифротекст</label>
      <input class="input" type="number" v-model="cipherCount" @input="updateCiphers" />
    </div>
    <div class="fields-container">
      <div v-for="(cipher, index) in ciphertext" :key="index" class="field">
        <input class="input" type="number" v-model="cipher.value" />
      </div>
    </div>
    <div class="section">
      <label class="label">рюкзачный набор</label>
      <input class="input" type="number" v-model="setCount" @input="updateSets" />
    </div>
    <div class="fields-container">
      <div v-for="(set, index) in publicKey" :key="index" class="field">
        <input class="input" type="number" v-model="set.value" />
      </div>
    </div>
    <div class="section">
      <label class="label">модуль</label>
      <input class="input" type="number" v-model="q" />
    </div>
    <div class="section">
      <label class="label">ключ шифрования</label>
      <input class="input" type="number" v-model="keyValue" />
    </div>
  </div>
    <button @click="apply" class="button">Обработать</button>
    <div class="output">
      <p>Вывод:</p>
      <div class="matrix-container">
        <div class="matrix" v-if="matrixVisible">
          <div v-for="(row, rowIndex) in resultMatrix" :key="rowIndex" class="matrix-row">
            {{ row.join(' ') }}<br>
          </div>
          <div>
            <label for="groupSize">Выберите кол-во бит на букву :</label>
            <input type="number" id="groupSize" v-model="selectedGroupSize" @input="updateGroups" />

            <div class="group">
              <h2>Текст:</h2>
              <p>{{ groupedBits }}</p>
              <p>{{ groupedBitsENG }}</p>
            </div>
          </div>
        </div>
      </div>
      <p>{{ result }}</p>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        cipherCount: 5,
        ciphertext: Array.from({ length: 5 }, () => ({ value: 0 })),
        setCount: 3,
        publicKey: Array.from({ length: 3 }, () => ({ value: 0 })),
        q: 0,
        r: 0,
        keyValue: 0,
        bitLength: 8,
        privateKey: [],
        resultMatrix: [],
        matrixVisible: false,
        result:'',
        selectedNumber: 2,
        groups: [],
        groupsENG: []
      };
    },
    computed: {
      groupedBits() {
        console.log(this.groups)
        return this.groups.join('');
      },
      groupedBitsENG() {
        console.log(this.groups)
        return this.groupsENG.join('');
      }
    },
    methods: { 
        apply(){
          this.r = this.findModularInverse(this.keyValue, this.q);
          this.findPrivateKey(this.publicKey,this.r,this.q)
          const decryptedMessage = this.decrypt(this.ciphertext, this.privateKey, this.q, this.r);
          this.resultMatrix = decryptedMessage
          this.showMatrix();
          console.log('Расшифрованный текст:', decryptedMessage);
        },
        updateCiphers() {
          this.ciphertext = Array.from({ length: this.cipherCount }, () => ({ value: 0 }));
        },
        updateSets() {
          this.publicKey = Array.from({ length: this.setCount }, () => ({ value: 0 }));
        },
        showMatrix() {
          this.matrixVisible = true; // При нажатии кнопки показать матрицу
        },
          // Генерация ключей   
        generateKeys(bitLength) {
        this.privateKey = [];
        this.publicKey = [];
        let sum = 0;

        // Генерация секретного ключа
        for (let i = 0; i < bitLength; i++) {
            const randomValue = Math.floor(Math.random() * (2 ** i));
            this.privateKey.push(randomValue);
            sum += randomValue;
        }

        // Генерация открытого ключа
        this.q = sum + 1 + Math.floor(Math.random() * sum); // q > sum
        this.r = this.findModularInverse(sum, this.q);

        for (let i = 0; i < bitLength; i++) {
            this.publicKey.push((this.privateKey[i] * this.r) % this.q);
        }
        },

        // Нахождение обратного элемента в модульном поле
        findModularInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
            return x;
            }
        }
        return -1; // Обратный элемент не найден
        },

        // Шифрование
        encrypt(message, publicKey) {
        return message.map((bit, i) => bit * publicKey[i])
                        .reduce((acc, val) => acc + val, 0);
        },
        binaryToLetter(binaryArray) {
        const binaryString = binaryArray.join('');
        const decimalValue = parseInt(binaryString, 2);

        if (decimalValue === 0) {
          return '_';
        } else {
          if (decimalValue >= 1 && decimalValue <= 32) {
            return String.fromCharCode(1071 + decimalValue);
          } else if (decimalValue === 33) {
            return 'ё';
          } else {
            return ''; // Обработка других значений русского алфавита
          }
        }
        },
        binaryToLetterENG(binaryArray) {
        const binaryString = binaryArray.join('');
        const decimalValue = parseInt(binaryString, 2);
        if (decimalValue === 0) {
          return '_';
        } else {
          return String.fromCharCode(96 + decimalValue);
        }
        },
        findPrivateKey(publicKey,r,q){
        this.privateKey = [];
        for(let n=0;n<publicKey.length;n++){
          let s = (publicKey[n].value * r) % q;
          if(s>0){
          this.privateKey.push(s);}
          else{
          s += q;
          this.privateKey.push(s);
          }
          
          console.log(this.privateKey);
        }
        },
        // Дешифрование
        decrypt(ciphertext, privateKey, q, r) {
        const decryptedMassive = [[]];
        for(let n=0; n < ciphertext.length;n++){
          const s = (ciphertext[n].value * r) % q;
          const decryptedBits = [];
          let remainder = s;

          for (let i = privateKey.length - 1; i >= 0; i--) {
            console.log(remainder);
            console.log(privateKey[i]);
              if (remainder >= privateKey[i]) {
              decryptedBits.unshift(1);
              remainder -= privateKey[i];
              } else {
              decryptedBits.unshift(0);
              }
          }
          console.log(decryptedBits)
          decryptedMassive[n] = decryptedBits;
        }
        return decryptedMassive;
        },
        updateGroups() {
          this.groups = []
          this.groupsENG = [];

          let group2 = [];
          let m = 0;
          for (let n = 0; n < this.resultMatrix.length; n ++) {
            let group1 = [];
            let x = 1
            for (let i = 0; i < this.resultMatrix[n].length; i++) {
              group1.push(this.resultMatrix[n][i]);
              if(i == (this.selectedGroupSize * x) - 1){
                x++;
                group2.push(group1);
                group1 = [];
              }
              m = i;
            }
            if(m != (this.selectedGroupSize * --x) - 1){
            console.log(m);
            console.log((this.selectedGroupSize * x) - 1);
            console.log("112312314");
            group2.push(group1);}
          }
          for(let n = 0; n < group2.length; n++){
            this.groups[n] = this.binaryToLetter(group2[n]);
            this.groupsENG[n] = this.binaryToLetterENG(group2[n]);
          }
        },
      },
      watch: {
        selectedGroupSize: "updateGroups",
      },     
      }
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
  
  .matrix-container {
  text-align: center;
  margin-top: 20px;
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

.matrix {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  padding: 15px;
  display: inline-block;
  text-align: left;
  margin-top: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.matrix-row {
  margin-bottom: 5px;
  font-size: 16px;
}
.group {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
  </style>
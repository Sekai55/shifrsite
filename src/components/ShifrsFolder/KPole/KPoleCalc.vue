<template>
    <div class="container">
        <div class="section">
        <label class="label">шифротекст</label>
        <input class="input" v-model="ciphertextInput" @input="handleInput" placeholder="Введите бинарную последовательность" />
        </div>
        <div class="section">
        <label class="label">многочлен</label>
        <input class="input" v-model="divisorInput" @input="secondHandleInput" placeholder="Введите многочлен" />
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
        ciphertextInput: '',
        divisorInput:'',
        ciphertext:[],
        divisor: [],
        n:0,
        remainder:[],
        normalTable:[],
        reversTable:[],
        result:'',
        isValid: false
      };
    },
    methods: {
    apply(){
    this.validateInput()
    if (this.divisorInput === '') {
      alert('Введите символы');
    } else if (this.isValid) {
      const DimArray = this.createDimArray(this.n)
      console.log(DimArray)
      for(let i=0;i < DimArray.length;i++){
          this.normalTable[i] = this.binaryRemainder(DimArray[i],this.divisor);
      }
      for(let i=0;i < this.normalTable.length;i++){
          this.reversTable[i] = this.normalTable[this.normalTable.length-i-1];
      }
      console.log(this.normalTable)
      console.log(this.reversTable)
      console.log(this.ciphertext)
      console.log(this.divisor)
      const matches = this.findMatches(this.ciphertext, this.normalTable, this.n);
      console.log(matches);
      this.result = this.reversAndTranslate(matches);
    } else {
      alert('Пожалуйста, исправьте введенные данные \n Пример: x^4+x+1')
    }
    },
    validateInput() {
      const regex = /^[xX]\^\d+(\+[xX](\^\d+)?)*(\+\d+)?$/; // Регулярное выражение для проверки
      this.isValid = regex.test(this.divisorInput);

      if (this.isValid) {
        const numbers = this.divisorInput.match(/\d+/g);
        if (numbers) {
          for (const number of numbers) {
            if (parseInt(number) > 7) {
              this.isValid = false;
              this.errorMessage = "Числа в степенях не должны превышать 7";
              break;
            }
          }
        }
      }
    },
    handleInput() {
      // Очищаем массив от неправильных символов и преобразуем строку в массив бинарных значений
      this.ciphertext = this.ciphertextInput
        .split('')
        .filter(char => char === '0' || char === '1')
        .map(Number);
    },
    secondHandleInput() {
    this.divisor = []
    const terms = this.divisorInput.split('+').map(term => term.trim());

    for (let i = 0; i < terms.length; i++) {
    if (terms[i] === 'x') {
        this.divisor[1] = 1;
    } else if (terms[i] === '1') {
        this.divisor[0] = 1;
    } else {
        const match = terms[i].match(/x\^(\d+)/);
        if (match) {
        const exponent = parseInt(match[1]);
        this.divisor[exponent] = 1;
        }
    }
    }

    // Заполняем пропущенные места нулями
    const maxDegree = Math.max(...this.divisor.keys());
    const reverseArr  = Array.from({ length: maxDegree + 1 }, (value, index) => this.divisor[index] || 0)
    this.divisor = reverseArr.slice().reverse();
    this.n = this.divisor.length - 1
    },
    binaryRemainder(dividend, divisor) {
    const divisorStr = divisor.join('');

    if (divisorStr === '0') {
        throw new Error("Division by zero is not allowed.");
    }

    let quotient = [];
    let remainder = Array.from(dividend);

    // Perform binary division
    while (remainder.length >= divisor.length) {
        if (remainder[0] === 1) {
            quotient.push(1);
            for (let i = 0; i < divisor.length; i++) {
                remainder[i] = remainder[i] ^ divisor[i];
            }
        } else {
            quotient.push(0);
        }
        remainder.shift();
    }

    return remainder;
    },
    createDimArray(n) {
    const array = [];

    for (let i = 0; i < n; i++) {
        const subArray = new Array(n).fill(0);
        subArray[n-i-1] = 1;
        array.push(subArray);
    }

    for (let i = n; i <= Math.pow(2,n)-1; i++) {
        const subArray = new Array(i + 1).fill(0);
        subArray[0] = 1;
        array.push(subArray);
    }

    return array;
    },
    findMatches(mainArray, subArrays, n) {
    const resultArray = [];

    for (let i = 0; i < mainArray.length - n + 1;) {
        const subStr = mainArray.slice(i, i + n);
        
        for (let j = 0; j < subArrays.length; j++) {
            const subArray = subArrays[j];
            let isMatch = true;
            
            for (let k = 0; k < n; k++) {
                if (subStr[k] !== subArray[k]) {
                    isMatch = false;
                    break;
                }
            }
            
            if (isMatch) {
                resultArray.push(j);
                break;
            }
        }
    i+=n
    }

    return resultArray;
    },
    reversAndTranslate(ArrayIndexes){
    let intArray = [];
    for(let i = 0; i < ArrayIndexes.length;i++){
      intArray[i] = this.reversTable[ArrayIndexes[i]]
    }
    let word = ''
    console.log(intArray)
    for(let n = 0; n < intArray.length; n++){
    const binaryString = intArray[n].join('');
        const decimalValue = parseInt(binaryString, 2);
        if (decimalValue === 0) {
          word += '_';
        } else {
          word += String.fromCharCode(96 + decimalValue);
        }
    }
    console.log(word);
    return word
    }
    },
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
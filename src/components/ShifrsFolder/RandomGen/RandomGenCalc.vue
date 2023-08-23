<template>
    <div class="container">
        <div class="section">
        <label class="label">Многочлен</label>
        <input class="input" v-model="divisorInput" @input="secondHandleInput" placeholder="Введите многочлен" />
        </div>    
      <button @click="apply" class="button">Обработать</button>
      <div class="output">
        <p>Последовательность:</p>
        <p>{{ result }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        divisorInput:'',
        divisor: [],
        divForFunc:[],
        bits:[],
        NumSequence:[],
        n:0,
        result:'',
        isValid: false
      };
    },
    methods: {
    apply(){
    this.validateInput()
    console.log(this.divisorInput)
    if (this.divisorInput === '') {
      alert('Введите символы');
    } else if (this.isValid) {
        this.constructor(this.n);
        console.log(this.divisor)
        console.log(this.bits)
        console.log(this.divForFunc)
        for(let i = 0;i<Math.pow(2,this.n);i++){
          this.inputBit()
        }
        console.log(this.NumSequence)
        this.result = this.NumSequence.join('');
    } else {
      alert('Пожалуйста, исправьте введенные данные \n Пример: x^4+x+1')
    }
    },
    validateInput() {
      const regex = /^[xX]\^\d+(\+[xX](\^\d+)?)*(\+\d+)?$/; // Регулярное выражение для проверки
      this.isValid = regex.test(this.divisorInput);
      console.log(regex.test(this.divisorInput))
      if (this.isValid) {
        const numbers = this.divisorInput.match(/\d+/g);
        if (numbers) {
          for (const number of numbers) {
            if (parseInt(number) > 7) {
              this.isValid = false;
              break;
            }
          }
        }
      }
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
    this.n = this.divisor.length - 1;
    reverseArr.pop()
    this.divForFunc = reverseArr;
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
    constructor(size) {
    this.size = size;
    this.bits = new Array(size).fill(0); // Инициализируем все биты значением 0
    this.bits[0] = 1; // Изменяем первый бит на 1
    },

    inputBit() {
    let xorResult = 0;
    for (let i = 0; i < this.divForFunc.length; i++) {
      if(this.divForFunc[i] == 1)
      xorResult ^= this.bits[i];
    }
    console.log(this.bits)
    this.NumSequence.push(this.bits.shift()); // Удаляем самый старый бит справа
    this.bits.push(xorResult); // Добавляем бит в начало массива
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
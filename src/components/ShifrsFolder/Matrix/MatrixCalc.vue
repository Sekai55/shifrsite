<template>
    <div class="container">
        <div class="section">
        <label class="label">ключ 8 на 8</label>
        <input class="input" v-model="key" placeholder="Введите ключ" />
        </div>
        <div class="section">
        <label class="label">шифротекст 8 на 8</label>
        <input class="input" v-model="ciphertext" placeholder="Введите шифротекст" />
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
        key: "",
        ciphertext: "",
        result: ""
      };
    },
    methods: {
    mod2AddSub(a, b) {
    return (a + b) % 2;
    },
    // Функция для обратного хода метода Гаусса
    gaussBackward(matrix, identity) {
    const n = matrix.length;

    for (let i = n - 1; i > 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (matrix[j][i] === 1) {
                for (let k = 0; k < n; k++) {
                    matrix[j][k] = this.mod2AddSub(matrix[j][k], matrix[i][k]);
                    identity[j][k] = this.mod2AddSub(identity[j][k], identity[i][k]);
                }
            }
        }
    }
    },

    // Функция для нахождения обратной матрицы методом Гаусса
    findInverseMatrix(matrix) {
    const n = matrix.length;
    const identity = [];

    // Создание единичной матрицы для преобразований
    for (let i = 0; i < n; i++) {
        identity.push(new Array(n).fill(0));
        identity[i][i] = 1;
    }

    // Прямой ход метода Гаусса
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (matrix[j][i] === 1) {
                for (let k = 0; k < n; k++) {
                    matrix[j][k] = this.mod2AddSub(matrix[j][k], matrix[i][k]);
                    identity[j][k] = this.mod2AddSub(identity[j][k], identity[i][k]);
                }
            }
        }
    }

        // Обратный ход метода Гаусса
        this.gaussBackward(matrix, identity);

        return identity;
    },
    matrixMultiplication(matrix1, matrix2) {
        const cols1 = matrix1[0].length;
        const rows2 = matrix2.length;
        const cols2 = matrix2[0].length;

        // Проверяем, возможно ли умножение матриц
        if (cols1 !== rows2) {
            console.log("Умножение невозможно: число столбцов первой матрицы должно быть равно числу строк второй матрицы.");
            return;
        }

        const result = [];

        for (let col = 0; col < cols2; col++) {
            const columnVector = [];
            for (let row = 0; row < rows2; row++) {
                let sum = 0;
                for (let i = 0; i < cols1; i++) {
                    sum += matrix1[row][i] * matrix2[i][col];
                }
                columnVector.push(sum % 2);
            }
            result.push(columnVector);
        }

        return result;
    },
    matrixTransposition(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        let result = '';

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                result += matrix[row][col] + '';
            }
        }

        return result.trim();
    },
    convertToLetters(input) {
        let output = '';
        for (let i = 0; i < input.length; i += 5) {
            const chunk = input.substr(i, 5);
            if (chunk === '00000') {
                output += '_';
            } else {
                const num = parseInt(chunk, 2);
                output += String.fromCharCode(num + 64); // Преобразование в букву с ASCII-кодом
            }
        }
        return output;
    },
    isBinaryString(str) {
        return /^[01]+$/.test(str);
    },
    binaryStringTo2DArray(str) {
        const result = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
            const index = i * 8 + j;
            row.push(parseInt(str[index], 2));
            }
            result.push(row);
        }

        return result;
        },
      apply() {
        if (!this.isBinaryString(this.key) || this.key.length !== 64 || !this.isBinaryString(this.ciphertext) || this.ciphertext.length !== 64 ) {
            alert("Invalid input. The string must be 64 characters long and contain only binary digits (0s and 1s).");
            return 0
        }
        console.log(this.binaryStringTo2DArray(this.key))
        const invKey = this.findInverseMatrix(this.binaryStringTo2DArray(this.key));
        console.log(invKey)
        console.log(this.binaryStringTo2DArray(this.ciphertext))
        const MultMatx = this.matrixMultiplication(invKey, this.binaryStringTo2DArray(this.ciphertext))
        console.log(MultMatx)
        const transMatrix = this.matrixTransposition(MultMatx)
        console.log(transMatrix)
        this.result = transMatrix + " или " + this.convertToLetters(transMatrix)
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
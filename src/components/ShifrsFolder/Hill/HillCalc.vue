<template>
  <div class="container">
    <div class="form-group">
      <label for="alphabet" class="label">Алфавит:</label>
      <input v-model="alphabet" type="text" id="alphabet" class="input" autocomplete="off">
    </div>
    <div class="form-group">
      <label for="word" class="label">Слово:</label>
      <input v-model="word" type="text" id="word" class="input" autocomplete="off">
    </div>
    <div class="form-group">
      <label for="key" class="label">Ключ:</label>
      <input v-model="key" type="text" id="key" class="input" autocomplete="off">
    </div>
    <div class="form-group">
      <label for="encrypt" class="label">Зашифровать:</label>
      <input v-model="encrypt" type="checkbox" id="encrypt" class="input-checkbox">
    </div>
    <button @click="apply" class="button">Обработать</button>
    <div class="output">
      <p>Вывод:</p>
      <p>{{ result }}</p>
    </div>
    <div class = "text" v-show="isBlockVisible">
          <h1>Пояснения</h1>
          <h2>1-й Этап</h2>
          <p>
           Сначала мы составим матрицу из нашего ключа 
          </p>
          <p>
           Начиная с а=0 присвоим всем буквам свой номер
          </p>
          <span class="label">M=</span>
          <div v-for="(binary, index) in keyMatrix" :key="binary" class="matrix-container">
            {{ keyMatrix[index].join(' | ') }}
          </div>

          <p>
           Теперь найдем определитель этой матрицы по заданному модулю (длине алфавита)
          </p>
          <span class="label">|M|= {{ det }} (mod {{ alphabet.length }})</span>
          <p>
           Найдем значение X (обратный элемент в кольце по модулю)<br> для которого справедливо уравнение 
           <span class="label">{{ det }}*X = 1 (mod {{ alphabet.length }})</span><br>
           <span class="label">X = {{ x }}</span>
          </p>
          <p>
           Далее надо найти союзную матрицу т.е. матрицу, составленную из алгебраических дополнений для соответствующих элементов транспонированной матрицы
          </p>
          <span class="label">матрица из алгебраических дополнений</span>
          <div v-for="(binary, index) in dopMtx" :key="binary" class="matrix-container">
            {{ dopMtx[index].join(' | ') }}
          </div>
          <p>
          //Транспонируем//  
          </p>
          <span class="label">Союзная матрица</span>
          <div v-for="(binary, index) in adjMtx" :key="binary" class="matrix-container">
            {{ adjMtx[index].join(' | ') }}
          </div>
          <p>
          Теперь каждый элемент умножаем на наш X и все это по модулю
          </p>
          <span class="label">Получившаяся обратная матрица</span>
          <div v-for="(binary, index) in dirMtx" :key="binary" class="matrix-container">
            {{ dirMtx[index].join(' | ') }}
          </div>
          <p>
           Далее берем первые три символа шифра, даём им номера и как бы делаем из них матрицу 3 на 1, и перемножаем эту матрицу на обратную. 
          </p>
          <div class="matrix-container">
            {{ StrNum[0] }} | {{ StrNum[1] }} | {{ StrNum[2] }}
          </div>
          <span class="label">X</span>
          <div v-for="(binary, index) in dirMtx" :key="binary" class="matrix-container">
            {{ dirMtx[index].join(' | ') }}
          </div>
          <p>
           Получается 
          </p>
          <div class="matrix-container">
            {{ multiMtx[0] }} | {{ multiMtx[1] }} | {{ multiMtx[2] }}
          </div>
          <p>
           После этого следующие 3 символа, и так до конца 
          </p>
        </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      alphabet: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя., ?',
      word: '',
      key: '',
      keyMatrix: [],
      det:0,
      dopMtx:[[]],
      adjMtx:[[]],
      dirMtx:[[]],
      StrNum:[],
      multiMtx:[],
      x:0,
      encrypt: false,
      result: '',
      isBlockVisible: false
    };
  },
  methods: { 
    apply() {     
        this.word = this.word.toLowerCase();
        this.key = this.key.toLowerCase();
        if(this.key == '' || this.word == '' || this.alphabet == '')
        alert("Проверьте введённые данные")
        else{
        if(this.CheckAlphabetChar(this.word, this.alphabet) || this.CheckAlphabetChar(this.key, this.alphabet))
        alert("Символы в введенных данных не содержатся в алфавите")
        else{
        if( (Math.sqrt(this.key.length) % 1) !== 0)
        alert("Неверный ключ. Длина ключа должна быть квадратом целого числа")
        else{
        if( this.encrypt == false){
        this.result = this.hillDecrypt(this.word, this.key)//расшифровка
        this.isBlockVisible = true;
        }
        else{
        this.result = this.hillIncrypt(this.word, this.key)//шифровка
        }}}}
    },
    hillDecrypt(text, key) {
        this.keyMatrix =  [];
        this.det = 0;
        this.dopMtx = [[]];
        this.adjMtx = [[]];
        this.dirMtx = [[]];
        this.StrNum = [];
        this.multiMtx = [];
        this.x = 0;
        const matrixSize = Math.sqrt(key.length);

        // Создаю матрицу из ключа
        for (let i = 0; i < matrixSize; i++) {
            const row = [];
            for (let j = 0; j < matrixSize; j++) {
            const index = i * matrixSize + j;
            row.push(this.alphabet.indexOf(key[index]));
            }
            this.keyMatrix.push(row);
            
        }
        //вывод в консоль информации о этапах вычисления
        console.log("матрица-ключ: ");
        console.log(this.keyMatrix);
        console.log("алфавит/модуль: " + this.alphabet.length);
        this.det = this.findModulus(this.determinant(this.keyMatrix),this.alphabet.length) ;
        console.log("Определитель: " + this.det);
        this.x = this.findX(this.findModulus(this.det,this.alphabet.length),this.alphabet.length);
        console.log("Обратный элемент в кольце: " + this.x);
        console.log("союзная матрица: ");
        this.adjMtx = this.adjointMatrix(this.keyMatrix);
        console.log(this.adjMtx);
        console.log("рабочаяя матрица: ");
        this.dirMtx = this.dirrectMatrix(this.adjMtx, this.x, this.alphabet.length);
        console.log(this.dirMtx);
        console.log("Индексированное слово:");
        this.StrNum = this.string2Array(this.word)
        console.log(this.string2Array(this.word));
        this.multiMtx = this.multiplyMatrix(this.dirMtx, this.StrNum);
        console.log("Расшифрованное слово: ");
        console.log(this.multiMtx);
        const withoutNaN = this.multiMtx.filter((value) => !isNaN(value));
        console.log("Расшифрованное слово без мусорных значений: ");
        console.log(withoutNaN);
        console.log("Конечное расшифрованное слово: ");
        console.log(this.convertToAlphabet(withoutNaN));
        return this.convertToAlphabet(withoutNaN);
        //

    },
    hillIncrypt(text, key) {
      const matrixSize = Math.sqrt(key.length);
      const keyMatrix = [];

        // Создаю матрицу из ключа
        for (let i = 0; i < matrixSize; i++) {
            const row = [];
            for (let j = 0; j < matrixSize; j++) {
            const index = i * matrixSize + j;
            row.push(this.alphabet.indexOf(key[index]));
            }
            keyMatrix.push(row);
            
        }
      console.log("матрица-ключ: ");
      console.log(keyMatrix);
      const multiMtx = this.multiplyMatrix(keyMatrix, this.string2Array(this.word));
      console.log("Индексированное слово:");
      console.log(this.string2Array(this.word));
      console.log("Зашифрованное слово: ");
      console.log(multiMtx);
      const withoutNaN = multiMtx.filter((value) => !isNaN(value));
      console.log("Расшифрованное слово без мусорных значений: ");
      console.log(withoutNaN);
      console.log("Конечное расшифрованное слово: ");
      console.log(this.convertToAlphabet(withoutNaN));
      return this.convertToAlphabet(withoutNaN);
    },
  
    CheckAlphabetChar(str, allowedChars) {
      let regex = new RegExp("[^" + allowedChars + "]", "g");
      return regex.test(str);
    },
    convertToAlphabet(numbers) {
      let result = '';

      for (let i = 0; i < numbers.length; i++) {
        let index = numbers[i];
        let char = this.alphabet.charAt(index);
        result += char;
      }
      return result;
    },

    string2Array(arr) {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
            result.push(this.alphabet.indexOf(arr[i]));
      }
      return result;
    },

    multiplyMatrix(matrix, array) {
      const result = [];
      let arrayIndex = 0;

      for (let mtxindex = 0; mtxindex < matrix.length; mtxindex++) {
        let Sum = 0;
        let q = 0
        for (let j = 0; j < matrix[mtxindex].length; j++) {
          Sum += matrix[mtxindex][j] * array[arrayIndex + q];
          q++;
        }
        result.push(this.findModulus(Sum, this.alphabet.length));
        if (arrayIndex + 1 >= array.length) {
          break;
        }
        if (mtxindex + 1 == matrix.length) {
          mtxindex = -1;
          arrayIndex = arrayIndex + matrix.length;
        }
      }
      return result;
    },

    findModulus(num, mod) {
      // Находим остаток от деления num на mod
      const remainder = num % mod;
      // Если остаток положительный, то он уже является ответом
      if (remainder >= 0) {
        return remainder;
      }
      // Если остаток отрицательный, то добавляем модуль, чтобы получить положительный остаток
      return remainder + mod;
    },
    determinant(matrix) {//определитель нахождение
      // Проверяем, является ли матрица квадратной
      if (matrix.length !== matrix[0].length) {
        return NaN;
      }

      // Базовый случай для матрицы 2x2
      if (matrix.length == 2 && matrix[0].length == 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
      }

      let det = 0;

      // Итерируемся по первой строке матрицы
      for (let i = 0; i < matrix.length; i++) {
        // Вычисляем минор
        const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        // Рекурсивно вычисляем определитель минора
        const minorDet = this.determinant(minor);
        // Добавляем в сумму со знаком (-1)^i
        det += (-1) ** i * matrix[0][i] * minorDet;
      }

      return det;
    },
    
    modInverse(n, m) {
      // Используем расширенный алгоритм Евклида для нахождения НОД и коэффициентов Безу
      let a = n;
      let b = m;
      let a0 = 1;
      let a1 = 0;
      let b0 = 0;
      let b1 = 1;

      while (b !== 0) {
        const q = Math.floor(a / b);
        const r = a % b;
        const a2 = a0 - q * a1;
        const b2 = b0 - q * b1;

        a = b;
        b = r;
        a0 = a1;
        a1 = a2;
        b0 = b1;
        b1 = b2;
      }

      if (a !== 1) {
        // К сожалению, n не имеет обратного элемента по модулю m
        return NaN;
      }

      // Возвращаем обратный элемент по модулю m
      return this.findModulus(a0, m);
    },


    findX(n, m) {//нахождение коэффициента
      const inverse = this.modInverse(n, m);
      if (isNaN(inverse)) {
        // К сожалению, n не имеет обратного элемента по модулю m, поэтому x не может быть найден
        return NaN;
      }
      return inverse;
    },
    adjointMatrix(matrix) {//союзная матрица
      const size = matrix.length;
      const adjMatrix = new Array(size);
      if (matrix.length == 2 && matrix[0].length == 2) {
        adjMatrix[0] = new Array(size);
        adjMatrix[1] = new Array(size);
        adjMatrix[0][0] = matrix[1][1];
        adjMatrix[0][1] = -matrix[1][0];
        adjMatrix[1][0] = -matrix[0][1];
        adjMatrix[1][1] = matrix[0][0];
      }
      else{
        for (let i = 0; i < size; i++) {
          adjMatrix[i] = new Array(size);
          for (let j = 0; j < size; j++) {
            // Получаем минор для элемента [i][j]
            const minor = this.getMinor(matrix, i, j);
            // Вычисляем алгебраическое дополнение
            const sign = ((i + j) % 2 === 0) ? 1 : -1;
            adjMatrix[i][j] = sign * this.determinant(minor);
          }
        }
      }
      this.dopMtx = adjMatrix;
      return this.transpose(adjMatrix);
    },
    getMinor(matrix, row, col) {
      return matrix.filter((value, index) => index !== row)
                  .map((row) => row.filter((value, index) => index !== col));
    },
    
    transpose(matrix) {//транспонирование
      const size = matrix.length;
      const transposed = new Array(size);
      for (let i = 0; i < size; i++) {
        transposed[i] = new Array(size);
        for (let j = 0; j < size; j++) {
          transposed[i][j] = matrix[j][i];
        }
      }
      return transposed;
    },
    dirrectMatrix(matrix, coeff, mod) {//получение конечной матрицы 
    let result = [];
      for(let i = 0; i < matrix.length; i++) {
        result[i] = [];
        for(let j = 0; j < matrix[i].length; j++) {
          const value = this.findModulus((matrix[i][j] * coeff), mod);
          result[i][j] = value;
        }
      }
      return result;
    } 


    
}
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
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.form-group {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.label {
  display: inline-block;
  width: 150px;
  font-weight: bold;
}

.input {
  width: 350px;
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f4f4f4;
  font-family: inherit;
  font-size: 16px;
}

.input-checkbox {
  margin-left: 10px;
  align-self: center;
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

.text {
font-size: 18px;
line-height: 1.5;
text-align: center;
}
.output {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
}

.output p:first-of-type {
  font-weight: bold;
}
.matrix-container {
  display: flex; /* Или используйте grid, в зависимости от предпочтений */
  flex-direction: column; /* Для вывода строк вертикально */
  /* grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));  Использование grid */
}
</style>
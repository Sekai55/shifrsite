<template>
  <div class ="container">
      <h3>Матрица:</h3>
      <div class = "mtx">
        <div class = "table">
          <tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <input class = "inputmtx" type="number" v-model="matrix[rowIndex][cellIndex]" min="0" max="1">
            </td>
          </tr>
        </div>
      </div>
        <h3> Шифр:</h3>
        <div class = "str">
          <input class = "inputstr" type="number" v-model="string[0]" min="0" max="1">
          <input class = "inputstr" type="number" v-model="string[1]" min="0" max="1">
          <input class = "inputstr" type="number" v-model="string[2]" min="0" max="1">
          <input class = "inputstr" type="number" v-model="string[3]" min="0" max="1">
          <input class = "inputstr" type="number" v-model="string[4]" min="0" max="1">
          <input class = "inputstr" type="number" v-model="string[5]" min="0" max="1">
        </div>
    
        <button @click="buttonClick">Обработать</button>
    
        <div class = "output">
          <p>Вывод:</p>
          <p>{{ output }}</p>
        </div>

        <div class = "text" v-show="isBlockVisible">
          <h1>Пояснения</h1>
          <h2>1-й Этап</h2>
          <p>
           Сначала мы задаём кодирование для нашей матрицы 
          </p>

          <div v-for="(binary, index) in binaryStrings" :key="binary">
            {{ binary }} → {{ table[0][index] }}
          </div>

          <p>
           Как вы можете заметить для 100, 010, 001 заданы 1-я 2-я и 3-я строчки матрицы соответственно
           </p>
           <p>
           Для 110, 011, 101, 111 применяется сумма по модулю 2 соответствующих строк
          </p>
          <h2>2-й Этап</h2>
          <p>
           Составим таблицу декодирования
           </p>
          <div v-for="(binary, index) in table" :key="binary">
            {{ table[index].join(' | ') }}
          </div>
          <p>
            Первая строка - это строка кодовых слов из 1-го этапа. 
          </p>
          <p>
            А первый столбец это лидеры. Т.е слова содержащие минимальное количество единиц, но не повторяющиеся с предыдущими
          </p>
          <p>
            Генерация происходит так: В новой строке выбирается лидер и суммируется с кодовым словом в каждом столбце по модулю 2, ответы записываются в строку соответственно столбцам 
          </p>
          <h2>3-й Этап</h2>
          <p>
           Теперь необходимо найти в таблице слово-шифр.
          </p>
          <p>
           Оно находится по координатам: [{{ coord.i + 1 }},{{ coord.j + 1}}]
          </p>
          <p>
           Далее от нашего слова идём вверх и смотрим кодовое слово, это и будет ответ. {{ output }}
          </p>
        </div>
  </div>
</template>
  
<script>
export default {
    data() {
        return {
            matrix: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            ],
            string: [0, 0, 0, 0, 0, 0],
            output: '',
            table: new Array(8).fill().map(() => new Array(8).fill().map(() => new Array(6).fill(0))),
            binaryStrings: [
              "000", "001", "010", "011",
              "100", "101", "110", "111"
            ],
            coord:{},
            isBlockVisible: false
        };
        },
        methods: {
        addArraysMod2(arr1, arr2) {
        const result = [];
        for (let i = 0; i < arr1.length; i++) {
            result.push((arr1[i] + arr2[i]) % 2);
        }
        return result;
        },

        fillFirstColumn(arr) {
        const compareValues = [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0],
                      [0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1],
                      [0,0,0,0,1,1],[0,0,0,1,0,1],[0,0,1,0,0,1],
                      [0,1,0,0,0,1],[1,0,0,0,0,1],[0,0,0,1,1,0],
                      [0,0,1,0,1,0],[0,1,0,0,1,0],[1,0,0,0,1,0],
                      [0,0,1,1,0,0],[0,1,0,1,0,0],[1,0,0,1,0,0],
                      [0,1,1,0,0,0],[1,0,1,0,0,0],[1,1,0,0,0,0],
                      [0,0,0,1,1,1],[0,0,1,0,1,1],[0,1,0,0,1,1],
                      [1,0,0,0,1,1],[0,0,1,1,0,1],[0,1,0,1,0,1],
                      [1,0,0,1,0,1],[0,1,1,0,0,1],[1,1,0,0,0,1],
                      [0,0,1,1,1,0],[0,1,0,1,1,0],[1,0,0,1,1,0],
                      [0,1,1,0,1,0],[1,0,1,0,1,0],[1,1,0,0,1,0],
                      [0,1,1,1,0,0],[1,0,1,1,0,0],[1,1,0,1,0,0],
                      [1,1,1,0,0,0]];
         
        for (let n = 0; n < compareValues.length; n++) {
        let check = true;
        for (let i = 0; i < arr.length; i++) {
          if (!check) break;
          for (let j = 0; j < arr[i].length; j++) {
            if (this.compareArrays(compareValues[n], arr[i][j])) {
              check = false;
              break;
            }
          }
        }
        if (check) {
          return compareValues[n];
        }
        }
        },
        compareArrays(arr1, arr2) {
          if (arr1.length !== arr2.length) {
            return false;
          }
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
              return false;
            }
          }
          return true;
        },
        fillSumMod2(arr) {
          for (let i = 1; i < arr.length; i++) {
            for (let j = 1; j < arr[0].length; j++) {
              arr[i][j] = this.addArraysMod2(arr[i][0],arr[0][j]);
            }
          }
          return arr;
        },
        searchArray(arr, arr3D) {
          for (let i = 0; i < arr3D.length; i++) {
            for (let j = 0; j < arr3D[i].length; j++) {
              if (JSON.stringify(arr) === JSON.stringify(arr3D[i][j])) {
                this.coord = {i,j}
                return arr3D[0][j];
              }
            }
          }
          return null;
        },
        binaryToDecimal(binaryArray) {
          const binaryString = binaryArray.join('');
          const decimalNumber = parseInt(binaryString, 2);
          return decimalNumber;
        },
        packFunk(){
        this.table = new Array(8).fill().map(() => new Array(8).fill().map(() => new Array(6).fill(0)))
        this.table [0][0] = [0, 0, 0, 0, 0, 0]
        this.table [0][1] = this.matrix[2]
        this.table [0][2] = this.matrix[1]
        this.table [0][3] = this.addArraysMod2(this.matrix[2], this.matrix[1])
        this.table [0][4] = this.matrix[0]
        this.table [0][5] = this.addArraysMod2(this.matrix[0], this.matrix[2])
        this.table [0][6] = this.addArraysMod2(this.matrix[0], this.matrix[1])
        this.table [0][7] = this.addArraysMod2(this.addArraysMod2(this.matrix[0], this.matrix[1]), this.matrix[2])
        for(let i = 1; i < this.table.length; i++){
          this.table [i][0] = this.fillFirstColumn(this.table)
          this.fillSumMod2(this.table)
        }
        
        this.output = this.searchArray(this.string , this.table).join('') + " или " + this.binaryToDecimal(this.searchArray(this.string , this.table))
        console.log (this.table)
        },
        isValidMatrix(){ 
        for(let i=0;i<this.matrix.length;i++){
          for(let j=0;j<this.matrix[0].length;j++){
            if(this.matrix[i][j] != 0 && this.matrix[i][j] != 1)
            return 0;
          }
        }  
        return 1;
        },
        isValidString(){
          for(let i=0;i<this.string.length;i++){
            if(this.string[i] != 0 && this.string[i] != 1)
            return 0;
          }
        return 1;
        },
        isEmptyMatxAndStr(){
          let count = 0;
          for(let i=0;i<this.string.length;i++){
            if(this.string[i] == 0 )
            count += 1;
          }

          if(count == this.string.length)
          return 1;

          count = 0;
          for(let i=0;i<this.matrix.length;i++){
          count = 0;
          for(let j=0;j<this.matrix[0].length;j++){
            if(this.matrix[i][j] == 0)
            count += 1;
          }
          if(count == this.matrix[i].length)
          return 1;
          } 

          

        return 0;
        },
        
        buttonClick() {
        if (!this.isValidMatrix() && !this.isValidString()) {
        alert("Возможными числами в матрице и шифре могут быть только 0 или 1");
        } else {
        if(this.isEmptyMatxAndStr()){
        alert("Проверьте введенные данные");
        } else {
          this.packFunk();
          this.isBlockVisible = true;
        }}
        }
    },};
</script>
<style scoped>
.container{
  font-family: Arial, sans-serif;
  font-size: 16px;
}
.mtx {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.str{
  margin: 0 auto;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  margin: 0 auto;
}

td {
  padding: 5px;
  border: 1px solid #ccc;
}

.inputmtx[type="number"] {
  width: 100%;
  height: 100%;
  margin-right: 10px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}

.inputstr[type="number"] {
  text-align: center;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}

@media (max-width: 600px) {
  table {
    font-size: 12px;
  }
}

button {
  margin-top: 10px;
  margin-bottom: 10px;
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

button:hover {
  background-color: #0056b3;
}

p {
  margin-bottom: 10px;
}
.container {
margin-right: 20px;
margin-left: 20px;
overflow: auto;
max-width: 1000px;
margin: 0 auto;
padding: 20px;
}

.text {
font-size: 18px;
line-height: 1.5;
text-align: center;
}
.output{
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
}
</style>
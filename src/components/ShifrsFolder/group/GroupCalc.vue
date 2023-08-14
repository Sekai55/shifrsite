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
        let check = 1;
        const compareValues = [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0],
                      [0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1],
                      [0,0,0,0,1,1],[0,0,0,1,0,1],[0,0,1,0,0,1],
                      [0,1,0,0,0,1],[1,0,0,0,0,1],[0,0,0,1,1,0],
                      [0,0,1,0,1,0],[0,1,0,0,1,0],[1,0,0,0,1,0],
                      [0,0,1,1,0,0],[0,1,0,1,0,0],[1,0,0,1,0,0],
                      [0,1,1,0,0,0],[1,0,1,0,0,0],[1,1,0,0,0,0]];
         
        for (let i = 0; i < compareValues.length; i++) {
        check = 1
          for (let j = 0; j < arr.length; j++) {
            if (JSON.stringify(arr[j][0]) === JSON.stringify(compareValues[i])) {
                check = 0;
                break
            }
          }
          if(check == 1)
          for(let k = 0; k < arr[0].length; k++ ){
              if (JSON.stringify(arr[0][k]) === JSON.stringify(compareValues[i])) {
                check = 0;
              }
          }
          
        if(check == 1){
          return compareValues[i];
        }
        }

        
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
        }
        this.fillSumMod2(this.table)
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
  margin: 0;
}

</style>
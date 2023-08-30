<template>
    <div class="container">
        <div class="section">
        <label class="label">Шифротекст</label>
        <input class="input" v-model="ciphertext" placeholder="Введите бинарную последовательность" />
        </div>
        <label class="label">
        <input type="radio" value="48" v-model="selectedKeySize" />
        48-битный ключ
        </label>
        <label class="label">
          <input class="input" type="radio" value="64" v-model="selectedKeySize" />
          64-битный ключ
        </label>
        <div class="section">
        <label class="label">Ключ</label>
        <input class="input" v-model="key" placeholder="Введите ключ" />
        </div>
        <div v-if="selectedKeySize === '64'" class="section">
        <label class="label" for="iterations">Количество итераций:</label>
        <input class="input" type="number" v-model="iterations" id="iterations" @input="validateIterations" />
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
        ciphertext:"",
        selectedKeySize: '48',
        iterations: 16,
        result: "",
        sBoxes: [
        // S1
        [
            [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
            [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
            [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
            [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
        ],
        // S2
        [
            [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
            [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
            [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
            [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
        ],
        // S3
        [
            [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
            [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
            [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
            [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
        ],
        // S4
        [
            [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
            [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
            [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
            [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
        ],
        // S5
        [
            [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
            [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
            [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
            [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
        ],
        // S6
        [
            [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
            [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
            [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
            [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
        ],
        // S7
        [
            [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
            [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
            [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
            [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
        ],
        // S8
        [
            [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
            [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
            [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
            [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
        ]
        ],

        // Initial permutation (IP) table
        initialPermutation: [
        58, 50, 42, 34, 26, 18, 10, 2,
        60, 52, 44, 36, 28, 20, 12, 4,
        62, 54, 46, 38, 30, 22, 14, 6,
        64, 56, 48, 40, 32, 24, 16, 8,
        57, 49, 41, 33, 25, 17, 9, 1,
        59, 51, 43, 35, 27, 19, 11, 3,
        61, 53, 45, 37, 29, 21, 13, 5,
        63, 55, 47, 39, 31, 23, 15, 7
        ],

        // Final permutation (IP-1) table
        finalPermutation: [
        40, 8, 48, 16, 56, 24, 64, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25
        ],

        // Key permutation table
        keyPermutation: [
        57, 49, 41, 33, 25, 17, 9, 1,
        58, 50, 42, 34, 26, 18, 10, 2,
        59, 51, 43, 35, 27, 19, 11, 3,
        60, 52, 44, 36, 63, 55, 47, 39,
        31, 23, 15, 7, 62, 54, 46, 38,
        30, 22, 14, 6, 61, 53, 45, 37,
        29, 21, 13, 5, 28, 20, 12, 4
        ],

        // Key shift amounts for each round
        keyShifts: [
        1, 1, 2, 2, 2, 2, 2, 2,
        1, 2, 2, 2, 2, 2, 2, 1
        ],

        // Permutation choice 1 (PC-1) table for key generation
        pc1Table: [
        57, 49, 41, 33, 25, 17, 9, 1,
        58, 50, 42, 34, 26, 18, 10, 2,
        59, 51, 43, 35, 27, 19, 11, 3,
        60, 52, 44, 36, 63, 55, 47, 39,
        31, 23, 15, 7, 62, 54, 46, 38,
        30, 22, 14, 6, 61, 53, 45, 37,
        29, 21, 13, 5, 28, 20, 12, 4
        ],

        // Permutation choice 2 (PC-2) table for key generation
        pc2Table: [
        14, 17, 11, 24, 1, 5, 3, 28,
        15, 6, 21, 10, 23, 19, 12, 4,
        26, 8, 16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55, 30, 40,
        51, 45, 33, 48, 44, 49, 39, 56,
        34, 53, 46, 42, 50, 36, 29, 32
        ],

        // Expansion (E) table
        expansionTable: [
        32, 1, 2, 3, 4, 5, 4, 5,
        6, 7, 8, 9, 8, 9, 10, 11,
        12, 13, 12, 13, 14, 15, 16, 17,
        16, 17, 18, 19, 20, 21, 20, 21,
        22, 23, 24, 25, 24, 25, 26, 27,
        28, 29, 28, 29, 30, 31, 32, 1
        ],

        // P-box permutation table
        pBoxPermutation : [
        16, 7, 20, 21, 29, 12, 28, 17,
        1, 15, 23, 26, 5, 18, 31, 10,
        2, 8, 24, 14, 32, 27, 3, 9,
        19, 13, 30, 6, 22, 11, 4, 25
        ],
      };
    },
    methods: {
    apply(){
    console.log(this.key);
    console.log(this.iterations);
    console.log(this.ciphertext);
    const decryptedText = this.des(this.key, this.ciphertext, 'decrypt');
    console.log("Decrypted text:", decryptedText);
    },
    validateIterations() {
      if (this.iterations < 1) {
        this.iterations = 1;
      } else if (this.iterations > 16) {
        this.iterations = 16;
      }
    },
    initialPermute(block) {
    const permutedBlock = new Array(64);
    for (let i = 0; i < 64; i++) {
        permutedBlock[i] = block[this.initialPermutation[i] - 1];
    }
    return permutedBlock;
    },
    finalPermute(block) {
    const permutedBlock = new Array(64);
    for (let i = 0; i < 64; i++) {
        permutedBlock[i] = block[this.finalPermutation[i] - 1];
    }
    return permutedBlock;
    },
    splitBlock(block) {
    const halfLength = block.length / 2;
    return [block.slice(0, halfLength), block.slice(halfLength)];
    },
    combineHalves(left, right) {
    return left.concat(right);
    },
    generateSubKeys(key) {
    const subKeys = [];
    let currentKey = this.keyPermutation.map(index => key[index - 1]);

    for (let i = 0; i < this.iterations; i++) {
        currentKey = this.keySchedule(currentKey, this.keyShifts[i]);
        subKeys.push(currentKey);
    }

    return subKeys;
    },
    keySchedule(key, shift) {
    const [left, right] = this.splitBlock(key);
    const shiftedLeft = this.circularLeftShift(left, shift);
    const shiftedRight = this.circularLeftShift(right, shift);
    const shiftedKey = this.combineHalves(shiftedLeft, shiftedRight);
    return this.permutePC2(shiftedKey);
    },
    circularLeftShift(array, shifts) {
    const copy = array.slice();
    for (let i = 0; i < shifts; i++) {
        copy.push(copy.shift());
    }
    return copy;
    },
    permutePC2(key) {
    return this.pc2Table.map(index => key[index - 1]);
    },
    expandBlock(halfBlock) {
    const expandedBlock = new Array(48);
    for (let i = 0; i < 48; i++) {
        expandedBlock[i] = halfBlock[this.expansionTable[i] - 1];
    }
    return expandedBlock;
    },
    xorArrays(array1, array2) {
    return array1.map((bit, index) => bit ^ array2[index]);
    },
    applySBoxes(halfBlock) {
    const sBoxOutput = new Array(32);
    let bitIndex = 0;

    for (let i = 0; i < 8; i++) {
        const sBoxRow = (halfBlock[bitIndex] << 1) | halfBlock[bitIndex + 5];
        const sBoxCol = (halfBlock[bitIndex + 1] << 3) | (halfBlock[bitIndex + 2] << 2) | (halfBlock[bitIndex + 3] << 1) | halfBlock[bitIndex + 4];
        const sBoxValue = this.sBoxes[i][sBoxRow][sBoxCol];
        const binaryValue = sBoxValue.toString(2).padStart(4, '0');
        for (let j = 0; j < 4; j++) {
        sBoxOutput[(i * 4) + j] = parseInt(binaryValue[j]);
        }
        bitIndex += 6;
        console.log(sBoxOutput)
    }

    return sBoxOutput;
    },
    permutePBox(block) {
    const permutedBlock = new Array(32);
    for (let i = 0; i < 32; i++) {
        permutedBlock[i] = block[this.pBoxPermutation[i] - 1];
    }
    return permutedBlock;
    },
    feistelFunction(rightHalf, subKey) {
    const expandedBlock = this.expandBlock(rightHalf);
    const xorResult = this.xorArrays(expandedBlock, subKey);
    const sBoxOutput = this.applySBoxes(xorResult);
    const permutedBlock = this.permutePBox(sBoxOutput);
    return permutedBlock;
    },
    encryptBlock(block, subKeys) {
    let currentBlock = this.initialPermute(block);

    for (let i = 0; i < this.iterations; i++) {
        const [left, right] = this.splitBlock(currentBlock);
        const feistelOutput = this.feistelFunction(right, subKeys[i]);
        const newRight = this.xorArrays(left, feistelOutput);
        const newLeft = right;
        currentBlock = this.combineHalves(newLeft, newRight);
    }

    const [finalLeft, finalRight] = this.splitBlock(currentBlock);
    const encryptedBlock = this.combineHalves(finalRight, finalLeft);
    return this.finalPermute(encryptedBlock);
    },
    decryptBlock(block, subKeys) {
    let currentBlock = this.initialPermute(block);

    for (let i = subKeys.length - 1; i >= 0; i--) {
        const [left, right] = this.splitBlock(currentBlock);
        const feistelOutput = this.feistelFunction(right, subKeys[i]);
        
        const newRight = this.xorArrays(left, feistelOutput);
        const newLeft = right;
        currentBlock = this.combineHalves(newLeft, newRight);
    }
    
    const [finalLeft, finalRight] = this.splitBlock(currentBlock);
    const decryptedBlock = this.combineHalves(finalRight, finalLeft);
    return this.finalPermute(decryptedBlock);
    },
    encryptBlock48(block, subKeys) {
    let currentBlock = this.initialPermute(block);
        const [left, right] = this.splitBlock(currentBlock);
        const feistelOutput = this.feistelFunction(right, subKeys);
        const newRight = this.xorArrays(left, feistelOutput);
        const newLeft = right;
        currentBlock = this.combineHalves(newLeft, newRight);

    const [finalLeft, finalRight] = this.splitBlock(currentBlock);
    const encryptedBlock = this.combineHalves(finalRight, finalLeft);
    return this.finalPermute(encryptedBlock);
    },
    decryptBlock48(block, subKeys) {
      let currentBlock = block;
    console.log(subKeys)
        const [left, right] = this.splitBlock(currentBlock);
        const feistelOutput = this.feistelFunction(left, subKeys);
        console.log([left, right])    
        const newLeft = this.xorArrays(right, feistelOutput);
        console.log(feistelOutput)
        const newRight = left;
        currentBlock = this.combineHalves(newLeft, newRight);
    return this.finalPermute(currentBlock);
    },
    des(key, message, mode) {
    if (((key.length !== 64 || this.selectedKeySize !== '64') && (key.length !== 48 || this.selectedKeySize !== '48')) || message.length !== 64) {
        alert("Key and message must be 64 or 48 bits long.");
        return 0;
    }
    if(this.selectedKeySize == '64'){
    const subKeys = this.generateSubKeys(key);
    const blocks = message.match(/.{1,64}/g);
    console.log(subKeys);
    const processedBlocks = blocks.map(block => {
        if (mode === 'encrypt') {
        return this.encryptBlock(block.split('').map(bit => parseInt(bit)), subKeys);
        } else if (mode === 'decrypt') {
        return this.decryptBlock(block.split('').map(bit => parseInt(bit)), subKeys);
        }
    });

    return processedBlocks.map(block => block.join('')).join('');
    }
    else {
    const subKeys = Array.from(key);
    const blocks = message.match(/.{1,64}/g);

    const processedBlocks = blocks.map(block => {
        if (mode === 'encrypt') {
        return this.encryptBlock48(block.split('').map(bit => parseInt(bit)), subKeys);
        } else if (mode === 'decrypt') {
        return this.decryptBlock48(block.split('').map(bit => parseInt(bit)), subKeys);
        }
    });

    return processedBlocks.map(block => block.join('')).join('');
    }

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
  
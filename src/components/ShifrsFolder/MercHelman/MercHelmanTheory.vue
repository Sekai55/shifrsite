<template>
<div class="container">
<h1 class="title">Введение в Ранцевую криптосистему Меркла-Хеллмана</h1>
<img class="image" src="@/assets/ShifrAssets/mercHel.png">
<div class="text">
    <p>Ранцевая криптосистема Меркла-Хеллмана — это асимметричный метод шифрования, разработанный Ральфом Мерклом и Мартином Хеллманом в 1978 году. Этот метод основан на комбинаторной задаче о рюкзаке и обладает интересными свойствами, которые делают его полезным для определенных приложений.</p>

    <h2>Основные термины и понятия</h2>
    <p>Прежде чем мы погрузимся в детали алгоритма, давайте определим некоторые ключевые термины:</p>
    <ul>
        <li><strong>Открытый ключ (public key):</strong> Это набор параметров и чисел, которые разрешают шифрование данных. Открытый ключ может быть доступен всем.</li>
        <li><strong>Закрытый ключ (private key):</strong> Это секретная информация, необходимая для дешифрования данных, зашифрованных с использованием соответствующего открытого ключа.</li>
        <li><strong>Супервозрастающая последовательность (superincreasing sequence):</strong> Это последовательность чисел, в которой каждое следующее число больше суммы всех предыдущих. Она служит основой для генерации открытого ключа.</li>
    </ul>

    <h2>Алгоритм Ранцевой криптосистемы Меркла-Хеллмана</h2>
    <h3>Генерация супервозрастающей последовательности:</h3>
    <ol>
        <li>Для начала, выбирается небольшое случайное число (секретное) в качестве стартового значения.</li>
        <li>Затем, генерируется супервозрастающая последовательность путем последовательного добавления случайных чисел к предыдущему числу.</li>
    </ol>
    <h3>Выбор случайной инверсии и модуля:</h3>
    <ol>
        <li>Выбирается случайное число, которое является взаимно простым с модулем (суммой всех чисел в супервозрастающей последовательности). Это число будет инверсией в зашифрованной последовательности.</li>
    </ol>
    <h3>Формирование открытого ключа:</h3>
    <p>Открытый ключ состоит из супервозрастающей последовательности и инверсии. Он будет использоваться для шифрования данных.</p>

    <h3>Шифрование данных:</h3>
    <p>Каждый бит данных (0 или 1) представляется как соответствующий элемент супервозрастающей последовательности. Если бит равен 1, то выбранный элемент добавляется к сумме, иначе пропускается.</p>

    <h3>Дешифрование данных:</h3>
    <p>С использованием закрытого ключа, можно вычислить инверсию и модуль, а затем с помощью них дешифровать данные, получая обратно исходную последовательность битов.</p>

    <h1>Пример работы Ранцевой криптосистемы Меркла-Хеллмана</h1>

    <p>Представим, что у нас есть заданная супервозрастающая последовательность <code>w = [2, 7, 11, 21, 42, 89, 180, 354]</code>, которая будет использована для генерации закрытого ключа. Эта последовательность служит основой для генерации чисел в системе.</p>

    <p>Для начала, мы вычислим сумму всех элементов в последовательности <code>w</code>:</p>

    <p>∑ w = 2 + 7 + 11 + 21 + 42 + 89 + 180 + 354 = 706</p>

    <p>Далее, выберем простое число <code>q</code>, которое больше полученной суммы:</p>

    <p><code>q = 881</code></p>

    <p>Теперь выберем число <code>r</code> из интервала [1, <code>q</code>]:</p>

    <p><code>r = 588</code></p>

    <p>Таким образом, наш закрытый ключ будет состоять из следующих параметров:</p>

    <p>
        <code>w = [2, 7, 11, 21, 42, 89, 180, 354]<br>
        q = 881<br>
        r = 588</code>
    </p>

    <h2>Генерация открытого ключа:</h2>

    <p>Для генерации открытого ключа, мы умножим каждый элемент из последовательности <code>w</code> на <code>r</code> по модулю <code>q</code>:</p>

    <pre>
        2 * 588 mod 881 = 295
        7 * 588 mod 881 = 592
        11 * 588 mod 881 = 301
        21 * 588 mod 881 = 14
        42 * 588 mod 881 = 28
        89 * 588 mod 881 = 353
        180 * 588 mod 881 = 120
        354 * 588 mod 881 = 236
    </pre>

    <p>Открытый ключ будет состоять из чисел: <code>β = [295, 592, 301, 14, 28, 353, 120, 236]</code>.</p>

    <h2>Шифрование сообщения:</h2>

    <p>Предположим, что Алиса хочет зашифровать сообщение "HI". Она начинает с того, что переводит каждый символ в его ASCII-код и далее в двоичное представление:</p>

    <pre>
        H: 72 (01001000)
        I: 73 (01001001)
    </pre>

    <p>Затем она умножает каждый бит на соответствующий элемент из открытого ключа <code>β</code> и суммирует результаты:</p>

    <pre>
        H: 0 * 295 + 1 * 592 + 0 * 301 + 0 * 14 + 1 * 28 + 0 * 353 + 1 * 120 + 0 * 236
        = 592 + 28 + 120
        = 740
        I: 0 * 295 + 1 * 592 + 0 * 301 + 0 * 14 + 0 * 28 + 1 * 353 + 1 * 120 + 1 * 236
        = 592 + 353 + 120 + 236
        = 1301
    </pre>

    <p>Алиса отправляет зашифрованные значения 740 и 1301 Бобу.</p>

    <h2>Дешифрование сообщения:</h2>

    <p>Чтобы Боб мог дешифровать сообщение, он умножает полученные значения на мультипликативное обратное <code>r</code> по модулю <code>q</code>:</p>

    <pre>
        740 * 442 mod 881 = 68
        1301 * 442 mod 881 = 42
    </pre>

    <p>Далее, он раскладывает каждое значение следующим образом:</p>

    <pre>
        68 - 42 = 26
        26 - 21 = 5
        5 - 2 = 3
        3 - 2 = 1
        1 - 1 = 0
    </pre>

    <p>Из полученных значений он восстанавливает исходное двоичное представление символов:</p>

    <pre>
        Первый символ: 01001000 → H
        Второй символ: 01001001 → I
    </pre>

    <h2>Преимущества и недостатки Ранцевой криптосистемы Меркла-Хеллмана</h2>
    <h3>Преимущества:</h3>
    <ul>
        <li>Сложность задачи рюкзака делает метод стойким к атакам полного перебора.</li>
        <li>Шифрование эффективно и быстро.</li>
        <li>Отсутствие необходимости в обмене секретным ключом.</li>
    </ul>
    <h3>Недостатки:</h3>
    <ul>
        <li>Уязвимость к криптоанализу при использовании некоторых практических параметров.</li>
        <li>Отсутствие поддержки цифровой подписи и аутентификации.</li>
    </ul>

    <p>Ранцевая криптосистема Меркла-Хеллмана предоставляет интересный взгляд на асимметричное шифрование, основанное на комбинаторных принципах. Её принципы, хотя и могут быть подвержены некоторым атакам, остаются важным шагом в развитии криптографии.</p>
</div> 
</div>   
</template>
<style scoped>
.container {
  margin-right: 20px;
  margin-left: 20px;
  overflow: auto;
}

.image {
  float: right;
  margin-right: 20px;
  margin-left: 20px;
  max-width: 40%;
}
.title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
}

.text {
  font-size: 18px;
  line-height: 1.5;
  text-align: left;
}
</style>
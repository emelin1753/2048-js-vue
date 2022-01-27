// вывод матрицы в консоль
export function consoleMatrix(matrix) {
  console.log("matrix");
  for (let row = 0; row < matrix.length; row++) {
    console.log(row, ":", matrix[row].join(" "));
  }
}

// создание матрицы
export function createMatrix(rangeMatrix) {
  return Array(rangeMatrix)
    .fill()
    .map(() => Array(rangeMatrix).fill(0));
}

// функция по номеру строки и столбца вернет порядковый номер ячейки от 1 до 16 по формуле (i * rangeMatrix + j + 1)
export function getNumberFromIndex(row, column, rangeMatrix) {
  return row * rangeMatrix + column + 1;
}

// функция по порядковому номеру вернет коррдинаты (индексы). фукнция обратная предыдущей
export function getIndexFromNumber(num, rangeMatrix) {
  return {
    row: Math.trunc((num - 1) / rangeMatrix),
    column: (num - 1) % rangeMatrix,
  };
}

// функция вставляет 2 или 4 в матрицу
export function insert2or4(matrix, row, column) {
  if (Math.random() <= 0.75) {
    matrix[row][column] = 2;
  } else {
    matrix[row][column] = 4;
  }
}

// функция проверяет есть ли свободные (нулевые) ячейки
export function isZeroInMatrix(matrix) {
  return matrix.some((el) => el.includes(0));
}

// функция определяет пустые клетки, в которые мы будем помещать 2 или 4
// возвращает массив номеров
export function getEmpty(matrix, rangeMatrix) {
  const empty = [];
  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column === 0) {
        empty.push(getNumberFromIndex(i, j, rangeMatrix));
      }
    });
  });
  return empty;
}

// перемешиваем массив случайным образом
export function shuffleArray(array) {
  let current = array.length,
    random;
  while (current != 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }
}

// двигаем ячейки влево и схлопываем
export function moveLeft(matrix, rangeMatrix) {
  let score = 0; // для подсчета очков

  matrix.forEach((row, i) => {
    // сместим влево без схлопвыания
    // удаляем промежуточные нули
    const newRow = row.filter((el) => el !== 0);
    // добавим нули в конец
    while (newRow.length < rangeMatrix) {
      newRow.push(0);
    }
    // схлопываем и подсчитываем очки
    for (let j = 0; j < rangeMatrix - 1; j++) {
      // последний элемент не проверяем, элемент не равен 0 и равен соседу справа
      if (newRow[j] !== 0 && newRow[j] === newRow[j + 1]) {
        newRow[j] *= 2; // хлоп!
        score += newRow[j]; // увеличим количество очков
        newRow.splice(j + 1, 1); // удаляем соседа справа
        newRow.push(0); // добавляем 0 в конец ряда
      }
    }
    // обновим матрицу
    matrix[i] = newRow;
  });
  matrix.splice(rangeMatrix); // для реактивности разметки
  return score;
}

// двигаем ячейки вправо и схлопываем
export function moveRight(matrix, rangeMatrix) {
  let score = 0; // для подсчета очков

  matrix.forEach((row, i) => {
    // сместим вправо без схлопвыания
    // удаляем промежуточные нули
    const newRow = row.filter((el) => el !== 0);
    // добавим нули в начало
    while (newRow.length < rangeMatrix) {
      newRow.splice(0, 0, 0);
    }
    // схлопываем и подсчитываем очки
    for (let j = rangeMatrix - 1; j > 0; j--) {
      // первый элемент не проверяем, элемент не равен 0 и равен соседу слева
      if (newRow[j] !== 0 && newRow[j] === newRow[j - 1]) {
        newRow[j] *= 2; // хлоп!
        score += newRow[j]; // увеличим количество очков
        newRow.splice(j - 1, 1); // удаляем соседа слева
        newRow.unshift(0); // добавляем 0 в начало ряда
      }
    }
    // обновим матрицу
    matrix[i] = newRow;
  });
  matrix.splice(rangeMatrix); // для реактивности разметки
  return score;
}

// двигаем ячейки вверх и схлопываем
export function moveUp(matrix, rangeMatrix) {
  let score = 0; // для подсчета очков
  // обход по колонкам
  for (let j = 0; j < rangeMatrix; j++) {
    // получим ненулевые значения колонки
    const column = matrix.reduce((acc, row) => {
      if (row[j] !== 0) {
        acc.push(row[j]);
      }
      return acc;
    }, []);
    // добавим нули в конец
    while (column.length < rangeMatrix) {
      column.push(0);
    }
    // схлопываем и подсчитываем очки
    for (let i = 0; i < rangeMatrix; i++) {
      // последний элемент не проверяем, элемент не равен 0 и равен соседу снизу
      if (
        i < rangeMatrix - 1 &&
        column[i] !== 0 &&
        column[i] === column[i + 1]
      ) {
        column[i] *= 2; // хлоп!
        score += column[i]; // увеличим количество очков
        column.splice(i + 1, 1); // удаляем соседа снизу
        column.push(0); // добавляем 0 в конец ряда
      }
      // обновим матрицу
      matrix[i][j] = column[i];
    }
  }
  matrix.splice(rangeMatrix); // для реактивности разметки
  return score;
}

// двигаем ячейки вниз и схлопываем
export function moveDown(matrix, rangeMatrix) {
  let score = 0; // для подсчета очков
  // обход по колонкам
  for (let j = 0; j < rangeMatrix; j++) {
    // получим ненулевые значения колонки
    const column = matrix.reduce((acc, row) => {
      if (row[j] !== 0) {
        acc.push(row[j]);
      }
      return acc;
    }, []);
    // добавим нули в начало
    while (column.length < rangeMatrix) {
      column.splice(0, 0, 0);
    }
    // схлопываем и подсчитываем очки
    for (let i = rangeMatrix - 1; i >= 0; i--) {
      // первый элемент не проверяем, элемент не равен 0 и равен соседу сверху
      if (i > 0 && column[i] !== 0 && column[i] === column[i - 1]) {
        column[i] *= 2; // хлоп!
        score += column[i]; // увеличим количество очков
        column.splice(i - 1, 1); // удаляем соседа сверху
        column.unshift(0); // добавляем 0 в начало ряда
      }
      // обновим матрицу
      matrix[i][j] = column[i];
    }
  }
  matrix.splice(rangeMatrix); // для реактивности разметки
  return score;
}

// проверяем можем ли двигаться вообще, даже если нет свободных ячеек
export function canMove(matrix, rangeMatrix) {
  for (let i = 0; i < rangeMatrix - 1; i++) {
    for (let j = 0; j < rangeMatrix - 1; j++) {
      if (
        matrix[i][j] === matrix[i][j + 1] ||
        matrix[i][j] === matrix[i + 1][j]
      )
        return true;
    }
  }
  return false;
}

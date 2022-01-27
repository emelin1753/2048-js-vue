<template>
  <div v-can="$perm.read2048" class="d-none">
    <div class="title-2048">
      <span>2048</span>
      <span class="ml-4">score: {{ score }}</span>
    </div>
    <div class="container" v-if="noGameOver">
      <b-row v-for="row in rangeMatrix" :key="row" class="text-center">
        <b-col
          cols="auto"
          v-for="col in rangeMatrix"
          :key="col"
          class="digit d-flex align-items-center justify-content-center"
          :style="getStyleFor(matrix[row - 1][col - 1])"
        >
          {{ matrix[row - 1][col - 1] }}
        </b-col>
      </b-row>
    </div>
    <div v-else class="game-over">game over</div>
  </div>
</template>

<script>
import * as logics from "./logics";

export default {
  name: "Game2048",

  data: () => ({
    matrix: [],
    rangeMatrix: 4,
    score: 0,
  }),

  created() {
    // создадим пустую матрицу
    this.matrix = logics.createMatrix(this.rangeMatrix);
    // получим номера пустых элементов
    const empty = logics.getEmpty(this.matrix, this.rangeMatrix);
    // перемешаем
    logics.shuffleArray(empty);
    // добавим в матрицу 2 числа
    for (let i = 0; i < 2; i++) {
      this.addElementToMatrix(empty);
    }
    // обработаем работу с кнопками
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.score += logics.moveUp(this.matrix, this.rangeMatrix);
          break;
        case "ArrowRight":
          this.score += logics.moveRight(this.matrix, this.rangeMatrix);
          break;
        case "ArrowLeft":
          this.score += logics.moveLeft(this.matrix, this.rangeMatrix);
          break;
        case "ArrowDown":
          this.score += logics.moveDown(this.matrix, this.rangeMatrix);
          break;
        default:
          return;
      }
      // есть еще пустые ячейки
      if (logics.isZeroInMatrix(this.matrix)) {
        // получим номера пустых элементов
        const empty = logics.getEmpty(this.matrix, this.rangeMatrix);
        // перемешаем
        logics.shuffleArray(empty);
        // добавим в матрицу числo
        this.addElementToMatrix(empty);
      }
    });
  },

  methods: {
    addElementToMatrix(empty) {
      // вернем последний элемент, через удаление
      const randomNum = empty.pop();
      // получим координаты этого номера
      const { row, column } = logics.getIndexFromNumber(
        randomNum,
        this.rangeMatrix
      );
      // добавим 2 или 4 в нашу "случайную ячейку"
      logics.insert2or4(this.matrix, row, column);
    },

    getStyleFor(digit) {
      const style = {};
      style["font-size"] = digit < 1000 ? "30px" : "20px";
      switch (digit) {
        case 0:
          style["background-color"] = "rgb(130, 130, 130)";
          break;
        case 2:
          style["background-color"] = "rgb(255, 255, 255)";
          break;
        case 4:
          style["background-color"] = "rgb(255, 255, 128)";
          break;
        case 8:
          style["background-color"] = "rgb(255, 255, 0)";
          break;
        case 16:
          style["background-color"] = "rgb(255, 200, 255)";
          break;
        case 32:
          style["background-color"] = "rgb(255, 200, 128)";
          break;
        case 64:
          style["background-color"] = "rgb(255, 200, 0)";
          break;
        case 128:
          style["background-color"] = "rgb(255, 150, 255)";
          break;
        case 256:
          style["background-color"] = "rgb(255, 150, 128)";
          break;
        case 512:
          style["background-color"] = "rgb(255, 150, 0)";
          break;
        case 1024:
          style["background-color"] = "rgb(255, 100, 255)";
          break;
        case 2048:
          style["background-color"] = "rgb(255, 100, 128)";
          break;
        default:
          style["background-color"] = "rgb(255, 255, 255)";
          break;
      }
      return style;
    },
  },

  computed: {
    noGameOver() {
      return (
        logics.isZeroInMatrix(this.matrix) ||
        logics.canMove(this.matrix, this.rangeMatrix)
      );
    },
  },
};
</script>

<style scoped>
.digit {
  border: 2px solid;
  width: 60px;
  height: 60px;
  margin: 1px;
  font-weight: bold;
}
.game-over {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  background-color: black;
  color: white;
  transition: color 5s, background-color 5s;
}
</style>

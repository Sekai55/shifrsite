<!-- <template>
    <div>
      <div class="board">
        <ChessBoard
          :position="position"
          :draggable="true"
          @onDragStart="onDragStart"
          @onDrop="onDrop"
          @onMouseoutSquare="onMouseoutSquare"
          @onMouseoverSquare="onMouseoverSquare"
          @onSnapEnd="onSnapEnd"
        />
      </div>
      <div class="info">
        <label for="search-depth">Search depth:</label>
        <select id="search-depth" v-model="searchDepth">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
  
        <br>
        <span>Positions evaluated: <span id="position-count">{{ positionCount }}</span></span>
        <br>
        <span>Time: <span id="time">{{ moveTime / 1000 }}s</span></span>
        <br>
        <span>Positions/s: <span id="positions-per-s">{{ positionsPerS }}</span></span>
        <br>
        <br>
        <div id="move-history" class="move-history">
          <span v-for="(move, index) in moveHistory" :key="index">{{ move }}</span><br>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ChessBoard from "@/components/ChessBoard"; // Укажите правильный путь к компоненту ChessBoard
  import Chess from "chess.js"; // Импортируйте класс Chess из установленной библиотеки
  
  export default {
    components: {
      ChessBoard
    },
    data() {
      return {
        position: "start",
        game: new Chess(),
        searchDepth: 3,
        positionCount: 0,
        moveTime: 0,
        positionsPerS: 0,
        moveHistory: []
      };
    },
    methods: {
  onDragStart(source, piece, position, orientation) {
    if (this.game.in_checkmate() === true || this.game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
      return false;
    }
  },
  onDrop(source, target) {
    const move = this.game.move({
      from: source,
      to: target,
      promotion: 'q'
    });

    this.removeGreySquares();
    if (move === null) {
      return 'snapback';
    }

    this.renderMoveHistory(this.game.history());
    setTimeout(this.makeBestMove, 250);
  },
  onMouseoutSquare(square, piece) {
    this.removeGreySquares();
  },
  onMouseoverSquare(square, piece) {
    const moves = this.game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    this.greySquare(square);

    for (let i = 0; i < moves.length; i++) {
      this.greySquare(moves[i].to);
    }
  },
  onSnapEnd() {
    this.board.position(this.game.fen());
  },
  makeBestMove() {
    const bestMove = this.getBestMove(this.game);
    this.game.ugly_move(bestMove);
    this.board.position(this.game.fen());
    this.renderMoveHistory(this.game.history());
    if (this.game.game_over()) {
      alert('Game over');
    }
  },
  getBestMove(game) {
    if (this.game.game_over()) {
      alert('Game over');
    }

    this.positionCount = 0;
    const depth = parseInt(this.searchDepth);

    const startTime = new Date().getTime();
    const bestMove = this.minimaxRoot(depth, game, true);
    const endTime = new Date().getTime();
    this.moveTime = endTime - startTime;
    this.positionsPerS = (this.positionCount * 1000) / this.moveTime;

    return bestMove;
  },
  renderMoveHistory(moves) {
    this.moveHistory = moves;
  },
  removeGreySquares() {
    $('#board .square-55d63').css('background', '');
  },
  greySquare(square) {
    const squareEl = $('#board .square-' + square);
    let background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
      background = '#696969';
    }
    squareEl.css('background', background);
  }, -->
window.addEventListener('DOMContentLoaded', () => {

  // Initialize Variables, including jQuery
  let game = new Chess()
  let $status = $('#status')
  let whiteSquareGray = '#a9a9a9'
  let blackSquareGray = '#696969'
  let $level = $('#level')
  let spawn = ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3']
  let spawnWhite = ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4']
  let cpuReset = 'rnbqkbnr/pppppppp/'
  let newGame = [
  ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
  ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
  ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
  ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
  ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
  ]
  let moveW = [
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
  ]
  let move
  let newFen
  let SQUARES =[
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
  let square 
  let number = 1 
  let config
  let turn
  firstGame()
  
  function firstGame() {
  //Pull from chess.js library and update config
    config = {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      showNotation: false,
      onDrop: onDrop,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare,
      onSnapEnd: onSnapEnd
    }
  }

  //Sets Game board with parameters
  board = Chessboard('board1', config)
  

  //Remove Hover Effect
  function removeGraySquares () {
    $('#board1 .square-55d63').css('background', '')
  }
  
  //Highlight Gray Squares
  function graySquare (square) {
    var $square = $('#board1 .square-' + square)
  
    var background = whiteSquareGray
    if ($square.hasClass('black-3c85d')) {
      background = blackSquareGray
    }
  
    $square.css('background', background)
  }

  // Only Allow Legal Moves
  function onDragStart(source, piece, position, orientation) {

    /* If function is undefined in this js, pulls from chess.js
    prevents pieces from being moved when game is over */
    if (game.game_over()) return false

    /* Check if white or black to move
       and disallow movement for other side */  
    if ((game.turn() === 'w' && piece.search (/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search (/^w/) !== -1)) {
          return false
    }
  }

  // Checks for legality of move on piece drop after drag  
  function onDrop (source, target) {
    removeGraySquares()
    move = game.move ({
      from: source,
      to: target,
      promotion: 'q'
    })

    // Snap piece back if move is illegal
    if(move === null) {
      return 'snapback'
    }

    // Generates and places new pawn for player on promotion
    if(move.piece === 'p' && move.color === 'w'){
      if(move.to === 'a8' || move.to === 'b8' || move.to === 'c8' || move.to === 'd8' || move.to === 'e8' || move.to === 'f8' || move.to === 'g8' || move.to === 'h8'){
        board.position(game.fen()) 
        do random = spawn[Math.floor(Math.random() * spawn.length)]
          while(game.get(random) !== null)
          game.put({ type: 'p', color: 'w'}, random)
      }
    }

    // make random legal move for black
    // window.setTimeout(makeRandomMove, 250)


    // Call update status to ensure that moves get properly updated
    updateStatus()
  }

  // Random CPU Logic 
  // function makeRandomMove () {
  //   if(game.turn() === 'b') {
  //     let possibleMoves = game.moves()

  //     // Game Over
  //     if (possibleMoves.length === 0) return
    
  //     let randomIdx = Math.floor(Math.random() * possibleMoves.length)
  //     game.move(possibleMoves[randomIdx])
  //     board.position(game.fen())
  //     updateStatus()
  //   }
  // }

  function onMouseoverSquare (square) {
    // Get list of possible moves for this square
    let moves = game.moves({
      square: square,
      verbose: true
    })
  
    // Exit if there are no moves available for this square
    if (moves.length === 0) return
  
    // Highlight the square they moused over
    graySquare(square)
  
    // Highlight the possible squares for this piece
    for (let i = 0; i < moves.length; i++) {
      graySquare(moves[i].to)
    }
  }

  function onMouseoverSquare (square) {
    // get list of possible moves for this square
    let moves = game.moves({
      square: square,
      verbose: true
    })
  
    // exit if there are no moves available for this square
    if (moves.length === 0) return
  
    // highlight the square they moused over
    graySquare(square)
  
    // highlight the possible squares for this piece
    for (let i = 0; i < moves.length; i++) {
      graySquare(moves[i].to)
    }
  }
  
  function onMouseoutSquare () {
    removeGraySquares()
  }
  
  function nextLevel() {
    let random2 = spawnWhite[Math.floor(Math.random() * spawnWhite.length)]
    let SQUARES2 = SQUARES.slice(0, 16)
    SQUARES2.forEach(square => {
    let gameSquare = game.get(square)
      if((gameSquare !== null) && gameSquare.color === 'w') {
        do random2 = spawnWhite[Math.floor(Math.random() * spawnWhite.length)]
          while(game.get(random2) !== null)
          game.put(gameSquare, random2)
          game.remove(square)
          board.position(game.fen())
      }  
    })

    let SQUARES3 = SQUARES.slice(17, SQUARES.length)
    SQUARES3.forEach(square => {
      let gameSquare2 = game.get(square)
      if((gameSquare2 !== null) && gameSquare2.color === 'b') {
        game.remove(square)
      }
      board.position(game.fen())
    })

    newLevelPos()

      function newLevelPos() {
        generateNewFen()
        function generateNewFen() {
          let found = game.fen().split("/", 2)
          let secondStringIndex = game.fen().search(found[1]) + found[1].length + 1
          let secondStrToFill = game.fen().substring(secondStringIndex)
          newFen = cpuReset + secondStrToFill

          let config2 = {
            draggable: true,
            onDragStart: onDragStart,
            showNotation: false,
            onDrop: onDrop,
            onMouseoutSquare: onMouseoutSquare,
            onMouseoverSquare: onMouseoverSquare,
            onSnapEnd: onSnapEnd
          } 

          board.destroy()
          game = new Chess(newFen)
          board = Chessboard('board1', config2)
          updateStatus()
        }
      }
  }
  
  /* Update board state after the piece snaps into place
      Use for castling, en passant, pawn promotion */
  function onSnapEnd () {
    // Capture fen string to use for updates
    board.position(game.fen())
  }
    
  // Update status to handle finalizing legal moves
  function updateStatus () {
    let status = ''
    let level = 'Level: ' + number

    // Initialize current turn to human, but if it is cpu's turn, change to cpu
    let turn = 'Human'
    if(game.turn() === 'b') {
      turn = 'CPU'
    }

    // Check for Checkmate
    if (game.in_checkmate()) {
      if(game.turn() === 'b') {
        number++
        nextLevel()
      } 
      else if(game.turn() === 'w') {
      status = `Game over! You're in Checkmate!`
      game.game_ove === true
      number = 1
      }
    }
    
    // Check for draw
    else if (game.in_draw()) {
      status = 'Game over! Stalemate!'
    }

    // Game continues
    else {
      status = `${turn} to move!`
        if(turn === 'CPU') {
          status = `${turn} to move! ${turn} is thinking!`
        }

      // Is player or CPU in check?
      if(game.in_check()) {
        if (turn === 'Human') {
          status += ` ${turn} is in check!`
        }
        else if (turn === 'CPU') {
          status += ` ${turn} is in check!`
        }
      }
    }

    $status.html(status)
    $level.html(level)
  }

  // Update Game Status
  updateStatus()
})                                             
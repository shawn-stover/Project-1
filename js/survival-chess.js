window.addEventListener('DOMContentLoaded', () => {

  // Initialize Variables, including jQuery
  let game = new Chess()
  let $status = $('#status')
  let $level = $('#level')
  let spawn = ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3']

  // Only Allow Legal Moves
  function onDragStart(source, piece, position, orientation) {
    
    /*If function is undefined in this js, pulls from chess.js
    prevents pieces from being moved when game is over */
    if (game.game_over()) return false

    /* Check if white or black to move
       and disallow movement for other side */  
    if ((game.turn() === 'w' && piece.search (/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search (/^w/) !== -1)) {
          return false
    }
  }

  //Checks for legality of move on piece drop after drag  
  function onDrop (source, target) {
    // let promotion = prompt('Piece selected? q = Queen, r = Rook, n = Knight, b = Bishop')
    let move = game.move ({
      from: source,
      to: target,
      // FIX ME Allow user selected promotion
      promotion: 'q'
    })

    let random = spawn[Math.floor(Math.random() * spawn.length)]

    // if(move === null) {
    //   return
    // }
    
    if(move.to === ('a8' || 'b8' || 'c8' || 'd8' || 'e8' || 'f8' || 'g8' || 'h8') && move.color === 'w' && move.piece ==='p') {
      game.put({ type: 'p', color: 'w'}, random)
    }
    
    console.log(random)

      
    // Call update status to ensure that moves get properly updated
    updateStatus()

  }    

  /* Update board state after the piece snaps into place
      Use for castling, en passant, pawn promotion */
  function onSnapEnd () {
    //Capture fen string to use for updates
    board.position(game.fen())
  }
    
    //Update status to handle finalizing legal moves
  function updateStatus () {
    let status = ''
    let level = 'Level: 1'

    //Initialize current move to white, but if it is black's turn, change to black
    let moveColor = 'White'
    if(game.turn() === 'b') {
      moveColor = 'Black'
    }

    // FIX ME Refactor for human player only
    // Check for Checkmate
    if (game.in_checkmate()) {
      status = `Game over! ${moveColor} is in Checkmate!`
    }

    // FIX ME Refactor to allow user to restart level if draw
    // Check for draw
    else if (game.in_draw()) {
      status = 'Game over! Stalemate!'
    }
    // Game continues
    else {
      status = `${moveColor} to move`

      // Is player in check?
      if(game.in_check()) {
        status += `,  ${moveColor} is in check!`
      }
    }

    $status.html(status)
    $level.html(level)
  }

  //Pull from chess.js library and update config
  let config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    showNotation: false,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }

  //Sets Game board with parameters
  board = Chessboard('board1', config)

  // Update Game Status
  updateStatus()
})
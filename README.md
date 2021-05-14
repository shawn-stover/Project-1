Pitch for Project 1.

I want to design and deploy a game of chess with a few twists. It would be called survival chess, and the premise would be that you start with a standard chess game against an AI, but when you finish the game and win, your current board state (piece layouts and captured pieces) are transposed onto the next board and the computer player gets a fresh set of pieces in standard starting position. This creates some difficulty for the player because you need to evaluate your moves not only on the level of impact on the current game, but the impact of your board states on new games going forward. This would continue indefinitely until the player loses. Pawns that get across the board are capable of becoming a knight, bishop, queen or rook, as in standard chess rules for promotion. However, to help facilitate the player continuing to play, the pawn is not lost, it is instead reset to the beginning of the board on the players side on a random row. Once pawns are lost, they are gone forever, and the pawns are essentially the players means of survival, being the only way to recover pieces and survive. This play would continue until the player eventually loses to the computer. You can think of it like a chess trainer because this allows the user to test different board states because their board and piece state are moved forward to the next game.

To create the algorithm I will first need to implement heuristic evaluation so that the AI can determine how well the game is going for them, and then pick a move based on that.

My minimally acceptable state would be the game being functional, and having 3 difficulty levels implemented. Easy where the computer picks a random valid move and does it. Normal where the computer simply evaluates their moves and picks the best one, and hard where the computer uses minimax with 4 level depth to create a difficult experience for the player. The player has a choice whether they want a static difficulty or wanting a stepped difficulty where it gets more difficult the further they go.

Stretch goals would be increasing the scale of difficulty from 0-10 instead of 0-2. These difficulties would be laid out as follows:

0: computer picks random move

1: computer picks their best moves, without evaluating the player.

2: Computer uses minimax with one move depth.

3: Computer uses minimax at 2 move depth.

4: Minimax at 3 moved depth.

5: Minimax at 4 move depth.

6: Minimax at 5 move depth.

7: Minimax at 6 move depth using alpha beta pruning.

8: Minimax at 7 move depth using alpha beta pruning.

9: Minimax at 8 move depth using alpha beta pruning.

10: Minimax at 9 move depth using alpha beta pruning.

This would be simple enough to implement as once I get the minimax working, I could simply increase the move depth and implement alpha beta pruning for later stages.

My second stretch goal would be to have a selector where the player cannot get a new queen from a pawn upgrade until their current queen is captured.

My 3rd stretch goal would be a random difficulty selection. For example, the player starts at difficulty 0 and finishes the board, their next board would be at a random difficulty between 0 and 1. This continues until the player reaches difficulty 3, where the randomness would max out between 0 and 3. After this point, the game would pick between the highest 4 available difficulties only. For example, player at difficulty 8 would have a random computer between level 5 and level 8.

My maximum project would be my minimum acceptable project, plus all of these difficulty features and selectors for the player to customize their experience. 

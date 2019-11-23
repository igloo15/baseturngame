import { Injectable } from '@angular/core';
import { TurnLoop, Player, GameUtil, GameService } from 'baseturnlib';
import { Piece } from '../models/piece';
import { IBoardSpotData } from '../components/board-spot/board-spot.component';

@Injectable({
  providedIn: 'root'
})
export class DiceGameService {

  public looper: TurnLoop;
  public playerOne: Player;
  public playerTwo: Player;
  public piecePicking = false;
  public boardSpots: IBoardSpotData[] = [];
  public completeSpot: IBoardSpotData = {
    columnName: 'complete',
    index: -1,
    active: false
  };

  playerOneRoll = -1;
  playerTwoRoll = -1;

  private readonly piecesKey = 'pieces';


  constructor(public gameService: GameService) {
    this.looper = new TurnLoop();
    this.playerOne = this.createPlayer('One', 'blue');
    this.playerTwo = this.createPlayer('Two', 'red');

    this.looper.addPlayer(this.playerOne);
    this.looper.addPlayer(this.playerTwo);
    this.looper.takeTurn();
    this.gameService.openConfirmationWindow('Play a Local or Online Game?', 'Local', 'Online', 'Game Type').then(result => {
      if (!result) {
        console.log('online game');
      }
    });

  }

  createPlayer(name: string, color: string): Player {
    const player = new Player(name);
    player.playerProps.waitingPieces = [];
    player.playerProps.boardPieces = [];
    for (let index = 0; index < 7; index++) {
      this.addWaitingPiece(player);
    }
    player.playerProps.color = color;
    return player;
  }

  addWaitingPiece(player: Player) {
    player.playerProps.waitingPieces.push(new Piece(player));
  }

  registerBoardPiece(boardData: IBoardSpotData) {
    this.boardSpots.push(boardData);
  }

  roll() {
    this.clearSpotActive();
    this.piecePicking = true;
    const rollValue = GameUtil.rollDice(4, 1, 0)[0];
    console.log(`Roll : ${rollValue}`);
    this.looper.currentPlayer.playerProps.playerRoll = rollValue;
    if (this.looper.currentPlayer === this.playerOne) {
      console.log(`Current Value ${this.playerOneRoll}`);
      this.playerOneRoll = rollValue;
    } else {
      console.log(`Current Value ${this.playerTwoRoll}`);
      this.playerTwoRoll = rollValue;
    }
  }

  togglePiece(piece: Piece) {
    this.clearSpotActive();
    if (piece.active) {
      const roll: number = this.looper.currentPlayer.playerProps.playerRoll;
      let spot: IBoardSpotData = null;
      if (roll > 0) {
        if (piece.columnName) {
          spot = this.retrieveSpot(piece.columnName, piece.index);
          if (spot) {
            const nextSpot = this.findNextSpot(spot, roll);
            if (nextSpot) {
              nextSpot.active = true;
              if (nextSpot.columnName === 'complete') {
                console.log('move home');
              }
            }
          }
        } else {
          spot = this.retrieveSpot(this.currentPlayerColumn, roll);
          if (spot) {
            spot.active = true;
          }
        }
      } else {
        console.log('roll first');
      }
    }
  }

  retrieveSpot(columnName: string, index: number): IBoardSpotData {
    for (const spot of this.boardSpots) {
      if (spot.columnName === columnName && spot.index === index) {
        return spot;
      }
    }
    return null;
  }

  findNextSpot(currentSpot: IBoardSpotData, movement: number): IBoardSpotData {
    const nextMovement = currentSpot.index + movement;
    let nextSpot: IBoardSpotData = null;
    if (currentSpot.columnName === this.currentPlayerColumn && currentSpot.index < 5) {
      if (nextMovement > 4) {
        const middleMove = nextMovement - 4;
        nextSpot = this.retrieveSpot('middle', middleMove);
      } else {
        nextSpot = this.retrieveSpot(this.currentPlayerColumn, nextMovement);
      }
    } else if (currentSpot.columnName === 'middle') {
      if (nextMovement > 8) {
        const playerMove = nextMovement - 8;
        if (playerMove > 4) {
          nextSpot = null;
        } else if (playerMove === 3) {
          nextSpot = this.retrieveSpot(this.playerCompleteColumn, 0);
        } else {
          nextSpot = this.retrieveSpot(this.currentPlayerColumn, playerMove + 4);
        }
      } else {
        nextSpot = this.retrieveSpot('middle', nextMovement);
      }
    } else if (currentSpot.columnName === this.currentPlayerColumn) {
      if ((currentSpot.index === 6 && movement === 1) ||
          (currentSpot.index === 5 && movement === 2)) {
        nextSpot = this.retrieveSpot(this.playerCompleteColumn, 0);
      } else if (currentSpot.index === 5 && movement === 1) {
        nextSpot = this.retrieveSpot(this.currentPlayerColumn, 6);
      }
    }

    if (nextSpot && nextSpot.piece) {
      if (nextSpot.piece.player === this.looper.currentPlayer) {
        nextSpot = null;
      }
    }

    return nextSpot;
  }

  spotClicked(spot: IBoardSpotData) {
    const currentPiece = this.activePiece;
    if (spot.active && currentPiece) {
      this.gameService.openConfirmationWindow('Are you sure you want to move?', 'Yes', 'No', 'Piece Movement').then(result => {
        if (result) {
          if (!currentPiece.columnName) {
            const arrayLoop: Piece[] = this.looper.currentPlayer.playerProps.waitingPieces;
            GameUtil.removeFromArray(arrayLoop, currentPiece);
            this.looper.currentPlayer.playerProps.boardPieces.push(currentPiece);
          } else {
            const pastSpot = this.retrieveSpot(currentPiece.columnName, currentPiece.index);
            if (pastSpot) {
              pastSpot.piece = null;
            }
          }
          currentPiece.active = false;
          currentPiece.columnName = spot.columnName;
          currentPiece.index = spot.index;
          spot.piece = currentPiece;
          spot.active = false;
          this.piecePicking = false;
        }
      });
    }
  }

  get currentPlayerColumn(): string {
    return `player-${this.looper.currentPlayer.index}`;
  }

  get playerCompleteColumn(): string {
    return `complete-${this.looper.currentPlayer.index}`;
  }

  get activePiece(): Piece {
    for (const piece of this.looper.currentPlayer.playerProps.waitingPieces) {
      if (piece.active) {
        return piece;
      }
    }
    for (const piece of this.looper.currentPlayer.playerProps.boardPieces) {
      if (piece.active) {
        return piece;
      }
    }
    return null;
  }

  clearSpotActive() {
    this.boardSpots.forEach(spot => {
      spot.active = false;
    });
  }
}

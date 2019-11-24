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

  playerOneRoll = -1;
  playerTwoRoll = -1;

  private readonly piecesKey = 'pieces';


  constructor(public gameService: GameService) {
    this.randomCheck();

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

  private randomCheck() {
    const myCounts = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5000; i++) {
      const value = GameUtil.rollDice(4, 1, 0)[0];
      myCounts[value]++;
    }
    console.log('THIS IS A RANDOM CHECK');
    console.log('==========================');
    for (let j = 0; j < myCounts.length; j++) {
      console.log(`Roll ${j}: ${myCounts[j]}`);
    }
    console.log('=========COMPLETE=========');
  }

  createPlayer(name: string, color: string): Player {
    const player = new Player(name);
    player.playerProps.waitingPieces = [];
    player.playerProps.boardPieces = [];
    player.playerProps.completedPieces = [];
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
    const pastValue = this.currentPlayer.playerProps.playerRoll;
    this.currentPlayer.playerProps.playerRoll = -1;
    setTimeout(() => {
      const rollValue = GameUtil.rollDice(4, 1, 0)[0];
      console.log(`Current Value: ${pastValue}`);
      console.log(`Roll : ${rollValue}`);
      this.currentPlayer.playerProps.playerRoll = rollValue;
    }, 100);
  }

  togglePiece(piece: Piece) {
    this.clearSpotActive();
    if (piece.active) {
      const roll: number = this.looper.currentPlayer.playerProps.playerRoll;
      let spot: IBoardSpotData = null;
      if (roll > 0) {
        spot = this.findNextSpot(piece, roll);
        if (spot) {
          spot.active = true;
          if (spot.columnName === 'complete') {
            console.log('move home');
          }
        }
      } else {
        this.gameService.openMessage('roll higher next time');
      }
    }
  }

  findNextSpot(current: Piece, movement: number): IBoardSpotData {
    if (!current.columnName) {
      const spot = this.retrieveSpot(this.currentPlayerColumn, movement);
      if (spot && spot.piece) {
        return null;
      }
      return spot;
    } else {
      const currentSpot = this.retrieveSpot(current.columnName, current.index);
      return this.findNextSpotWithStart(currentSpot, movement);
    }
  }

  findNextSpotWithStart(currentSpot: IBoardSpotData, movement: number): IBoardSpotData {
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
      } else if (nextSpot.isSpecial) {
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

          if (spot.piece) {
            const otherPlayerPiece = spot.piece;
            this.removePieceFromBoard(otherPlayerPiece);
            otherPlayerPiece.player.playerProps.waitingPieces.push(otherPlayerPiece);
          }

          if (spot.columnName === this.playerCompleteColumn) {
            this.removePieceFromBoard(currentPiece);
            this.currentPlayer.playerProps.completedPieces.push(currentPiece);
          } else {
            currentPiece.active = false;
            currentPiece.columnName = spot.columnName;
            currentPiece.index = spot.index;
            spot.piece = currentPiece;
            spot.active = false;
          }

          if (spot.isSpecial) {
            this.gameService.openMessage('Big Winner Rolling Again!!!!');
            this.roll();
            this.piecePicking = true;
          } else {
            this.piecePicking = false;
          }
        }
      });
    }
  }

  get isMoveAvailable(): boolean {
    if (this.piecePicking) {
      for (const piece of this.allPieces) {
        const nextSpot = this.findNextSpot(piece, this.currentPlayer.playerProps.playerRoll);
        if (nextSpot) {
          return true;
        }
      }
    }
    return false;
  }

  get currentPlayer(): Player {
    return this.looper.currentPlayer;
  }

  get otherPlayer(): Player {
    if (this.playerOne.index === this.currentPlayer.index) {
      return this.playerTwo;
    }

    return this.playerOne;
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

  get allPieces(): Piece[] {
    return this.looper.currentPlayer.playerProps.waitingPieces.concat(this.looper.currentPlayer.playerProps.boardPieces);
  }

  retrieveSpot(columnName: string, index: number): IBoardSpotData {
    for (const spot of this.boardSpots) {
      if (spot.columnName === columnName && spot.index === index) {
        return spot;
      }
    }
    return null;
  }

  removePieceFromBoard(piece: Piece) {
    const otherPlayer = piece.player;
    GameUtil.removeFromArray(otherPlayer.playerProps.boardPieces, piece);
    piece.columnName = null;
    piece.index = 0;
    piece.active = false;
  }

  clearSpotActive() {
    this.boardSpots.forEach(spot => {
      spot.active = false;
    });
  }
}

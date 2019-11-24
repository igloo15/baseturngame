import { Random } from 'random-js';

export class GameUtil {

    private static internalRand = new Random();

    public static getRandomInt(min: number, max: number) {
        return this.internalRand.integer(min, max);
    }

    public static randomizeArray<T>(array: T[]): T[] {
        let currentIndex: number = array.length;
        let temporaryValue: T;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = this.internalRand.integer(0, currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

    public static rollDice(maxValue: number, numberOfDice = 1, minValue = 1): number[] {
        const dieRolls = [];
        for (let i = 0; i < numberOfDice; i++) {
            dieRolls.push(this.getRandomInt(minValue, maxValue));
        }
        return dieRolls;
    }

    public static removeFromArray<T>(myArray: T[], item: T) {
        const index = myArray.indexOf(item, 0);
        if (index > -1) {
            myArray.splice(index, 1);
        }
    }
}

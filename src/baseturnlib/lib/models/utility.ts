

export class GameUtil {

    public static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static randomizeArray<T>(array: T[]): T[] {
        let currentIndex: number = array.length;
        let temporaryValue: T;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
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
            dieRolls.push(this.getRandomInt(minValue, maxValue + 1));
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

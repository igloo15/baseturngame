

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

    public static rollDice(amountOnDie: number, numberOfDice: number): number[] {
        const dieRolls = [];
        for (let i = 0; i < numberOfDice; i++) {
            dieRolls.push(this.getRandomInt(1, amountOnDie + 1));
        }
        return dieRolls;
    }
}

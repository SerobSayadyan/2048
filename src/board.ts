export class Board {
	private board: number[][] | string[][] = [
		[" ", " ", " ", " "],
		[" ", " ", " ", " "],
		[" ", " ", " ", " "],
		[" ", " ", " ", " "],
	];

	private boardStr: string = "_";

	private numsCount: number = 4;

	display(): void {
		console.log(this.boardToString());
	}

	boardToString(): string {
		this.boardStr = "";
		this.board.forEach((x) => {
			x.forEach((y) => (this.boardStr = this.boardStr.concat("[").concat(`${y}`).concat("]")));
			this.boardStr = this.boardStr.concat("\n");
		});

		return this.boardStr;
	}

	up(): void {
		let beforeUpBoardStr = this.boardStr;
		for (let row = 1; row < this.board.length; row++) {
			for (let column = 0; column < this.board[row].length; column++) {
				if (this.board[row][column] !== " ") {
					let tmp = this.board[row][column];

					let tmpRow = row - 1;
					while (this.board[tmpRow][column] === " " && tmpRow > 0) {
						tmpRow--;
					}
					this.board[row][column] = " ";

					while (this.board[tmpRow][column] !== " ") {
						tmpRow++;
					}
					this.board[tmpRow][column] = tmp;
					this.checkMatchesWithNext(tmpRow, column, tmpRow - 1, column);
				}
			}
		}
		let afterUpBoardString = this.boardToString();
		if (beforeUpBoardStr !== afterUpBoardString) {
			this.randomizer();
		}
	}

	down(): void {
		let beforeUpBoardStr = this.boardStr;
		for (let row = this.board.length - 2; row >= 0; row--) {
			for (let column = this.board[row].length - 1; column >= 0; column--) {
				if (this.board[row][column] !== " ") {
					let tmp = this.board[row][column];

					let tmpRow = row + 1;

					while (tmpRow < this.board.length - 1 && this.board[tmpRow][column] === " ") {
						tmpRow++;
					}

					this.board[row][column] = " ";

					while (this.board[tmpRow][column] !== " ") {
						tmpRow--;
					}

					this.board[tmpRow][column] = tmp;
					this.checkMatchesWithNext(tmpRow, column, tmpRow + 1, column);
				}
			}
		}
		let afterUpBoardString = this.boardToString();
		if (beforeUpBoardStr !== afterUpBoardString) {
			this.randomizer();
		}
	}

	left(): void {
		let beforeUpBoardStr = this.boardStr;
		for (let column = 1; column < this.board.length; column++) {
			for (let row = 0; row < this.board[column].length; row++) {
				if (this.board[row][column] !== " ") {
					let tmp = this.board[row][column];

					let tmpColumn = column - 1;
					while (this.board[row][tmpColumn] === " " && tmpColumn > 0) {
						tmpColumn--;
					}
					this.board[row][column] = " ";

					while (this.board[row][tmpColumn] !== " ") {
						tmpColumn++;
					}
					this.board[row][tmpColumn] = tmp;
					this.checkMatchesWithNext(row, tmpColumn, row, tmpColumn - 1);
				}
			}
		}
		let afterUpBoardString = this.boardToString();
		if (beforeUpBoardStr !== afterUpBoardString) {
			this.randomizer();
		}
	}

	right(): void {
		let beforeUpBoardStr = this.boardStr;
		for (let column = this.board.length - 2; column >= 0; column--) {
			for (let row = this.board[column].length - 1; row >= 0; row--) {
				if (this.board[row][column] !== " ") {
					let tmp = this.board[row][column];

					let tmpColumn = column + 1;
					while (this.board[row][tmpColumn] === " " && tmpColumn > 0) {
						tmpColumn++;
					}
					this.board[row][column] = " ";

					while (this.board[row][tmpColumn] !== " ") {
						tmpColumn--;
					}
					this.board[row][tmpColumn] = tmp;
					this.checkMatchesWithNext(row, tmpColumn, row, tmpColumn + 1);
				}
			}
		}
		let afterUpBoardString = this.boardToString();
		if (beforeUpBoardStr !== afterUpBoardString) {
			this.randomizer();
		}
	}

    isBoardFull(): boolean {
        let containsSpace = false;
        
        L1:
        for (let row = 0; row < this.board.length; row++) {
            for (let column = 0; column < this.board[row].length; column++) {
                if (this.board[row][column] === " ") {
                    containsSpace = true;
                    break L1;
                } 
            }
            
        }
        
        return containsSpace;
    }

	checkMatchesWithNext(prevRow: number, prevColumn: number, nextRow: number, nextColumn: number): void {
		if (
			nextRow === this.board.length ||
			nextRow < 0 ||
			nextColumn === this.board.length ||
			nextColumn < 0
		) {
			return;
        }
		if (this.board[prevRow][prevColumn] === this.board[nextRow][nextColumn]) {
			let parsedValue = this.board[nextRow][nextColumn] as number;
			this.board[nextRow][nextColumn] = parsedValue + parsedValue;
			this.board[prevRow][prevColumn] = " ";
			if (this.board[nextRow][nextColumn] == 2048) {
				console.log("YOU WON!!!!!");
                process.exit(0);
			}
		}
	}

	randomizer(): void {
		const length = this.board.length;
		let rand1 = Math.floor(Math.random() * length);
		let rand2 = Math.floor(Math.random() * length);
		let runOnetime: boolean = true;

		while (this.board[rand1][rand2] !== " ") {
			rand1 = Math.floor(Math.random() * length);
			rand2 = Math.floor(Math.random() * length);
		}

		if (this.numsCount-- > 0) {
			this.board[rand1][rand2] = 2;
		} else {
			this.numsCount = 4;
			this.board[rand1][rand2] = 4;
		}
	}
}

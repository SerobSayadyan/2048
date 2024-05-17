import { Board } from "./board";
import PromptSync from "prompt-sync";

export class GameInterface {
    private board: Board = new Board();
    private prompt = PromptSync({
        sigint : true
    });
    
    start(): void {
        console.log('Start the game');
        switch(this.prompt("Type any character to start or 'N' to exit: ").trim().toLowerCase()) {
            case 'n' : {
                break;
            }
            default : {
                this.clearConsole();
                this.game();
                break;
            }
        }
    }

    game() {
        this.board.randomizer();
        let countOfPreviousLines = 6;
        while(this.board.isBoardFull()) {
            this.clearPreviousBlockOfConsole(countOfPreviousLines);
            this.board.display();
            switch(this.prompt('U - for up, D - for down, L - for left, R - for right: ').trim().toUpperCase()) {
                case 'U' : {
                    this.board.up()
                    countOfPreviousLines = 6;
                    break;
                }
                case 'D' : {
                    this.board.down()
                    countOfPreviousLines = 6;
                    break;
                }
                case 'L' : {
                    this.board.left()
                    countOfPreviousLines = 6;
                    break;
                }
                case 'R' : {
                    this.board.right()
                    countOfPreviousLines = 6;
                    break;
                } 
                default : {
                    countOfPreviousLines = 7;
                    console.log("WRONG KEY!!");
                }
            }
        
        }
        this.clearPreviousBlockOfConsole(countOfPreviousLines);
        this.board.display();
        console.log("The Board is full!");
        
    }

    clearConsole() {
        process.stdout.write('\u001B[2J\u001B[0;0f');
    }

    clearPreviousLineOfConsole() {
        process.stdout.write('\x1b[1A');
        process.stdout.write('\x1b[2K');
    }

    clearPreviousBlockOfConsole(count: number) {
        while (count-- > 0) {
            this.clearPreviousLineOfConsole();
        }
    }

}


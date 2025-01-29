#!/usr/bin/env node


import { createSpinner } from "nanospinner";
import gradient from "gradient-string";
import inquirer from "inquirer";
import figlet from "figlet";
import colors from "colors";

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Print Skills with gradient colors
function printSkill(languages, header) {
  const availableColors = shuffle(["yellow", "red", "blue", "magenta"]);
  let output = `${header}`.green + " - ";
  languages.forEach((language, index) => {
    const randomColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
    output += language[randomColor];
    if (index !== languages.length - 1) {
      output += ", ";
    }
  });

  console.log(output);
}

// Function to print the Tic-Tac-Toe board
function printBoard(board) {
  console.clear();
  console.log("Tic-Tac-Toe:");
  board.forEach((row, index) => {
    console.log(row.join(" | "));
    if (index < 2) console.log("---------");
  });
  console.log("\n");
}

// Function to check for a winner
function checkWinner(board, player) {
  for (let i = 0; i < 3; i++) {
    // Check rows and columns
    if (
      (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
      (board[0][i] === player && board[1][i] === player && board[2][i] === player)
    )
      return true;
  }

  // Check diagonals
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  )
    return true;

  return false;
}

// Function to check if the board is full
function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== " "));
}

// Function to make the computer's move (random)
function computerMove(board) {
  const emptyCells = [];
  board.forEach((row, rIndex) => {
    row.forEach((cell, cIndex) => {
      if (cell === " ") emptyCells.push([rIndex, cIndex]);
    });
  });

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[row][col] = "O"; // Computer's symbol
}

// Main function for the game
async function main() {
  console.clear();

  // Fancy header
  console.log(
    gradient.rainbow(figlet.textSync("WELCOME!", { horizontalLayout: "full" }))
  );
  console.log(
    gradient.rainbow(figlet.textSync("To My Profile!", { horizontalLayout: "full" }))
  );

  console.log(`
      █▀▄ █▀▀ ▀█▀ ▄▀█ █ █░░ █▀
      █▄▀ ██▄ ░█░ █▀█ █ █▄▄ ▄█
  `.green);

  const spinner = createSpinner("Loading Sir Ritesh's details...").start();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  spinner.success();

  console.log(`
    ${"My name is".green}       - ${"Ritesh Sharma".cyan}
    ${"I'm a".green}            - ${"Full-Stack Developer".cyan}
    ${"Github".green}           - ${"https://github.com/RiteshS1".cyan}
    ${"X".green}                - ${"https://x.com/delphic_RS".cyan}
    ${"LinkedIn".green}         - ${"https://www.linkedin.com/in/ritesh-sharma-8477a424a/".cyan}
  `);

  console.log(`
  ${gradient.vice("Skills Overview:")}
  `);
  printSkill([ 'C', 'C++ ','Python', 'JavaScript', 'TypeScript','English & Hindi ;)'], 'LANGUAGES   ');
  printSkill(['Express', 'Nodejs', 'Reactjs' , 'Tailwind'  ] , 'TECHNOLOGIES');
  printSkill(['Django', 'NextJs', 'Angular'] , 'FRAMEWORKS  ');
  printSkill(['MongoDb', 'PostgreSQL' ] , 'DATABASES   ');
  printSkill(['Docker', 'Kubernetes', 'AWS S3' ] , 'DEVOPS      ');
  printSkill(['Git', 'Github','Figma','Canva','WordPress' ] , 'TOOLS       ');
  console.log();

  // Play a Game prompt
  const { playGame } = await inquirer.prompt([
    {
      type: "confirm",
      name: "playGame",
      message: "Wanna play a game? 🎮",
      default: true,
    },
  ]);

  if (playGame) {
    // Tic-Tac-Toe Game
    const board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    let currentPlayer = "X"; // Player starts first

    while (true) {
      printBoard(board);

      // Player's move
      if (currentPlayer === "X") {
        const { row, col } = await inquirer.prompt([
          {
            type: "input",
            name: "row",
            message: "Enter row (1, 2, or 3):",
            validate: (input) => input >= 1 && input <= 3,
          },
          {
            type: "input",
            name: "col",
            message: "Enter column (1, 2, or 3):",
            validate: (input) => input >= 1 && input <= 3,
          },
        ]);

        if (board[row - 1][col - 1] === " ") {
          board[row - 1][col - 1] = "X"; // Player's symbol
        } else {
          console.log("Cell already occupied. Try again.");
          continue;
        }
      } else {
        // Computer's move
        computerMove(board);
      }

      // Check for winner
      if (checkWinner(board, currentPlayer)) {
        printBoard(board);
        console.log(`${currentPlayer} wins! 🎉`);
        console.log(
            gradient.morning(`
      Thanks for trusting me, you are awesome! 🎉
              `)
          );
          console.log(
            gradient.rainbow(`
      Have a great day! 🌈✨
              `)
          );
        break;
      }

      // Check for draw
      if (isBoardFull(board)) {
        printBoard(board);
        console.log("It's a draw! 😕");
        console.log(
            gradient.morning(`
      Thanks for trusting me, you are awesome! 🎉
              `)
          );
          console.log(
            gradient.rainbow(`
      Have a great day! 🌈✨
              `)
          );
        break;
      }

      // Switch players
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  } else {
    console.log(
      gradient.morning(`
Thanks for trusting me, you are awesome! 🎉
        `)
    );
    console.log(
      gradient.rainbow(`
Have a great day! 🌈✨
        `)
    );
  }

  console.log(`
MADE WITH ♥ BY

██████╗░ ██╗████████╗███████╗░██████╗██╗░░██╗  ░██████╗
██╔══██╗ ██║╚══██╔══╝██╔════╝██╔════╝██║░░██║  ██╔════╝ 
█████╔╝  ██║░░░██║░░░█████╗░░╚█████╗░███████║  ╚█████╗░
██╔ ═██╔░██║░░░██║░░░██╔══╝░░░╚═══██╗██╔══██║  ░╚═══██╗
██║░ ██╔░██║░░░██║░░░███████╗██████╔╝██║░░██║  ██████╔╝ 
╚═╝░░░░░╚═╝░░░╚═╝░░░╚══════╝╚═════╝░╚═╝░░╚═╝  ╚═════╝░

`.blue);

  console.log(
    gradient.rainbow(`
Weaving Dreams with Lines of Code...🧑‍💻
~RS
    `)
  );
}

// Run main
main();

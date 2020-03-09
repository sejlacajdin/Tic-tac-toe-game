import React, { useState, useEffect } from "react";
import Square from "./Square";
import Swal from "sweetalert2";
import LiderBoard from "./LiderBoard";
import Button from "./Button";
import { AiOutlineReload } from "react-icons/ai";

export default function Game() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [players, setPlayers] = useState({
    player1: {
      name: "",
      symbol: "X",
      points: 0
    },
    player2: {
      name: "",
      symbol: "O",
      points: 0
    }
  });

  useEffect(() => {
    showPopUpWindow(setPlayers);
  }, []);

  // useEffect(() => {
  //   Swal.fire({
  //     title: "Insert player names",
  //     html:
  //       '<input id="swal-input1" class="swal2-input">' +
  //       '<input id="swal-input2" class="swal2-input">',
  //     allowOutsideClick:false,
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       let player_1 = Swal.getPopup().querySelector('#swal-input1').value;
  //       let player_2 = Swal.getPopup().querySelector('#swal-input2').value;
  //       if (player_1 === '' || player_2 === '') {
  //         Swal.showValidationMessage(`Player names are missing!`)
  //       }
  //       return [
  //         document.getElementById("swal-input1").value,
  //         document.getElementById("swal-input2").value
  //       ];
  //     },
  //   }).then(res => {
  //     setPlayers({
  //       player1: { name: res.value[0], symbol: "X", points: 0 },
  //       player2: { name: res.value[1], symbol: "O", points: 0 }
  //     });
  //   });
  // }, []);

  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWiner(square);

  function getStatus() {
    if (winner) {
      getResult(players, winner);
      return "Winner " + winner + "!";
    } else if (isBoardFull(square)) {
      return "Game is end!";
    } else {
      return "Next player " + nextSymbol;
    }
  }

  function createSquare(i) {
    return (
      <Square
        value={square[i]}
        onClick={() => {
          if (square[i] != null || winner != null) {
            return;
          }
          const nextSquares = square.slice();
          nextSquares[i] = nextSymbol;
          setSquare(nextSquares);
          setIsXNext(!isXNext);
        }}
      />
    );
  }

  function createResetButton() {
    return (
      <Button
        onClick={() => {
          setSquare(Array(9).fill(null));
          setIsXNext(isXNext);
        }}
      >
        <span>Play again</span>
      </Button>
    );
  }

  function createLiderBoard() {
    if (players.player1.name != "" || players.player2.name != "") {
      return <LiderBoard player1={players.player1} player2={players.player2} />;
    }
  }

  function createReloadButtton() {
    return (
      <Button
        onClick={() => {
          setSquare(Array(9).fill(null));
          setIsXNext(true);
          showPopUpWindow(setPlayers);
        }}
      >
        <AiOutlineReload />
        <span>Reload game</span>
      </Button>
    );
  }
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="gameContent">
        <div className="gameBoard">
          <div className="gameRow">
            {createSquare(0)}
            {createSquare(1)}
            {createSquare(2)}
          </div>
          <div className="gameRow">
            {createSquare(3)}
            {createSquare(4)}
            {createSquare(5)}
          </div>
          <div className="gameRow">
            {createSquare(6)}
            {createSquare(7)}
            {createSquare(8)}
          </div>
        </div>

        <div className="leaderBoard">{createLiderBoard()}</div>
      </div>
      <div className="game_info">{getStatus()}</div>
      <div> {createResetButton()}</div>
      <div>{createReloadButtton()}</div>
    </div>
  );
}

function calculateWiner(squares) {
  const posibilites = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < posibilites.length; i++) {
    const [a, b, c] = posibilites[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

const isBoardFull = squares => {
  for (let square of squares) {
    if (square == null) return false;
  }
  return true;
};

const getResult = (players, winner) => {
  if (players.player1.symbol === winner) {
    players.player1.points += 1;
  } else {
    players.player2.points += 1;
  }
};

function showPopUpWindow(setPlayers) {
  Swal.fire({
    title: "Insert player names",
    html:
      `<input id="swal-input1" class="swal2-input" placehodler="Enter a name of first player">` +
      '<input id="swal-input2" class="swal2-input" placehodler="Enter a name of second player">',
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      let player_1 = Swal.getPopup().querySelector("#swal-input1").value;
      let player_2 = Swal.getPopup().querySelector("#swal-input2").value;
      if (player_1 === "" || player_2 === "") {
        Swal.showValidationMessage(`Player names are missing!`);
      }
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value
      ];
    }
  }).then(res => {
    if (res.value != undefined) {
      setPlayers({
        player1: { name: res.value[0], symbol: "X", points: 0 },
        player2: { name: res.value[1], symbol: "O", points: 0 }
      });
    }
  });
}
window.addEventListener(
  "load",
  function() {
    window.addEventListener(
      "keydown",
      function(event) {
        event = event || window.event || {};
        if (event.keyCode === 27 || event.keyCode === 116) {
          event.preventDefault();
          console.log("...");
          return false;
        } else if (
          event.keyCode === 13 &&
          document.querySelector("html").classList.contains("swal2-shown")
        ) {
          let player_1 = Swal.getPopup().querySelector("#swal-input1").value;
          let player_2 = Swal.getPopup().querySelector("#swal-input2").value;
          if (player_1 !== "" && player_2 !== "") {
            Swal.clickConfirm();
          } else {
            Swal.showValidationMessage(`Player names are missing!`);
          }
        }
      },
      true
    );
  },
  false
);

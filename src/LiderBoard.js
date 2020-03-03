import React, { useState } from "react";

export default function LiderBoard({ player1, player2 }) {
  return (
    <div>
      <h3 className="leaderboard__heading">Liderboard</h3>
      <table>
        <thead>
          <tr>
            <th>{player1.name + " " + player1.symbol}</th>
            <th>{player2.name + " " + player2.symbol}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{player1.points}</th>
            <th>{player2.points}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

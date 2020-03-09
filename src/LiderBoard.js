import React, { useState } from "react";

export default function LiderBoard({ player1, player2 }) {
  return (
    <div>
      <h3 className="leaderboard__heading">Liderboard</h3>
      <table>
        <thead>
          <tr>
            <th>First player</th>
            <th>Second player</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{player1.name + " " + "(" + player1.symbol + ")"}</td>
            <td>{player2.name + " " + "(" + player2.symbol + ")"}</td>
          </tr>
          <tr>
            <td>{player1.points}</td>
            <td>{player2.points}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

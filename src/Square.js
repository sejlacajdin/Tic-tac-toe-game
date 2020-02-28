import React, { useState } from "react";
import { render } from "react-dom";

export default function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

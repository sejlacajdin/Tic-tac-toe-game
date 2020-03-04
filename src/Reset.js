import React, { useState } from "react";

export default function Reset({ onClick }) {
  return (
    <button className="reset__button" onClick={onClick}>
      Play again!
    </button>
  );
}

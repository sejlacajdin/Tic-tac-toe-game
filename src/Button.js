import React from "react";
import { AiOutlineReload } from "react-icons/ai";

export default function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

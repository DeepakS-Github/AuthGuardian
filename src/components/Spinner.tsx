import React from "react";
import { FaSpinner } from "react-icons/fa";

function Spinner({ color="text-white", size = "text-lg" }: { color?: string; size?: string }) {
  return <FaSpinner className={`animate-spin ${color} ${size}`} />;
}

export default Spinner;

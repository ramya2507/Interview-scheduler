import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace){
      setHistory([...(history.slice(0,-1)), newMode]);
    } else {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  }

  const back = () => {
    if(history[history.length - 1] !== initial){
      setHistory(history.slice(0,-1));
      setMode(history[history.length - 2]);
    }

  }

  return { mode, transition, back};
}
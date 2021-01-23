import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace){
      setHistory(prev => ([...(prev.slice(0,-1)), newMode]));
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
    setMode(newMode);
  }

  const back = () => {
    if(history[history.length - 1] !== initial){
      setHistory(prev => [...prev.slice(0,-1)]);
      setMode(history[history.length - 2]);
    }

  }

  return { mode, transition, back };
}
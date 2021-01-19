import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
//const classNames = require("classnames");

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;

  const formatSpots = () => {
    if (spots > 1) {
      return spots + " spots remaining" ;
    } else if (spots === 1) {
      return spots + " spot remaining" ;
    } else {
      return "no spots remaining";
    }
  };

  let dayClass = classNames({
    "day-list__item--full":spots === 0,
    "day-list__item--selected":selected,
    "day-list__item":!selected
  });
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular"> {name}</h2> 
      <h3 className="text--light"> {formatSpots()}</h3>
    </li>
  );
}
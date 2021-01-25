import React from "react";
import DayListItem from "components/DayListItem";
import PropTypes from 'prop-types';

export default function DayList(props) {
  const { days } = props;
  const dayData = days.map(day => {
    return <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
  });

  return <ul>
    {dayData}
  </ul>;

}
DayList.propTypes = {
  days: PropTypes.array.isRequired
};
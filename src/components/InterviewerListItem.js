import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const {name, avatar, selected, setInterviewer} = props;

  let interviewerClass = classNames({
    "interviewers__item--selected":selected,
    "interviewers__item":!selected
  });
  
  return (<li className={interviewerClass} onClick={setInterviewer} data-testid="interviewer-id">
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
  </li>);

}
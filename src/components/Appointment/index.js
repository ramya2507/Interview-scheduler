import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    transition(SAVE);
    const interview = {
      student: name,
      interviewer
    };
    console.log("I am in save");
    props.bookInterview(props.id,interview)
    .then(() =>transition(SHOW));
  }

  return <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (<Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />)}
        {mode === CREATE && (<Form 
          interviewers={props.interviewers}

          onSave={save}
          onCancel={() => back(EMPTY)}
        />)}
        {mode === SAVE && <Status message="SAVING"/>}
  </article>;
}
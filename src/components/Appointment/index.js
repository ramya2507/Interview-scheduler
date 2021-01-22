import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import Status from "./Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function to save a interview
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
  //function to delete a interview
  function cancel() {
    transition(DELETE);
    const interview = {
      student:"",
      interviewer:null
    }
    props.cancelInterview(props.id,interview)
    .then(() =>transition(EMPTY));
  }

  return <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (<Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />)}
        {mode === CREATE && (<Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={cancel}
        />)}
        {mode === SAVE && <Status message="SAVING"/>}
        {mode === DELETE && <Status message="DELETING"/>}
        {mode === CONFIRM && <Confirm 
          message="Do you want to delete?"
          onConfirm={cancel}
          onCancel={back}/>}
        {mode === EDIT && transition(CREATE)}
  </article>;
}
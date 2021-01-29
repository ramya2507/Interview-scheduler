import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import Status from "./Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function to save a interview
  function save(name, interviewer) {
    let edit = (mode ===  EDIT)
    transition(SAVE);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview,edit)
    .then(() =>transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }
  //function to delete a interview
  function cancel() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() =>transition(EMPTY))
    .catch(error => transition(ERROR_DELETE,true));
  }

  return (<article className="appointment" data-testid="appointment">
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
          onCancel={() => back()}
        />)}
        {mode === SAVE && <Status message="SAVING"/>}
        {mode === DELETE && <Status message="DELETING"/>}
        {mode === CONFIRM && <Confirm 
          message="Do you want to delete?"
          onConfirm={cancel}
          onCancel={back}/>}
        {mode === EDIT && (<Form 
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onSave={save}
    onCancel={() => back()} 
    />)}
    {mode === ERROR_SAVE && ( <Error 
      message={"Could not save appointment"} 
      onClose={() => back()}
    />)}
    {mode === ERROR_DELETE && ( <Error 
      message={"Could not delete appointment"} 
      onClose={() => back()}
    />)}
  </article>);
}
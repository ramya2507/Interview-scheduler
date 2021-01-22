import React from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props){
  const { time,interview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

 
  return <article className="appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (<Show 
            student={interview.student}
            interviewer={interview.interviewer.name}
          />)}
        {mode === CREATE && (<Form 
          interviewers={[]}
          onCancel={() => back(EMPTY)}
        />)}
  </article>;
}
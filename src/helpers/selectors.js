export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(stateDay => day === stateDay.name);
  if (!foundDay) {
    return [];
  }
  const filteredAppointments = foundDay.appointments.map(appointment => {
    return state.appointments[appointment];
  });
  return filteredAppointments;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay (state, day) {
  const foundDay = state.days.find(stateDay => day === stateDay.name);
  if (!foundDay || foundDay.interviewers.length === 0) {
    return [];
  }
  const filteredInterviewers = foundDay.interviewers.map(interviewer => {
    return state.interviewers[interviewer];
  });
  return filteredInterviewers;

}
export default function getAppointmentsForDay(state, dayname) {
  const dayObject = state.days.filter( day => day.name === dayname);
  if(dayObject.length === 0){
    return [];
  }
  const filteredAppointments = Object.values(state.appointments).filter(function(appointment){
    return dayObject[0].appointments.indexOf(appointment.id) > -1 
  });

  return filteredAppointments;
};
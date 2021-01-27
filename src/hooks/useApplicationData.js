import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  //function to book an appointment  
  const bookInterview = (id, interview, edit) => {
    const appointment = {...state.appointments[id],interview: { ...interview } };
    const appointments = {...state.appointments,[id]: appointment }; 
    //to update the spots available after axios resolves
    const days = (state.days).map(day => {
      const newDay = {...day}
      if(newDay.appointments.includes(id)){
        newDay.spots--;
      }
      return newDay;
    })
    //using axios to put data in the api
    return axios.put(`http://localhost:8001/api/appointments/${id}`,{"interview":interview})
      .then( () => {
        edit ? setState({...state, appointments}): setState({...state, appointments,days})
      })
  }
   //function to delete interview
   const cancelInterview = (id, interview) => {
    const appointment = {...state.appointments[id],interview: { ...interview } };
    const appointments = {...state.appointments,[id]: appointment };
    //to update the spots available after axios resolves
    const days = (state.days).map(day => {
      const newDay = {...day}
      if(newDay.appointments.includes(id)){
        newDay.spots++;
      }
      return newDay;
    })
    //using axios to delete data in the api
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then( () => {
        setState({...state, appointments, days})
      })    
  }

  //to get data from api
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    })
  },[]);
  return { state , setDay, bookInterview, cancelInterview }
}
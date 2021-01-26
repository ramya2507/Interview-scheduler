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
  const bookInterview = (id, interview) => {
    console.log(id, interview);
    console.log(state.days);
    let days = [...state.days]
    const appointment = {...state.appointments[id],interview: { ...interview } };
    const appointments = {...state.appointments,[id]: appointment };   
    //using axios to put data in the api
    return axios.put(`http://localhost:8001/api/appointments/${id}`,{"interview":interview})
      .then( () => {
        //to update the spots available after axios resolves
        days = state.days.map(day => {
          if(day.appointments.includes(id)){
            day.spots--;
          }
          return day;
        })
        setState({...state,appointments, days});
      })
  }
   //function to delete interview
   const cancelInterview = (id, interview) => {
    console.log(id,interview);
    const appointment = {...state.appointments[id],interview: { ...interview } };
    const appointments = {...state.appointments,[id]: appointment };
    let days = [...state.days]  
     //using axios to delete data in the api
    console.log(state.days);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then( () => {
         //to update the spots available after axios resolves
        days = days.map(day => {
          if(day.appointments.includes(id)){
            day.spots++;
          }
          return day;
        })
        setState({...state, appointments, days})
      })    
  }
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
  //function to change spot
  /*useEffect(() => {
    axios.get("/api/days")
      .then(days => setState(state => ({ ...state, days: days.data })));
  }, [state.appointments])*/

  return { state , setDay, bookInterview, cancelInterview }
}
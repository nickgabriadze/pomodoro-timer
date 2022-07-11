import './Clock.css';
import React, { useEffect, useReducer } from 'react';
import { BreakElement, SessionElement, Timer } from "./components";
import { ACTIONS } from './management';

const reducer = (state, { type }) => {
  switch (type) {
    case ACTIONS.INCBREAK:
      if(state.play) return state;
      if (state.breakLength == null) {
        state.breakLength = 5;
      }
      if (state.breakLength > 59) {
        state.breakLength = 59;
        return state;
      }
      return ({
        ...state,
        breakLength: state.breakLength + 1
      });
    case ACTIONS.DECBREAK:
      if(state.play) return state;
      if (state.breakLength == null) {
        state.breakLength = 5;
      }

      if (state.breakLength < 2) {
        return state
      };
      return ({
        ...state,
        breakLength: state.breakLength - 1
      });
    case ACTIONS.INCSESSION:
      if(state.play) return state;
      if (state.sessionLength == null) {
        state.sessionLength = 25;
        
      }
      if (state.sessionLength > 59) {
        return state;
      }
      return ({
        ...state,
        sessionLength: state.sessionLength + 1,
      
      });

    case ACTIONS.DECSESSION:
      if(state.play) return state;

      if (state.sessionLength == null) {
        state.sessionLength = 25;
        
      }
      if (state.sessionLength < 2) {
        return state;
      }
      return ({
        ...state,
        sessionLength: state.sessionLength - 1,
      });

    case ACTIONS.RESET:
      return ({
        ...state,
        breakLength: 5,
        sessionLength: 25,
        timerTime: 25,
        seconds: '00',
        play: false,
        reset: true
      })

    case ACTIONS.PLAY:
      if(state.play){
        return({
          ...state,
          play: false,
          reset: false
        })
      }

      return ({
        ...state,
        play: true,
        reset: false,
        reset: false

      })

    case ACTIONS.PAUSE:
      return ({
        play: false,
     
      })



      default:
        return state;
  }
}







function Clock() {
  let [{ breakLength = 5, sessionLength = 25, play = false, minutes = sessionLength, seconds = 10, reset = false }, dispatch] = useReducer(reducer, {})


  minutes = minutes > 9 ? minutes : `0${minutes}`
  seconds = seconds > 9 ? seconds : `0${seconds}`
return (
  <>
    <div id="up-downs">
      <BreakElement title={"Break Length"} time={breakLength} dispatch={dispatch} />
      <SessionElement title={"Session Length"} time={sessionLength} dispatch={dispatch} />
    </div>

    <div id="timer-box">
      <Timer title={"Timer"}
        time=
        {`${minutes}:${seconds}`} 
          dispatch={dispatch} />
    </div>
  </>
);
}

export default Clock;

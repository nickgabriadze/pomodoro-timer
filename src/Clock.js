import './Clock.css';
import './components.css'
import React, {useReducer, useState } from 'react';
import { BreakElement, SessionElement} from "./components";
import { ACTIONS } from './management';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRepeat } from "@fortawesome/free-solid-svg-icons";

const reducer = (state, { type }) => {


  switch (type) {
    case ACTIONS.INCBREAK:
      if (state.play) return state;
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
      if (state.play) return state;
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
      if (state.play) return state;
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
      if (state.play) return state;

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
  const [{ breakLength = 5, sessionLength = 25 }, dispatch] = useReducer(reducer, {});
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [play, setPlay] = useState(false);
  const [reset, setReset] = useState(false);
  const [timerClosed, setTimerClosed] = useState(false);
  const [breakTime, setBreakTime] = useState(true);
  const [timerText, setTimerText] = useState('Timer')
  ///Audio file taken from FreeCodeCamp's Codepen Project
  const audioFile = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav")
  let sec = 1000
  audioFile.currentTime = 2
  audioFile.volume = 0.1

  const sessionInterval = setInterval(() => {
    clearInterval(sessionInterval)
    if (minutes != sessionLength & !timerClosed) {
      setMinutes(sessionLength)
      
    }
    if(play & breakTime){
      setTimerText('Study Time')
    }
    if (reset) {
      setReset(false)
      setPlay(false)
      setTimerClosed(false)
      setSeconds(0)
      setMinutes(25)
      setBreakTime(true)
      setTimerText('Timer')
    }
  })

  const interval = setInterval(() => {
    clearInterval(interval)
    if (play) {

      if (seconds > 0) {
          setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59);
       
      }

      if (seconds === 0 & minutes === 0 & breakTime) {
        setTimerText('Break Time')
        setMinutes(breakLength)
        setSeconds(0)
        setBreakTime(false)
        audioFile.play();
      }

      if(!breakTime & seconds === 0 & minutes === 0){
        setTimerText('Study Time')
        setBreakTime(true)
        setMinutes(sessionLength)
        setSeconds(0)
        audioFile.play();
      }
      if(!timerClosed) setTimerClosed(true);
    }
    if (reset) {
      setReset(false)
      setPlay(false)
      setTimerClosed(false)
      setSeconds(0)
      setMinutes(25)
      setBreakTime(true)
      setTimerText('Timer')
    }
  }, sec)



  let formattedMinute = minutes > 9 ? minutes : `0${minutes}`
  let formattedSecond = seconds > 9 ? seconds : `0${seconds}`



  return (
    <>
      <div id="up-downs">
        <BreakElement title={"Break Length"} time={breakLength} dispatch={dispatch} />
        <SessionElement title={"Session Length"} time={sessionLength} dispatch={dispatch} />
      </div>

      <div id="timer-box">
        <div id="actual-timer">
          <div id="timer-label">
            <p id="timer">{timerText}</p>
            <h3 id="time-left">{`${formattedMinute}:${formattedSecond}`}</h3>
          </div>
          <div id="controls">
            <FontAwesomeIcon id="start_stop" icon={faPlay} size='2x' onClick={() => { if (play) { setPlay(false) } else { setPlay(true) } }} />
            <FontAwesomeIcon id="pause" icon={faPause} size='2x' onClick={() => { if (play) { setPlay(false) } else { setPlay(true) } }} />
            <FontAwesomeIcon id="reset" icon={faRepeat} size='2x' onClick={() => { setReset(true);dispatch({type: ACTIONS.RESET})}} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Clock;

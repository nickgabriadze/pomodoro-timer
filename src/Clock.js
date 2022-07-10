import './Clock.css';
import React, { useReducer } from 'react';
import { BreakElement, SessionElement } from "./components";
import { ACTIONS } from './management';

const reducer = (state, { type }) => {
  switch (type) {
    case ACTIONS.INCBREAK:

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
      if (state.breakLength == null) {
        state.breakLength = 5;
      }

      if (state.breakLength < 1) {
        return state
      };
      return ({
        ...state,
        breakLength: state.breakLength - 1
      });
    case ACTIONS.INCSESSION:
      if (state.sessionLength == null) {
        state.sessionLength = 25;
      }
      if (state.sessionLength > 59) {
        return state;
      }
      return ({
        ...state,
        sessionLength: state.sessionLength + 1
      });

    case ACTIONS.DECSESSION:
      if (state.sessionLength == null) {
        state.sessionLength = 25;
      }
      if (state.sessionLength < 1) {
        return state;
      }
      return ({
        ...state,
        sessionLength: state.sessionLength - 1
      });
    default:
      return state;
  }
}


function Clock() {

  const [{ breakLength=5, sessionLength=25 }, dispatch] = useReducer(reducer, {})

  return (
    <>
      <div id="up-downs">
        <BreakElement title={"Break Length"} time={breakLength} dispatch={dispatch} />
        <SessionElement title={"Session Length"} time={sessionLength} dispatch={dispatch} />
      </div>
    </>
  );
}

export default Clock;

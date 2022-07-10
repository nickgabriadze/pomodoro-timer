
import React from 'react';
import "./components.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus, faPlay, faPause, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "./management";

export function BreakElement({ title, time, dispatch }) {
    return (
        <>

            <div id="break-time">

                <p id="break-label">{title}</p>
                <h3 id="brk-actual-time">{time}</h3>
                <div className="break-inc-dec">
                    <element id="break-decrement" onClick={() => dispatch({ type: ACTIONS.DECBREAK })}>
                        <FontAwesomeIcon icon={faSquareMinus} size='2x'></FontAwesomeIcon>
                    </element>
                    <element id="break-increment" onClick={() => dispatch({ type: ACTIONS.INCBREAK })}>
                        <FontAwesomeIcon icon={faSquarePlus} size='2x'></FontAwesomeIcon>
                    </element>
                </div>

            </div>


        </>
    );
}

export function SessionElement({ title, time, dispatch }) {
    return (
        <>

            <div id="session-time">

                <p id="session-label">{title}</p>
                <h3 id="session-actual-time">{time}</h3>
                <div className="session-inc-dec">
                    <element id="session-decrement" onClick={() => dispatch({ type: ACTIONS.DECSESSION })}>
                        <FontAwesomeIcon icon={faSquareMinus} size='2x'></FontAwesomeIcon>
                    </element>
                    <element id="session-increment" onClick={() => dispatch({ type: ACTIONS.INCSESSION })}>
                        <FontAwesomeIcon icon={faSquarePlus} size='2x'></FontAwesomeIcon>
                    </element>
                </div>

            </div>

        </>
    );
}

export function Timer({ title, minutes, seconds, dispatch }) {
    return (
        <>
            <div id="actual-timer">
                <div id="timer-label">
                    <p id="timer">{title}</p>
                    <h3 id="time-left">{minutes}:{seconds}</h3>
                </div>
                <div id="controls">
                    <FontAwesomeIcon id="start_stop" icon={faPlay} size='2x' />
                    <FontAwesomeIcon id="pause" icon={faPause} size='2x' />
                    <FontAwesomeIcon id="reset" icon={faRepeat} size='2x' />
                </div>
            </div>
        </>
    );
}
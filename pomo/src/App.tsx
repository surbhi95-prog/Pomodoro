import React, { useState,useEffect } from 'react';
import './App.css';

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workBtnClicked from "./assets/work-clicked.png";
import workBtn from "./assets/work.png";
import breakBtnClicked from "./assets/break-clicked.png";
import breakBtn from "./assets/break.png";
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.gif";
import closeBtn from "./assets/close.png";

function App() {
  const [timeLeft,setTimeLeft]= useState(25*60);
  const [isRunning,setIsRunning] = useState(false);

  const [isBreak,setIsBreak] = useState(false);

  const [encouragement,setEncouragement] = useState('');
  const cheerMessages = [
    "You can di it",
    "I believe in You",
    "Hwaiting",
    "Keep going"
  ];

  const breakMessages=[
    "Stay hydrated",
    "Snacks,maybe?",
    "Read a book?",
    "Kit kat break!"
  ];

  // FOR SETTING ENCOURAGEMENT MESSAGE
  useEffect(()=>
  {
    let messageInterval : NodeJS.Timeout;
    if(isRunning)
    {
      const message = isBreak? breakMessages: cheerMessages;
      setEncouragement(message[0]); //initially

      let index=1;

      messageInterval = setInterval(()=>
      {
        setEncouragement(message[index]);
        index=(index+1) % message.length;
      },4000);
    }else{
      setEncouragement("");
    }

    return ()=> clearInterval(messageInterval);
  },[isRunning,isBreak]);

  // FOR SEETING TIMER
  useEffect(()=>
  {
    let timer: NodeJS.Timeout;
    if(isRunning && timeLeft > 0)
    {
      timer= setInterval(()=>
      {
        setTimeLeft(c=> c-1);
      },1000);
    }
    return () => clearInterval(timer);
  },[isRunning,timeLeft]);

  const formatTime = (seconds:number): string =>
  {
    const m= Math.floor(seconds/60).toString().padStart(2,'0');

    const s= (seconds % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };

  // TO SWITCH BEWEEN THE MODE
  const switchMode =(breakMode:boolean) =>
  {
    setIsBreak(breakMode);
    setTimeLeft(breakMode? 5*60: 25*60);
    setIsRunning(true);
  }


  const handleClick=()=>
  {
    if(!isRunning)
    {
      setIsRunning(true); // to start the timer
    }
    else{
      setIsRunning(false); // to stop the timer if the button clicked again
      setTimeLeft(isBreak ? 5*60: 25*60); // to reset the time 
    }
  }

  return (
  <div style={{position:'relative'}}>
    <div>
      <button className="colseButton">
        Close
      </button>
    </div>

    <div className='home-content'>
      <div className='home-controls'>
        <button className='image-button' onClick={()=>switchMode(false)}>
          Work
        </button>
        <button className='imge-button' onClick={()=>switchMode(true)}>
          Break
        </button>
      </div>
      <p className={`encouragement-text ${!isRunning ? "hidden":""}`}>
        {encouragement}
      </p>
      <h1 className='home-timer'>{formatTime(timeLeft)}</h1>
      <button className='home-button' onClick={handleClick}>
        Start
      </button>
    </div>

  </div>
  );
}

export default App;

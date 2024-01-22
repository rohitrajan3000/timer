import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function CircularProgressBar() {
  const [percentage, setPercentage] = useState(0);
  const [timer, setTimer] = useState(60);
  const [totalSteps, setTotalSteps] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = (prevPercentage < 100 ? prevPercentage + (100 / totalSteps) : 100);
        return newPercentage;
      });
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, (timer > 0 ? (timer * 1000) : 0) / totalSteps);

    return () => clearInterval(interval);
  }, [timer, totalSteps]);

  const handleIncreaseTimer = () => {
    const additionalTime = 10;
    setTimer((prevTimer) => Math.max(prevTimer + additionalTime, 0));
    setTotalSteps((prevTotalSteps) => prevTotalSteps + additionalTime); 
    setPercentage(0); 
  };

  const handleRestart = () => {
    setTimer(60);
    setTotalSteps(100); 
    setPercentage(0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      
      <div style={{ width: '250px', height: '250px', margin: '100px' }}>
      <h1 style={{textAlign:'center',fontFamily:'sans-serif',color:'d6d6d6',}}>Routine Starts in</h1>
      <h4 style={{textAlign:'center',fontFamily:'sans-serif',color:'gray'}}>Subheading Here</h4>
        
        <CircularProgressbar
          value={percentage}
          
          text={`${timer}s` }
          strokeWidth={4}
          styles={buildStyles({
            rotation: 0.87,
          
            textSize: '10px',
            textAlign:'center',
            pathTransitionDuration: 1,
            pathColor: `#663e76`,
            textColor: '#000000',
            trailColor: '#d6d6d6',
        
            
            backgroundColor: '#3e98c7',
            textAnchor: 'middle', 
          })}
        />

        {/* Buttons */}
        <div style={{ marginTop: '20px', display:'flex'}}>
          <button style={{
            border:'none',
            padding:'10px',
            width:'150px',
            borderRadius:'25px',
            fontSize:'15px',
            marginRight:'50px',
            boxShadow: '4px 10px 8px rgba(0, 0, 0, 0.1)',
            
        }}  onClick={handleIncreaseTimer}>+ 10sec</button>
          <button style={{
            border:'none',
            padding:'10px',
            width:'150px',
            marginLeft:'50px',
            borderRadius:'25px',
            fontSize:'15px',
            boxShadow: '4px 10px 8px rgba(0, 0, 0, 0.1)',
            
        }} onClick={handleRestart}>skip</button>
        </div>
      </div>
    </div>
  );
}

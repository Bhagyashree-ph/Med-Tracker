import React, { useState, useEffect } from 'react';
import MyTypography from '../../assets/themes/MyTypography';

const NumberTicker = ({ endValue, label, id }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [increment, setIncrement] = useState(Math.ceil(endValue / 1000));

  useEffect(() => {
    const updateNumber = () => {
      if (currentValue < endValue) {
        setTimeout(() => {
          let newValue = currentValue + increment;
          if (newValue > endValue) {
            newValue = endValue;
          }
          setCurrentValue(newValue);
          updateNumber();
        }, 50);
      }
    };
    updateNumber();
  }, [id, currentValue, increment, endValue]);

  return (
    <div style={{ margin: 15}}>
      <span style={{ fontSize: 36, fontWeight: 'bold',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        +{currentValue.toLocaleString()}
      </span> 
      <span style={{ fontSize: 18, color: '#666', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MyTypography variant="subtitle1"> {label} </MyTypography>
      </span>
    </div>
  );
};

export default NumberTicker;
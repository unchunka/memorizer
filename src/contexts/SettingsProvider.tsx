// Why using own context provider : https://frontarm.com/james-k-nelson/react-context-performance/

import React, { useState } from 'react';

export const SettingsContext = React.createContext({});

export default function SettingsProvider(props:any) {

  const [wordRange, setWordRange] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const values = {
    wordRange,
    setWordRange,
    countdown,
    setCountdown
  };

  return (
    <SettingsContext.Provider value={values}>{props.children}</SettingsContext.Provider>
  );

}

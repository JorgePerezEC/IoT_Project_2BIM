import React, { createContext, useState } from 'react';

export const SubscribedTopicsContext = createContext();

export const SubscribedTopicsProvider = ({ children }) => {
  const [subscribedTopics, setSubscribedTopics] = useState([]);

  return (
    <SubscribedTopicsContext.Provider value={{ subscribedTopics, setSubscribedTopics }}>
      {children}
    </SubscribedTopicsContext.Provider>
  );
};
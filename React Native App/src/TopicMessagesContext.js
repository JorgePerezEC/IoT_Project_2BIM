import React, { createContext, useState } from "react";

export const TopicMessagesContext = createContext();

export const TopicMessagesProvider = ({ children }) => {
  const [topicMessages, setTopicMessages] = useState([]);

  return (
    <TopicMessagesContext.Provider value={{ topicMessages, setTopicMessages }}>
      {children}
    </TopicMessagesContext.Provider>
  );
};

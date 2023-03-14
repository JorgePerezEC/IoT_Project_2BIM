import React from "react";
import Navigation from "./Navigation";
import { SubscribedTopicsProvider } from './src/SubscribedTopicsContext';

export default function App() {
  return <SubscribedTopicsProvider><Navigation /></SubscribedTopicsProvider>;
}

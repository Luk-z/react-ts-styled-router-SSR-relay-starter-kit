import React from "react";
import Home from "./pages/Home";

interface Props {
  relayEnvironment: any;
}

const App: React.FC<Props> = ({ relayEnvironment }) => {
  return <Home relayEnvironment={relayEnvironment} />;
};

export default App;

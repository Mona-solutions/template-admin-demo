import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import LandingPage from "./components/LandingPage";

function App() {
  const [isJoinUs, setIsJoinUs] = useState(false);

  function handleForm() {
    setIsJoinUs(true);
  }

  return <>{isJoinUs ? <Form /> : <LandingPage onChange={handleForm} />}</>;
}

export default App;

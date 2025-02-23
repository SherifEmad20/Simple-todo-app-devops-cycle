import React, { useState } from "react";
import HomePage from "./components/HomePage";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <HomePage onTaskCreated={handleTaskCreated} />
    </div>
  );
}

export default App;

import TimerForm from "./components/TimerForm";
import Timer from "./components/Timer";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [timers, setTimer] = useState([]);

  const deleteTimer = (timerId) => {
    setTimer((prev) =>
      prev.filter(({ id }) => {
        return id !== timerId;
      }),
    );
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Timers</h1>

      <TimerForm setTimer={setTimer} />

      <div className={styles.timers}>
        {timers.map((timer) => (
          <Timer key={timer.id} deleteTimer={deleteTimer} {...timer} />
        ))}
      </div>
    </main>
  );
}

export default App;

import { useEffect, useState, useRef } from "react";
import styles from "./Timer.module.css";

import Loading from "../Loading";

const Timer = ({ id, name, duration, deleteTimer }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);

  const intervalId = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId.current);
      setRunning(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const handleStartClick = () => {
    setRunning(true);

    intervalId.current = setInterval(() => {
      setTimeLeft((seconds) => seconds - 1);
    }, 1000);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Tem certeza que quer remover o timer "${name}"`)) {
      deleteTimer(id);
    }
  };

  return (
    <section className={styles.timer}>
      <header className={styles.header}>
        <h2>
          {name} <span className={styles.initialDuration}>({duration}s)</span>
        </h2>

        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={handleDeleteClick}
        >
          &#x2715;
        </button>
      </header>

      <div className={styles.details}>
        <div className={styles.timeLeft}>
          <span>{timeLeft !== 0 ? timeLeft : "Finalizado!"}</span>
        </div>

        {running ? (
          <Loading />
        ) : (
          timeLeft > 0 && (
            <button
              className={`${styles.button} ${styles.start}`}
              onClick={handleStartClick}
            >
              Iniciar
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default Timer;

import { useState, useEffect } from "react";
import "./styles.css";
import PasswordBox from "../PasswordBox";
import CopyPasswordButton from "../CopyPasswordButton";
import PasswordHistory from "../PasswordHistory";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [digitsLength, setDigitsLength] = useState(2);
  const [symbolsLength, setSymbolsLength] = useState(2);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const draftPassword = [];

    draftPassword.push(...Array.from({ length: digitsLength }, randomDigit));
    draftPassword.push(...Array.from({ length: symbolsLength }, randomSymbol));
    draftPassword.push(...Array.from({ length: passwordLength }, randomLetter));

    setPassword(
      draftPassword
        .slice(0, passwordLength)
        .sort(() => Math.random() - 0.5)
        .join(""),
    );
  }, [passwordLength, digitsLength, symbolsLength]);

  const isPasswordInHistory = history.includes(password);

  const savePassword = () => {
    if (isPasswordInHistory) return;
    setHistory([password, ...history]);
  };

  const randomDigit = () => {
    const digits = "0123456789";
    return digits[Math.floor(Math.random() * digits.length)];
  };

  const randomSymbol = () => {
    const symbols = "#$&(+,./;?@[]^{})!%*";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const letter = letters[Math.floor(Math.random() * letters.length)];

    return Math.random() >= 0.5 ? letter : letter.toUpperCase();
  };

  return (
    <div>
      <div className="generator-layout">
        <div className="slider">
          <label htmlFor="password-length">Tamanho:</label>
          <input
            key="password-length"
            type="range"
            min={4}
            max={64}
            value={passwordLength}
            onChange={({ target }) => setPasswordLength(Number(target.value))}
          />
          <span>{passwordLength}</span>
        </div>
        <div className="slider">
          <label htmlFor="digits-length">Dígitos:</label>
          <input
            key="digits-length"
            type="range"
            min={0}
            max={10}
            value={digitsLength}
            onChange={({ target }) => setDigitsLength(Number(target.value))}
          />
          <span>{digitsLength}</span>
        </div>
        <div className="slider">
          <label htmlFor="symbols-length">Símbolos:</label>
          <input
            key="symbols-length"
            type="range"
            min={0}
            max={10}
            value={symbolsLength}
            onChange={({ target }) => setSymbolsLength(Number(target.value))}
          />
          <span>{symbolsLength}</span>
        </div>

        <PasswordBox password={password} />
        <CopyPasswordButton password={password} />
        <PasswordHistory
          savePassword={savePassword}
          history={history}
          isPasswordInHistory={isPasswordInHistory}
        />
      </div>
    </div>
  );
};

export default PasswordGenerator;

import "./styles.css";

const PasswordHistory = ({ history, savePassword, isPasswordInHistory }) => {
  return (
    <>
      <div className="save-area">
        <button
          className="save-button"
          onClick={savePassword}
          disabled={isPasswordInHistory}
        >
          Salvar
        </button>
      </div>
      <ul className="history-table">
        {history.map((password) => (
          <li>{password}</li>
        ))}
      </ul>
    </>
  );
};

export default PasswordHistory;

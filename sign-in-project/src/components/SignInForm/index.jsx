import { useState } from "react";

import { signIn } from "../../services/api";

import "./styles.css";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [issSignedIn, setIsSignedIn] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await signIn({ username, password });
      setIsSignedIn(true);
      setError("");
      setUsername("");
      setPassword("");
    } catch (error) {
      setError("Usuário ou Senha inválidos");
    }

    setIsLoading(false);
  };

  return (
    <main>
      {issSignedIn ? (
        <>
          <h1>Olá {username}!</h1>
          <button onClick={() => setIsSignedIn(false)}>Sair</button>
        </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h1>Autenticação</h1>

          {error && <p className="error">{error}</p>}

          <label>
            <p>Nome de Usuário</p>
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>

          <label>
            <p>Senha</p>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>

          <footer>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Autenticando..." : "Entrar"}
            </button>
          </footer>
        </form>
      )}
    </main>
  );
};

export default SignInForm;

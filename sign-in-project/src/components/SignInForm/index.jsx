import "./styles.css";

const SignInForm = () => {
  return (
    <form>
      <h1>Autenticação</h1>

      <p className="error">Usuário ou Senha inválidos</p>

      <label>
        <p>Nome de Usuário</p>
        <input type="text" />
      </label>

      <label>
        <p>Senha</p>
        <input type="password" />
      </label>

      <footer>
        <button type="submit">Entrar</button>
      </footer>
    </form>
  );
};

export default SignInForm;

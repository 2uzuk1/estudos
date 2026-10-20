import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (!username) return;

    setRepos([]);

    fetch(
      `https://api.github.com/users/${username}/repos?type=public&sort=updated&per_page=100`,
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data.sort((a, b) =>
          a.stargazers_count < b.stargazers_count ? 1 : -1,
        );
        setRepos(result);
      });
  }, [username]);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}`,
      );
      const data = await response.json();
      setSearchResults(data.items ?? []);
    } catch {
      return "Not possible to search the user.";
    } finally {
      setIsLoading(false);
    }
    setUsername("");
  };

  return (
    <main>
      <section className="search">
        <input
          type="search"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Username"
        />

        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching ..." : "Search"}
        </button>

        {!!searchResults.length && (
          <>
            <h1>Search Results:</h1>

            <ul>
              {searchResults.map((user) => {
                return (
                  <li key={user.id}>
                    <img src={user.avatar_url} alt={`${user.login}'s Photo`} />
                    {user.login}

                    {username === user.login ? (
                      " ✓"
                    ) : (
                      <button onClick={() => setUsername(user.login)}>
                        Select
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <section className="repos">
        {username ? (
          <>
            <h1>{username}'s repository:</h1>

            {repos.length ? (
              <ul>
                {repos.map((repo) => (
                  <li key={repo.id}>
                    {repo.name} ({repo.stargazers_count})
                  </li>
                ))}
              </ul>
            ) : (
              "Loading ..."
            )}
          </>
        ) : (
          <p>Do a search first</p>
        )}
      </section>
    </main>
  );
}

export default App;

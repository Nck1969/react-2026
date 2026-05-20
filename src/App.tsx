import { Component } from 'react';
import { fetchPokemons } from './api/pokeApi';
import { LS_KEY } from './constants/storage';
import type { PokemonView } from './types/pokemon';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ErrorButton from './components/ErrorButton/ErrorButton';
import styles from './App.module.css';

interface State {
  searchTerm: string;
  items: PokemonView[];
  isLoading: boolean;
  errorMessage: string | null;
}

export default class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      items: [],
      isLoading: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    const saved = localStorage.getItem(LS_KEY) ?? '';
    this.setState({ searchTerm: saved });
    this.loadResults(saved);
  }

  private loadResults(term: string) {
    this.setState({ isLoading: true, errorMessage: null });
    fetchPokemons(term)
      .then((items) => {
        this.setState({ items, isLoading: false });
      })
      .catch((err: unknown) => {
        const msg =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        this.setState({ isLoading: false, errorMessage: msg });
      });
  }

  private handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed === this.state.searchTerm) return;
    localStorage.setItem(LS_KEY, trimmed);
    this.setState({ searchTerm: trimmed });
    this.loadResults(trimmed);
  };

  render() {
    const { searchTerm, items, isLoading, errorMessage } = this.state;
    return (
      <ErrorBoundary>
        <div className={styles.layout}>
          <header className={styles.searchSection}>
            <Search initialTerm={searchTerm} onSearch={this.handleSearch} />
          </header>
          <main className={styles.resultsSection}>
            {isLoading ? (
              <Loader />
            ) : errorMessage ? (
              <ErrorMessage text={errorMessage} />
            ) : (
              <Results items={items} />
            )}
          </main>
          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

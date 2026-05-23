import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPokemons } from '../../api/pokeApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS_KEY } from '../../constants/storage';
import type { PokemonMinimalDetails } from '../../types/pokemon';
import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import styles from './MainPage.module.css';
import { useSelector } from 'react-redux';
import { selectPokemonSelectedCount } from '../../store/selectedPokemonsSlice.ts';
import { Flyout } from '../../components/Flyout/Flyout.tsx';

export default function MainPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1') || 1;
  const hasDetails = searchParams.has('details') || false;

  const [searchTerm, setSearchTerm] = useLocalStorage(LS_KEY, '');
  const [items, setItems] = useState<PokemonMinimalDetails[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedPokemonsCount = useSelector(selectPokemonSelectedCount);

  const loadResults = useCallback((term: string, p: number) => {
    setIsLoading(true);
    setErrorMessage(null);
    fetchPokemons(term, p)
      .then(({ items: fetched, totalPages: total }) => {
        setItems(fetched);
        setTotalPages(total);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setErrorMessage(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
      return;
    }
    loadResults(searchTerm, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page]);

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed === searchTerm) return;
    setSearchTerm(trimmed);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  // TODO: Refactor strange logic with navigation & elements route render
  const handleCardClick = (id: number) => {
    navigate(`/details/${id}?page=${page}&details=${id}`);
  };

  const handleMainPanelClick = () => {
    if (hasDetails) {
      setSearchParams({ page: String(page) });
    }
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Search
          </Link>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>
        </nav>
        <Search initialTerm={searchTerm} onSearch={handleSearch} />
      </header>

      <div
        className={`${styles.content} ${hasDetails ? styles.withDetails : ''}`}
      >
        <div className={styles.listPanel} onClick={handleMainPanelClick}>
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <ErrorMessage text={errorMessage} />
          ) : (
            <>
              <Results items={items} onCardClick={handleCardClick} />
              {!isLoading && totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>

        {hasDetails && (
          <div
            className={styles.detailsPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <Outlet />
          </div>
        )}

        {selectedPokemonsCount ? (
          <Flyout count={selectedPokemonsCount} />
        ) : null}
      </div>

      <ErrorButton />
    </div>
  );
}

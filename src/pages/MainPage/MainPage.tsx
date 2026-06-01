import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS_KEY } from '../../constants/storage';
import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import styles from './MainPage.module.css';
import { useSelector } from 'react-redux';
import { selectedPokemonsCountSelector } from '../../store/selectedPokemonsSlice.ts';
import { Flyout } from '../../components/Flyout/Flyout.tsx';
import { ThemeSwitcher } from '../../components/ThemeSwitcher/ThemeSwitcher.tsx';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '../../store/pokemonApi.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../../utils/getErrorMessage.ts';
import ClearCacheButton from '../../components/ClearCacheButton/ClearCacheButton.tsx';

export default function MainPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1') || 1;
  const hasDetails = searchParams.has('details') || false;

  const [searchTerm, setSearchTerm] = useLocalStorage(LS_KEY, '');

  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useGetPokemonListQuery(!searchTerm ? page : skipToken);

  const {
    isLoading: isPokemonLoading,
    isError: isPokemonError,
    error: pokemonError,
  } = useGetPokemonByNameQuery(searchTerm !== '' ? searchTerm : skipToken);

  const isLoading = isListLoading || isPokemonLoading;
  const isError = isListError || isPokemonError;
  const error = listError || pokemonError;
  const items = searchTerm
    ? [{ name: searchTerm, url: '' }]
    : (listData?.results ?? []);

  const selectedPokemonsCount = useSelector(selectedPokemonsCountSelector);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
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

        <ThemeSwitcher />
      </header>

      <div
        className={`${styles.content} ${hasDetails ? styles.withDetails : ''}`}
      >
        <div className={styles.listPanel}>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorMessage
              text={error ? getErrorMessage(error) : 'Unknown error'}
            />
          ) : (
            <>
              {items ? (
                <>
                  <Results items={items} onCardClick={handleCardClick} />

                  {!isLoading && listData && listData.count > 1 && (
                    <Pagination
                      currentPage={page}
                      totalPages={listData.totalPages}
                      onChange={handlePageChange}
                    />
                  )}
                </>
              ) : null}
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

        {selectedPokemonsCount ? <Flyout /> : null}
      </div>

      <div className={styles.helpers}>
        <ClearCacheButton />

        <ErrorButton />
      </div>
    </div>
  );
}

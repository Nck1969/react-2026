import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchPokemonById } from '../../api/pokeApi';
import type { PokemonDetails } from '../../types/pokemon';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './DetailsPanel.module.css';

export default function DetailsPanel() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    setDetails(null);
    fetchPokemonById(id)
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load details');
        setIsLoading(false);
      });
  }, [id]);

  const handleClose = () => {
    const page = searchParams.get('page') ?? '1';
    navigate(`/?page=${page}`);
  };

  return (
    <div className={styles.panel}>
      <button className={styles.closeBtn} onClick={handleClose} aria-label="Close details">
        ✕
      </button>

      {isLoading && <Loader />}
      {error && <ErrorMessage text={error} />}
      {details && (
        <div className={styles.content}>
          {details.sprite && (
            <img
              className={styles.sprite}
              src={details.sprite}
              alt={details.name}
            />
          )}
          <h2 className={styles.name}>{details.name}</h2>
          <dl className={styles.stats}>
            <dt>Types</dt>
            <dd>{details.types.join(', ')}</dd>
            <dt>Height</dt>
            <dd>{details.height / 10} m</dd>
            <dt>Weight</dt>
            <dd>{details.weight / 10} kg</dd>
            <dt>Abilities</dt>
            <dd>{details.abilities.join(', ')}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}

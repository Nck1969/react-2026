import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './DetailsPanel.module.css';
import { useGetPokemonByNameQuery } from '../../store/pokemonApi.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../../utils/getErrorMessage.ts';

export default function DetailsPanel() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isLoading, error, isError } = useGetPokemonByNameQuery(
    id ?? skipToken
  );

  const handleClose = () => {
    const page = searchParams.get('page') ?? '1';
    navigate(`/?page=${page}`);
  };

  return (
    <div className={styles.panel}>
      <button
        className={styles.closeBtn}
        onClick={handleClose}
        aria-label="Close details"
      >
        ✕
      </button>

      {isLoading && <Loader />}
      {isError && <ErrorMessage text={getErrorMessage(error)} />}
      {data && (
        <div className={styles.content}>
          {data.sprites.front_default && (
            <img
              className={styles.sprite}
              src={data.sprites.front_default}
              alt={data.name}
            />
          )}
          <h2 className={styles.name}>{data.name}</h2>
          <dl className={styles.stats}>
            <dt>Types</dt>
            <dd>{data.types.join(', ')}</dd>
            <dt>Height</dt>
            <dd>{data.height / 10} m</dd>
            <dt>Weight</dt>
            <dd>{data.weight / 10} kg</dd>
            <dt>Abilities</dt>
            <dd>{data.abilities.join(', ')}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}

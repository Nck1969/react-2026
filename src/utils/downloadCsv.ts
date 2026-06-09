import type { PokemonMinimalDetails } from '../types/pokemon.ts';

const downloadCsv = (pokemons: PokemonMinimalDetails[]): void => {
  const fileName = `${pokemons.length}_items.csv`;
  const headers = 'id, name, height, weight, types\n';
  const contentRows = pokemons.map((pokemon) =>
    [
      pokemon.id,
      pokemon.name,
      pokemon.height,
      pokemon.weight,
      pokemon.types.join('|'),
    ].join(', ')
  );
  const csvString = headers.concat(contentRows.join('\n'));

  const blob = new Blob([csvString], { type: 'text/csv' });
  const uri = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', uri);
  link.setAttribute('download', fileName);

  link.click();

  URL.revokeObjectURL(uri);
};

export default downloadCsv;

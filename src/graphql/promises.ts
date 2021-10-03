// https://github.com/apollographql/graphql-tag/issues/144

import doc from './queries/getPokemons.graphql';
import { client } from './client';

const firstTwentyPokemonsQuery = doc.loc?.source.body ?? '';

export const getPokemons = async () => {
    const {
        data: { pokemons },
    } = await client.query(firstTwentyPokemonsQuery).toPromise();

    return pokemons.map((pokemon: any) => ({
        ...pokemon,
        name: pokemon.name.toLowerCase(),
    }));
};

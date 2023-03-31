import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql',
	cache: new InMemoryCache(),
});

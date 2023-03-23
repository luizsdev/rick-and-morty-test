import { Character } from '@/types/Character';
import { GetServerSideProps } from 'next';

interface PageProps {
	character: Character | null;
}

export default function Page({ character }: PageProps) {
	return <h1>{character?.name}</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let id = context.params?.id;
	if (id) {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character/${id}`
		);
		const data = await response.json();
		return {
			props: {
				character: data,
			},
		};
	}
	return {
		props: {
			character: null,
		},
	};
};

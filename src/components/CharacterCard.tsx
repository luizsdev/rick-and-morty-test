import { Character } from '@/types/Character';
import {
	Dna,
	Heart,
	Person,
	Planet,
	Question,
	Skull,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterCardProps {
	character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
	const checkAlive = () => {
		if (character.status === 'Alive') {
			return <Heart color='green' size={25} />;
		} else if (character.status === 'Dead') {
			return <Skull color='red' size={25} />;
		} else {
			return <Question size={25} />;
		}
	};
	return (
		<Link
			href={`/character/${character.id}`}
			className='animate-fade-in-left w-80 bg-white border border-gray-200 rounded-2xl shadow dark:bg-slate-800 dark:border-gray-700 [&_img]:hover:scale-[1.09] '>
			<div className='rounded-t-2xl relative h-80 w-full block overflow-hidden '>
				<Image
					className='object-cover  transition-transform duration-250 '
					alt='character'
					fill
					src={character.image}
				/>
			</div>
			<div className='p-5'>
				<div className='flex flex-row gap-1'>
					<h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-center'>
						{character.name}
					</h1>
				</div>
				<h1 className='mb-3 font-normal text-lg text-gray-700 dark:text-gray-400 gap-2 flex flex-row items-center justify-start'>
					{checkAlive()}
					{character.status}
				</h1>
				<h1 className='mb-3 font-normal text-lg text-gray-700 dark:text-gray-400 gap-2 flex flex-row items-center justify-start'>
					<Dna color='cyan' size={25} />
					{<p className='text-md'> {character.species}</p>}
				</h1>
				<h1 className='mb-3 font-normal text-lg text-gray-700 dark:text-gray-400 gap-2 flex flex-row items-center justify-start'>
					<Planet color='yellow' size={25} />
					{<p className='text-md'> {character.origin.name}</p>}
				</h1>
			</div>
		</Link>
	);
};

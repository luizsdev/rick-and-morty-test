import { Character } from '@/types/Character';
import { Episode } from '@/types/Episode';
import { AiOutlineClockCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { BiPlanet } from 'react-icons/bi';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
	character: Character;
	episode: Episode;
}

export default function Page({ character, episode }: PageProps) {
	const checkAlive = () => {
		if (character.status === 'Alive') {
			return <div className='w-4 bg-green-500 rounded-full h-4' />;
		} else if (character.status === 'Dead') {
			return <div className='w-4 bg-red-500 rounded-full h-4' />;
		} else {
			return <div className='w-4 bg-gray-500 rounded-full h-4' />;
		}
	};
	return (
		<>
			<main className='h-screen w-screen bg-gradient-to-b from-slate-50 to-emerald-200 flex items-center  justify-center gap-10 '>
				<div className='animate-fade-in-left shadow-2xl min-h-5/6  min-w-2/6 bg-slate-700  rounded-3xl flex  item-start justify-start flex-col gap-0 sm:gap-16'>
					<div className=' flex items-center justify-start flex-col md:flex-row p-5 gap-2'>
						<Image
							width={270}
							height={190}
							className='rounded-full shadow-2xl'
							alt='character'
							src={character?.image}
						/>
						<div className='w-full flex flex-col items-center  justify-center gap-0 sm:gap-1'>
							<h1 className='xl:text-3xl lg:text-xl md:text-md md:text-lg 2xl:text-3xl   text-white flex items-center '>
								{character?.name}
							</h1>
							<div className='xl:text-3xl lg:text-xl md:text-lg  text-md flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-2 text-slate-400'>
								{checkAlive()}
								{character?.status}
								{' - '}
								{character?.species}
							</div>
						</div>
					</div>
					<div className='flex flex-col items-start justify-center ml-5  mt-2'>
						<div className='flex flex-col gap-12'>
							<div className='flex flex-col items-start justify-center gap-3'>
								<h1 className='text-white  xl:text-3xl lg:text-xl md:text-xl text-lg items-start sm:items-center font-bold flex flex-col sm:flex-row gap-2'>
									<GoLocation color='cyan' size={30} /> Last Known Location:
								</h1>
								<p className=' xl:text-3xl lg:text-xl md:text-lg text-md text-slate-400 font-normal'>
									{character.location.name}
								</p>
							</div>
							<div className='flex flex-col items-start justify-center gap-3'>
								<h1 className='text-white xl:text-3xl lg:text-xl md:text-xl text-lg items-start sm:items-center font-bold flex flex-col sm:flex-row gap-2'>
									{' '}
									<BiPlanet color='eab676' size={30} /> Origin:
								</h1>
								<p className=' xl:text-3xl lg:text-xl md:text-md text-lg text-slate-400 font-normal'>
									{character.origin.name}
								</p>
							</div>
							<div className='flex flex-col items-start justify-center gap-3'>
								<h1 className='text-white xl:text-3xl lg:text-xl md:text-md text-xl items-start sm:items-center font-bold flex flex-col sm:flex-row gap-2'>
									{' '}
									<AiOutlineClockCircle color='beige' size={30} /> First Seen
									in:
								</h1>
								<p className=' xl:text-3xl lg:text-xl md:text-md text-lg text-slate-400 font-normal'>
									{episode.name}
									{' - '}
									{episode.episode}
								</p>
							</div>
						</div>
					</div>
					<div className='flex flex-row items-center justify-start '>
						<Link
							href={'/#title'}
							type='button'
							className='flex shadow-2xl justify-center  items-center gap-2 xl:m-8  w-full sm:w-1/2  focus:outline-none focus:ring-4  font-medium rounded-full text-sm  text-center m-5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>
							<AiOutlineArrowLeft color='white' size={30} />{' '}
							<p className='xl:text-3xl lg:text-xl md:text-xl text-sm font-bold  text-white '>
								Go Back
							</p>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let id = context.params?.id;
	if (id) {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character/${id}`
		);
		const data = await response.json();
		const episode = await fetch(data.episode[0]);
		const episodeData = await episode.json();
		return {
			props: {
				character: data,
				episode: episodeData,
			},
		};
	}
	return {
		props: {
			character: null,
		},
	};
};

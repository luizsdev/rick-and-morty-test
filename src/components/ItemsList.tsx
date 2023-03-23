import { useWindowSize } from '@/hooks/useWindowSize';
import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { CharacterCard } from './CharacterCard';

interface ItemsListProps {
	pageCount: number;
	fullData: Character[];
}
interface PageProp {
	selected: number;
}

export const ItemsList = ({ pageCount, fullData }: ItemsListProps) => {
	const { width } = useWindowSize();
	const [pageChars, setPageChars] = useState<Character[]>(fullData.slice(0, 8));
	const [page, setPage] = useState(0);
	const handlePageChange = ({ selected }: PageProp) => {
		setPage(selected);
		setPageChars(fullData.slice(selected * 10, selected * 10 + 10));
	};
	return (
		<>
			<div className='flex flex-wrap gap-5 justify-center md:p-5 p-2'>
				{pageChars.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</div>

			<ReactPaginate
				breakLabel='...'
				nextLabel='>'
				forcePage={page}
				pageRangeDisplayed={1}
				marginPagesDisplayed={width && width > 768 ? 2 : 1}
				pageCount={pageCount}
				onPageChange={handlePageChange}
				previousLinkClassName='bg-slate-800 rounded-2xl p-1 md:p-2 text-white'
				nextLinkClassName='bg-slate-800 rounded-2xl p-1 md:p-2 text-white shadow-2xl'
				previousLabel='<'
				containerClassName='flex gap-2 justify-center items-center  bg-slate-600 rounded-2xl p-1 md:p-2 text-white shadow-2xl'
				pageClassName='bg-slate-800 text-white rounded-2xl w-10 p-1 md:p-2 flex items-center justify-center '
				activeClassName='bg-slate-900 rounded-2xl p-1 md:p-2 text-white flex items-center justify-center'
				previousClassName='bg-slate-800 rounded-2xl p-1 md:p-2 text-white '
				nextClassName='bg-slate-800 rounded-2xl p-1 md:p-2 text-white'
				breakClassName='bg-slate-800 rounded-2xl w-10 p-1 md:p-2 flex items-center justify-center'
			/>
		</>
	);
};

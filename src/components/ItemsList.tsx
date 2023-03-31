import { useWindowSize } from '@/hooks/useWindowSize';
import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';
import { CharacterCard } from './CharacterCard';
import { FilterModal } from './FilterModal';

interface ItemsListProps {
	pageCount: number;
	fullData: Character[];
	itemsPerPage: number;
}
interface PageProps {
	selected: number;
}

export const ItemsList = ({
	pageCount,
	fullData,
	itemsPerPage,
}: ItemsListProps) => {
	const rows: any = [];
	const [filterGender, setFilterGender] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [currentFilter, setCurrentFilter] = useState<Character[]>([]);
	const [isFiltering, setIsFiltering] = useState(false);
	const { width } = useWindowSize();
	const [pageChars, setPageChars] = useState<Character[]>(
		fullData.slice(0, itemsPerPage)
	);
	const [filtered, setFiltered] = useState<Character[]>([]);
	const [currentPageCount, setCurrentPageCount] = useState(pageCount);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (e.target.value.length != 0 && !isFiltering) {
			console.log(isFiltering);
			const filteredData = fullData.filter((character) => {
				return character.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			setPageChars(filteredData.slice(0, itemsPerPage));
			setFiltered(filteredData);
			setCurrentPageCount(Math.ceil(filteredData.length / itemsPerPage));
			setPage(0);
		} else if (e.target.value.length != 0 && isFiltering) {
			const filteredData = currentFilter.filter((character) => {
				return character.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			setPageChars(filteredData.slice(0, itemsPerPage));
			setCurrentPageCount(Math.ceil(filteredData.length / itemsPerPage));
			setPage(0);
		} else if (e.target.value.length === 0 && isFiltering) {
			setPageChars(currentFilter.slice(0, itemsPerPage));
			setCurrentPageCount(Math.ceil(filtered.length / itemsPerPage));
			setPage(0);
		} else {
			setPageChars(fullData.slice(0, itemsPerPage));
			setCurrentPageCount(pageCount);
			setPage(0);
		}
	};
	const handlePageChange = ({ selected }: PageProps) => {
		if (search.length != 0) {
			for (let i = 0; i < filtered.length; i += 5) {
				const chunk = filtered.slice(i, i + 5);
				rows.push(chunk);
			}
			setPage(selected);
			setPageChars(
				filtered.slice(
					selected * itemsPerPage,
					selected * itemsPerPage + itemsPerPage
				)
			);
		} else if (isFiltering) {
			for (let i = 0; i < currentFilter.length; i += 5) {
				const chunk = currentFilter.slice(i, i + 5);
				rows.push(chunk);
			}
			setPage(selected);
			setPageChars(
				currentFilter.slice(
					selected * itemsPerPage,
					selected * itemsPerPage + itemsPerPage
				)
			);
		} else {
			for (let i = 0; i < fullData.length; i += 5) {
				const chunk = fullData.slice(i, i + 5);
				rows.push(chunk);
			}
			setPage(selected);
			setPageChars(
				fullData.slice(
					selected * itemsPerPage,
					selected * itemsPerPage + itemsPerPage
				)
			);
		}
	};
	const handleFiltering = () => {
		setIsFiltering(true);
		if (filterGender === 'Gender' && filterStatus.length != 0) {
			const filteredData = fullData.filter((character) => {
				return character.status.toLowerCase() === filterStatus.toLowerCase();
			});
			setPageChars(filteredData.slice(0, itemsPerPage));
			setFiltered(filteredData);
			setCurrentFilter(filteredData);
			setCurrentPageCount(Math.ceil(filteredData.length / itemsPerPage));
			setPage(0);
		} else if (filterStatus === 'Status' && filterGender.length != 0) {
			const filteredData = fullData.filter((character) => {
				return character.gender.toLowerCase() === filterGender.toLowerCase();
			});
			setPageChars(filteredData.slice(0, itemsPerPage));
			setFiltered(filteredData);
			setCurrentFilter(filteredData);
			setCurrentPageCount(Math.ceil(filteredData.length / itemsPerPage));
			setPage(0);
		} else if (filterGender.length != 0 && filterStatus.length != 0) {
			const filteredData = fullData.filter((character) => {
				return (
					character.status.toLowerCase() === filterStatus.toLowerCase() &&
					character.gender.toLowerCase() === filterGender.toLowerCase()
				);
			});
			setPageChars(filteredData.slice(0, itemsPerPage));
			setFiltered(filteredData);
			setCurrentFilter(filteredData);
			setCurrentPageCount(Math.ceil(filteredData.length / itemsPerPage));
			setPage(0);
		}
	};
	return (
		<>
			<div className="flex flex-col sm:flex-row  items-center">
				<form>
					<label
						htmlFor="default-search"
						className="mb-2 text-sm font-medium = sr-only text-white"
					>
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<BiSearch color="white" size={35} />
						</div>
						<input
							type="search"
							onChange={handleSearch}
							id="default-search"
							className="block w-60 m-2  sm:w-96 p-4 pl-10 text-xl border sm  rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
							placeholder="  Search character"
							required
						/>
					</div>
				</form>
				<FilterModal>
					<h3 className="font-bold text-lg text-center">Filter Characters</h3>
					<select
						value={filterStatus}
						className="select select-bordered w-full max-w-none mt-5 "
						onChange={(e) => {
							setFilterStatus(e.target.value);
						}}
					>
						<option disabled selected>
							Status
						</option>
						<option>Alive</option>
						<option>Dead</option>
					</select>

					<select
						value={filterGender}
						className="select select-bordered w-full max-w-none mt-5"
						onChange={(e) => {
							setFilterGender(e.target.value);
						}}
					>
						<option selected>Gender</option>
						<option>Male</option>
						<option>Female</option>
						<option>Genderless</option>
						<option>Unknown</option>
					</select>
					<div className="modal-action flex justify-between ">
						<label
							htmlFor="my-modal-6"
							className="btn bg-slate-600 text-white hover:bg-slate-700 border-0"
							onClick={() => {
								setFilterGender('Gender');
								setFilterStatus('Status');
								setPageChars(fullData.slice(0, itemsPerPage));
								setCurrentFilter([]);
								setIsFiltering(false);
								setPage(0);
								setCurrentPageCount(pageCount);
							}}
						>
							Clear Filters
						</label>
						<label
							htmlFor="my-modal-6"
							className="btn bg-blue-700 text-white hover:bg-blue-800 border-0"
							onClick={handleFiltering}
						>
							Apply
						</label>
					</div>
				</FilterModal>
			</div>
			<div className="flex flex-wrap gap-5 max-w-7xl  justify-center md:p-5 p-2">
				{pageChars.length != 0 ? (
					pageChars.map((character) => (
						<CharacterCard key={character.id} character={character} />
					))
				) : (
					<h1 className="font-bold text-5xl italic text-white animate-fade-in-left-fast">
						NO CHARACTER WAS FOUND
					</h1>
				)}
			</div>

			{pageChars.length > 0 && (
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					forcePage={page}
					pageRangeDisplayed={1}
					marginPagesDisplayed={width && width > 768 ? 2 : 1}
					pageCount={currentPageCount}
					onPageChange={handlePageChange}
					previousLinkClassName="bg-slate-800 rounded-2xl p-1 md:p-2 text-white"
					nextLinkClassName="bg-slate-800 rounded-2xl p-1 md:p-2 text-white shadow-2xl"
					previousLabel="<"
					containerClassName="flex gap-2 justify-center items-center  bg-slate-600 rounded-2xl p-1 md:p-2 text-white shadow-2xl"
					pageClassName="bg-slate-800 text-white rounded-2xl w-10 p-1 md:p-2 flex items-center justify-center "
					activeClassName="bg-slate-900 rounded-2xl p-1 md:p-2 text-white flex items-center justify-center"
					previousClassName="bg-slate-800 rounded-2xl p-1 md:p-2 text-white min-w-32  "
					nextClassName="bg-slate-800 rounded-2xl p-1 md:p-2 text-white  min-w-32 "
					breakClassName="bg-slate-800 rounded-2xl w-10 p-1 md:p-2 flex items-center justify-center "
				/>
			)}
		</>
	);
};

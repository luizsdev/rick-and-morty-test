import { useWindowSize } from "@/hooks/useWindowSize";
import { Character } from "@/types/Character";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CharacterCard } from "./CharacterCard";

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
  const { width } = useWindowSize();
  const [pageChars, setPageChars] = useState<Character[]>(
    fullData.slice(0, itemsPerPage)
  );
  const [filtered, setFiltered] = useState<Character[]>([]);
  const [currentPageCount, setCurrentPageCount] = useState(pageCount);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length != 0) {
      const filteredData = fullData.filter((character) => {
        return character.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setPageChars(filteredData.slice(0, itemsPerPage));
      setFiltered(filteredData);
      setCurrentPageCount(Math.ceil(filteredData.length / itemsPerPage));
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
    } else {
      setPage(selected);
      setPageChars(
        fullData.slice(
          selected * itemsPerPage,
          selected * itemsPerPage + itemsPerPage
        )
      );
    }
  };
  return (
    <>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlass color="white" size={25} />
          </div>
          <input
            type="search"
            onChange={handleSearch}
            id="default-search"
            className="block w-60 sm:w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search character"
            required
          />
        </div>
      </form>
      <div className="flex flex-wrap gap-5 max-w-7xl  justify-center md:p-5 p-2">
        {pageChars.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

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
        previousClassName="bg-slate-800 rounded-2xl p-1 md:p-2 text-white "
        nextClassName="bg-slate-800 rounded-2xl p-1 md:p-2 text-white"
        breakClassName="bg-slate-800 rounded-2xl w-10 p-1 md:p-2 flex items-center justify-center"
      />
    </>
  );
};

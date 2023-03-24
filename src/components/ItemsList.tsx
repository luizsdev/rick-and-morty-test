import { useWindowSize } from "@/hooks/useWindowSize";
import { Character } from "@/types/Character";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
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

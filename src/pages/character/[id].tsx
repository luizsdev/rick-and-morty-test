import { Character } from "@/types/Character";
import { Episode } from "@/types/Episode";

import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  character: Character;
  episode: Episode;
}

export default function Page({ character, episode }: PageProps) {
  console.log(episode);
  const checkAlive = () => {
    if (character.status === "Alive") {
      return <div className="w-4 bg-green-500 rounded-full h-4" />;
    } else if (character.status === "Dead") {
      return <div className="w-4 bg-red-500 rounded-full h-4" />;
    } else {
      return <div className="w-4 bg-gray-500 rounded-full h-4" />;
    }
  };
  return (
    <>
      <main className="h-screen w-screen bg-slate-800 flex items-center justify-center  ">
        <div className="2xl:h-5/6 xl:h-4/6 lg:h-3/6  w-3/6 sm:w-2/6 bg-slate-600  rounded-3xl flex item-start justify-start flex-col gap-0  xl:gap-10 ">
          <div className=" flex flex-col sm:flex-row items-center justify-start ">
            <Image
              width={150}
              height={150}
              className=" rounded-2xl sm:rounded-t-0 lg:w-40 "
              alt="character"
              src={character?.image}
            />
            <div className="w-full flex flex-col items-center justify-center sm:gap-1">
              <h1 className="xl:text-3xl lg:text-xl md:text-md text-sm 2xl:text-4xl  text-white flex items-center sm:gap-3">
                {character?.name}
              </h1>
              <div className="xl:text-3xl lg:text-xl 2xl:text-4xl  md:text-md text-sm flex flex-row items-center justify-center gap-2 text-slate-400">
                {checkAlive()}
                {character?.status}
                {" - "}
                {character?.species}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center  mt-2">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center justify-center  sm:gap-3 ">
                <h1 className="text-white xl:text-xl 2xl:text-4xl  lg:text-xl md:text-md text-sm font-bold flex flex-row gap-2"></h1>
                <p className=" xl:text-xl lg:text-xl 2xl:text-3xl md:text-md text-sm text-slate-400 font-normal">
                  {character.location.name}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center sm:gap-3">
                <h1 className="text-white xl:text-xl 2xl:text-4xl lg:text-xl md:text-md text-sm font-bold flex flex-row gap-2">
                  {" "}
                </h1>
                <p className=" xl:text-xl lg:text-xl 2xl:text-3xl md:text-md text-sm text-slate-400 font-normal">
                  {character.origin.name}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center sm:gap-3">
                <h1 className="text-white xl:text-xl 2xl:text-4xl lg:text-xl md:text-md text-sm font-bold flex flex-row gap-2">
                  {" "}
                </h1>
                <p className=" xl:text-xl lg:text-xl 2xl:text-3xl md:text-md text-sm text-slate-400 font-normal">
                  {episode.name}
                  {" - "}
                  {episode.episode}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-center max-h-10 mt-2 sm:mt-0">
            <Link
              href={"/#title"}
              type="button"
              className="flex  justify-center h-10 items-center sm:gap-2  w-1/2 2xl:w-2/3 2xl:mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm  text-center mr-2  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <p className="xl:text-xl 2xl:text-3xl lg:text-xl md:text-md text-xs  font-bold">
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

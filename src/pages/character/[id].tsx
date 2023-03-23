import { Character } from "@/types/Character";
import { Episode } from "@/types/Episode";
import { AiOutlineClockCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BiPlanet } from "react-icons/bi";
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
      <main className="h-screen w-screen bg-slate-800 flex items-center  justify-center gap-10 ">
        <div className="animate-fade-in-left h-5/6 w-2/6 bg-slate-600  rounded-3xl flex  item-start justify-start flex-col gap-0 sm:gap-16">
          <div className=" flex items-center justify-start flex-col md:flex-row">
            <Image
              width={150}
              height={500}
              className="rounded-2xl md:rounded-tl-3xl md:rounded-br-3xl"
              alt="character"
              src={character?.image}
            />
            <div className="w-full flex flex-col items-center  justify-center gap-0 sm:gap-1">
              <h1 className="xl:text-3xl lg:text-xl md:text-md md:text-sm   text-white flex items-center gap-">
                {character?.name}
              </h1>
              <div className="xl:text-3xl lg:text-xl md:text-md text-sm flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-2 text-slate-400">
                {checkAlive()}
                {character?.status}
                {" - "}
                {character?.species}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center ml-5  mt-2">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-white   xl:text-3xl lg:text-xl md:text-md text-xs items-center font-bold flex flex-col sm:flex-row gap-2">
                  <GoLocation size={30} /> Last Known Location:
                </h1>
                <p className=" xl:text-3xl lg:text-xl md:text-md text-sm text-slate-400 font-normal">
                  {character.location.name}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-white xl:text-3xl lg:text-xl md:text-md text-sm items-center font-bold flex flex-col sm:flex-row gap-2">
                  {" "}
                  <BiPlanet size={30} /> Origin:
                </h1>
                <p className=" xl:text-3xl lg:text-xl md:text-md text-sm text-slate-400 font-normal">
                  {character.origin.name}e
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-white xl:text-3xl lg:text-xl md:text-md text-sm items-center font-bold flex flex-col sm:flex-row gap-2">
                  {" "}
                  <AiOutlineClockCircle size={30} /> First Seen in:
                </h1>
                <p className=" xl:text-3xl lg:text-xl md:text-md text-sm text-slate-400 font-normal">
                  {episode.name}
                  {" - "}
                  {episode.episode}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center  ">
            <Link
              href={"/#title"}
              type="button"
              className="flex  justify-center h- items-center gap-2 xl:m-8  w-full sm:w-1/2  focus:outline-none focus:ring-4  font-medium rounded-full text-sm  text-center mr-2  mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <AiOutlineArrowLeft color="white" size={30} />{" "}
              <p className="xl:text-3xl lg:text-xl md:text-md text-sm font-bold text-white">
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

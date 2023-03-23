import { Character } from "@/types/Character";
import { BsPerson } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { BiHeart, BiPlanet, BiQuestionMark } from "react-icons/bi";
import { IoSkullOutline } from "react-icons/io5";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const checkAlive = () => {
    if (character.status === "Alive") {
      return <BiHeart size={25} color="lime" />;
    } else if (character.status === "Dead") {
      return <IoSkullOutline size={25} color="red" />;
    } else {
      return <BiQuestionMark color="cyan" size={25} />;
    }
  };
  return (
    <Link
      href={`/character/${character.id}`}
      className="animate-fade-in-left w-72 sm:w-64  border rounded-2xl shadow bg-slate-800 border-gray-700 [&_img]:hover:scale-[1.09] "
    >
      <div className="rounded-t-2xl relative h-56 w-full block overflow-hidden ">
        <Image
          className="object-cover  transition-transform duration-250 "
          alt="character"
          fill
          src={character.image}
        />
      </div>
      <div className="p-5">
        <div className="flex flex-row gap-1">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white flex items-center justify-center">
            {character.name}
          </h1>
        </div>
        <h1 className="mb-3 font-normal text-lg text-gray-400 gap-2 flex flex-row items-center justify-start">
          <p className="text-xl flex flex-row items-center justify-items-center gap-2  text-slate-300">
            {checkAlive()}
            {character.status}
          </p>
        </h1>
        <h1 className="mb-3 font-normal text-lg text-gray-400 gap-2 flex flex-row items-center justify-start">
          {
            <p className="text-xl flex items-center justify-between gap-2  text-slate-300">
              <BsPerson size={25} color="white" /> {character.species}
            </p>
          }
        </h1>
        <h1 className="mb-3 font-normal text-lg text-gray-400 gap-2 flex flex-row items-center justify-start">
          {
            <p className="text-xl flex items-center justify-center gap-2 text-slate-300">
              {" "}
              <BiPlanet size={25} color="#ffcc00" /> {character.origin.name}
            </p>
          }
        </h1>
      </div>
    </Link>
  );
};

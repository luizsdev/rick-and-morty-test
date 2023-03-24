import Link from "next/link";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Character } from "@/types/Character";
import { AiOutlineArrowDown } from "react-icons/ai";
import { ItemsList } from "@/components/ItemsList";
import ReactPaginate from "react-paginate";
import { Parallax } from "react-parallax";
import { GetStaticProps } from "next";

interface HomeProps {
  characters: Character[];
}
const inter = Inter({
  weight: ["100", "200"],
  subsets: ["latin"],
});

export default function Home({ characters }: HomeProps) {
  return (
    <>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <div className={inter.className}>
        <Parallax blur={10} bgImage="/vector.jpg" strength={500}>
          <div className="flex items-center justify-center flex-col sm:flex-row h-screen px-4 gap-10 sm:gap-0">
            <div className="animate-fade-in-left-slow ">
              <h1 className="text-4xl font-bold md:text-7xl xl:text-9xl text-center sm:text-left">
                Welcome to the <br className="hidden 2xl:block" />
                <span className="text-white  font-bold">Alien Catalog</span>
              </h1>
            </div>
            <a className="animate-fade-in-left-slow" href="#title">
              <AiOutlineArrowDown className="animate-bounce   " size={200} />
            </a>
          </div>
        </Parallax>
        <main className="scroll-smooth bg-gradient-to-b from-gray-900 to-gray-600 flex gap-5 flex-col min-h-screen items-center justify-start">
          <div className="w-full bg-slate-600 h-28 flex items-center justify-center">
            <p
              className="text-xl md:text-2xl xl:text-4xl bg-gradient-to-b from-stone-50 to-zinc-200 bg-clip-text text-transparent font-bold "
              id="title"
            >
              RICK AND MORTY CHARACTERS
            </p>
          </div>
          <ItemsList
            itemsPerPage={8}
            pageCount={Math.ceil(characters.length / 10)}
            fullData={characters}
          />
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageCount: number = 1;
  const fetchSinglePage = async (page: number) => {
    const pageData = await api
      .get(`character/?page=${page}`)
      .then((res): Character[] => {
        pageCount = res.data.info.pages;
        return res.data.results;
      });
    return pageData;
  };

  let fullData = [] as Character[];

  for (let i = 1; i <= pageCount; i++) {
    await fetchSinglePage(i).then((data) => {
      fullData.push(...data);
    });
  }
  return {
    props: {
      characters: fullData,
    },
  };
};

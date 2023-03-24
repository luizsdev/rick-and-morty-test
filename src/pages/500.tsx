import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Error() {
  return (
    <>
      <main className="min-h-screen w-screen flex flex-col gap-10 justify-center items-center bg-gradient-to-r from-slate-50 to-green-100">
        <div className="md:w-full xl:w-2/3 flex flex-col sm:flex-row justify-center items-center p-5">
          <Image
            src="/rick.png"
            width={300}
            height={500}
            alt="teste"
            className="block sm:hidden "
          />
          <div>
            <h1 className="text-2xl  sm:text-6xl font-bold   drop-shadow-background">
              500
            </h1>{" "}
            <br />
            <h1 className="text-2xl sm:text-4xl  drop-shadow-xl">
              Uh-oh! Looks like you{"'"}ve wandered into a dimension where this
              page doesn{"'"}t exist. Unless you have a portal gun handy, you
              might be stuck here for a while.
            </h1>
            <Link
              href={"/"}
              type="button"
              className="text-gray-900 mt-5 flex items-center justify-center flex-row gap-2 w-32 h-12 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <BiArrowBack /> Home
            </Link>
          </div>

          <Image
            src="/rick.png"
            width={400}
            height={500}
            alt="teste"
            className="hidden md:block lg:hidden"
          />
          <Image
            src="/rick.png"
            width={450}
            height={500}
            alt="teste"
            className="hidden sm:block md:hidden"
          />
          <Image
            src="/rick.png"
            width={550}
            height={500}
            alt="teste"
            className="hidden lg:block"
          />
        </div>
      </main>
    </>
  );
}

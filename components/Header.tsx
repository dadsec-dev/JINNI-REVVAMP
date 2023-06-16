import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export default function Header({
  photo,
  email,
}: {
  photo?: string;
  email?: string;
}) {
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        {/* <Image
          alt="header text"
          src="/Jinni_logo.png"
          // className="sm:w-10 sm:h-10 w-9 h-9"
          width={150}
          height={24}
        /> */}
        <Image alt="jinni icon"src="/jhead.png" width={50} height={50}/>
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight text-[#000000]">
          <span className="sm:text-3xl text-xl font-extrabold ml-2 tracking-tight text-[#f3f3f3]">JINNI</span> Revamp
        </h1>
      </Link>
      {email ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-green-400 transition"
          >
            <div>Dashboard</div>
          </Link>
          <Link
            href="/buy-credits"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-green-400 transition"
          >
            <div>Buy Credits</div>
            <div className="text-green-500 bg-blue-200 rounded-full px-2 text-xs flex justify-center items-center font-bold">
              New
            </div>
          </Link>
          {photo ? (
            <Image
              alt="Profile picture"
              src={photo}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white" />
          )}
        </div>
      ) : (
        <Link
          className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-[#fff] text-white px-5 py-2 text-sm shadow-md hover:bg-[#fff] bg-[#fff] font-medium transition"
          href="/"
        >
          {/* <p>Sign Up </p> */} <ConnectButton />
        </Link>
      )}
    </header>
  );
}

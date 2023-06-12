import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";


import { useContractRead, useAccount, useBalance  } from 'wagmi';
import React, { useEffect, useState } from "react";

const Home = () => {

  const addrr = "0x0fbf91a2282adaac4ccf0969b052b825fd3009c9"
  const [balance, setBalance] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  const {data, isError, isLoading} = useBalance({
    address: address,
    token: addrr,
  })

  useEffect(() => {
    if (data) {
      setBalance(data.value);
    }
  }, [data]);
  
  useEffect(() => {
    console.log("fetching...");
  }, [data]);

  


  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>AI Luxury Revamped</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <a hidden
          href="https://vercel.fyi/roomGPT"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-5 transition duration-300 ease-in-out hover:text-gray-300"
        >
          Clone and deploy your own with{" "}
          <span className="text-green-600">Vercel</span>
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-600 sm:text-7xl">
        AI-Powered Excellence in  {" "}
          <span className="relative whitespace-nowrap text-green-600">
            <SquigglyLines />
            <span className="relative">Luxury</span>
          </span>{" "} Real Estate Visuals
        </h1>        
        
        {/* <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-600 sm:text-7xl">
          AI Generated {" "}
          <span className="relative whitespace-nowrap text-green-600">
            <SquigglyLines />
            <span className="relative">Luxury</span>
          </span>{" "} Images for Real Estate
        </h1> */}

        <h2 hidden className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Take a picture of your room and see how your room looks in different
          themes. Remodel your room today.
        </h2>

       <h1 className="mt-8 text-3xl ">{Math.floor(data?.formatted)} <span className="text-green-600">{data?.symbol}</span></h1> 

        <br></br>

        <div>
        {data?.value >= 100000 ? (        <Link
          className="bg-green-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-greeb-500 transition"
          href="/dream"
        >
          Enter Studio
        </Link>) : (<button disabled className="bg-gray-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-greeb-500 transition">Enter Studio</button>)}
        </div>





        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Before</h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/before.png"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">After</h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/after.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;

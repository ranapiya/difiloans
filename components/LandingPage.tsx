import React from "react";
import Header from "./Header";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className=" min-h-screen">
      {/* Background Accents */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-sky-500 to-teal-500" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-15 bg-fuchsia-500/40" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="px-8 md:px-16 lg:px-24 mt-12 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            NFT-based <span className="text-cyan-600">DeFi Lending</span>{" "}
            <br />& Borrowing Protocol
          </h2>
          <p className="mt-6 text-lg font-sans text-gray-300 max-w-xl">
            Leverage your <span className="text-emerald-700">Somnia NFTs </span>
            as collateral to borrow funds. Earn liquidity, unlock new use cases,
            and make your NFTs productive.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/Dashboard" passHref>
              <button className="rounded-xl cursor-pointer bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3 font-semibold hover:opacity-90 transition">
                Get Started
              </button>
            </Link>
            <button className="rounded-xl border border-gray-700 px-6 py-3 font-semibold hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content - Illustration */}

        <div className="flex-1 relative">
          <div className="w-full max-w-md mx-auto">
            <div className="rounded-2xl  p-1">
              <div className="rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-sky-400">
                  Collateralized Loans
                </h3>
                <p className="text-gray-300 mt-2 text-sm">
                  Lock your NFT, borrow SOM or other tokens. Fully on-chain.
                  Transparent. Secure.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-gray-800/70">
                    <span className="block text-gray-400">Collateral</span>
                    <span className="font-semibold text-white">Somnia NFT</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/70">
                    <span className="block text-gray-400">Borrow</span>
                    <span className="font-semibold text-white">100 SOM</span>
                  </div>
                </div>
                 <Link href="/Dashboard" passHref>
                <button className="mt-6 cursor-pointer w-full rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-4 py-2 text-black font-medium hover:opacity-90 transition">
                  Try Demo
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-16 lg:px-24 mt-24 text-center">
        <h3 className="text-3xl font-bold">Why Choose DeFiLoans?</h3>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-sky-500/50 transition">
            <h4 className="text-xl font-semibold text-sky-400">Originality</h4>
            <p className="mt-3 text-gray-400">
              Tap into the growing NFT market on Somnia. Turn static assets into
              productive capital.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-sky-500/50 transition">
            <h4 className="text-xl font-semibold text-teal-400">
              Technical Excellence
            </h4>
            <p className="mt-3 text-gray-400">
              Powered by simple yet powerful collateralized loan contracts.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-sky-500/50 transition">
            <h4 className="text-xl font-semibold text-fuchsia-400">
              Onchain Impact
            </h4>
            <p className="mt-3 text-gray-400">
              Fully transparent borrowing and liquidation, secured by smart
              contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DeFiLoans. Built on Somnia.
      </footer>
    </div>
  );
};

export default LandingPage;

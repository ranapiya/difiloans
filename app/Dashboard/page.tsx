import { Hero } from "@/components/defi/hero";
import { NFTGrid } from "@/components/defi/nft-grid";
import Link from "next/link";
import Header from "@/components/Header";

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-sky-500 to-teal-500" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-15 bg-fuchsia-500/40" />
      </div>

      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14 space-y-16">
        {/* Hero */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Hero />
        </div>

        {/* Quick Actions */}
        <section className="flex flex-wrap gap-20 justify-center md:justify-start">
          <Link href="/ActiveLoans">
            <button className="rounded-xl cursor-pointer bg-gradient-to-r from-sky-500 to-teal-500 text-black px-6 py-3 font-medium hover:opacity-90 transition min-w-[180px]">
              View Active Loans
            </button>
          </Link>
          <Link href="/Loan">
            <button className="rounded-xl cursor-pointer bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-6 py-3 font-medium hover:opacity-90 transition min-w-[180px]">
              Start New Loan
            </button>
          </Link>
          <Link href="/Nfts">
            <button className="rounded-xl cursor-pointer bg-gradient-to-r from-sky-600 via-emerald-400 to-cyan-500 text-white px-6 py-3 font-medium hover:opacity-90 transition min-w-[180px]">
              Browse More NFTs
            </button>
          </Link>
        </section>

        {/* Browse NFTs Preview */}
        <section aria-label="Browse NFTs" className="space-y-6">
          <h2 className="text-2xl font-bold">Featured NFTs</h2>
          <NFTGrid />
        </section>

        {/* Educational Info Section */}
        <section
          aria-label="Learn about DeFi & NFTs"
          className="grid gap-6 md:grid-cols-3"
        >
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-fuchsia-500/50 transition">
            <h3 className="text-lg font-semibold text-fuchsia-400">
              NFTs as Collateral
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Lock your Somnia NFTs to borrow liquidity without selling your
              assets.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-sky-500/50 transition">
            <h3 className="text-lg font-semibold text-sky-400">
              On-Chain Lending
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              All loans, repayments, and liquidations happen fully on-chain with
              smart contracts.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-teal-500/50 transition">
            <h3 className="text-lg font-semibold text-teal-400">
              Transparent & Secure
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Borrowing limits are based on floor prices and transparent
              community valuation.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

import { Hero } from "@/components/defi/hero"
import { DashboardSummary } from "@/components/defi/dashboard-summary"
import { NFTGrid } from "@/components/defi/nft-grid"
import { LoanForm } from "@/components/defi/loan-form"
import ConnectButton from "@/components/ConnectButton"


export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Subtle background accents (blue→teal primary, soft purple accent) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-sky-500 to-teal-500" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-15 bg-fuchsia-500/40" />
      </div>

      {/* 🌟 Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-400 bg-clip-text text-transparent">
           DIFILOANS
          </h1>
          <ConnectButton  />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <Hero />

        <section aria-label="Lending dashboard" className="mt-8 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <DashboardSummary />
          </div>
          <aside className="md:col-span-2">
            <LoanForm />
          </aside>
        </section>

        <section aria-label="Browse NFTs" className="mt-10">
          <NFTGrid />
        </section>
      </div>
    </main>
  )
}

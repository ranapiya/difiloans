import { Hero } from "@/components/defi/hero"
import { DashboardSummary } from "@/components/defi/dashboard-summary"
import { NFTGrid } from "@/components/defi/nft-grid"
import { LoanForm } from "@/components/defi/loan-form"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Subtle background accents (blue→teal primary, soft purple accent) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-sky-500 to-teal-500" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-15 bg-fuchsia-500/40" />
      </div>

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

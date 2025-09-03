import { LoanForm } from '@/components/defi/loan-form'
import Header from '@/components/Header'
import React from 'react'

const Page = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-sky-500 to-teal-500" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-15 bg-fuchsia-500/40" />
      </div>

      {/* Header pinned at top */}
      <Header />

      {/* Form centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <LoanForm />
        </div>
      </div>
    </main>
  )
}

export default Page

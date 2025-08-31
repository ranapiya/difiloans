"use client"

import type React from "react"

import { GlassCard } from "./glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Lock } from "lucide-react"

export function LoanForm() {
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
  }

  return (
    <GlassCard className="p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold">Start a Loan</h2>
        <Lock className="h-4 w-4 text-sky-400" aria-hidden="true" />
      </div>

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nft">Collateral NFT</Label>
          <Select>
            <SelectTrigger id="nft" className="border-white/15 bg-white/5 text-white">
              <SelectValue placeholder="Select NFT" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="bayc3921">BAYC #3921</SelectItem>
              <SelectItem value="azuki1420">Azuki #1420</SelectItem>
              <SelectItem value="degods215">DeGods #215</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="amount">Desired Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 1.50"
            className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="term">Repayment Term</Label>
          <Select>
            <SelectTrigger id="term" className="border-white/15 bg-white/5 text-white">
              <SelectValue placeholder="Choose term" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="14d">14 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="60d">60 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-gradient-to-r from-sky-500 to-teal-500 text-black hover:opacity-90"
          aria-busy={submitting}
        >
          {submitting ? "Submitting..." : "Initiate Loan"}
        </Button>

        <p className="text-xs text-white/60 leading-relaxed">
          By initiating, you agree to lock the selected NFT as collateral. Terms and rates will be presented prior to
          confirmation on-chain.
        </p>
      </form>
    </GlassCard>
  )
}

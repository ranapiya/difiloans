import { GlassCard } from "./glass-card"
import { StatusBadge } from "./status-badge"
import { Coins, CalendarClock, Banknote } from "lucide-react"

type Loan = {
  id: string
  borrowed: string
  collateral: string
  collateralValueUsd: string
  nextDue: string
  status: "active" | "dueSoon" | "repaid"
}

const mockLoans: Loan[] = [
  {
    id: "LN-1248",
    borrowed: "2.4 ETH",
    collateral: "BAYC #3921",
    collateralValueUsd: "$82,400",
    nextDue: "Sep 20, 2025",
    status: "active",
  },
  {
    id: "LN-1275",
    borrowed: "1.2 ETH",
    collateral: "Azuki #1420",
    collateralValueUsd: "$19,200",
    nextDue: "Sep 12, 2025",
    status: "dueSoon",
  },
  {
    id: "LN-1189",
    borrowed: "0.8 ETH",
    collateral: "DeGods #215",
    collateralValueUsd: "$12,050",
    nextDue: "—",
    status: "repaid",
  },
]

export function DashboardSummary() {
  return (
    <GlassCard className="p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold">Active Loans</h2>
        <div className="text-xs text-white/60">{mockLoans.length} total</div>
      </div>

      <div className="mt-4 grid gap-3">
        {mockLoans.map((loan) => (
          <div
            key={loan.id}
            className="grid grid-cols-1 gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 md:grid-cols-5"
          >
            <div className="flex items-center gap-2 md:col-span-2">
              <Coins className="h-4 w-4 text-teal-400" aria-hidden="true" />
              <div>
                <div className="text-sm text-white/80">{loan.id}</div>
                <div className="text-xs text-white/60">{loan.collateral}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <div className="text-sm">
                <span className="text-white/60">Borrowed:</span> <span className="text-white/90">{loan.borrowed}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="sr-only">Collateral value</span>
              <div className="text-sm">
                <span className="text-white/60">Value:</span>{" "}
                <span className="text-white/90">{loan.collateralValueUsd}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-fuchsia-400" aria-hidden="true" />
                <div className="text-sm">
                  <span className="text-white/60">Next due:</span> <span className="text-white/90">{loan.nextDue}</span>
                </div>
              </div>
              <StatusBadge status={loan.status} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

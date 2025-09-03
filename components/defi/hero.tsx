
import { Shield} from "lucide-react"


export function Hero() {
  return (
    <header className="flex flex-col gap-5 text-pretty">
      <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/70">
        <Shield className="h-4 w-4 text-teal-400" aria-hidden="true" />
        <span>Secure. Non-custodial. On-chain.</span>
      </div>
      <h1 className="max-w-2xl font-[family-name:var(--font-montserrat)] text-balance text-3xl font-bold md:text-5xl">
        Borrow against your NFTs with confidence
      </h1>
      <p className="max-w-2xl text-white/70 leading-relaxed">
        Access instant liquidity using your NFTs as collateral. Transparent rates, clear terms, and a seamless
        experience.
      </p>
    </header>
  )
}

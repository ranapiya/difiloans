import { GlassCard } from "./glass-card"

type NFT = {
  id: string
  name: string
  image: string
  priceUsd: string
}

const nfts: NFT[] = [
  { id: "1", name: "BAYC #3921", image: "/bayc-3921.png", priceUsd: "$82,400" },
  { id: "2", name: "Azuki #1420", image: "/azuki-1420.png", priceUsd: "$19,200" },
  { id: "3", name: "DeGods #215", image: "/degods-215.png", priceUsd: "$12,050" },
  { id: "4", name: "Moonbirds #88", image: "/moonbirds-88.png", priceUsd: "$9,800" },
  { id: "5", name: "Pudgy #501", image: "/pudgy-501.png", priceUsd: "$7,450" },
  { id: "6", name: "Milady #777", image: "/milady-777.png", priceUsd: "$6,120" },
]

export function NFTGrid() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold">Browse NFTs</h2>
        <div className="text-xs text-white/60">Market values refresh periodically</div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {nfts.map((n) => (
          <GlassCard key={n.id} className="p-3">
            <div className="flex flex-col items-center text-center">
              <img
                src={n.image || "/placeholder.svg?height=112&width=112&query=NFT%20thumbnail"}
                alt={`${n.name} preview`}
                className="h-28 w-28 rounded-lg object-cover ring-1 ring-white/10"
              />
              <div className="mt-3 w-full">
                <div className="truncate text-sm text-white/90">{n.name}</div>
                <div className="text-xs text-white/60">{n.priceUsd}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

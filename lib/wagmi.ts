// lib/wagmi.ts (example)
import { createConfig } from "wagmi";
import { http } from "wagmi";
import { somniaTestnet } from "viem/chains";

export const config = createConfig({
  chains: [somniaTestnet],
  transports: {
    [somniaTestnet.id]: http(),
  },
});

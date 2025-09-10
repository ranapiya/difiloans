// src/hooks/useLending.ts
import { useCallback } from "react";
import type { Signer } from "ethers";
import { ethers } from "ethers";
import { getContracts } from "../utils/contracts";

export function useLending(signer: Signer | null) {
  const mintNFT = useCallback(async () => {
    if (!signer) throw new Error("Wallet not connected");
    const { nft } = getContracts(signer);

    const tx = await nft.mint(await signer.getAddress());
    const receipt = await tx.wait();

    let tokenId: string | null = null;

    try {
      // Try parsing Transfer event
      const iface = new ethers.Interface(nft.interface.fragments);
      for (const log of receipt.logs) {
        if (log.address.toLowerCase() === (await nft.getAddress()).toLowerCase()) {
          const parsed = iface.parseLog(log);
          if (parsed?.name === "Transfer" && parsed?.args?.tokenId) {
            tokenId = parsed.args.tokenId.toString();
            break;
          }
        }
      }
    } catch (e) {
      console.warn("Could not parse tokenId from logs:", e);
    }

    return { tx, receipt, tokenId };
  }, [signer]);

  const approveNFT = useCallback(
    async (tokenId: number | string) => {
      if (!signer) throw new Error("Wallet not connected");
      const { nft, lending } = getContracts(signer);
      const tx = await nft.approve(await lending.getAddress(), tokenId);
      const receipt = await tx.wait();
      return { tx, receipt };
    },
    [signer]
  );

  const depositNFT = useCallback(
    async (tokenId: number | string) => {
      if (!signer) throw new Error("Wallet not connected");
      const { nft, lending } = getContracts(signer);
      const tx = await lending.depositNFT(await nft.getAddress(), tokenId);
      const receipt = await tx.wait();
      return { tx, receipt };
    },
    [signer]
  );

  const borrow = useCallback(
    async (amountStr: string, durationDays: number, interestRateBP: number) => {
      if (!signer) throw new Error("Wallet not connected");
      const { lending } = getContracts(signer);
      // ethers v6 parse
      const amount = ethers.parseEther(amountStr); // bigint
      const duration = BigInt(durationDays * 24 * 60 * 60);
      const tx = await lending.borrow(amount, duration, interestRateBP);
      const receipt = await tx.wait();
      return { tx, receipt };
    },
    [signer]
  );

  return { mintNFT, approveNFT, depositNFT, borrow };
}

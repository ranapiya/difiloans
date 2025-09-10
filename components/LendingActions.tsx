"use client";

import React, { useState, useEffect } from "react";
import { useLending } from "@/src/hooks/useLending";
import { useWalletClient } from "wagmi"; // ✅ instead of useSigner
import { ethers } from "ethers";

export default function LendingActions() {
  const { data: walletClient } = useWalletClient(); // ✅ gives viem wallet client
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    if (walletClient) {
      // viem → ethers v6 Signer
      const provider = new ethers.BrowserProvider(walletClient.transport as any);
      provider.getSigner().then(setSigner);
    } else {
      setSigner(null);
    }
  }, [walletClient]);

  const { mintNFT, approveNFT, depositNFT, borrow } = useLending(signer);

  const [tokenId, setTokenId] = useState<number>(1);

  const handleMint = async () => {
    try {
      const tx = await mintNFT();
      alert("NFT minted! Tx: " + tx.hash);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async () => {
    try {
      const tx = await approveNFT(tokenId);
      alert("NFT approved! Tx: " + tx.hash);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeposit = async () => {
    try {
      const tx = await depositNFT(tokenId);
      alert("NFT deposited! Tx: " + tx.hash);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBorrow = async () => {
    try {
      const tx = await borrow("100", 30, 500); // 100 tokens, 30 days, 5% APR
      alert("Borrowed! Tx: " + tx.hash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl shadow bg-gray-900 text-white max-w-md">
      <h2 className="text-xl font-bold">Lending Actions</h2>
      <button onClick={handleMint} className="bg-blue-600 px-4 py-2 rounded">
        Mint NFT
      </button>
      <button onClick={handleApprove} className="bg-green-600 px-4 py-2 rounded">
        Approve NFT
      </button>
      <button onClick={handleDeposit} className="bg-yellow-600 px-4 py-2 rounded">
        Deposit NFT
      </button>
      <button onClick={handleBorrow} className="bg-purple-600 px-4 py-2 rounded">
        Borrow
      </button>
    </div>
  );
}

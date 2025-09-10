// src/components/StartLoan.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { useLending } from "@/src/hooks/useLending";
import { getContracts } from "@/src/utils/contracts";

// Import your UI components (GlassCard, Button, Input, Select, etc.)
import { GlassCard } from "./glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock } from "lucide-react";

export function StartLoan() {
  const { data: walletClient } = useWalletClient();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    if (!walletClient) {
      setSigner(null);
      return;
    }
    // Create an ethers BrowserProvider from the viem wallet client transport
    try {
      const provider = new ethers.BrowserProvider(
        (walletClient as any).transport as any
      );
      provider
        .getSigner()
        .then(setSigner)
        .catch(() => setSigner(null));
    } catch (e) {
      setSigner(null);
    }
  }, [walletClient]);

  const { mintNFT, approveNFT, depositNFT, borrow } = useLending(signer);

  // form state
  const [useMint, setUseMint] = useState(true); // true -> mint new, false -> use existing tokenId
  const [tokenId, setTokenId] = useState("");
  const [tokenIdInput, setTokenIdInput] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.1");
  const [term, setTerm] = useState<string>("30d");
  const [interestBP, setInterestBP] = useState<number>(500); // default 5%
  const [busyStep, setBusyStep] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [maxBorrowReadable, setMaxBorrowReadable] = useState<string | null>(
    null
  );

  async function addLog(s: string) {
    setLogs((l) => [s, ...l].slice(0, 20));
  }

  // fetch max borrowable (oracle + lending.ltvPercent)
  async function fetchMax(tokenIdToUse: string | undefined) {
    if (!signer || !tokenIdToUse) {
      setMaxBorrowReadable(null);
      return;
    }
    try {
      const { lending, oracle, nft } = getContracts(signer);
      const nftAddr = await nft.getAddress();
      const floor: bigint = await oracle.getFloorPrice(
        nftAddr,
        BigInt(tokenIdToUse)
      );
      const ltv: bigint = await lending.ltvPercent();
      const maxLoan = (floor * ltv) / 100n;
      setMaxBorrowReadable(ethers.formatEther(maxLoan) + " TOK"); // TOK = your loan token
    } catch (e) {
      setMaxBorrowReadable(null);
    }
  }

  // handle mint
  async function handleMint() {
    try {
      setBusyStep("minting");
      addLog("Minting NFT...");
      const { tx, tokenId } = await mintNFT();
      addLog(`Mint tx: ${tx.hash}`);
      if (!tokenId) {
        // if tokenId missing, ask user to input tokenId manually
      } else {
        setTokenId(tokenId);
        addLog(`Minted tokenId: ${tokenId}`);
        await fetchMax(tokenId);
      }
    } catch (e: any) {
      addLog("Mint failed: " + (e?.message ?? e));
      console.error(e);
    } finally {
      setBusyStep(null);
    }
  }

  // handle approve
  async function handleApprove() {
    try {
      const tid = tokenId ?? tokenIdInput;
      if (!tid) {
        alert("No tokenId. Mint or enter an existing tokenId first.");
        return;
      }
      setBusyStep("approving");
      addLog(`Approving tokenId ${tid}...`);
      const { tx } = await approveNFT(Number(tid));
      addLog(`Approve tx: ${tx.hash}`);
    } catch (e: any) {
      addLog("Approve failed: " + (e?.message ?? e));
      console.error(e);
    } finally {
      setBusyStep(null);
    }
  }

  // handle deposit
  async function handleDeposit() {
    try {
      const tid = tokenId ?? tokenIdInput;
      if (!tid) {
        alert("No tokenId. Mint or enter an existing tokenId first.");
        return;
      }
      setBusyStep("depositing");
      addLog(`Depositing tokenId ${tid}...`);
      const { tx } = await depositNFT(Number(tid));
      addLog(`Deposit tx: ${tx.hash}`);
    } catch (e: any) {
      addLog("Deposit failed: " + (e?.message ?? e));
      console.error(e);
    } finally {
      setBusyStep(null);
    }
  }

  // handle borrow
  async function handleBorrow() {
    try {
      const tid = tokenId ?? tokenIdInput;
      if (!tid) {
        alert("No tokenId. Mint or enter an existing tokenId first.");
        return;
      }

      // basic validation: amount > 0
      if (!amount || Number(amount) <= 0) {
        alert("Enter a valid amount");
        return;
      }

      // check max borrow if available
      if (maxBorrowReadable) {
        // parse numeric part
        const maxNum = Number(maxBorrowReadable.split(" ")[0]);
        if (!isNaN(maxNum) && Number(amount) > maxNum + 0.000001) {
          if (
            !confirm(
              `Requested amount ${amount} > protocol max ${maxBorrowReadable}. Continue?`
            )
          ) {
            return;
          }
        }
      }

      setBusyStep("borrowing");
      addLog(`Borrowing ${amount} for ${term} at ${interestBP / 100}% APR...`);
      const days = term === "14d" ? 14 : term === "30d" ? 30 : 60;
      const { tx } = await borrow(amount, days, interestBP);
      addLog(`Borrow tx: ${tx.hash}`);
      alert("Borrow successful (tx: " + tx.hash + ")");
    } catch (e: any) {
      addLog("Borrow failed: " + (e?.message ?? e));
      console.error(e);
    } finally {
      setBusyStep(null);
    }
  }

  // when tokenId or signer change, update max borrow
  useEffect(() => {
    fetchMax(tokenId ?? tokenIdInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId, tokenIdInput, signer]);

  return (
    <GlassCard className="p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Start a Loan</h2>
        <Lock className="h-4 w-4 text-sky-400" aria-hidden="true" />
      </div>

      <div className="grid gap-4 mt-5">
        <div className="grid gap-5 ">
          <Label>Collateral NFT</Label>

          <div className="flex gap-4">
            <button
              className={`px-3 py-2 cursor-pointer rounded-2xl w-full ${
                useMint ? "bg-gradient-to-b from-cyan-500 to-emerald-500" : "bg-gray-700"
              }`}
              onClick={() => setUseMint(true)}
            >
              Mint new
            </button>
            <button
              className={`px-3 py-2 rounded-2xl w-full cursor-pointer ${
                !useMint ? "bg-gradient-to-b from-cyan-500 to-emerald-500" : "bg-gray-700"
              }`}
              onClick={() => setUseMint(false)}
            >
              Use existing tokenId
            </button>
          </div>

          {useMint ? (
            <div className="flex gap-y-5 flex-col items-center justify-center">
              <div className="text-sm text-white/70">
                <Input
                  type="text"
                  placeholder="Enter NEW mint tokenId"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                 
                />
              </div>
              <Button onClick={handleMint} disabled={busyStep !== null} className="cursor-pointer bg-emerald-500 hover:bg-emerald-900">
                {busyStep === "minting" ? "Minting..." : "Mint NFT"}
              </Button>
              
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="existing tokenId (e.g. 1)"
                value={tokenIdInput}
                onChange={(e) => setTokenIdInput(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid gap-4  mt-5">
          <Label className="text-xl">Approval & Deposit</Label>
          <div className="flex gap-10 justify-center">
            <Button onClick={handleApprove} disabled={busyStep !== null} className="bg-cyan-500 transition transform hover:scale-110 hover:bg-cyan-900 cursor-pointer">
              {busyStep === "approving" ? "Approving..." : "Approve"}
            </Button>
            <Button onClick={handleDeposit} disabled={busyStep !== null } className="bg-cyan-500 transition transform hover:scale-110 hover:bg-cyan-900 cursor-pointer">
              {busyStep === "depositing" ? "Depositing..." : "Deposit"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Label className="text-xl">Loan Details</Label>
          <Input
            placeholder="Amount (token decimals assumed 18)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2">
            <Select onValueChange={(v) => setTerm(v)} defaultValue="30d">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="14d">14 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="60d">60 days</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              value={(interestBP / 100).toString()}
              onChange={(e) =>
                setInterestBP(Math.round(Number(e.target.value) * 100))
              }
              className="w-36"
            />
            <div className="text-sm text-white/70">Interest % (APR)</div>
          </div>

          <div className="text-xs text-white/60">
            Max borrow (oracle + LTV): {maxBorrowReadable ?? "— not available"}
          </div>

          <Button onClick={handleBorrow} disabled={busyStep !== null} className="bg-yellow-500 transition transform hover:scale-110 hover:bg-orange-400 cursor-pointer">
            {busyStep === "borrowing" ? "Borrowing..." : "Borrow"}
          </Button>
        </div>

        <div className="grid gap-2">
          <Label>Activity</Label>
          <div className="h-32 overflow-auto bg-black/20 p-2 rounded">
            {logs.length === 0 ? (
              <div className="text-sm text-white/60">No activity yet</div>
            ) : null}
            {logs.map((l, i) => (
              <div key={i} className="text-xs text-white/80">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default StartLoan;

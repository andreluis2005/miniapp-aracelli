"use client";

import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";

const wallet = "0xFeb23dC4E0eb05B62AA8b5b6bd455de15DECb404";

export default function Home() {
  const [amount, setAmount] = useState(5);

  const { sendTransaction, isPending, data } = useSendTransaction({
    to: wallet,
    value: parseEther((amount * 0.001).toFixed(3)),
  });

  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-2">Aracelli - Doação Blockchain</h1>
      <p className="mb-4 text-gray-600 text-sm">
        100% das doações vão para causas beneficentes na rede Base.
      </p>

      <div className="flex gap-2 mb-4">
        {[5, 20, 50, 100].map((val) => (
          <button
            key={val}
            onClick={() => setAmount(val)}
            className={`px-4 py-2 border rounded-full ${
              amount === val ? "bg-purple-600 text-white" : "bg-white border-gray-300"
            }`}
          >
            ${val}
          </button>
        ))}
      </div>

      <button
        onClick={() => sendTransaction()}
        disabled={isPending}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
      >
        {isPending ? "Enviando..." : "Doar"}
      </button>

      {data && (
        <p className="mt-4 text-green-600 text-sm">
          ✅ Transação enviada!{" "}
          <a href={`https://basescan.org/tx/${data}`} target="_blank" className="underline">
            Ver no explorer
          </a>
        </p>
      )}
    </main>
  );
}

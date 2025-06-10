"use server";

import { PythStakingClient } from "@pythnetwork/staking-sdk";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

export async function getPythStakingClient() {
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL as string;
  const solanaAddress = process.env.TESTING_WALLET_ADDRESS as string;

  const walletPublicKey = new PublicKey(solanaAddress);
  const stakeAccount = new PublicKey(process.env.STAKING_ACCOUNT as string);
  const connection = new Connection(rpcUrl);
  const client = new PythStakingClient({ connection });

  const rewards = await new PythStakingClient({
    connection: new Connection(clusterApiUrl("mainnet-beta")),
    wallet: {
      publicKey: walletPublicKey,
    },
  }).getClaimableRewards(stakeAccount);

  console.log("Account:", rewards);
}

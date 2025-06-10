"use server";

import { PythStakingClient } from "@pythnetwork/staking-sdk";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

export async function getOISStakingRewardSize() {
  const stakeAccount = new PublicKey(process.env.STAKING_ACCOUNT as string);
  const walletPublicKey = new PublicKey(
    process.env.TESTING_WALLET_ADDRESS as string
  );

  const client = createPythStakingClient(walletPublicKey);
  const rewards = await getClaimableRewards(client, stakeAccount);
  console.log("Claimable rewards: ", rewards.totalRewards);
  const positions = await client.getStakeAccountPositions(stakeAccount);
  console.log("Stake account positions: ", positions.data.positions);

  return 0;
}

function createPythStakingClient(
  walletPublicKey: PublicKey
): PythStakingClient {
  return new PythStakingClient({
    connection: new Connection(clusterApiUrl("mainnet-beta")),
    wallet: {
      publicKey: walletPublicKey,
      signAllTransactions: () => Promise.reject("Not implemented"),
      signTransaction: () => Promise.reject("Not implemented"),
    },
  });
}

async function getClaimableRewards(
  client: PythStakingClient,
  stakeAccount: PublicKey
) {
  return client.getClaimableRewards(stakeAccount);
}

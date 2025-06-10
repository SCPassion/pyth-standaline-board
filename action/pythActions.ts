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

  const publisherStakes: Record<string, bigint> = {};
  positions.data.positions.forEach((p) => {
    const publisher = p.targetWithParameters.integrityPool?.publisher;
    if (publisher) {
      const key = publisher.toBase58();
      if (!publisherStakes[key]) {
        publisherStakes[key] = 0n;
      }
      publisherStakes[key] += p.amount;
    }
  });

  console.log("Staked amount per publisher:", publisherStakes);

  // Sum all amounts for integrity pool positions (OIS staking)
  const totalStaked = positions.data.positions
    .filter((p) => p.targetWithParameters.integrityPool?.publisher)
    .map((p) => p.amount)
    .reduce((sum, amount) => sum + amount, 0n);

  console.log("Total OIS Staked PYTH:", totalStaked.toString());

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

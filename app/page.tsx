import { getOISStakingInfo } from "@/action/pythActions";

export default async function Home() {
  const walletAddress = process.env.TESTING_WALLET_ADDRESS as string;
  const stakingAddress = process.env.STAKING_ACCOUNT as string;
  const {
    StakeForEachPublisher,
    totalStakedPyth,
    claimableRewards,
    generalStats,
  } = await getOISStakingInfo(walletAddress, stakingAddress);

  console.log("StakeForEachPublisher:", StakeForEachPublisher);
  console.log("Total Staked PYTH:", totalStakedPyth);
  console.log("Claimable Rewards:", claimableRewards);
  console.log("General Stats:", generalStats);

  return <div>hi</div>;
}

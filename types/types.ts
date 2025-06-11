export type PythStakingInfo = {
  StakeForEachPublisher: Record<string, number>;
  totalStakedPyth: number;
  claimableRewards: number;
  generalStats: {
    totalGovernance: number;
    totalStaked: number;
    rewardsDistributed: number;
  };
};

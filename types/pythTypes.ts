export type PythStakingInfo = {
  StakeForEachPublisher: MyPublisherInfo[];
  totalStakedPyth: number;
  claimableRewards: number;
  generalStats: {
    totalGovernance: number;
    totalStaked: number;
    rewardsDistributed: number;
  };
};

export type MyPublisherInfo = {
  publisherKey: string;
  stakedAmount: number;
  apy: number;
};

export type PythGeneralStats = {
  totalGovernance: number;
  totalStaked: number;
  rewardsDistributed: number;
};

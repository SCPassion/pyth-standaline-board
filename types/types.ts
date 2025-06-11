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

export type MyPublisherInfo = {
  publisherKey: string;
  stakedAmount: number;
  apy: number;
};

export type MyPublishersInfo = MyPublisherInfo[];

export type PythGeneralStats = {
  totalGovernance: number;
  totalStaked: number;
  rewardsDistributed: number;
};

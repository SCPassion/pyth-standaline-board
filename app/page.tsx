import { getOISStakingRewardSize } from "@/action/pythActions";

export default async function Home() {
  await getOISStakingRewardSize();

  return <div>hi</div>;
}
